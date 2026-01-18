export default function EmpStats(){
    return(
        <div className="flex flex-wrap gap-6 mb-8">
              {/* Card 1: Present */}
              <div className="flex min-w-[240px] flex-1 flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-[#cfd9e7] dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[#4c6c9a] dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">Total Present Days</p>
                  <span className="material-symbols-outlined text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 p-2 rounded-lg">event_available</span>
                </div>
                <p className="text-[#0d131b] dark:text-white tracking-tight text-3xl font-bold leading-tight">182</p>
                <div className="flex items-center gap-1">
                  <span className="text-[#07883b] text-sm font-bold">+2%</span>
                  <span className="text-[#4c6c9a] dark:text-slate-500 text-xs">from last month</span>
                </div>
              </div>

              {/* Card 2: Absent */}
              <div className="flex min-w-[240px] flex-1 flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-[#cfd9e7] dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[#4c6c9a] dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">Total Absent Days</p>
                  <span className="material-symbols-outlined text-rose-500 bg-rose-50 dark:bg-rose-500/10 p-2 rounded-lg">event_busy</span>
                </div>
                <p className="text-[#0d131b] dark:text-white tracking-tight text-3xl font-bold leading-tight">4</p>
                <div className="flex items-center gap-1">
                  <span className="text-[#07883b] text-sm font-bold">+1%</span>
                  <span className="text-[#4c6c9a] dark:text-slate-500 text-xs">from last month</span>
                </div>
              </div>

              {/* Card 3: Rate */}
              <div className="flex min-w-[240px] flex-1 flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-primary/30 dark:border-primary/20 shadow-sm bg-primary/[0.02]">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[#4c6c9a] dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">Attendance Rate</p>
                  <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">analytics</span>
                </div>
                <p className="text-primary tracking-tight text-3xl font-bold leading-tight">98%</p>
                <div className="flex items-center gap-1">
                  <span className="text-[#e73908] text-sm font-bold">-1%</span>
                  <span className="text-[#4c6c9a] dark:text-slate-500 text-xs">vs. company avg</span>
                </div>
              </div>
            </div>
    )
}