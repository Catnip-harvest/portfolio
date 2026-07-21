import { Accomplishment, Certification, Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'mira-voice-agent',
    title: 'Mira: Voice-Controlled Physical Agent',
    shortDescription:
      'A voice-first SO101 robot that turns natural-language intent into safe gestures, visual scans, and conversational feedback.',
    fullDescription:
      'Mira is a phone-friendly physical agent built around an SO101 follower arm. Spoken or typed requests are routed through Agora Conversational AI into explicit robot tools for waving, dancing, nodding, scanning, and stopping. I built the FastAPI control service, hardware-aware launcher, process ownership, run history, and mobile control room. For visual search, Mira replays a recorded scan motion, captures four wrist-camera viewpoints, and asks Gemini to locate the requested object before reporting the result. Gesture replay is kept deliberately separate from the future learned screwdriver policy so the demo remains honest, testable, and safe.',
    impact:
      'Mira became a Top 5 finalist at Agentic AI Build Week and demonstrated an end-to-end loop across voice, tool calling, robot motion, camera perception, and safety controls.',
    tags: ['Agora ConvoAI', 'LeRobot', 'FastAPI', 'SO101', 'Gemini'],
    imageUrl: '/mira-demo-poster.webp',
    previewVideoUrl: '/mira-demo-preview.mp4',
    posterUrl: '/mira-demo-poster.webp',
    videoUrl: 'https://www.youtube.com/embed/rNHOZqLiyZs?autoplay=1&mute=1&rel=0',
    features: [
      'Agora voice sessions and natural-language robot tool calls',
      'Five expressive SO101 gestures with busy-state protection',
      'Four-view wrist-camera scan with Gemini visual matching',
      'Single-process ownership and escalating emergency stop',
      'Mobile control room, live status, logs, and run history',
    ],
    date: 'Jul 2026',
    role: 'Robotics and AI Engineer',
    repoUrl: 'https://github.com/Catnip-harvest/agora',
    demoUrl: 'https://www.youtube.com/watch?v=rNHOZqLiyZs',
    featured: true,
  },
  {
    id: 'so101-imitation-learning',
    title: 'SO101 Robot Learning System',
    shortDescription:
      'A ROS 2 leader-follower system used to collect 250 demonstrations and evaluate an ACT manipulation policy.',
    fullDescription:
      'I built a synchronized leader-follower control loop for two SO101 arms, connected the physical system to an NVIDIA Isaac Sim digital twin, and created a repeatable data pipeline for robot learning. I collected 250 physical demonstration episodes and trained an Action Chunking with Transformers policy with Hugging Face LeRobot. Repeated rollout testing exposed sensitivity to lighting and camera variation, so I redesigned the observation setup with a rigid robot-mounted camera fixture and custom soft grippers.',
    impact:
      'The project turned an unstable demonstration setup into a repeatable robot-learning workflow with traceable rollout failures.',
    tags: ['ROS 2', 'LeRobot', 'ACT', 'Isaac Sim', 'Robot Learning'],
    imageUrl: '/capstone-so101-training-optimized.webp',
    imageFit: 'cover',
    previewVideoUrl: '/capstone-arm-picking-preview.mp4',
    posterUrl: '/capstone-arm-picking-poster.webp',
    videoUrl: '/capstone-arm-picking-preview.mp4',
    features: [
      'Low-latency leader-follower control in ROS 2',
      '250 physical demonstration episodes',
      'ACT policy training and repeated rollout evaluation',
      'Isaac Sim digital twin synchronization',
      'CAD-designed camera mount and soft grippers',
    ],
    date: 'Feb 2026 - Present',
    role: 'Robotics and AI Researcher',
    featured: true,
  },
  {
    id: 'capstone',
    title: 'Warehouse Mobile Manipulator',
    shortDescription:
      'A custom warehouse robot combining an AMR base, dual-crane lift, SO101 arm, and a simulation-first validation workflow.',
    fullDescription:
      'For my capstone, I designed a logistics robot inspired by automated warehouse picking systems. The platform combines an autonomous mobile base, a dual-crane lifting mechanism, and an SO101 manipulator under a modular ROS 2 architecture. In parallel, I built a warehouse digital twin in NVIDIA Omniverse and Isaac Sim, configured URDF kinematics, collision meshes, sensors, and physical properties, then used the ROS 2 Bridge for LiDAR, RGB-D, velocity control, and MoveIt experiments.',
    impact:
      'The digital twin provides a safer place to validate navigation, manipulation, and learning policies before physical deployment.',
    tags: ['ROS 2', 'Isaac Sim', 'MoveIt', 'Digital Twin', 'AMR'],
    imageUrl: '/capstone-optimized.webp',
    imageFit: 'cover',
    videoUrl: 'https://www.youtube.com/embed/kH4mvG7b4qc?autoplay=1&mute=1&rel=0',
    secondaryImageUrl: '/capstone-digital-twin-optimized.webp',
    additionalMedia: ['/capstone-circuit-optimized.webp', '/capstone-arm-picking-preview.mp4'],
    features: [
      'Custom AMR, dual-crane, and manipulator architecture',
      'URDF kinematics, collision, and material configuration',
      'LiDAR and RGB-D telemetry through ROS 2 Bridge',
      'MoveIt planning and simulated picking experiments',
      'Simulation-first testing for learned policies',
    ],
    date: '2026 - Present',
    role: 'Lead Robotics Engineer',
    repoUrl: 'https://github.com/Catnip-harvest',
    featured: true,
  },
  {
    id: 'turtle-bot',
    title: 'TurtleBot SLAM and Navigation',
    shortDescription:
      'A ROS 2 mobile robotics platform for LiDAR mapping, wheel odometry tuning, teleoperation, and Nav2 autonomy.',
    fullDescription:
      'This project established the navigation foundation for my later AMR work. I configured a differential-drive TurtleBot platform, tuned wheel odometry, integrated 2D LiDAR, built maps with SLAM, and deployed the ROS 2 Nav2 stack for autonomous obstacle-aware routing. The chassis and sensor arrangement were modeled before physical assembly and validated through teleoperation.',
    impact:
      'It created a reliable baseline for localization and navigation work later reused in the warehouse robotics program.',
    tags: ['ROS 2', 'Nav2', 'SLAM', 'LiDAR', 'URDF'],
    imageUrl: '/turtlebot-3d-model.gif',
    imageFit: 'contain',
    previewVideoUrl: '/turtlebot-teleoperating-preview.mp4',
    posterUrl: '/turtlebot-teleoperating-poster.webp',
    videoUrl: '/turtlebot-teleoperating-preview.mp4',
    features: [
      '2D LiDAR mapping and localization',
      'Wheel odometry calibration',
      'ROS 2 Nav2 integration',
      'Remote teleoperation',
    ],
    date: 'Dec 2025',
    role: 'ROS 2 Developer',
    collaborators: ['Nhi Hoang', 'Tan Tai', 'Thanh Ly'],
    featured: false,
  },
  {
    id: 'vrp',
    title: 'Graph Learning for Vehicle Routing',
    shortDescription:
      'A PyTorch Geometric routing study connecting graph learning with fuel, distance, and delivery performance.',
    fullDescription:
      'I explored the Vehicle Routing Problem through graph-based machine learning and operations research. Using Python, PyTorch Geometric, and GIS-oriented routing logic, I processed delivery-network data and modeled efficient routing edges. The work connected academic optimization methods with practical logistics goals such as lower fuel consumption, shorter travel distance, and better on-time delivery.',
    impact:
      'The project connected my logistics background with graph machine learning and operational decision-making.',
    tags: ['PyTorch Geometric', 'GNN', 'Optimization', 'Logistics'],
    imageUrl: '/vrp-optimized.webp',
    imageFit: 'contain',
    features: [
      'Graph-based delivery-network modeling',
      'Route and cost optimization objectives',
      'GIS-oriented data processing',
      'Operational KPI framing',
    ],
    date: 'Apr 2025',
    role: 'Machine Learning Researcher',
  },
  {
    id: 'blockchain-coffee',
    title: 'Blockchain for Coffee Supply Chains',
    shortDescription:
      'Third Prize UEH research on traceability, data security, and transparent agricultural supply-chain records.',
    fullDescription:
      'I researched how blockchain can improve coffee supply-chain traceability and data integrity. The thesis proposed a model for recording origin, quality, and hand-off events across the agricultural network, with attention to governance and practical business adoption. The work received Third Prize in the UEH Young Researcher Award.',
    impact:
      'The research translated blockchain architecture into a concrete traceability model for a real Vietnamese supply chain.',
    tags: ['Blockchain', 'Supply Chain', 'Research', 'Data Security'],
    imageUrl: '/coffee-blockchain-research-optimized.webp',
    imageFit: 'cover',
    features: [
      'End-to-end traceability model',
      'Data integrity and access design',
      'Business adoption analysis',
      'Award-winning academic research',
    ],
    date: 'Dec 2025',
    role: 'Lead Researcher',
  },
  {
    id: '2-dof-arm',
    title: '2-DOF Fluid Control Gantry',
    shortDescription:
      'A CAD-designed and 3D-printed planar actuator system using stepper motors and G-code path planning.',
    fullDescription:
      'I designed and built a two-degree-of-freedom planar gantry for automated fluid dispensing. The work combined CAD, 3D-printed mechanical components, microcontroller control, stepper motors, and G-code trajectory planning to improve repeatability in liquid processing tasks.',
    impact:
      'The prototype gave me an early end-to-end hardware foundation across mechanics, electronics, and motion control.',
    tags: ['CAD', 'Embedded Systems', 'G-code', 'Motion Control'],
    imageUrl: '/2-dof-robot-arm-poster.webp',
    imageFit: 'contain',
    videoUrl: '/2-dof-robot-arm-preview.mp4',
    posterUrl: '/2-dof-robot-arm-poster.webp',
    features: [
      'Custom CAD and 3D-printed mechanics',
      'Stepper motor integration',
      'G-code path planning',
      'Repeatable planar dispensing',
    ],
    date: '2024',
    role: 'Mechatronics Engineer',
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'c1',
    title: 'IELTS 7.5 Overall',
    issuer: 'British Council',
    date: 'Sep 2025',
    badgeUrl: '/british-council.svg',
    verifyUrl: 'https://drive.google.com/file/d/1XMzPeHns2E2jnxcN4J_udBvTOIp17ZgZ/view?usp=sharing',
  },
  {
    id: 'c2',
    title: 'Google Advanced Data Analytics Professional Certificate',
    issuer: 'Google',
    date: '2025',
    badgeUrl: 'https://www.gstatic.com/images/branding/googleg/1x/googleg_standard_color_128dp.png',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/professional-cert/86N6I1S14OHG',
  },
  {
    id: 'c3',
    title: 'The Nuts and Bolts of Machine Learning',
    issuer: 'Google',
    date: '2025',
    badgeUrl: 'https://www.gstatic.com/images/branding/googleg/1x/googleg_standard_color_128dp.png',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/records/793FVAWLUPJN',
  },
  {
    id: 'c4',
    title: 'Transformer Models and BERT Model',
    issuer: 'Google Cloud',
    date: '2025',
    badgeUrl: 'https://cdn.simpleicons.org/googlecloud',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/records/PXM5911PMO2V',
  },
  {
    id: 'c5',
    title: 'Blockchain Business Models',
    issuer: 'Duke University',
    date: '2025',
    badgeUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Duke_University_logo.svg',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/records/1NBS5FTE60O8',
  },
  {
    id: 'c6',
    title: 'Harnessing the Power of Data with Power BI',
    issuer: 'Microsoft',
    date: '2025',
    badgeUrl: '/microsoft.svg',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/records/KSGEAJSUN7FG',
  },
  {
    id: 'c7',
    title: 'Robotics in High-Tech Manufacturing',
    issuer: 'Coursera',
    date: '2024',
    badgeUrl: 'https://cdn.simpleicons.org/coursera',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/WNMZEYCHLD8Z',
  },
  {
    id: 'c8',
    title: 'Self-Driving Car Specialization Course',
    issuer: 'Packt',
    date: '2024',
    badgeUrl: 'https://cdn.simpleicons.org/coursera',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/IX1ITY29W2JZ',
  },
  {
    id: 'c9',
    title: 'Basics of Robotics',
    issuer: 'Siemens',
    date: '2024',
    badgeUrl: 'https://cdn.simpleicons.org/siemens',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/A860FXKV6RYK',
  },
  {
    id: 'c10',
    title: 'Unilever Supply Chain Data Analyst',
    issuer: 'Unilever / Coursera',
    date: '2024',
    badgeUrl: 'https://cdn.simpleicons.org/coursera',
    verifyUrl: 'https://coursera.org/share/b2fa4a542c40ee9a62298e117f0c4cb5',
  },
];

export const ACCOMPLISHMENTS: Accomplishment[] = [
  {
    id: 'a1',
    title: 'Top 5 Finalist, Agentic AI Build Week',
    organization: 'Agentic AI Build Week',
    date: 'Jul 2026',
    description:
      'Built Mira, a voice-controlled SO101 robot agent that uses LLM tool-calling for motion, camera positioning, and multimodal scene analysis.',
    category: 'Hackathon',
  },
  {
    id: 'a2',
    title: 'Top 12 Finalist and Outstanding Smart Engineering Leader',
    organization: 'iNext Leader by iConneX',
    date: 'Jun 2026',
    description:
      'Selected from 1,500 contestants for an EV fleet and battery-swap pilot covering safety monitoring, hub placement, and operational KPIs.',
    category: 'Competition',
    imageUrl: '/inext-leader-top-12-smart-engineering.webp',
    gallery: ['/inext-leader-finalists.webp', '/inext-leader-presentation.webp'],
  },
  {
    id: 'a3',
    title: 'Top 7 Finalist and Stage Presenter',
    organization: 'Qwen AI Build Day Hackathon',
    date: 'May 2026',
    description:
      'Built and presented Healix, a bilingual multimodal health platform with lab extraction, strict reference validation, and clinical reasoning.',
    category: 'Hackathon',
  },
  {
    id: 'a4',
    title: 'Consolation Prize, CTD Scholar',
    organization: 'CTD Scholar',
    date: 'Jan 2026',
    description:
      'Recognized for AIMS, an AIoT-based system for continuous warehouse inventory supervision using edge vision devices.',
    category: 'Award',
  },
  {
    id: 'a5',
    title: 'Third Prize, UEH Young Researcher Award',
    organization: 'UEH University',
    date: 'Dec 2025',
    description:
      'Awarded for research on blockchain-based data security and traceability in the coffee supply chain.',
    category: 'Award',
  },
];
