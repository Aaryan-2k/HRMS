import { useNavigate } from 'react-router-dom';

export default function QuickActions({ onOpenForm }){
    const navigate = useNavigate();

    return(
    <div className="flex-1 flex flex-col">
              <h2 className="text-lg font-bold text-[#111418] dark:text-white mb-4">Quick Actions</h2>
              <div className="flex flex-col gap-4">
                
                {/* Action Button 1 */}
                <button 
                  onClick={onOpenForm}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all group cursor-pointer">
                  <div className="h-10 w-10 rounded-lg bg-primary text-white flex items-center justify-center shadow-md shadow-primary/20">
                    <span className="material-symbols-outlined text-[24px]">person_add</span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-[#111418] dark:text-white">Add New Employee</p>
                    <p className="text-xs text-[#617289] dark:text-gray-400">Create profile and login access</p>
                  </div>
                </button>
                
                {/* Action Button 2 */}
                <button 
                  onClick={() => navigate('/attendance')}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-background-dark hover:shadow-md transition-all group cursor-pointer">
                  <div className="h-10 w-10 rounded-lg bg-green-500 text-white flex items-center justify-center shadow-md shadow-green-500/20">
                    <span className="material-symbols-outlined text-[24px]">check_circle</span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-[#111418] dark:text-white">Mark Attendance</p>
                    <p className="text-xs text-[#617289] dark:text-gray-400">Bulk verify today's entry</p>
                  </div>
                </button>

                {/* Action Button 3 */}
                <button 
                  onClick={() => navigate('/emp/')}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-background-dark hover:shadow-md transition-all group cursor-pointer">
                  <div className="h-10 w-10 rounded-lg bg-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                    <span className="material-symbols-outlined text-[24px]">people</span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-[#111418] dark:text-white">View Employees</p>
                    <p className="text-xs text-[#617289] dark:text-gray-400">Manage all employee records</p>
                  </div>
                </button>
              </div>
            </div>
    )
}