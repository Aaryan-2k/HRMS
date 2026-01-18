import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar'; 
import SideBar from '../components/SideBar'; 
import Stats from '../components/Stats';
import Calendar from '../components/Calendar';
import Pagination from '../components/Pagination';

export default function AttendancePage(){
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [employees, setEmployees] = useState([]);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [originalRecords, setOriginalRecords] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
    const [departments, setDepartments] = useState(['All Departments']);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [saveLoading, setSaveLoading] = useState(false);
    const [saveMessage, setSaveMessage] = useState(null);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        if (employees.length > 0) {
            fetchAttendanceForDate(selectedDate);
        }
    }, [selectedDate, employees.length]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedDepartment]);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://127.0.0.1:8000/api/employees/');
            if (!response.ok) {
                throw new Error('Failed to fetch employees');
            }
            const data = await response.json();
            setEmployees(data);

            const uniqueDepts = ['All Departments', ...new Set(data.map(emp => emp.Department))];
            setDepartments(uniqueDepts);
            
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching employees:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchAttendanceForDate = async (date) => {
        try {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;
            
            const response = await fetch(`http://127.0.0.1:8000/api/attendance/by-date/?date=${dateStr}`);
            const savedAttendance = await response.json();
            
            const attendanceMap = {};
            savedAttendance.forEach(record => {
                attendanceMap[record.employee] = record;
            });
            
            const initialRecords = employees.map(emp => {
                const saved = attendanceMap[emp.id];
                return {
                    id: emp.id,
                    name: emp.Full_name,
                    empId: emp.Emp_id,
                    department: emp.Department,
                    checkIn: saved?.check_in_time ? formatTime(saved.check_in_time) : '',
                    status: saved?.status || 'Absent'
                };
            });
            setAttendanceRecords(initialRecords);
            setOriginalRecords(JSON.parse(JSON.stringify(initialRecords)));
        } catch (err) {
            console.error('Error fetching attendance for date:', err);
            const initialRecords = employees.map(emp => ({
                id: emp.id,
                name: emp.Full_name,
                empId: emp.Emp_id,
                department: emp.Department,
                checkIn: '',
                status: 'Absent'
            }));
            setAttendanceRecords(initialRecords);
            setOriginalRecords(JSON.parse(JSON.stringify(initialRecords)));
        }
    };

    const formatTime = (timeStr) => {
        if (!timeStr) return null;
        try {
            const [hours, minutes] = timeStr.split(':');
            const hour = parseInt(hours);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour % 12 || 12;
            return `${displayHour}:${minutes} ${ampm}`;
        } catch (e) {
            return null;
        }
    };

    const handleStatusChange = (id, newStatus) => {
        setAttendanceRecords(prev => 
            prev.map(record => 
                record.id === id 
                    ? {
                        ...record,
                        status: newStatus,
                        checkIn: newStatus === 'Present' ? new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' ' + (new Date().getHours() < 12 ? 'AM' : 'PM') : ''
                    }
                    : record
            )
        );
    };

    const handleSaveAll = async () => {
        try {
            setSaveLoading(true);
            setSaveMessage(null);
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;

            // Only send records that have changed
            const changedRecords = attendanceRecords.filter(currentRecord => {
                const originalRecord = originalRecords.find(r => r.id === currentRecord.id);
                return !originalRecord || 
                       originalRecord.status !== currentRecord.status || 
                       originalRecord.checkIn !== currentRecord.checkIn;
            });

            if (changedRecords.length === 0) {
                setSaveMessage({ type: 'info', text: 'No changes to save' });
                setSaveLoading(false);
                return;
            }

            const attendanceData = changedRecords.map(record => ({
                id: record.id,
                status: record.status,
                checkIn: record.checkIn,
                attendance_date: dateStr
            }));

            console.log('Sending changed records:', attendanceData);

            const response = await fetch('http://127.0.0.1:8000/api/attendance/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(attendanceData)
            });
            
            const responseData = await response.json();
            console.log('Response:', responseData);

            if (response.ok) {
                setSaveMessage({ type: 'success', text: `Attendance saved successfully! (${responseData.count} records updated)` });
                // Update original records to match current state
                setOriginalRecords(JSON.parse(JSON.stringify(attendanceRecords)));
                setTimeout(() => setSaveMessage(null), 4000);
            } else {
                const errorMsg = responseData.error || responseData.detail || JSON.stringify(responseData);
                setSaveMessage({ type: 'error', text: 'Failed to save attendance: ' + errorMsg });
            }
        } catch (error) {
            console.error('Save error:', error);
            setSaveMessage({ type: 'error', text: 'Error saving attendance: ' + error.message });
        } finally {
            setSaveLoading(false);
        }
    };

    const handleMarkAllPresent = () => {
        setAttendanceRecords(prev =>
            prev.map(record => ({
                ...record,
                status: 'Present',
                checkIn: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' ' + (new Date().getHours() < 12 ? 'AM' : 'PM')
            }))
        );
    };

    const filteredRecords = selectedDepartment === 'All Departments' 
        ? attendanceRecords 
        : attendanceRecords.filter(record => record.department === selectedDepartment);

    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const formattedDate = selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#111418] dark:text-white antialiased min-h-screen flex">
            <SideBar />
            <div className="flex-1 flex flex-col min-w-0">
                <NavBar />
                <main className="flex-1 px-4 md:px-10 lg:px-40 py-8">
                    <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
                        {/* Sticky Header with Save Button */}
                        <div className="sticky top-0 z-20 bg-background-light dark:bg-background-dark pt-2 pb-4 mb-2 border-b border-[#e7ecf3] dark:border-slate-700">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex flex-col gap-1">
                                    <h1 className="text-[#0d131b] dark:text-slate-100 text-4xl font-black leading-tight tracking-[-0.033em]">
                                        Attendance Tracking & Logs
                                    </h1>
                                    <p className="text-[#4c6c9a] dark:text-slate-400 text-base font-normal leading-normal">
                                        Manage daily employee presence and attendance records
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 items-end">
                                    {saveMessage && (
                                        <div className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                                            saveMessage.type === 'success' 
                                                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100' 
                                                : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100'
                                        }`}>
                                            {saveMessage.text}
                                        </div>
                                    )}
                                    <button 
                                        onClick={handleSaveAll}
                                        disabled={saveLoading}
                                        className="flex items-center justify-center rounded-lg h-11 px-6 bg-primary text-white text-sm font-bold tracking-[0.015em] shadow-md shadow-primary/20 hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed transition-all">
                                        {saveLoading ? (
                                            <>
                                                <span className="animate-spin mr-2">⏳</span>
                                                <span>Saving...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="material-symbols-outlined mr-2">save</span>
                                                <span>Save All Changes</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <Stats></Stats>
                        
                        <div className="flex flex-col lg:flex-row gap-6">
                            <Calendar onDateSelect={setSelectedDate} onMarkAllPresent={handleMarkAllPresent}></Calendar>
                            <section className="flex-1 flex flex-col gap-4">
                                <div className="bg-white dark:bg-slate-800 rounded-xl border border-[#cfd9e7] dark:border-slate-700 overflow-hidden shadow-sm">
                                    <div className="flex flex-wrap items-center justify-between p-4 border-b border-[#e7ecf3] dark:border-slate-700 gap-4">
                                        <h2 className="text-[#0d131b] dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em]">Daily Logs: {formattedDate}</h2>
                                        <div className="flex gap-2">
                                            <select 
                                                value={selectedDepartment}
                                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                                className="form-select text-sm rounded-lg border-[#cfd9e7] dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-primary focus:border-primary">
                                                {departments.map((dept) => (
                                                    <option key={dept} value={dept}>{dept}</option>
                                                ))}
                                            </select>
                                            <button className="p-2 border border-[#cfd9e7] dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800">
                                                <span className="material-symbols-outlined !text-lg">filter_list</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        {loading && (
                                            <div className="flex flex-col items-center justify-center py-12">
                                                <div className="animate-spin mb-4">
                                                    <span className="material-symbols-outlined text-5xl text-primary">loading</span>
                                                </div>
                                                <p className="text-center text-[#4c6c9a] dark:text-slate-400">Loading attendance records...</p>
                                            </div>
                                        )}
                                        {error && <p className="text-center py-8 text-red-500">Error: {error}</p>}
                                        {!loading && !error && (
                                            <table className="w-full text-left">
                                                <thead>
                                                    <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-[#e7ecf3] dark:border-slate-700">
                                                        <th className="px-6 py-4 text-xs font-bold text-[#4c6c9a] uppercase tracking-wider">Employee</th>
                                                        <th className="px-6 py-4 text-xs font-bold text-[#4c6c9a] uppercase tracking-wider">Department</th>
                                                        <th className="px-6 py-4 text-xs font-bold text-[#4c6c9a] uppercase tracking-wider">Check-in</th>
                                                        <th className="px-6 py-4 text-xs font-bold text-[#4c6c9a] uppercase tracking-wider">Status</th>
                                                        <th className="px-6 py-4 text-xs font-bold text-[#4c6c9a] uppercase tracking-wider text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-[#e7ecf3] dark:divide-slate-700">
                                                    {paginatedRecords.length === 0 ? (
                                                        <tr>
                                                            <td colSpan="5" className="px-6 py-8 text-center text-[#4c6c9a]">
                                                                No employees found for selected department
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        paginatedRecords.map((record) => (
                                                            <tr key={record.id} className="hover:bg-primary/5 transition-colors">
                                                                <td className="px-6 py-4">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                                                                            {record.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-sm font-bold text-[#0d131b] dark:text-slate-100">{record.name}</p>
                                                                            <p className="text-xs text-[#4c6c9a] dark:text-slate-400">{record.empId}</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4 text-sm text-[#4c6c9a] dark:text-slate-400">{record.department}</td>
                                                                <td className="px-6 py-4 text-sm text-[#4c6c9a] dark:text-slate-400">{record.checkIn || '—'}</td>
                                                                <td className="px-6 py-4">
                                                                    <div className="flex bg-[#e7ecf3] dark:bg-slate-700 p-1 rounded-lg w-fit">
                                                                        <button 
                                                                            onClick={() => handleStatusChange(record.id, 'Present')}
                                                                            className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                                                                                record.status === 'Present'
                                                                                    ? 'bg-white dark:bg-slate-600 text-primary shadow-sm'
                                                                                    : 'text-[#4c6c9a] dark:text-slate-400 hover:text-primary'
                                                                            }`}>
                                                                            Present
                                                                        </button>
                                                                        <button 
                                                                            onClick={() => handleStatusChange(record.id, 'Absent')}
                                                                            className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                                                                                record.status === 'Absent'
                                                                                    ? 'bg-white dark:bg-slate-600 text-[#e73908] shadow-sm'
                                                                                    : 'text-[#4c6c9a] dark:text-slate-400 hover:text-primary'
                                                                            }`}>
                                                                            Absent
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4 text-right">
                                                                    <div className="flex gap-2 justify-end">
                                                                        <Link 
                                                                            to={`/attendance/history/${record.id}`}
                                                                            className="text-primary hover:text-primary/90 transition-colors"
                                                                            title="View attendance history">
                                                                            <span className="material-symbols-outlined !text-lg">history</span>
                                                                        </Link>
                                                                        <button className="text-[#4c6c9a] hover:text-primary transition-colors"><span className="material-symbols-outlined !text-lg">edit_note</span></button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    )}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                    {!loading && !error && totalPages > 0 && (
                                        <Pagination 
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={handlePageChange}
                                            itemsPerPage={itemsPerPage}
                                            totalItems={filteredRecords.length}
                                        />
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}