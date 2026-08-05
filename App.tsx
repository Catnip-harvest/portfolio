import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import Home from './components/Home';
import ProjectDetailWrapper from './components/ProjectDetailWrapper';

const getInitialTheme = () => {
  const savedTheme = window.localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const homePrefix = location.pathname === '/' ? '' : '/';
  const navigation = [
    { label: 'Work', href: `${homePrefix}#work` },
    { label: 'Notes', href: `${homePrefix}#now` },
    { label: 'Recognition', href: `${homePrefix}#recognition` },
    { label: 'About', href: `${homePrefix}#about` },
  ];

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <Link className="wordmark" to="/" aria-label="Hoang Quoc Viet, home">
            <span className="wordmark__name">Hoang Quoc Viet</span>
            <span className="wordmark__role">Builder</span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
            <a className="button button--small button--primary" href="mailto:84.viethoang@gmail.com">
              Contact
            </a>
            <button
              type="button"
              className="icon-button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>

          <div className="mobile-nav-controls">
            <button
              type="button"
              className="icon-button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              type="button"
              className="icon-button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              className="mobile-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              aria-label="Mobile navigation"
            >
              {navigation.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                  {item.label}
                </a>
              ))}
              <a href="mailto:84.viethoang@gmail.com" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

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
