import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MEAL_PLAN_DATA } from './data';
import { MealCard } from './components/MealCard';
import { DaySelector } from './components/DaySelector';

export default function App() {
  const [currentDay, setCurrentDay] = useState(1);
  const totalDays = 30;
  
  const currentPlan = MEAL_PLAN_DATA.find(p => p.day === currentDay) || MEAL_PLAN_DATA[0];

  const nextDay = () => setCurrentDay(prev => Math.min(prev + 1, totalDays));
  const prevDay = () => setCurrentDay(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-white text-slate-900 py-10 px-6 md:px-10" id="app-container">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">MealPlan 30</h1>
            <p className="text-slate-500 mt-1 font-medium">Rencana Nutrisi Harian Tanpa Repot</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black mb-2 px-1">Status Program</span>
            <div className="flex items-center">
              <div className="h-2 w-32 md:w-48 bg-slate-100 rounded-full mr-3 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentDay / totalDays) * 100}%` }}
                  className="h-full bg-emerald-500 rounded-full"
                />
              </div>
              <span className="text-sm font-semibold text-emerald-600 tabular-nums">
                Hari {currentDay.toString().padStart(2, '0')} / {totalDays}
              </span>
            </div>
          </div>
        </header>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <button 
              onClick={prevDay}
              disabled={currentDay === 1}
              className="p-2 text-slate-400 hover:text-slate-900 disabled:opacity-20 transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button 
              onClick={nextDay}
              disabled={currentDay === totalDays}
              className="p-2 text-slate-400 hover:text-slate-900 disabled:opacity-20 transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
          
          <div className="text-xs font-bold uppercase tracking-widest text-slate-300">
            Menu Harian Indonesia
          </div>
        </div>

        {/* Day Selector */}
        <section className="mb-12">
          <DaySelector 
            currentDay={currentDay} 
            totalDays={totalDays} 
            onSelect={setCurrentDay} 
          />
        </section>

        {/* Daily Menu Grid */}
        <main className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDay}
              className="contents"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {currentPlan.meals.map((meal, index) => (
                <MealCard key={meal.type} meal={meal} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer Info */}
        <footer className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400">
          <div className="flex space-x-6">
            <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Protein Tinggi</span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>Karbo Terukur</span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              <span>Lemak Sehat</span>
            </div>
          </div>
          <div className="text-xs font-bold uppercase tracking-widest text-slate-300">
            Pencapaian: Nutrisi Seimbang
          </div>
        </footer>
      </div>
    </div>
  );
}
