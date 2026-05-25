import React from 'react';
import { motion } from 'motion/react';
import { Meal } from '../types';

interface MealCardProps {
  meal: Meal;
  index: number;
}

export const MealCard: React.FC<MealCardProps> = ({ meal, index }) => {
  const emoji = meal.type === 'Sarapan' ? '🍳' : meal.type === 'Makan Siang' ? '🥗' : '🍲';
  const kcal = meal.type === 'Sarapan' ? '320' : meal.type === 'Makan Siang' ? '540' : '280';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-slate-50 rounded-[40px] p-8 flex flex-col border border-transparent hover:border-emerald-200 transition-all group"
      id={`meal-card-${meal.type.toLowerCase().replace(' ', '-')}`}
    >
      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <span className="text-xl">{emoji}</span>
      </div>

      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-2">
        {meal.type}
      </span>

      <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-4">
        {meal.title}
      </h2>

      <p className="text-slate-500 text-sm leading-relaxed mb-6">
        {meal.description}
      </p>

      <div className="mt-auto pt-6 border-t border-slate-200 flex justify-between items-center">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Est. {kcal} Kcal
        </span>
        <div className="h-2 w-2 bg-emerald-500 rounded-full"></div>
      </div>
    </motion.div>
  );
};
