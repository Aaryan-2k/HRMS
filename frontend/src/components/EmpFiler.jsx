import { useState, useEffect, useRef } from "react";

export default function EmpFilter({ searchQuery, setSearchQuery, selectedDepartment, setSelectedDepartment, departments, onSearch }){
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleSearchClick = () => {
        onSearch();
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="bg-white dark:bg-[#1a2432] p-4 rounded-xl border border-[#dbe0e6] dark:border-[#2d394a] mb-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <label className="relative flex items-center gap-2">
              <span className="absolute left-4 material-symbols-outlined text-[#617289]">search</span>
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
                className="w-full h-11 pl-12 pr-4 bg-[#f0f2f4] dark:bg-[#101822] border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/30 transition-shadow" 
                placeholder="Search employees by name, ID or email..." 
                type="text" 
              />
              <button 
                onClick={handleSearchClick}
                className="flex items-center gap-2 px-4 h-11 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors shrink-0">
                <span className="material-symbols-outlined text-sm">search</span>
                <span>Search</span>
              </button>
            </label>
          </div>
          <div className="relative w-48" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between gap-2 px-4 h-11 bg-[#f0f2f4] dark:bg-[#101822] rounded-lg text-sm font-medium hover:bg-[#e6e9ed] dark:hover:bg-[#202d3d] transition-colors w-full">
              <span className="truncate">{selectedDepartment}</span>
              <span className={`material-symbols-outlined text-xs shrink-0 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>keyboard_arrow_down</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-[#1a2432] border border-[#dbe0e6] dark:border-[#2d394a] rounded-lg shadow-lg z-10">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => {
                      setSelectedDepartment(dept);
                      setIsDropdownOpen(false);
                      onSearch(dept);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-primary/10 transition-colors truncate ${
                      selectedDepartment === dept 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-[#617289] dark:text-[#a5b0bf]'
                    }`}>
                    {dept}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
    )
}