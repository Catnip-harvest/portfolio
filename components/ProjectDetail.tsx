import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Calendar, Tag, Search, X } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  // Scroll to top when mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Collect all media for the gallery
  const galleryMedia = [];
  if (project.imageUrl) galleryMedia.push(project.imageUrl); // Hero image first in gallery now
  if (project.videoUrl && !project.videoUrl.includes('youtube.com/embed')) galleryMedia.push(project.videoUrl);
  if (project.secondaryImageUrl) galleryMedia.push(project.secondaryImageUrl);
  if (project.additionalMedia) galleryMedia.push(...project.additionalMedia);

  // Helper to determine media type
  const isVideo = (url: string) => url.endsWith('.mp4');

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="min-h-screen bg-white dark:bg-dark transition-colors duration-300 z-50 relative"
    >
      {/* Lightbox / Zoom Modal (Same as before) */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
            onClick={() => setSelectedMedia(null)}
          >
            <button 
                className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all z-[110]"
                onClick={() => setSelectedMedia(null)}
            >
                <X size={24} />
            </button>
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-7xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center cursor-default bg-black rounded-lg overflow-hidden border border-slate-800 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {isVideo(selectedMedia) ? (
                    <video src={selectedMedia} controls autoPlay loop className="max-w-full max-h-[90vh] object-contain" />
                ) : selectedMedia.includes('youtube.com/embed') ? (
                     <iframe 
                        src={selectedMedia} 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="w-full max-w-5xl aspect-video"
                    ></iframe>
                ) : (
                    <img src={selectedMedia} alt="Gallery view full size" className="max-w-full max-h-[90vh] object-contain" />
                )}
                 {!isVideo(selectedMedia) && !selectedMedia.includes('youtube.com/embed') && (
                     <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-2 rounded-full text-white/80 text-sm font-medium border border-white/10 flex items-center gap-2 pointer-events-none">
                         <Search size={14} /> Zoom View
                     </div>
                 )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4 transition-colors duration-300">
        <div className="container mx-auto">
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors font-medium"
            >
                <ArrowLeft size={20} />
                Back to Projects
            </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header Section: Title, Tags & Date */}
        <div className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
            <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight"
            >
                {project.title}
            </motion.h1>
            <div className="flex flex-wrap items-center gap-4">
                <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold flex items-center gap-1.5">
                            <Tag size={12} /> {tag}
                        </span>
                    ))}
                </div>
                <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
                    <Calendar size={16} />
                    <span>{project.date || '2024'}</span>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-16">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        Project Overview
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 text-xl leading-relaxed font-light">
                        {project.fullDescription}
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Technical Features</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {project.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
                                <CheckCircle2 size={24} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                                <span className="text-slate-700 dark:text-slate-200 font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Media Gallery / Main Display */}
                <div className="space-y-10">
                    {project.videoUrl?.includes('youtube.com/embed') && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">Video Demonstration</h2>
                            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 bg-black aspect-video">
                                <iframe 
                                    src={project.videoUrl} 
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    referrerPolicy="strict-origin-when-cross-origin" 
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        </div>
                    )}

                    {galleryMedia.length > 0 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">Media & Visuals</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {galleryMedia.map((media, idx) => (
                                    <motion.div 
                                        key={idx} 
                                        whileHover={{ y: -5 }}
                                        className={`group relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 cursor-pointer ${idx === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-square sm:aspect-video'}`}
                                        onClick={() => setSelectedMedia(media)}
                                    >
                                        {isVideo(media) ? (
                                            <div className="w-full h-full">
                                                <video 
                                                    src={media} 
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all opacity-0 group-hover:opacity-100">
                                                    <div className="bg-primary text-white rounded-full p-4 shadow-xl">
                                                        <Search size={24} />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-full h-full">
                                                <img 
                                                    src={media} 
                                                    alt={`Project visual ${idx + 1}`} 
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all opacity-0 group-hover:opacity-100">
                                                    <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-full px-6 py-3 shadow-2xl font-bold flex items-center gap-2">
                                                        <Search size={20} /> View Full Detail
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar Details */}
            <div className="space-y-6">
                <div className="bg-slate-50 dark:bg-slate-800/40 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700/50 shadow-sm top-24 sticky">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 pb-4 border-b border-slate-200 dark:border-slate-700/50">Details</h3>
                    
                    <div className="space-y-8">
                        <div>
                            <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 block">My Role</span>
                            <span className="text-slate-900 dark:text-white font-bold text-xl">{project.role || 'Lead Engineer'}</span>
                        </div>
                        
                        {project.collaborators && project.collaborators.length > 0 && (
                            <div>
                                <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 block">Collaborators</span>
                                <div className="flex flex-wrap gap-2">
                                    {project.collaborators.map(c => (
                                        <div key={c} className="text-slate-700 dark:text-slate-300 font-bold px-4 py-2 bg-white dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-700/50 text-sm shadow-sm">{c}</div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="pt-4">
                            <div className="flex flex-col gap-3">
                                {project.id === 'capstone' && (
                                    <a href="https://github.com/Catnip-harvest" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white p-4 rounded-2xl font-bold hover:scale-[1.02] transition-transform">
                                        <Github size={20} /> Source Code
                                    </a>
                                )}
                                <a href="https://www.linkedin.com/in/vi%E1%BB%87t-ho%C3%A0ng-20324a234/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-primary/10 text-primary p-4 rounded-2xl font-bold border border-primary/20 hover:bg-primary/20 transition-all">
                                    Discuss on LinkedIn <ExternalLink size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;