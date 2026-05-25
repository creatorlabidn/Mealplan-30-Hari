import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface DaySelectorProps {
  currentDay: number;
  totalDays: number;
  onSelect: (day: number) => void;
}

export const DaySelector: React.FC<DaySelectorProps> = ({ currentDay, totalDays, onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeBtn = containerRef.current?.querySelector(`[data-day="${currentDay}"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [currentDay]);

  return (
    <div className="relative group">
      <div 
        ref={containerRef}
        className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x px-4 md:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
          <button
            key={day}
            data-day={day}
            onClick={() => onSelect(day)}
            className={`
              relative flex-shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 snap-center border
              ${currentDay === day 
                ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200 scale-105 z-10' 
                : 'bg-white text-slate-400 border-slate-100 hover:bg-slate-50 hover:text-slate-900'
              }
            `}
            id={`day-btn-${day}`}
          >
            <span className={`text-[9px] uppercase font-bold tracking-tighter opacity-70 mb-0.5 ${currentDay === day ? 'text-slate-300' : 'text-slate-400'}`}>
              Hari
            </span>
            <span className="text-xl font-bold">
              {day.toString().padStart(2, '0')}
            </span>
          </button>
        ))}
      </div>
      
      {/* Gradients to indicate scroll */}
      <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-gray-50/50 to-transparent pointer-events-none md:hidden" />
      <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-gray-50/50 to-transparent pointer-events-none md:hidden" />
    </div>
  );
}
