import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Mic, GraduationCap, Code, ArrowRight } from 'lucide-react';
import { ACCOMPLISHMENTS } from '../constants';

interface AccomplishmentsPageProps {
  onBack: () => void;
}

const AccomplishmentsPage: React.FC<AccomplishmentsPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getIcon = (category: string) => {
    switch (category) {
      case 'Award': return <Trophy size={48} className="text-yellow-500/50" />;
      case 'Speaking': return <Mic size={48} className="text-purple-500/50" />;
      case 'Scholarship': return <GraduationCap size={48} className="text-blue-500/50" />;
      case 'Hackathon': return <Code size={48} className="text-emerald-500/50" />;
      default: return <Trophy size={48} className="text-primary/50" />;
    }
  };

  const getGradient = (category: string) => {
      switch (category) {
        case 'Award': return "from-yellow-500/20 to-orange-600/5";
        case 'Speaking': return "from-purple-500/20 to-pink-600/5";
        case 'Scholarship': return "from-blue-500/20 to-cyan-600/5";
        case 'Hackathon': return "from-emerald-500/20 to-teal-600/5";
        default: return "from-slate-500/20 to-slate-600/5";
      }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="min-h-screen bg-slate-50 dark:bg-dark transition-colors duration-300 z-50 relative pt-20"
    >
      <div className="container mx-auto px-4 py-8">
        <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors font-medium mb-8"
        >
            <ArrowLeft size={20} />
            Back to Home
        </button>

        <div className="text-center mb-16">
            <span className="text-primary font-medium tracking-wide uppercase text-sm">Honors & Activities</span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2">All Accomplishments</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
                A complete timeline of milestones, awards, and contributions.
            </p>
        </div>

        {/* Grid Layout mimicking ProjectCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {ACCOMPLISHMENTS.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative h-[300px] bg-white dark:bg-card rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700/50 hover:border-primary/50 transition-all cursor-default"
                >
                    {/* Abstract Background with Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(item.category)} opacity-50 dark:opacity-100 transition-opacity`} />
                    
                    {/* Big Watermark Icon */}
                    <div className="absolute -right-4 -top-4 opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500 rotate-12">
                        {getIcon(item.category)}
                    </div>

                    {/* Content Container */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                        <motion.div
                            className="transform transition-transform duration-300 group-hover:-translate-y-4"
                        >
                            {/* Category Badge */}
                            <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold uppercase tracking-wider bg-white/80 dark:bg-white/10 text-slate-700 dark:text-slate-200 rounded-full border border-slate-200 dark:border-white/10 backdrop-blur-sm">
                                {item.category}
                            </span>

                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 leading-tight group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-2">{item.organization} • {item.date}</p>
                                </div>
                            </div>

                             {/* Expandable Description */}
                            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                                <div className="overflow-hidden">
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AccomplishmentsPage;