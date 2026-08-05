import React, { useCallback, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Github } from 'lucide-react';
import { PROJECTS } from '../constants';
import { getProjectMedia } from '../lib/media';
import { Project } from '../types';
import Accomplishments from './Accomplishments';
import Certifications from './Certifications';
import Footer from './Footer';
import MediaLightbox, { MediaLightboxState } from './MediaLightbox';
import ProjectCard from './ProjectCard';
import TypingHero from './TypingHero';

const FIELD_NOTES = [
  {
    label: 'Human to robot',
    title: 'Making physical agents easier to command',
    description:
      'Mira explores the interface between ordinary language and explicit, inspectable robot tools.',
  },
  {
    label: 'Simulation to hardware',
    title: 'Finding failure before deployment',
    description:
      'Digital twins let me test navigation, manipulation, and sensor assumptions before the physical system pays the price.',
  },
  {
    label: 'Operations to software',
    title: 'Automating the awkward middle of logistics',
    description:
      'I look for repetitive hand-offs, missing structure, and delayed information, then build the smallest useful automation around them.',
  },
];

const Home: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [lightbox, setLightbox] = useState<MediaLightboxState | null>(null);

  const openMedia = useCallback((title: string, media: string[], index = 0) => {
    setLightbox({ title, media, index });
  }, []);

  const openProjectMedia = useCallback((project: Project) => {
    openMedia(project.title, getProjectMedia(project));
  }, [openMedia]);

  const setMediaIndex = useCallback((index: number) => {
    setLightbox((current) => (current ? { ...current, index } : current));
  }, []);

  const featuredProjects = PROJECTS.filter((project) => project.featured);
  const additionalProjects = PROJECTS.filter((project) => !project.featured);

  return (
    <motion.main
      key="home-view"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <TypingHero />

      <section id="work" className="section section--work">
        <div className="section__inner">
          <div className="section-heading section-heading--narrow">
            <h2>Built, tested, and shown working.</h2>
            <p>Projects across AI, data, software, automation, and physical systems, built and tested beyond the slide deck.</p>
          </div>

          <div className="featured-work">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                variant={index === 0 ? 'lead' : 'standard'}
                onImageZoom={openProjectMedia}
              />
            ))}
          </div>

          <div className="project-index">
            <div className="project-index__heading">
              <h3>More projects and research</h3>
              <a className="text-link" href="https://github.com/Catnip-harvest" target="_blank" rel="noopener noreferrer">
                GitHub <Github size={17} />
              </a>
            </div>
            {additionalProjects.map((project) => (
              <ProjectCard key={project.id} project={project} variant="index" />
            ))}
          </div>
        </div>
      </section>

      <section id="now" className="section section--now">
        <div className="section__inner now-layout">
          <div className="section-heading section-heading--narrow">
            <h2>Working notes.</h2>
            <p>Three ideas that keep showing up in the systems I build.</p>
          </div>
          <div className="now-list">
            {FIELD_NOTES.map((item, index) => (
              <motion.article
                key={item.title}
                initial={reduceMotion ? false : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <span className="now-list__label">{item.label}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Accomplishments onMediaOpen={openMedia} />

      <section id="about" className="section section--about">
        <div className="section__inner about-layout">
          <div className="about-story">
            <h2>I like turning messy questions into things people can use.</h2>
            <p>
              I study Logistics Technology at UEH University and work across software, data, AI, automation, and physical systems. That range helps me connect a technical decision to the people, workflow, or product it needs to improve.
            </p>
            <p>
              I have completed my academic coursework one year early and am available for full-time roles where I can understand a problem, make a useful first version, and improve it with evidence.
            </p>
          </div>

          <dl className="about-facts">
            <div>
              <dt>Physical evidence</dt>
              <dd>I trust a system more after it survives contact with hardware.</dd>
            </div>
            <div>
              <dt>Operational value</dt>
              <dd>A robot matters when it improves a workflow, not when it only looks impressive.</dd>
            </div>
            <div>
              <dt>Communication</dt>
              <dd>I document decisions and explain technical trade-offs in Vietnamese or English.</dd>
            </div>
            <div>
              <dt>Next</dt>
              <dd>Available for full-time roles across product, data, AI, and software.</dd>
            </div>
          </dl>
        </div>
      </section>

      <Certifications />
      <Footer />

      <MediaLightbox
        state={lightbox}
        onClose={() => setLightbox(null)}
        onIndexChange={setMediaIndex}
      />
    </motion.main>
  );
};

export default Home;
