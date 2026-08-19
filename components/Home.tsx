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

const EXPERIENCE = [
  {
    label: 'Apr 2026 - Jul 2026',
    title: 'AI Data Analyst, LOGIVAN',
    description:
      'Automated ad-hoc P&L reporting by scraping real-time data from customer portals, removing a manual month-end delay. Built LLM and VLM extraction pipelines turning invoices, bills of lading and proof-of-delivery into schema-valid JSON, with validation logic and edge-case tests so unvalidated fields never reached the database. Also built n8n and JavaScript automation connecting an AI chatbot to Zalo over REST, and data-quality notebooks and dashboards in Holistics and Hex.tech.',
  },
  {
    label: 'Dec 2023 - Present',
    title: 'Robotics and AI Researcher, OpenLab at UEH University',
    description:
      'Undergraduate researcher, supervised by Nguyen Minh Trieu. Joined within months of enrolling, and the robot-learning and digital-twin work below comes out of this lab.',
  },
  {
    label: '2024 - 2025',
    title: 'Teaching',
    description:
      'Freelance English tutor for IELTS and PTE preparation, early 2024 to 2025. Volunteer English teacher at SOS Children’s Village, Hai Phong, June to August 2025, teaching a student group at an NGO providing family-based care for children who have lost parental care.',
  },
];

const FIELD_NOTES = [
  {
    label: 'Measure before believing',
    title: 'The benchmark that contradicted the assumption',
    description:
      'Q4_K_M is the quantisation everyone reaches for, and on the Arduino UNO Q it was both bigger and slower than Q4_0 — 463 MB at 16.65 tokens/s against 403 MB at 20.09. Not a bug: llama.cpp repacks Q4_0 for ARM. I would not have guessed that, which is the entire argument for benchmarking instead of assuming.',
  },
  {
    label: 'Suspect the observation',
    title: 'The model was fine. The camera moved.',
    description:
      'An ACT policy kept destabilising across rollouts, and the instinct is to blame the policy and retrain. Reading five-episode batches instead of single runs showed the failures tracked lighting and camera viewpoint. The fix was a CAD-designed rigid camera mount, not a better network.',
  },
  {
    label: 'Publish the negative result',
    title: 'A rejection is a finding',
    description:
      'MolmoAct2 measured 1.18x signal-to-noise across contradictory instructions — indistinguishable from noise. It is documented as a measured rejection rather than quietly dropped, because the next person to try it deserves the number.',
  },
  {
    label: 'Name what is unfinished',
    title: 'Where the chain still breaks',
    description:
      'On the edge build, speech reaches an object name and an image coordinate, and then stops: the step from coordinates to joint angles is missing, so grasping does not work. Saying so costs nothing and saves the next person a week.',
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

      <section id="experience" className="section section--now">
        <div className="section__inner now-layout">
          <div className="section-heading section-heading--narrow">
            <h2>Where I have worked.</h2>
            <p>Industry data work, a university robotics lab, and teaching.</p>
          </div>
          <div className="now-list">
            {EXPERIENCE.map((item, index) => (
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

      <section id="now" className="section section--now">
        <div className="section__inner now-layout">
          <div className="section-heading section-heading--narrow">
            <h2>How I work, with the receipts.</h2>
            <p>Four habits, each one attached to the thing that taught it to me.</p>
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
              I am reading Logistics Technology at UEH University, and I work across software, data, AI, automation and physical systems. That range helps me connect a technical decision to the people, workflow or product it needs to improve.
            </p>
            <p>
              I would rather publish the number I measured and name the part that does not work yet than round either one up. Most of what I have learned came from the second kind: a power crash traced to a single overloaded USB port, a wake word that never fired mid-sentence, a policy that was unstable because the camera moved rather than because the model was wrong.
            </p>
          </div>

          <dl className="about-facts">
            <div>
              <dt>Education</dt>
              <dd>BSc Logistics Technology, UEH University, 2023 to 2027 expected. CGPA 3.52 / 4.00.</dd>
            </div>
            <div>
              <dt>Availability</dt>
              <dd>Coursework completed Jun 2026. Thesis defence Dec 2026. Degree conferred Mar 2027 expected. Available full-time now.</dd>
            </div>
            <div>
              <dt>Languages</dt>
              <dd>Vietnamese native. English, IELTS 7.5. Chinese, HSK 1.</dd>
            </div>
            <div>
              <dt>Based</dt>
              <dd>Ho Chi Minh City, Vietnam. Open to Hanoi and to relocation.</dd>
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
