import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TypingHero from './TypingHero';
import ProjectCard from './ProjectCard';
import Certifications from './Certifications';
import Accomplishments from './Accomplishments';
import Expertise from './Expertise';
import Footer from './Footer';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { Trophy, Github, X, ZoomIn } from 'lucide-react';

type ZoomedProjectMedia = {
  project: Project;
  media: string[];
  index: number;
};

const getProjectMedia = (project: Project) => {
  const media = [project.imageUrl];

  if (project.videoUrl && !project.videoUrl.includes('youtube.com/embed')) {
    media.push(project.videoUrl);
  }

  if (project.secondaryImageUrl) {
    media.push(project.secondaryImageUrl);
  }

  if (project.additionalMedia) {
    media.push(...project.additionalMedia);
  }

  return media.filter(Boolean);
};

const isVideo = (url: string) => url.endsWith('.mp4') || url.endsWith('.gif');

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [zoomedMedia, setZoomedMedia] = useState<ZoomedProjectMedia | null>(null);

  const handleProjectClick = (project: Project) => {
    navigate(`/project/${project.id}`, { state: { project } });
  };

  const handleProjectMediaZoom = (project: Project) => {
    setZoomedMedia({ project, media: getProjectMedia(project), index: 0 });
  };

  const setMediaIndex = (index: number) => {
    setZoomedMedia((current) => {
      if (!current) return current;
      return { ...current, index };
    });
  };



  return (
    <motion.main
        key="home-view"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        {/* Hero Section */}
        <TypingHero />

        {/* Domain of Expertise Section */}
        <Expertise />

        <Accomplishments />

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
                    <ProjectCard project={project} onClick={handleProjectClick} onImageZoom={handleProjectMediaZoom} />
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
                <a 
                    href="#accomplishments"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-700 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm w-full sm:w-auto justify-center"
                >
                    <Trophy size={18} /> View All Accomplishments
                </a>
            </div>

            </div>
        </section>

        <Certifications />
        
        <Footer />

        <AnimatePresence>
            {zoomedMedia && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/90 p-4 md:p-8 flex items-center justify-center"
                    onClick={() => setZoomedMedia(null)}
                >
                    <button
                        type="button"
                        onClick={() => setZoomedMedia(null)}
                        className="absolute right-4 top-4 md:right-6 md:top-6 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                        aria-label="Close image preview"
                    >
                        <X size={22} />
                    </button>
                    <motion.div
                        initial={{ scale: 0.98 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.98 }}
                        className="w-full max-w-6xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="mb-3 flex items-center justify-between gap-3 text-white">
                            <div>
                                <p className="text-sm text-white/60">Featured work media</p>
                                <h3 className="text-xl font-semibold">{zoomedMedia.project.title}</h3>
                            </div>
                            <div className="hidden sm:flex items-center gap-2 text-sm text-white/70">
                                <ZoomIn size={16} /> Opened large
                            </div>
                        </div>
                        <div className="max-h-[72vh] overflow-auto rounded-lg bg-black border border-white/10">
                            {isVideo(zoomedMedia.media[zoomedMedia.index]) ? (
                                <video
                                    src={zoomedMedia.media[zoomedMedia.index]}
                                    controls
                                    autoPlay
                                    loop
                                    muted
                                    className="mx-auto max-h-[72vh] max-w-full object-contain"
                                />
                            ) : (
                                <img
                                    src={zoomedMedia.media[zoomedMedia.index]}
                                    alt={zoomedMedia.project.title}
                                    className="mx-auto h-auto max-h-none w-auto max-w-none object-contain"
                                />
                            )}
                        </div>
                        {zoomedMedia.media.length > 1 && (
                            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                                {zoomedMedia.media.map((media, index) => (
                                    <button
                                        type="button"
                                        key={media}
                                        onClick={() => setMediaIndex(index)}
                                        className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border bg-black ${
                                            index === zoomedMedia.index ? 'border-primary' : 'border-white/20'
                                        }`}
                                        aria-label={`View media ${index + 1}`}
                                    >
                                        {isVideo(media) ? (
                                            <video src={media} muted className="h-full w-full object-cover" />
                                        ) : (
                                            <img src={media} alt="" className="h-full w-full object-cover" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.main>
  );
};

export default Home;
