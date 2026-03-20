import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link to={`/project/${project.id}`} className="block h-full">
      <motion.div
        layoutId={`card-${project.id}`}
        className="group relative h-[400px] w-full bg-card rounded-2xl overflow-hidden shadow-xl cursor-pointer border border-slate-800"
      >
        {/* Background Image */}
        {project.imageUrl ? (
          <motion.img 
            src={project.imageUrl} 
            alt={project.title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-slate-800 transition-transform duration-700 group-hover:scale-110 flex items-center justify-center">
              <span className="text-slate-600 font-medium">No Image</span>
          </div>
        )}
        
        {/* Gradient Overlay - Always visible but stronger at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent/20 opacity-90 transition-opacity duration-300" />

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <motion.div
             className="transform transition-transform duration-300 group-hover:-translate-y-2"
          >
              <div className="flex justify-between items-center mb-3">
                  <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                      {project.title}
                  </h3>
              </div>

              {/* Tags - Always visible */}
              <div className="flex flex-wrap gap-2 mb-2">
                  {project.videoUrl && (
                      <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded border border-primary/30 backdrop-blur-sm font-medium">
                          Video
                      </span>
                  )}
                  {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 bg-white/10 text-slate-200 rounded border border-white/10 backdrop-blur-sm">
                          {tag}
                      </span>
                  ))}
              </div>

              {/* Expandable Description */}
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                  <div className="overflow-hidden">
                      <p className="text-slate-300 text-sm leading-relaxed mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {project.shortDescription}
                      </p>
                      <div className="flex items-center gap-2 text-primary text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                          View Project Details <ArrowRight size={16} />
                      </div>
                  </div>
              </div>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;