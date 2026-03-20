import React from 'react';
import { motion } from 'framer-motion';

const EXPERTISE_AREAS = [
  { name: 'Hardware Design', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30', border: 'border-blue-200 dark:border-blue-800' },
  { name: 'CAD', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-100 dark:bg-indigo-900/30', border: 'border-indigo-200 dark:border-indigo-800' },
  { name: 'Microcontroller', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30', border: 'border-emerald-200 dark:border-emerald-800' },
  { name: 'PLC', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/30', border: 'border-orange-200 dark:border-orange-800' },
  { name: 'AI', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30', border: 'border-purple-200 dark:border-purple-800' },
  { name: 'Computer Vision', color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-100 dark:bg-cyan-900/30', border: 'border-cyan-200 dark:border-cyan-800' },
  { name: 'Digital Twin', color: 'text-pink-600 dark:text-pink-400', bg: 'bg-pink-100 dark:bg-pink-900/30', border: 'border-pink-200 dark:border-pink-800' },
];

const Expertise: React.FC = () => {
  return (
    <section id="expertise" className="py-6 bg-white dark:bg-card/30 transition-colors duration-300 relative overflow-hidden border-y border-slate-100 dark:border-slate-800/50">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <span className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider shrink-0">Domain of Expertise:</span>
          <div className="flex flex-wrap justify-center gap-2">
            {EXPERTISE_AREAS.map((area, index) => (
              <motion.span
                key={area.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`px-3 py-1 rounded-full border ${area.bg} ${area.border} ${area.color} text-xs font-semibold cursor-default shadow-sm`}
              >
                {area.name}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
