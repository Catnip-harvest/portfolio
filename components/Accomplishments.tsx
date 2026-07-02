import React from 'react';
import { motion } from 'framer-motion';
import { ACCOMPLISHMENTS } from '../constants';
import { Award, CalendarDays, ExternalLink, Medal } from 'lucide-react';

const Accomplishments: React.FC = () => {
  return (
    <section id="accomplishments" className="py-24 bg-white dark:bg-dark transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-primary font-medium tracking-wide uppercase text-sm">Recognition</span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2">Highlights &amp; Accomplishments</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 max-w-6xl mx-auto">
          {ACCOMPLISHMENTS.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-card/70 shadow-sm ${
                item.imageUrl ? 'lg:grid lg:grid-cols-[1.25fr_0.75fr]' : ''
              }`}
            >
              {item.imageUrl && (
                <div className="relative min-h-[280px] lg:min-h-[440px] bg-slate-200 dark:bg-slate-900">
                  <img src={item.imageUrl} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
                </div>
              )}

              <div className="p-6 md:p-8 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-sm font-semibold">
                    <Medal size={15} /> {item.category}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <CalendarDays size={15} /> {item.date}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 font-semibold mb-4">{item.organization}</p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{item.description}</p>

                {item.gallery && item.gallery.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    {item.gallery.map((image) => (
                      <div key={image} className="aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-200 dark:bg-slate-900">
                        <img src={image} alt={`${item.title} visual`} className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}

                {item.linkUrl && (
                  <a
                    href={item.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-semibold mt-6 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    View proof <ExternalLink size={16} />
                  </a>
                )}

                {!item.imageUrl && (
                  <div className="mt-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Award size={22} />
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accomplishments;
