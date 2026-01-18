import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

export default function EmpAttendanceHistory(){
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEmployeeAttendanceHistory();
    }, [id]);

    const fetchEmployeeAttendanceHistory = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://127.0.0.1:8000/api/employees/${id}/attendance/`);
            if (!response.ok) {
                throw new Error('Failed to fetch employee attendance history');
            }
            const data = await response.json();
            setEmployee(data.employee);
            setAttendanceHistory(data.attendance_history);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching attendance history:', err);
        } finally {
            setLoading(false);
        }
    };

    const getInitials = (name) => {
        if (!name) return '';
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const formatTime = (timeStr) => {
        if (!timeStr) return '—';
        try {
            const [hours, minutes] = timeStr.split(':');
            const hour = parseInt(hours);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour % 12 || 12;
            return `${displayHour}:${minutes} ${ampm}`;
        } catch (e) {
            return '—';
        }
    };

    const getStatusBadgeColor = (status) => {
        switch(status) {
            case 'Present':
                return 'bg-green-100 text-green-800';
            case 'Absent':
                return 'bg-red-100 text-red-800';
            case 'Leave':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getAttendanceStats = () => {
        const present = attendanceHistory.filter(att => att.status === 'Present').length;
        const absent = attendanceHistory.filter(att => att.status === 'Absent').length;
        const leave = attendanceHistory.filter(att => att.status === 'Leave').length;
        const total = attendanceHistory.length;
        const presentPercentage = total > 0 ? Math.round((present / total) * 100) : 0;
        
        return { present, absent, leave, total, presentPercentage };
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#111418] dark:text-white antialiased min-h-screen flex">
            <SideBar />
            <div className="flex-1 flex flex-col min-w-0">
                <NavBar />
                <main className="flex-1 px-4 md:px-10 lg:px-40 py-8">
                    <div className="max-w-[1200px] mx-auto">
                        {loading && (
                            <div className="flex flex-col items-center justify-center py-12">
                                <div className="animate-spin mb-4">
                                    <span className="material-symbols-outlined text-5xl text-primary">loading</span>
                                </div>
                                <p className="text-center text-[#4c6c9a] dark:text-slate-400">Loading attendance history...</p>
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                                Error: {error}
                            </div>
                        )}

                        {!loading && !error && employee && (
                            <>
                                {/* Employee Header Card */}
                                <div className="bg-white dark:bg-slate-800 rounded-xl border border-[#cfd9e7] dark:border-slate-700 overflow-hidden shadow-sm mb-6">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="size-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-2xl">
                                                    {getInitials(employee.Full_name)}
                                                </div>
                                                <div>
                                                    <h1 className="text-3xl font-bold text-[#0d131b] dark:text-slate-100">
                                                        {employee.Full_name}
                                                    </h1>
                                                    <p className="text-sm text-[#4c6c9a] dark:text-slate-400">
                                                        Employee ID: {employee.Emp_id}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-[#4c6c9a] dark:text-slate-400">Department</p>
                                                <p className="text-lg font-semibold text-[#0d131b] dark:text-slate-100">
                                                    {employee.Department}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4 grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs text-[#4c6c9a] dark:text-slate-400 uppercase">Email</p>
                                                <p className="text-sm font-medium text-[#0d131b] dark:text-slate-100">{employee.Email}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#4c6c9a] dark:text-slate-400 uppercase">Total Records</p>
                                                <p className="text-sm font-medium text-[#0d131b] dark:text-slate-100">{attendanceHistory.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Attendance Stats */}
                                {attendanceHistory.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
                                        <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-slate-800 shadow-sm">
                                            <div className="flex justify-between items-start">
                                                <p className="text-[#617289] dark:text-gray-400 text-sm font-medium">Total Records</p>
                                                <span className="material-symbols-outlined text-primary text-[24px]">calendar_today</span>
                                            </div>
                                            <p className="text-[#111418] dark:text-white text-3xl font-extrabold mt-1">{getAttendanceStats().total}</p>
                                        </div>

                                        <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-slate-800 shadow-sm">
                                            <div className="flex justify-between items-start">
                                                <p className="text-[#617289] dark:text-gray-400 text-sm font-medium">Present</p>
                                                <span className="material-symbols-outlined text-green-500 text-[24px]">check_circle</span>
                                            </div>
                                            <p className="text-[#111418] dark:text-white text-3xl font-extrabold mt-1">{getAttendanceStats().present}</p>
                                            <p className="text-green-600 text-xs font-bold mt-2">{getAttendanceStats().presentPercentage}% attendance</p>
                                        </div>

                                        <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-slate-800 shadow-sm">
                                            <div className="flex justify-between items-start">
                                                <p className="text-[#617289] dark:text-gray-400 text-sm font-medium">Absent</p>
                                                <span className="material-symbols-outlined text-red-500 text-[24px]">cancel</span>
                                            </div>
                                            <p className="text-[#111418] dark:text-white text-3xl font-extrabold mt-1">{getAttendanceStats().absent}</p>
                                        </div>

                                        <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-slate-800 shadow-sm">
                                            <div className="flex justify-between items-start">
                                                <p className="text-[#617289] dark:text-gray-400 text-sm font-medium">Leave</p>
                                                <span className="material-symbols-outlined text-yellow-500 text-[24px]">beach_access</span>
                                            </div>
                                            <p className="text-[#111418] dark:text-white text-3xl font-extrabold mt-1">{getAttendanceStats().leave}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Attendance History Table */}
                                <div className="bg-white dark:bg-slate-800 rounded-xl border border-[#cfd9e7] dark:border-slate-700 overflow-hidden shadow-sm">
                                    <div className="p-4 border-b border-[#e7ecf3] dark:border-slate-700">
                                        <h2 className="text-lg font-bold text-[#0d131b] dark:text-slate-100">
                                            Attendance History
                                        </h2>
                                    </div>
                                    <div className="overflow-x-auto">
                                        {attendanceHistory.length === 0 ? (
                                            <div className="text-center py-8 text-[#4c6c9a]">
                                                No attendance records found
                                            </div>
                                        ) : (
                                            <table className="w-full text-left">
                                                <thead>
                                                    <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-[#e7ecf3] dark:border-slate-700">
                                                        <th className="px-6 py-4 text-xs font-bold text-[#4c6c9a] uppercase tracking-wider">Date</th>
                                                        <th className="px-6 py-4 text-xs font-bold text-[#4c6c9a] uppercase tracking-wider">Status</th>
                                                        <th className="px-6 py-4 text-xs font-bold text-[#4c6c9a] uppercase tracking-wider">Check-in</th>
                                                        <th className="px-6 py-4 text-xs font-bold text-[#4c6c9a] uppercase tracking-wider">Check-out</th>
                                                        <th className="px-6 py-4 text-xs font-bold text-[#4c6c9a] uppercase tracking-wider">Notes</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-[#e7ecf3] dark:divide-slate-700">
                                                    {attendanceHistory.map((record) => (
                                                        <tr key={record.id} className="hover:bg-primary/5 transition-colors">
                                                            <td className="px-6 py-4">
                                                                <p className="text-sm font-medium text-[#0d131b] dark:text-slate-100">
                                                                    {formatDate(record.attendance_date)}
                                                                </p>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getStatusBadgeColor(record.status)}`}>
                                                                    {record.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-[#4c6c9a] dark:text-slate-400">
                                                                {formatTime(record.check_in_time)}
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-[#4c6c9a] dark:text-slate-400">
                                                                {formatTime(record.check_out_time)}
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-[#4c6c9a] dark:text-slate-400">
                                                                {record.notes || '—'}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}