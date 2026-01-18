import React, { useState } from 'react';

export default function Calendar({onDateSelect, onMarkAllPresent}){
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };
    
    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };
    
    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };
    
    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };
    
    const handleToday = () => {
        const today = new Date();
        setCurrentDate(today);
        setSelectedDate(today);
        if (onDateSelect) onDateSelect(today);
    };
    
    const handleDateClick = (day) => {
        const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(selected);
        if (onDateSelect) onDateSelect(selected);
    };
    
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const today = new Date();
    const isCurrentMonth = currentDate.getMonth() === today.getMonth() && 
                          currentDate.getFullYear() === today.getFullYear();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    return (
        <aside className="w-full lg:w-80 flex flex-col gap-4 shrink-0">
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-[#cfd9e7] dark:border-slate-700 overflow-hidden">
                  <div className="p-4 border-b border-[#e7ecf3] dark:border-slate-700">
                    <h3 className="font-bold text-sm text-[#0d131b] dark:text-slate-200">Select Date</h3>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center p-1 justify-between mb-2">
                      <button onClick={handlePrevMonth} className="hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg p-2 transition-colors">
                        <span className="material-symbols-outlined !text-lg">chevron_left</span>
                      </button>
                      <p className="text-[#0d131b] dark:text-slate-200 text-sm font-bold leading-tight flex-1 text-center">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</p>
                      <button onClick={handleNextMonth} className="hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg p-2 transition-colors">
                        <span className="material-symbols-outlined !text-lg">chevron_right</span>
                      </button>
                    </div>
                    
                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 mb-1">
                      <p className="text-[#4c6c9a] text-[11px] font-bold text-center py-2">S</p>
                      <p className="text-[#4c6c9a] text-[11px] font-bold text-center py-2">M</p>
                      <p className="text-[#4c6c9a] text-[11px] font-bold text-center py-2">T</p>
                      <p className="text-[#4c6c9a] text-[11px] font-bold text-center py-2">W</p>
                      <p className="text-[#4c6c9a] text-[11px] font-bold text-center py-2">T</p>
                      <p className="text-[#4c6c9a] text-[11px] font-bold text-center py-2">F</p>
                      <p className="text-[#4c6c9a] text-[11px] font-bold text-center py-2">S</p>
                      
                      {/* Calendar Days */}
                      {days.map((day, index) => {
                        const isSelected = day && 
                          selectedDate.getDate() === day &&
                          selectedDate.getMonth() === currentDate.getMonth() &&
                          selectedDate.getFullYear() === currentDate.getFullYear();
                        
                        const isToday = isCurrentMonth && day === today.getDate();
                        
                        return (
                          <div key={index} className="flex justify-center py-1">
                            {day ? (
                              <button 
                                onClick={() => handleDateClick(day)}
                                className={`size-8 text-xs font-medium rounded-lg transition-colors ${
                                  isSelected
                                    ? 'bg-primary text-white font-bold shadow-sm shadow-primary/30'
                                    : isToday
                                    ? 'bg-primary/20 text-primary font-bold'
                                    : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                                }`}
                              >
                                {day}
                              </button>
                            ) : (
                              <span></span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <button onClick={handleToday} className="w-full mt-4 text-xs font-bold text-primary py-2 px-4 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                      Go to Today
                    </button>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-5 border border-primary/20">
                  <h4 className="font-bold text-sm text-primary mb-2">Quick Actions</h4>
                  <div className="flex flex-col gap-2">
                    <button onClick={onMarkAllPresent} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined !text-lg">done_all</span>
                      Mark All Present
                    </button>
                    <button className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined !text-lg">history</span>
                      View Leave Policy
                    </button>
                  </div>
                </div>
              </aside>
    )
}