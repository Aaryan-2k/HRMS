import { NavLink } from "react-router-dom";

export default function SideBar() {
  const baseClasses = "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors";
  const activeClasses = "text-[#136dec] bg-[rgba(19,109,236,0.1)] group font-semibold";
  const inactiveClasses = "text-[#617289] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium";

  return (
    <aside className="w-64 border-r border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-background-dark flex flex-col shrink-0">
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-primary rounded-lg size-10 flex items-center justify-center text-white">
            <span className="material-symbols-outlined">corporate_fare</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[#111418] dark:text-white text-base font-bold leading-none">HRMS Lite</h1>
            <p className="text-[#617289] dark:text-gray-400 text-xs mt-1">Admin Portal</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
            }>
            <span className="material-symbols-outlined text-[24px]">dashboard</span>
            <span className="text-sm">Dashboard</span>
          </NavLink>

          <NavLink
            to="/emp/"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
            }>
            <span className="material-symbols-outlined text-[24px]">group</span>
            <span className="text-sm">Employees</span>
          </NavLink>

          <NavLink
            to="/attendance"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
            }
          >
            <span className="material-symbols-outlined text-[24px]">schedule</span>
            <span className="text-sm">Attendance</span>
          </NavLink>
        </nav>
        </div>
    </aside>
  );
}