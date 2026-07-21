import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Check, Github, Play, ZoomIn } from 'lucide-react';
import { Project } from '../types';
import { getMediaPreview, getProjectMedia, isVideoMedia } from '../lib/media';
import AutoplayVideo from './AutoplayVideo';
import MediaLightbox, { MediaLightboxState } from './MediaLightbox';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const reduceMotion = useReducedMotion();
  const [lightbox, setLightbox] = useState<MediaLightboxState | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [project.id]);

  const galleryMedia = useMemo(() => {
    return getProjectMedia(project);
  }, [project]);

  const heroMediaIndex = project.previewVideoUrl ? galleryMedia.indexOf(project.previewVideoUrl) : galleryMedia.indexOf(project.imageUrl);

  const openMedia = useCallback((index: number) => {
    setLightbox({ title: project.title, media: galleryMedia, index });
  }, [galleryMedia, project.title]);

  const setMediaIndex = useCallback((index: number) => {
    setLightbox((current) => (current ? { ...current, index } : current));
  }, []);

  return (
    <motion.main
      className="project-page"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="project-page__inner">
        <button type="button" className="project-back" onClick={onBack}>
          <ArrowLeft size={18} /> Selected work
        </button>

        <header className="project-detail-header">
          <div>
            <p>{project.date}</p>
            <h1>{project.title}</h1>
          </div>
          <p>{project.shortDescription}</p>
        </header>

        <button type="button" className="project-detail-hero" onClick={() => openMedia(Math.max(0, heroMediaIndex))} aria-label="Open project media">
          {project.previewVideoUrl ? (
            <AutoplayVideo src={project.previewVideoUrl} poster={project.posterUrl || project.imageUrl} />
          ) : (
            <img
              src={project.imageUrl}
              alt={project.title}
              className={project.imageFit === 'contain' ? 'is-contain' : ''}
            />
          )}
          <span title="Open media"><ZoomIn size={19} /></span>
        </button>

        <div className="project-detail-layout">
          <article className="project-detail-copy">
            <section>
              <h2>The system</h2>
              <p>{project.fullDescription}</p>
            </section>

            {project.impact && (
              <blockquote>
                <p>{project.impact}</p>
              </blockquote>
            )}

            <section>
              <h2>Engineering scope</h2>
              <ul className="feature-list">
                {project.features.map((feature) => (
                  <li key={feature}>
                    <Check size={18} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            {project.videoUrl?.includes('youtube.com/embed') && (
              <section>
                <h2>Demonstration</h2>
                <div className="video-frame">
                  <iframe
                    src={project.videoUrl}
                    title={`${project.title} demonstration`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </section>
            )}

            {galleryMedia.length > 1 && (
              <section>
                <h2>Build media</h2>
                <div className="project-gallery">
                  {galleryMedia.filter((_, index) => index !== heroMediaIndex).map((media) => (
                    <button
                      type="button"
                      key={media}
                      onClick={() => openMedia(galleryMedia.indexOf(media))}
                      aria-label={`Open ${project.title} media`}
                    >
                      {isVideoMedia(media) ? (
                        <AutoplayVideo src={media} poster={getMediaPreview(media)} />
                      ) : (
                        <img src={getMediaPreview(media)} alt={`${project.title} build view`} loading="lazy" />
                      )}
                      <span title="Open media"><ZoomIn size={17} /></span>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </article>

          <aside className="project-detail-facts" aria-label="Project facts">
            <dl>
              <div>
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>Timeline</dt>
                <dd>{project.date}</dd>
              </div>
              {project.collaborators && project.collaborators.length > 0 && (
                <div>
                  <dt>Collaborators</dt>
                  <dd>{project.collaborators.join(', ')}</dd>
                </div>
              )}
              <div>
                <dt>Tools</dt>
                <dd>{project.tags.join(', ')}</dd>
              </div>
            </dl>

            <div className="project-detail-links">
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <Play size={18} /> Watch full demo <ArrowUpRight size={15} />
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github size={18} /> Source code <ArrowUpRight size={15} />
                </a>
              )}
              <a
                href="https://www.linkedin.com/in/vi%E1%BB%87t-ho%C3%A0ng-20324a234/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discuss the project <ArrowUpRight size={15} />
              </a>
            </div>
          </aside>
        </div>
      </div>

      <MediaLightbox
        state={lightbox}
        onClose={() => setLightbox(null)}
        onIndexChange={setMediaIndex}
      />
    </motion.main>
  );
};

export default ProjectDetail;
