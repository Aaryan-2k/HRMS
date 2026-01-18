export default function EmpHeader({setEmpForm}){
    return (
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-black tracking-tight">Employee Directory</h1>
            <p className="text-[#617289] dark:text-gray-400 text-sm">Manage your company's workforce in one place.</p>
          </div>
          <button onClick={()=>setEmpForm(true)} className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-6 h-11 rounded-lg transition-all shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined">add</span>
            <span>Add Employee</span>
          </button>
        </div>
    )
}