import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Boxes, BrainCircuit, Cpu, Workflow } from 'lucide-react';

const CAPABILITIES = [
  {
    title: 'Robot systems',
    description: 'ROS 2, Nav2, MoveIt, SLAM, LiDAR, RGB-D, control loops, sensor integration, and physical commissioning.',
    Icon: Cpu,
  },
  {
    title: 'Robot learning',
    description: 'LeRobot, ACT, smolVLA, diffusion policies, PyTorch, multimodal models, and structured rollout evaluation.',
    Icon: BrainCircuit,
  },
  {
    title: 'Simulation and hardware',
    description: 'Isaac Sim, Omniverse, Gazebo, URDF, CAD, 3D printing, embedded systems, and custom mechanisms.',
    Icon: Boxes,
  },
  {
    title: 'Automation and data',
    description: 'FastAPI, REST, MQTT, n8n, OCR validation, SQL, dashboards, and logistics process design.',
    Icon: Workflow,
  },
];

const Expertise: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="capabilities" className="section section--capabilities">
      <div className="section__inner">
        <div className="section-heading section-heading--narrow">
          <h2>Engineering across the full robot stack.</h2>
          <p>From mechanics and sensing to learned policies, APIs, and operational dashboards.</p>
        </div>

        <div className="capability-grid">
          {CAPABILITIES.map(({ title, description, Icon }, index) => (
            <motion.article
              key={title}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <Icon size={24} strokeWidth={1.6} />
              <h3>{title}</h3>
              <p>{description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
