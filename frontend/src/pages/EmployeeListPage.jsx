import NavBar from "../components/NavBar"
import SideBar from "../components/SideBar"
import EmpHeader from "../components/EmpHeader"
import EmpFilter from "../components/EmpFiler"
import Emptable from "../components/EmpTable"
import Pagination from "../components/Pagination"
import EmpAddForm from "../components/EmpAddForm"

import { useState, useEffect } from "react"
export default function EmployeeList(){
    const [isEmpFormOpen,setEmpForm]=useState(false)
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        // Set filtered employees to all employees on initial load
        setFilteredEmployees(employees);
    }, [employees]);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://127.0.0.1:8000/api/employees/');
            if (!response.ok) {
                throw new Error('Failed to fetch employees');
            }
            const data = await response.json();
            setEmployees(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching employees:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (dept = selectedDepartment) => {
        let filtered = employees;

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(emp => 
                emp.Full_name.toLowerCase().includes(query) ||
                emp.Emp_id.toLowerCase().includes(query) ||
                emp.Email.toLowerCase().includes(query)
            );
        }

        // Filter by department
        if (dept !== 'All Departments') {
            filtered = filtered.filter(emp => emp.Department === dept);
        }

        setFilteredEmployees(filtered);
        setCurrentPage(1); // Reset to page 1 when search changes
    };

    const departments = ['All Departments', ...new Set(employees.map(emp => emp.Department))];

    // Pagination logic
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#111418] dark:text-white antialiased min-h-screen flex">
            <SideBar></SideBar>
            <div className="flex-1 flex flex-col min-w-0">
                <NavBar></NavBar>
                <main className="max-w-[1200px] mx-auto px-6 py-8 w-full">
                    <EmpHeader setEmpForm={setEmpForm}></EmpHeader>
                    <EmpFilter 
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        selectedDepartment={selectedDepartment}
                        setSelectedDepartment={setSelectedDepartment}
                        departments={departments}
                        onSearch={handleSearch}
                    ></EmpFilter>
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="animate-spin mb-4">
                                <span className="material-symbols-outlined text-5xl text-primary">loading</span>
                            </div>
                            <p className="text-center text-[#4c6c9a] dark:text-slate-400">Loading employees...</p>
                        </div>
                    )}
                    {error && <p className="text-center py-8 text-red-500">Error: {error}</p>}
                    {!loading && !error && (
                        <>
                            <Emptable employees={paginatedEmployees} onEmployeeDeleted={fetchEmployees}></Emptable>
                            {totalPages > 0 && (
                                <Pagination 
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                    itemsPerPage={itemsPerPage}
                                    totalItems={filteredEmployees.length}
                                />
                            )}
                        </>
                    )}
                </main>
            </div>
            <EmpAddForm isOpen={isEmpFormOpen} onClose={()=> {
                setEmpForm(false);
                fetchEmployees();
            }}></EmpAddForm>
        </div>
    )
}