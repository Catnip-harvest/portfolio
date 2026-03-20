import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TypingHero from './TypingHero';
import ProjectCard from './ProjectCard';
import Certifications from './Certifications';
import Expertise from './Expertise';
import Footer from './Footer';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { Trophy, Github } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleProjectClick = (project: Project) => {
    navigate(`/project/${project.id}`, { state: { project } });
  };

  const handleViewAccomplishments = () => {
    navigate('/accomplishments');
  };

  return (
    <motion.main
        key="home-view"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        {/* Hero Section */}
        <TypingHero onViewAccomplishments={handleViewAccomplishments} />

        {/* Domain of Expertise Section */}
        <Expertise />

        {/* Projects Section */}
        <section id="projects" className="py-24 bg-slate-100 dark:bg-card/30 transition-colors duration-300">
            <div className="container mx-auto px-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
            >
                <div>
                    <span className="text-primary font-medium tracking-wide uppercase text-sm">Portfolio</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2">Featured Projects</h2>
                </div>
                <p className="text-slate-600 dark:text-slate-400 max-w-md text-right md:text-left">
                    A showcase of my technical expertise in robotics, automation, and intelligent systems.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
                {PROJECTS.map((project) => (
                <div key={project.id} className="h-full">
                    <ProjectCard project={project} onClick={handleProjectClick} />
                </div>
                ))}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                <a 
                    href="https://github.com/Catnip-harvest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-blue-600 transition-all shadow-sm w-full sm:w-auto justify-center"
                >
                    <Github size={18} /> See All Projects
                </a>
                <button 
                    onClick={handleViewAccomplishments}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-700 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm w-full sm:w-auto justify-center"
                >
                    <Trophy size={18} /> View All Accomplishments
                </button>
            </div>

            </div>
        </section>

        <Certifications />
        
        <Footer />
    </motion.main>
  );
};

export default Home;
