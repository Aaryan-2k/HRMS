export default function Pagination({ currentPage, totalPages, onPageChange, itemsPerPage, totalItems }){
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= maxVisible; i++) {
                    pages.push(i);
                }
            } else if (currentPage >= totalPages - 2) {
                for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    pages.push(i);
                }
            }
        }
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="px-6 py-4 border-t border-[#dbe0e6] dark:border-[#2d394a] flex items-center justify-between">
            <p className="text-sm text-[#617289] dark:text-gray-400 font-medium">
                Showing <span className="font-bold text-[#111418] dark:text-white">{startItem}</span> to <span className="font-bold text-[#111418] dark:text-white">{endItem}</span> of <span className="font-bold text-[#111418] dark:text-white">{totalItems}</span> records
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="size-9 flex items-center justify-center rounded-lg bg-[#f0f2f4] dark:bg-[#101822] hover:bg-[#e6e9ed] dark:hover:bg-[#202d3d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              {pageNumbers.map((page) => (
                <button 
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`size-9 flex items-center justify-center rounded-lg font-medium text-sm transition-colors ${
                    currentPage === page 
                      ? 'bg-primary text-white font-bold' 
                      : 'bg-[#f0f2f4] dark:bg-[#101822] hover:bg-[#e6e9ed] dark:hover:bg-[#202d3d]'
                  }`}>
                  {page}
                </button>
              ))}
              <button 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="size-9 flex items-center justify-center rounded-lg bg-[#f0f2f4] dark:bg-[#101822] hover:bg-[#e6e9ed] dark:hover:bg-[#202d3d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
    )
}