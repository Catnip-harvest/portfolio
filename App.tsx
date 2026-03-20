import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import Home from './components/Home';
import ProjectDetailWrapper from './components/ProjectDetailWrapper';
import { Layers, Menu, X, Sun, Moon } from 'lucide-react';

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark text-slate-900 dark:text-slate-200 font-sans selection:bg-primary/30 transition-colors duration-300">
      
      {/* Navigation (Sticky) */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="text-primary" />
            <span>vizhoang</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
              <li><Link to="/" className="hover:text-primary dark:hover:text-primary transition-colors">Home</Link></li>
            </ul>

            <div className="flex items-center gap-4 border-l border-slate-200 dark:border-slate-700 pl-6">
                 {/* Theme Toggle */}
                <button 
                    onClick={toggleTheme} 
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
                    aria-label="Toggle Theme"
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <a href="mailto:84.viethoang@gmail.com" className="px-5 py-2 text-sm bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20">
                    Contact
                </a>
            </div>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
            >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="text-slate-900 dark:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
            <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="md:hidden bg-white dark:bg-dark border-b border-slate-200 dark:border-slate-800 overflow-hidden"
            >
                <ul className="flex flex-col p-4 gap-4 text-center text-slate-700 dark:text-slate-300">
                    <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
                    <li><a href="mailto:84.viethoang@gmail.com" className="text-primary font-medium">Contact</a></li>
                </ul>
            </motion.div>
        )}
      </nav>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetailWrapper />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;