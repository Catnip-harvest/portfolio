import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { ArrowRight, ZoomIn } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  onImageZoom?: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onImageZoom }) => {
  const handleZoom = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onImageZoom?.(project);
  };

  return (
    <Link to={`/project/${project.id}`} className="block h-full">
      <motion.div
        layoutId={`card-${project.id}`}
        className="group h-full w-full bg-white dark:bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md cursor-pointer border border-slate-200 dark:border-slate-800 transition-shadow"
      >
        <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="h-full w-full object-contain p-2"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
                <span className="text-slate-500 font-medium">No Image</span>
            </div>
          )}

          {project.imageUrl && (
            <button
              type="button"
              onClick={handleZoom}
              className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/95 text-slate-800 shadow-sm border border-slate-200 hover:bg-white hover:text-primary transition-colors"
              aria-label={`View ${project.title} image`}
              title="View image"
            >
              <ZoomIn size={18} />
            </button>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors mb-3">
            {project.title}
          </h3>

          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.videoUrl && (
              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded border border-primary/20 font-medium">
                Video
              </span>
            )}
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-primary text-sm font-semibold">
            View Project Details <ArrowRight size={16} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;
