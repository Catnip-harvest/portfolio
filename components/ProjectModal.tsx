import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { X, ExternalLink, Github, CheckCircle2 } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        
        <motion.div
          layoutId={`card-${project.id}`}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-card w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-slate-700 flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Image */}
          <div className="relative h-64 shrink-0">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-white hover:text-black transition-colors"
            >
              <X size={20} />
            </button>
            <div className="absolute bottom-4 left-6">
                <h2 className="text-3xl font-bold text-white drop-shadow-md">{project.title}</h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              {project.fullDescription}
            </p>

            <div className="bg-slate-800/50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Key Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-400">
                    <CheckCircle2 size={18} className="text-emerald-400 mt-1 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              {project.demoUrl && (
                <a 
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  <ExternalLink size={20} />
                  Live Demo
                </a>
              )}
              {project.repoUrl && (
                <a 
                  href={project.repoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-medium"
                >
                  <Github size={20} />
                  View Code
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;