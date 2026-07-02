import React from 'react';
import { motion } from 'framer-motion';
import { CERTIFICATIONS } from '../constants';
import { Award, ExternalLink } from 'lucide-react';

const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-24 bg-slate-50 dark:bg-dark relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-wide uppercase text-sm">Professional</span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2">Licenses &amp; Certifications</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
          {CERTIFICATIONS.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className="group bg-white dark:bg-card border border-slate-200 dark:border-slate-700/50 rounded-lg p-6 flex flex-col md:flex-row items-center gap-6 hover:border-primary/50 transition-colors shadow-sm"
            >
              <div className="w-20 h-20 shrink-0 bg-slate-50 dark:bg-white rounded-lg p-2 flex items-center justify-center border border-slate-100 dark:border-none">
                 <img src={cert.badgeUrl} alt="Badge" className="w-full h-full object-contain" />
              </div>
              
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-slate-900 dark:text-white font-bold text-xl mb-1 group-hover:text-primary transition-colors">{cert.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium">{cert.issuer}</p>
                <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Award size={14} /> Issued {cert.date}</span>
                </div>
              </div>

              {cert.verifyUrl && (
                <div className="shrink-0">
                    <a 
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 rounded-full border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:text-white hover:bg-slate-700 dark:hover:bg-slate-700 hover:border-slate-700 text-sm font-medium transition-colors flex items-center gap-2"
                    >
                        Show Credential <ExternalLink size={14} />
                    </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 flex justify-center"
        >
            <a 
                href="https://www.linkedin.com/in/vi%E1%BB%87t-ho%C3%A0ng-20324a234/details/certifications/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
            >
                <Award size={18} /> See All Certifications
            </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
