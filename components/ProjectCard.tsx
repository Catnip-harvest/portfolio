import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ZoomIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import AutoplayVideo from './AutoplayVideo';

interface ProjectCardProps {
  project: Project;
  variant?: 'lead' | 'standard' | 'index';
  onImageZoom?: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, variant = 'standard', onImageZoom }) => {
  const reduceMotion = useReducedMotion();

  if (variant === 'index') {
    return (
      <Link to={`/project/${project.id}`} className="project-index-row">
        <div>
          <span>{project.date}</span>
          <h3>{project.title}</h3>
        </div>
        <p>{project.shortDescription}</p>
        <ArrowUpRight size={20} />
      </Link>
    );
  }

  return (
    <motion.article
      className={`project-card project-card--${variant}`}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        type="button"
        className="project-card__media"
        onClick={() => onImageZoom?.(project)}
        aria-label={`Open ${project.title} media`}
      >
        {project.previewVideoUrl ? (
          <AutoplayVideo src={project.previewVideoUrl} poster={project.posterUrl || project.imageUrl} />
        ) : (
          <img
            src={project.imageUrl}
            alt={project.title}
            className={project.imageFit === 'contain' ? 'is-contain' : ''}
            loading={variant === 'lead' ? 'eager' : 'lazy'}
          />
        )}
        <span className="project-card__zoom" title="Open media">
          <ZoomIn size={18} />
        </span>
      </button>

      <div className="project-card__body">
        <div className="project-card__meta">
          <span>{project.date}</span>
          <span>{project.role}</span>
        </div>
        <h3>
          <Link to={`/project/${project.id}`}>{project.title}</Link>
        </h3>
        <p>{project.shortDescription}</p>
        <div className="project-card__footer">
          <ul aria-label="Technologies used">
            {project.tags.slice(0, variant === 'lead' ? 5 : 3).map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <Link className="text-link" to={`/project/${project.id}`}>
            Case study <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
