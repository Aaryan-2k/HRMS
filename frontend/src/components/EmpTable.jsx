import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Emptable({ employees = [], onEmployeeDeleted }){
    const [deleting, setDeleting] = useState(null);

    const getInitials = (name) => {
        return name.split(' ').map(word => word[0]).join('').toUpperCase();
    };

    const getColorForInitials = (index) => {
        const colors = [
            'bg-primary/20 text-primary',
            'bg-purple-100 text-purple-600',
            'bg-green-100 text-green-600',
            'bg-orange-100 text-orange-600',
            'bg-pink-100 text-pink-600',
            'bg-blue-100 text-blue-600'
        ];
        return colors[index % colors.length];
    };

    const handleDelete = async (employeeId, employeeName) => {
        if (!window.confirm(`Are you sure you want to delete ${employeeName}?`)) {
            return;
        }

        try {
            setDeleting(employeeId);
            const response = await axios.delete(`https://backend-hrms-1.onrender.com/api/employees/${employeeId}/`);
            if (response.status === 204 || response.status === 200) {
                if (onEmployeeDeleted) {
                    onEmployeeDeleted();
                }
            }
        } catch (error) {
            alert('Error deleting employee: ' + (error.response?.data?.message || error.message));
        } finally {
            setDeleting(null);
        }
    };

    return (
        <div className="bg-white dark:bg-[#1a2432] rounded-xl border border-[#dbe0e6] dark:border-[#2d394a] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white dark:bg-[#1a2432] border-b border-[#dbe0e6] dark:border-[#2d394a]">
                  <th className="px-6 py-4 text-[12px] uppercase tracking-wider font-bold text-[#617289]">Employee ID</th>
                  <th className="px-6 py-4 text-[12px] uppercase tracking-wider font-bold text-[#617289]">Name</th>
                  <th className="px-6 py-4 text-[12px] uppercase tracking-wider font-bold text-[#617289]">Email</th>
                  <th className="px-6 py-4 text-[12px] uppercase tracking-wider font-bold text-[#617289]">Department</th>
                  <th className="px-6 py-4 text-[12px] uppercase tracking-wider font-bold text-[#617289] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dbe0e6] dark:divide-[#2d394a]">
                {employees.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-[#617289]">
                            No employees found
                        </td>
                    </tr>
                ) : (
                    employees.map((employee, index) => (
                        <tr key={employee.id} className="hover:bg-[#f6f7f8] dark:hover:bg-[#202b3a] transition-colors group">
                            <td className="px-6 py-5 text-sm font-medium text-primary">{employee.Emp_id}</td>
                            <td className="px-6 py-5">
                                <div className="flex items-center gap-3">
                                    <div className={`size-9 rounded-full flex items-center justify-center font-bold text-xs ${getColorForInitials(index)}`}>
                                        {getInitials(employee.Full_name)}
                                    </div>
                                    <span className="text-sm font-semibold">{employee.Full_name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-5 text-sm text-[#617289] dark:text-gray-400">{employee.Email}</td>
                            <td className="px-6 py-5">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#f0f2f4] dark:bg-[#101822] text-[#111418] dark:text-white uppercase">
                                    {employee.Department}
                                </span>
                            </td>
                            <td className="px-6 py-5 text-right">
                                <div className="flex gap-2 justify-end">
                                    <Link 
                                        to={`/attendance/history/${employee.id}`}
                                        className="text-primary hover:text-primary/90 font-bold text-sm inline-flex items-center gap-1 transition-colors">
                                        <span className="material-symbols-outlined text-sm">history</span>
                                        <span>History</span>
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(employee.id, employee.Full_name)}
                                        disabled={deleting === employee.id}
                                        className={`text-red-500 hover:text-red-700 font-bold text-sm inline-flex items-center gap-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}>
                                        <span className="material-symbols-outlined text-sm">delete</span>
                                        <span>{deleting === employee.id ? 'Deleting...' : 'Delete'}</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
    )
}
                     