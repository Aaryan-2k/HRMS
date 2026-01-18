export default function AttebdanceHistoryTable(){
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-[#e7ecf3] dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 py-5 border-b border-[#e7ecf3] dark:border-slate-800 gap-4">
                <h2 className="text-[#0d131b] dark:text-white text-lg font-bold">Attendance History</h2>
                <div className="flex gap-2">
                  <div className="relative">
                    <select className="appearance-none bg-[#e7ecf3] dark:bg-slate-800 border-none rounded-lg text-sm font-medium py-2 pl-4 pr-10 focus:ring-1 focus:ring-primary cursor-pointer text-[#0d131b] dark:text-white">
                      <option>October 2023</option>
                      <option>September 2023</option>
                      <option>August 2023</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">expand_more</span>
                  </div>
                  <button className="bg-[#e7ecf3] dark:bg-slate-800 p-2 rounded-lg text-[#4c6c9a] dark:text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">filter_list</span>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-[#e7ecf3] dark:border-slate-800">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-[#4c6c9a] dark:text-slate-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-[#4c6c9a] dark:text-slate-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e7ecf3] dark:divide-slate-800">
                    {/* Row 1 */}
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#0d131b] dark:text-slate-200">Oct 26, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400">
                          Present
                        </span>
                      </td>
                    </tr>
                    {/* Row 2 */}
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#0d131b] dark:text-slate-200">Oct 25, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400">
                          Leave
                        </span>
                      </td>
                    </tr>
                    {/* Row 3 */}
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#0d131b] dark:text-slate-200">Oct 24, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-500/10 dark:text-rose-400">
                          Absent
                        </span>
                      </td>
                    </tr>
                    {/* Row 4 */}
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#0d131b] dark:text-slate-200">Oct 23, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400">
                          Present
                        </span>
                      </td>
                    </tr>
                    {/* Row 5 */}
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#0d131b] dark:text-slate-200">Oct 20, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400">
                          Present
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
    )
}