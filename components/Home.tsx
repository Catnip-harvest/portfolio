import React, { useCallback, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Github } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import Accomplishments from './Accomplishments';
import Certifications from './Certifications';
import Expertise from './Expertise';
import Footer from './Footer';
import MediaLightbox, { MediaLightboxState } from './MediaLightbox';
import ProjectCard from './ProjectCard';
import TypingHero from './TypingHero';

const CURRENT_WORK = [
  {
    date: 'Jul 2026',
    title: 'Mira, a voice-controlled robot agent',
    description:
      'An SO101 arm that uses LLM tool-calling to execute motion, position its camera, and inspect scenes with a vision model.',
    result: 'Top 5, Agentic AI Build Week',
  },
  {
    date: 'Apr - Jul 2026',
    title: 'AI operations at LOGIVAN',
    description:
      'n8n workflows, Zalo integrations, OCR pipelines, schema-valid JSON, and dashboards for logistics operations.',
    result: 'AI Automation and Software Engineering Intern',
  },
  {
    date: 'Feb 2026 - Present',
    title: 'Teaching two robot arms from demonstration',
    description:
      'A ROS 2 leader-follower system, 250 physical episodes, ACT training, and repeated rollout diagnostics.',
    result: 'OpenLab robotics research',
  },
];

const getProjectMedia = (project: Project) => {
  const media = [project.imageUrl];
  if (project.videoUrl && !project.videoUrl.includes('youtube.com/embed')) media.push(project.videoUrl);
  if (project.secondaryImageUrl) media.push(project.secondaryImageUrl);
  if (project.additionalMedia) media.push(...project.additionalMedia);
  return Array.from(new Set(media.filter(Boolean)));
};

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

      <section id="now" className="section section--now">
        <div className="section__inner now-layout">
          <div className="section-heading section-heading--narrow">
            <h2>What I am building now.</h2>
            <p>Current work across embodied agents, robot learning, and AI automation in logistics.</p>
          </div>
          <div className="now-list">
            {CURRENT_WORK.map((item, index) => (
              <motion.article
                key={item.title}
                initial={reduceMotion ? false : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <time>{item.date}</time>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span>{item.result}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Expertise />

      <section id="work" className="section section--work">
        <div className="section__inner">
          <div className="section-heading section-heading--narrow">
            <h2>Selected engineering work.</h2>
            <p>Systems I designed, trained, assembled, debugged, and evaluated beyond the demo.</p>
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

      <Accomplishments onMediaOpen={openMedia} />

      <section id="about" className="section section--about">
        <div className="section__inner about-layout">
          <div className="about-story">
            <h2>Logistics taught me where systems break. Robotics lets me rebuild them.</h2>
            <p>
              I study Logistics Technology at UEH University, but my work moved steadily toward automation, robot learning, and digital twins. That combination helps me connect an engineering decision to the operation it must improve.
            </p>
            <p>
              I have completed my academic coursework one year early and am available for full-time roles in robotics software, simulation, embodied AI, and intelligent automation.
            </p>
          </div>

          <dl className="about-facts">
            <div>
              <dt>OpenLab, UEH</dt>
              <dd>Robotics and AI Researcher</dd>
              <dd className="about-facts__meta">Dec 2023 - Present</dd>
            </div>
            <div>
              <dt>LOGIVAN</dt>
              <dd>AI Automation and Software Engineering Intern</dd>
              <dd className="about-facts__meta">Apr - Jul 2026</dd>
            </div>
            <div>
              <dt>UEH University</dt>
              <dd>Bachelor of Logistics Technology, CGPA 3.52 / 4.00</dd>
              <dd className="about-facts__meta">Coursework completed</dd>
            </div>
            <div>
              <dt>Communication</dt>
              <dd>Vietnamese, English IELTS 7.5, basic Chinese</dd>
              <dd className="about-facts__meta">Technical and cross-functional</dd>
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
