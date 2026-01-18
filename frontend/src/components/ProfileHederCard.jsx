export default function ProfileHeaderCard({ user }) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-[#e7ecf3] dark:border-slate-800 shadow-sm p-6 mb-8">
              <div className="flex flex-col @container">
                <div className="flex w-full flex-col gap-6 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
                  <div className="flex gap-6 items-center">
                    <div 
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-xl size-24 border-2 border-white dark:border-slate-800 shadow-sm" 
                      style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/0858e925-1e4e-4e89-9c59-7104e76d9189.png")' }}
                    ></div>
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-2">
                        <p className="text-[#0d131b] dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em]">John Doe</p>
                        <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Active</span>
                      </div>
                      <p className="text-[#4c6c9a] dark:text-slate-400 text-sm font-medium mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">id_card</span> Employee ID: #EMP-402
                      </p>
                      <p className="text-[#4c6c9a] dark:text-slate-400 text-sm font-medium mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">lan</span> Product Design Department
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full max-w-[480px] gap-3 @[480px]:w-auto">
                    <button className="flex min-w-[120px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-[#e7ecf3] dark:bg-slate-800 text-[#0d131b] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#cfd9e7] dark:hover:bg-slate-700 transition-colors">
                      <span className="material-symbols-outlined text-lg">arrow_back</span>
                      <span className="truncate">Back to List</span>
                    </button>
                    <button className="flex min-w-[120px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors shadow-md shadow-primary/20">
                      <span className="material-symbols-outlined text-lg">download</span>
                      <span className="truncate">Export Report</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
    )
}