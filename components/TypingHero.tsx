import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { HERO_TITLES } from '../constants';
import { Github, Linkedin, Mail, ArrowDown, Bot, Trophy } from 'lucide-react';

interface TypingHeroProps {
  onViewAccomplishments: () => void;
}

const TypingHero: React.FC<TypingHeroProps> = ({ onViewAccomplishments }) => {
  const [text, setText] = useState('');
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(150);

  const tick = useCallback(() => {
    let i = loopNum % HERO_TITLES.length;
    let fullText = HERO_TITLES[i];
    let updatedText = isDeleting 
      ? fullText.substring(0, text.length - 1) 
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(60); 
    } else {
      setDelta(150);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(2000); 
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500); 
    }
  }, [loopNum, isDeleting, text]);

  useEffect(() => {
    // Use window.setTimeout to avoid Node.js/Browser type conflict
    const ticker = window.setTimeout(() => {
      tick();
    }, delta);

    return () => window.clearTimeout(ticker);
  }, [tick, delta]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-slate-50 dark:bg-dark overflow-hidden pt-20 pb-10 transition-colors duration-300">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 z-10 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
        
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl lg:text-left text-center flex-1"
        >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200/50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-blue-600 dark:text-cyan-400 text-sm font-medium mb-8 backdrop-blur-sm">
              <Bot size={16} /> 
              <span>Robotics & AI Engineering</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white leading-tight mb-6 transition-colors duration-300">
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-blue-600">
                Hoang Quoc Viet
              </span>
            </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="h-12 mb-8 flex items-center lg:justify-start justify-center"
          >
             <span className="text-xl md:text-3xl text-slate-600 dark:text-slate-300 font-mono transition-colors duration-300 flex items-center">
               <span className="text-primary font-semibold">{text}</span>
               <span className="inline-block w-[3px] h-[1em] bg-slate-500/50 dark:bg-slate-400/50 animate-cursor-blink ml-1"></span>
             </span>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10 transition-colors duration-300"
          >
            Specializing in the intersection of AI, Blockchain security, and Robotics. 
            Passionate about designing intelligent, secure systems and leveraging advanced data analytics to build next-generation automated solutions.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4"
          >
            <a href="#projects" className="px-8 py-4 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-500/20 w-full sm:w-auto text-center">
              View Projects
            </a>
            <button 
                onClick={onViewAccomplishments}
                className="px-8 py-4 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-white font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2 w-full sm:w-auto shadow-sm"
            >
              <Trophy size={20} /> See all licenses & certifications
            </button>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.9 }}
             className="flex lg:justify-start justify-center gap-6 mt-12"
          >
             {[
               { Icon: Github, href: 'https://github.com/Catnip-harvest' },
               { Icon: Linkedin, href: 'https://www.linkedin.com/in/vi%E1%BB%87t-ho%C3%A0ng-20324a234/' },
               { Icon: Mail, href: 'mailto:84.viethoang@gmail.com' }
             ].map(({ Icon, href }, idx) => (
               <a 
                 key={idx} 
                 href={href} 
                 target={href.startsWith('http') ? "_blank" : undefined}
                 rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                 className="p-3 bg-white dark:bg-slate-800/50 rounded-full text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white hover:bg-slate-100 dark:hover:bg-primary/20 hover:scale-110 transition-all border border-slate-200 dark:border-slate-700/50 shadow-sm"
               >
                 <Icon size={24} />
               </a>
             ))}
          </motion.div>
        </motion.div>

        {/* Image Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl flex-1 hidden md:block"
        >
          {/* Creative Background Shape */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 dark:from-cyan-400/20 dark:to-blue-600/20 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-xl transition-all duration-1000 hover:rounded-[60%_40%_30%_70%/60%_30%_70%_40%]"></div>
          <div className="absolute inset-0 bg-gradient-to-bl from-primary/20 to-transparent rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-xl transition-all duration-1000 hover:rounded-[40%_60%_70%_30%/40%_50%_60%_50%]"></div>
          
          {/* Profile Image */}
          <div className="relative z-10 w-full aspect-square flex items-end justify-center">
             {/* Replace this src with the actual uploaded image path */}
             <img 
               src="/profile-picture.png" 
               alt="Hoang Quoc Viet" 
               className="w-[85%] h-auto object-contain drop-shadow-2xl"
             />
          </div>
          
          {/* Floating Badges */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute top-1/4 -left-4 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 z-20"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Bot size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Focus</p>
              <p className="text-sm font-bold text-slate-800 dark:text-white">Robotics</p>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute bottom-1/4 -right-4 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 z-20"
          >
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Trophy size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Experience</p>
              <p className="text-sm font-bold text-slate-800 dark:text-white">2+ Years</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-500"
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
};

export default TypingHero;