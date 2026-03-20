import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 transition-colors duration-300">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Hoang Quoc Viet</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Robot Engineer. Automation Specialist.</p>
        </div>
        
        <div className="flex gap-6">
          <a href="https://github.com/Catnip-harvest" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors transform hover:scale-110">
            <Github size={24} />
          </a>
          <a href="https://www.linkedin.com/in/vi%E1%BB%87t-ho%C3%A0ng-20324a234/" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors transform hover:scale-110">
            <Linkedin size={24} />
          </a>
          <a href="mailto:84.viethoang@gmail.com" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors transform hover:scale-110">
            <Mail size={24} />
          </a>
        </div>
        
        <div className="text-slate-500 dark:text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;