import { useState, useEffect } from 'react';

export default function Stats(){
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [presentToday, setPresentToday] = useState(0);
    const [absentToday, setAbsentToday] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            // Fetch total employees
            const empResponse = await fetch('https://backend-hrms-1.onrender.com/api/employees/');
            const empData = await empResponse.json();
            setTotalEmployees(empData.length);

            // Fetch attendance for today
            const today = new Date().toISOString().split('T')[0];
            const attResponse = await fetch(`https://backend-hrms-1.onrender.com/api/attendance/by-date/?date=${today}`);
            const attData = await attResponse.json();
            
            const present = attData.filter(att => att.status === 'Present').length;
            const absent = attData.filter(att => att.status === 'Absent').length;
            
            setPresentToday(present);
            setAbsentToday(absent);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Card 1 */}
            <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-background-dark shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-[#617289] dark:text-gray-400 text-sm font-medium">Total Employees</p>
                <span className="material-symbols-outlined text-primary text-[24px]">groups</span>
              </div>
              <p className="text-[#111418] dark:text-white text-3xl font-extrabold mt-1">{loading ? '—' : totalEmployees}</p>
              <div className="flex items-center gap-1 mt-2">
                <span className="material-symbols-outlined text-[#07883b] text-[18px]">trending_up</span>
                <p className="text-[#07883b] text-xs font-bold leading-normal">Active in system</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-background-dark shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-[#617289] dark:text-gray-400 text-sm font-medium">Present Today</p>
                <span className="material-symbols-outlined text-green-500 text-[24px]">how_to_reg</span>
              </div>
              <p className="text-[#111418] dark:text-white text-3xl font-extrabold mt-1">{loading ? '—' : presentToday}</p>
              <div className="flex items-center gap-1 mt-2">
                <span className="material-symbols-outlined text-[#07883b] text-[18px]">trending_up</span>
                <p className="text-[#07883b] text-xs font-bold leading-normal">{loading ? '—' : `${totalEmployees > 0 ? Math.round((presentToday / totalEmployees) * 100) : 0}% of total`}</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-background-dark shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-[#617289] dark:text-gray-400 text-sm font-medium">Absent Today</p>
                <span className="material-symbols-outlined text-red-500 text-[24px]">person_off</span>
              </div>
              <p className="text-[#111418] dark:text-white text-3xl font-extrabold mt-1">{loading ? '—' : absentToday}</p>
              <div className="flex items-center gap-1 mt-2">
                <span className="material-symbols-outlined text-[#e73908] text-[18px]">trending_down</span>
                <p className="text-[#e73908] text-xs font-bold leading-normal">{loading ? '—' : `${totalEmployees > 0 ? Math.round((absentToday / totalEmployees) * 100) : 0}% of total`}</p>
              </div>
            </div>
          </div>
    )
}