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
      className="min-h-screen bg-slate-50 dark:bg-dark transition-colors duration-300 z-50 relative"
    >
      {/* Lightbox / Zoom Modal */}
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

      {/* Hero Header */}
      <div className="relative h-[60vh] w-full bg-slate-900 border-b border-slate-800 flex items-center justify-center overflow-hidden cursor-pointer group" onClick={() => project.imageUrl && setSelectedMedia(project.imageUrl)}>
        {project.imageUrl && (
            <div className="absolute inset-0 w-full h-full flex items-center justify-center p-8 lg:p-16">
                 {/* Main Hero Image/GIF with proper framing for both dark/light contrast */}
                <div className="relative w-full h-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700/50 bg-black/40 group-hover:scale-[1.02] transition-transform duration-500">
                     <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-contain sm:object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
                     <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Search size={14} /> Click to Zoom
                    </div>
                </div>
            </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 pointer-events-none">
            <div className="container mx-auto">
                <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
                >
                    {project.title}
                </motion.h1>
                <div className="flex flex-wrap gap-3">
                    {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-primary/30 text-blue-200 border border-primary/40 rounded-full text-sm font-medium flex items-center gap-1 backdrop-blur-sm shadow-sm pointer-events-auto">
                            <Tag size={12} /> {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-12">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Overview</h2>
                    <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                        {project.fullDescription}
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Key Features</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {project.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3 bg-white dark:bg-card p-5 rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm hover:border-primary/30 transition-colors">
                                <CheckCircle2 size={24} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                                <span className="text-slate-700 dark:text-slate-200 font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Media Gallery */}
                {project.videoUrl?.includes('youtube.com/embed') && (
                     <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">YouTube Demo</h2>
                        <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 bg-black">
                            <iframe 
                                src={project.videoUrl} 
                                title="YouTube video player" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                referrerPolicy="strict-origin-when-cross-origin" 
                                allowFullScreen
                                className="w-full h-auto aspect-video"
                            ></iframe>
                        </div>
                     </div>
                )}

                {galleryMedia.length > 0 && (
                     <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">Project Media Gallery</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {galleryMedia.map((media, idx) => (
                                <div 
                                    key={idx} 
                                    className="group relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 cursor-pointer"
                                    onClick={() => setSelectedMedia(media)}
                                >
                                    {isVideo(media) ? (
                                        <div className="w-full h-full aspect-video">
                                             <video 
                                                src={media} 
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                             <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                                                 <div className="bg-primary text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 shadow-lg">
                                                     <Search size={20} />
                                                 </div>
                                             </div>
                                        </div>
                                    ) : (
                                        <div className="w-full h-full aspect-video">
                                            <img 
                                                src={media} 
                                                alt={`Gallery view ${idx + 1}`} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                                                 <div className="bg-primary text-white rounded-full px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 shadow-lg flex items-center gap-2 font-medium">
                                                     <Search size={16} /> Enlarge Image
                                                 </div>
                                             </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
                <div className="bg-white dark:bg-card p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg top-24 sticky">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">Project Details</h3>
                    
                    <div className="space-y-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2"><Calendar size={14}/> Date Completed</span>
                            <span className="text-slate-800 dark:text-white font-medium text-lg">{project.date || '2024'}</span>
                        </div>
                        
                         <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">My Role</span>
                            <span className="text-slate-800 dark:text-white font-medium text-lg">{project.role || 'Lead Engineer'}</span>
                        </div>
                        
                        {project.collaborators && (
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Collaborators</span>
                                <div className="space-y-1">
                                    {project.collaborators.map(c => (
                                        <div key={c} className="text-slate-800 dark:text-slate-200 font-medium px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg">{c}</div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;