import { Accomplishment, Certification, Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'mira-voice-agent',
    title: 'Mira: Voice-Controlled Robot Agent',
    shortDescription:
      'A conversational agent on an SO-101 arm that turns spoken requests into a fixed, inspectable set of robot tools.',
    fullDescription:
      'Mira is a conversational embodied agent built on the Agora framework. Spoken or typed requests are routed through an LLM that maps them onto SO-101 motion primitives, running in ROS 2 on Linux with a local GPU for latency. The scan tool is the interesting part: the LLM triggers the robot to position its camera, capture an overhead and a wrist view, then passes those frames to a secondary multimodal vision model for scene interpretation. Gesture replay is kept separate from any learned policy, and the tool set is deliberately fixed rather than open-ended control.',
    impact: 'Top 5 finalist at Agentic AI Build Week, in the Physical AI and Robotics track.',
    tags: ['Agora', 'ROS 2', 'SO-101', 'LLM tool calling', 'CUDA'],
    imageUrl: '/mira-demo-poster.webp',
    previewVideoUrl: '/mira-demo-preview.mp4',
    posterUrl: '/mira-demo-poster.webp',
    videoUrl: 'https://www.youtube.com/embed/rNHOZqLiyZs?autoplay=1&mute=1&rel=0',
    features: [
      'LLM tool calls mapped onto SO-101 motion primitives',
      'Tool set per the repo: wave, nod, dance, scan, stop',
      'Scan captures overhead and wrist views for a vision model to interpret',
      'Gesture replay kept separate from the learned policy',
      'Unsafe requests are rejected rather than queued',
    ],
    date: 'Jul 2026',
    role: 'Design and build',
    repoUrl: 'https://github.com/Catnip-harvest/agora/tree/main/mira',
    demoUrl: 'https://www.youtube.com/watch?v=rNHOZqLiyZs',
    featured: true,
  },
  {
    id: 'so101-imitation-learning',
    title: 'Dual SO-101 Teleoperation and ACT Imitation Learning',
    shortDescription:
      'A leader-follower teleoperation rig used to collect 250 demonstrations and evaluate an ACT policy through repeated rollout batches.',
    fullDescription:
      'I built a leader-follower teleoperation framework with synchronised closed-loop control between two SO-101 arms in ROS 2, bridged to an NVIDIA Isaac Sim digital twin. From that rig I collected 250 physical demonstration episodes and trained an Action Chunking with Transformers policy through Hugging Face LeRobot in a Docker and Conda environment. Evaluation ran in repeated five-episode rollout batches of up to about 90 seconds each, so I was reading recurring failure patterns rather than single successes. That is how the real problem surfaced: rollout instability traced to lighting and camera-viewpoint variation rather than to the policy. The fix was mechanical, a CAD-designed rigid camera fixture mounted to the robot so observations repeat.',
    impact:
      'Diagnosing the instability as an observation problem rather than a model problem turned an unrepeatable setup into one where results could be compared run to run.',
    tags: ['ROS 2', 'LeRobot', 'ACT', 'Isaac Sim', 'Imitation learning'],
    imageUrl: '/capstone-so101-training-optimized.webp',
    imageFit: 'cover',
    previewVideoUrl: '/capstone-arm-picking-preview.mp4',
    posterUrl: '/capstone-arm-picking-poster.webp',
    videoUrl: '/capstone-arm-picking-preview.mp4',
    features: [
      'Synchronised closed-loop leader-follower control in ROS 2',
      '250 physical demonstration episodes collected',
      'ACT policy trained and deployed via Hugging Face LeRobot',
      'Repeated five-episode rollout batches, up to roughly 90 s per episode',
      'CAD-designed rigid camera fixture, plus TPU and silicone soft grippers',
      'VR controllers used for demonstration capture',
    ],
    date: 'Feb 2026 - Present',
    role: 'Design and build',
    featured: true,
  },
  {
    id: 'capstone',
    title: 'Smart AS/RS: Mobile Manipulator and Warehouse Digital Twin',
    shortDescription:
      'A 1:5 scale autonomous mobile manipulator and its Isaac Sim twin, designed to take the human picking station out of warehouse automation.',
    fullDescription:
      'The design starts from a specific limitation. The Brightpick Autopicker drives into a warehouse and picks items, but its arm is a SCARA picking vertically with a suction cup, so anything it cannot handle gets routed to a human picking station. My approach was to fit an arm with more degrees of freedom and teach it those picks with imitation learning, taking the human station out of the loop. I argued the team away from a fixed stacker-crane AS/RS toward a flexible mobile-manipulator architecture: an AGV base, a dual-crane vertical lift and a 6-DOF picking arm, coordinated through a digital twin. The trade-off is deliberate and worth stating plainly, lower peak throughput in exchange for flexibility across SKU mix and layout. I owned system integration across the mechanical, electrical, controls and software streams, and coordinated two technical reports. The demonstrated policy picks cubes, and that is the extent of what the demo covers.',
    impact:
      'A working 1:5 physical prototype plus a full-scale industrial design concept, validated on positioning accuracy, sequence synchronisation and virtual-to-physical latency across repeated runs.',
    tags: ['ROS 2', 'Isaac Sim', 'MoveIt', 'Digital twin', 'AMR', 'CAD'],
    imageUrl: '/capstone-optimized.webp',
    imageFit: 'cover',
    videoUrl: 'https://www.youtube.com/embed/kH4mvG7b4qc?autoplay=1&mute=1&rel=0',
    secondaryImageUrl: '/capstone-digital-twin-optimized.webp',
    additionalMedia: ['/capstone-circuit-optimized.webp', '/capstone-arm-picking-preview.mp4'],
    features: [
      '6-DOF arm: forward and inverse kinematics, structural load calculation, motor selection and torque budgeting, CAD, 3D-printed fabrication',
      'Hierarchical control across embedded controllers, ROS 2 and an Isaac Sim twin, with signal handshaking between the physical line and the virtual model',
      'Photorealistic Omniverse warehouse twin, robot CAD imported via URDF with joint limits, collision meshes and material properties',
      'Modular ROS 2 nodes over the ROS 2 Bridge: LiDAR and RGB-D publishing, velocity command subscription, MoveIt planning experiments',
      'ACT trained, deployed and evaluated for cube picking',
      'MolmoAct2 attempted and rejected on measurement, at 1.18x signal-to-noise and indistinguishable from noise',
      'smolVLA selectable over the same dataset but not run, since it expects three camera streams and the rig has two',
    ],
    date: '2026',
    role: 'Project lead, 5-member team',
    featured: true,
  },
  {
    id: 'mira-on-the-edge',
    title: 'Mira on the Edge: On-Device Voice Robotics',
    shortDescription:
      'A Qualcomm Hack Challenge team entry running Vietnamese ASR and a quantised LLM entirely on an Arduino UNO Q, with the numbers measured and the failures published.',
    fullDescription:
      'A team entry for the Qualcomm Hack Challenge Vietnam, running a voice robotics stack on an Arduino UNO Q: a Qualcomm QRB2210 MPU with four Cortex-A53-class cores at 2.0 GHz and no dotprod or i8mm, paired with an STM32U585 MCU, 1737 MB of usable RAM and no swap. A Linux PC bridge and a rented RTX 4090 served an optional GPU pipeline. Measured on device: Vietnamese ASR with a 30M-parameter int8 Zipformer at 189 ms, and Qwen2.5-0.5B at Q4_0 in 403 MB running 20.09 tokens per second prefill and 11.89 decode. The same model at Q4_K_M was both larger and slower, at 463 MB and 16.65 / 10.26, which is not an error since llama.cpp repacks Q4_0 for ARM. The conversational path over the GPU pipeline round-tripped in 0.47 to 1.04 s, and a scored eval harness passed 95 percent, 82 of 86 cases.',
    impact:
      'Three failures root-caused rather than worked around, and one model rejected on measurement instead of shipped.',
    tags: ['llama.cpp', 'GGUF quantisation', 'Zipformer ASR', 'QRB2210', 'Edge inference'],
    imageUrl: '/qualcomm-uno-q-rig.webp',
    imageFit: 'cover',
    additionalMedia: [
      '/qualcomm-uno-q-board.webp',
      '/qualcomm-uno-q-arm.webp',
      '/qualcomm-uno-q-gripper.webp',
    ],
    features: [
      'Board-wide power crash traced to a single USB-C port both powering the board and back-feeding a nested hub against a fixed 5 V / 3 A PD profile, fixed with an independently powered single-stage hub',
      'Wake-word classifier never fired on Mira mid-phrase, having been trained only on isolated TTS words with a 1.6 s window that clipped word tails, replaced with fuzzy matching over ASR transcripts, which render the name at least eight different ways',
      'Prompt caching proved mandatory: without it a 1231-token system prompt cost roughly 70 s per turn',
      'MolmoAct2 action head measured at 1.18x signal-to-noise across contradictory instructions and documented as a rejection',
      '13 motions recorded in LeRobot dataset format',
      'Grasping does not work: the chain runs speech to object name to image coordinates, and the joint-angle step is missing',
    ],
    date: 'Aug 2026',
    role: 'Team member, power root cause, wake-word fix, quantisation benchmarks',
    repoUrl: 'https://github.com/fountainhead-2207/Qualcom_Mira',
    featured: true,
  },
  {
    id: 'healix',
    title: 'Healix: Multimodal AI Health Companion',
    shortDescription:
      'A bilingual health platform built in a three-night sprint, rearchitected mid-event when the audio endpoint broke.',
    fullDescription:
      'Healix is a bilingual English and Vietnamese mobile-first web platform built across a three-night hackathon sprint, using React, Vite, FastAPI and Python with Qwen-VL and Qwen-Max through the Dashscope API. Its Labs Analyzer agent extracts structured metrics from uploaded medical documents and validates them against more than 50 medical reference ranges. Mid-event an unstable base64 audio payload through Qwen-Audio broke the endpoint, so I split the pipeline, Google Speech Recognition for transcription and Qwen-Max for reasoning, and pitched it on stage.',
    impact: 'Top 7 finalist and stage presenter at Qwen AI Build Day.',
    tags: ['React', 'FastAPI', 'Qwen-VL', 'Qwen-Max', 'Dashscope'],
    features: [
      'Bilingual EN and VI mobile-first web platform',
      'Labs Analyzer agent validated against 50+ medical reference ranges',
      'Optical camera-and-flash heart-rate sensing concept',
      'Split transcription and reasoning pipeline after a mid-event endpoint failure',
    ],
    date: 'May 2026',
    role: 'Design and build',
  },
  {
    id: 'aims',
    title: 'AIMS: AIoT Automated Inventory Monitoring',
    shortDescription:
      'ESP32-class cameras running on-device vision to replace periodic manual stock counts with continuous supervision.',
    fullDescription:
      'AIMS puts ESP32-class microcontrollers with camera modules on the shelf and runs lightweight computer-vision object detection on the device itself. Sensing, on-device processing and inventory event triggering feed a central server and dashboard, replacing periodic manual stock counts with continuous supervision. The dashboard tracks inventory movement and stock-accuracy drift over time.',
    impact:
      'Consolation Prize, CTD Scholar, for the thesis Real-Time and Continuous Inventory Supervision with AIMS.',
    tags: ['ESP32', 'Edge vision', 'AIoT', 'Inventory'],
    features: [
      'On-device lightweight CV object detection',
      'Inventory event triggering feeding a central server',
      'Dashboard tracking stock movement and accuracy drift',
    ],
    date: 'Jan 2026',
    role: 'Researcher',
  },
  {
    id: 'ev-fleet',
    title: 'EV Fleet Optimisation and Battery-Swap Pilot Plan',
    shortDescription:
      'A smart-city pilot concept for EV fleet logistics and battery-swap network mechanics, architected with a technical team.',
    fullDescription:
      'I led a technical team to architect a smart-city pilot concept covering EV fleet logistics, battery-swap network mechanics, dynamic charging capacity and optimal hub placement. The proposal included NFC tracking, sensor fusion and live current monitoring to flag charging failures, along with an operational dashboard concept for pilot KPIs. This is a business and systems project rather than an engineering build, and is presented as such.',
    impact:
      'Top 12 finalist from 1,500 contestants, and Outstanding Leader of the Smart Engineering Track at iNext Leader by iConneX.',
    tags: ['EV fleet', 'Systems design', 'NFC', 'Operations'],
    imageUrl: '/inext-leader-presentation.webp',
    imageFit: 'cover',
    additionalMedia: ['/inext-leader-finalists.webp', '/inext-leader-top-12-smart-engineering.webp'],
    features: [
      'Battery-swap network mechanics and dynamic charging capacity',
      'Optimal hub placement analysis',
      'NFC tracking, sensor fusion and live current monitoring to flag charging failures',
      'Operational dashboard concept for pilot KPIs',
    ],
    date: 'Jun 2026',
    role: 'Technical team lead',
  },
  {
    id: 'turtle-bot',
    title: 'TurtleBot SLAM and Autonomous Navigation',
    shortDescription:
      'The ROS 2 Nav2 foundation project behind the later AMR work: 2D LiDAR SLAM, odometry tuning and autonomous obstacle avoidance.',
    fullDescription:
      'This established the navigation foundation for my later AMR work. I configured a differential-drive TurtleBot platform, tuned wheel odometry, integrated 2D LiDAR, built maps with SLAM and deployed the ROS 2 Nav2 stack for autonomous obstacle avoidance. The platform used 2D sensors and LiDAR only, with no depth camera. The chassis and sensor arrangement were modelled before physical assembly and validated through teleoperation.',
    impact: 'A localisation and navigation baseline that the warehouse robotics work reused.',
    tags: ['ROS 2', 'Nav2', 'SLAM', '2D LiDAR', 'URDF'],
    imageUrl: '/turtlebot-3d-model.gif',
    imageFit: 'contain',
    previewVideoUrl: '/turtlebot-teleoperating-preview.mp4',
    posterUrl: '/turtlebot-teleoperating-poster.webp',
    videoUrl: '/turtlebot-teleoperating-preview.mp4',
    features: [
      '2D LiDAR mapping and localisation',
      'Wheel odometry tuning',
      'ROS 2 Nav2 autonomous obstacle avoidance',
      'Remote teleoperation',
    ],
    date: 'Dec 2025',
    role: 'ROS 2 Developer',
    collaborators: ['Nhi Hoang', 'Tan Tai', 'Thanh Ly'],
  },
  {
    id: 'plc-sorting',
    title: 'PLC Sorting and Pick-and-Place',
    shortDescription:
      'Ladder logic on a Siemens S7-1200 for a sorting and pick-and-place sequence, on a rig that already existed.',
    fullDescription:
      'Laboratory experiment subjects on a Siemens S7-1200: a sorting and pick-and-place sequence with sensor-triggered part detection and actuator sequencing. Worth being precise about the scope. The rig and hardware already existed and were wired, and my contribution was writing the ladder logic so the system behaved to the required control logic. I did not build the cell. This is separate from the capstone, and is my only PLC work.',
    tags: ['Siemens S7-1200', 'Ladder logic', 'Industrial automation'],
    features: [
      'Sensor-triggered part detection',
      'Actuator sequencing for sorting and pick-and-place',
    ],
    date: 'Oct 2025',
    role: 'Control logic',
  },
  {
    id: 'vrp',
    title: 'Graph Learning for Vehicle Routing',
    shortDescription:
      'Graph neural networks used to narrow the VRP search space across a Ho Chi Minh City distribution network.',
    fullDescription:
      'I processed large-scale GIS delivery-network data and trained graph models in Python and PyTorch Geometric to predict promising edges and narrow the Vehicle Routing Problem search space. The models were benchmarked against a baseline solver on travel distance and on-time delivery across the Ho Chi Minh City distribution network. No percentage improvement figure has been measured, so none is claimed.',
    tags: ['PyTorch Geometric', 'GNN', 'VRP', 'GIS'],
    imageUrl: '/vrp-optimized.webp',
    imageFit: 'contain',
    features: [
      'Large-scale GIS delivery-network processing',
      'Graph models predicting promising edges to narrow the search space',
      'Benchmarked against a baseline solver on distance and on-time delivery',
    ],
    date: 'Apr 2025',
    role: 'Applied machine learning',
  },
  {
    id: 'semiconductor-mcdm',
    title: 'National Semiconductor Competitiveness Assessment',
    shortDescription:
      'A BWM and TOPSIS decision framework modelling the trade-off between rare earth reserves and technological maturity.',
    fullDescription:
      'A multicriteria decision-making framework combining the Best-Worst Method with TOPSIS. Existing literature assessed national semiconductor competitiveness on isolated metrics and did not account for the correlation between rare earth element reserves and technological maturity. This framework models the non-linear trade-offs between dynamic capabilities such as R&D intensity and static advantages such as REE reserves, addressing resource-curse risk for nations moving into high-tech manufacturing. The output is a decision-support tool.',
    tags: ['MCDM', 'BWM', 'TOPSIS', 'Operations research'],
    features: [
      'BWM criteria weighting combined with TOPSIS ranking',
      'Models the correlation between REE reserves and technological maturity',
      'Addresses resource-curse risk in high-tech manufacturing transitions',
    ],
    date: '2026',
    role: 'Researcher',
  },
  {
    id: 'blockchain-coffee',
    title: 'Blockchain in Coffee Supply Chain Management',
    shortDescription:
      'Third Prize UEH research on an immutable data architecture for security in agricultural logistics.',
    fullDescription:
      'Research into an immutable data architecture for data security in agricultural logistics, applied to the coffee supply chain. Awarded Third Prize in the UEH Young Researcher Award.',
    impact: 'Third Prize, UEH Young Researcher Award.',
    tags: ['Blockchain', 'Supply chain', 'Research', 'Data security'],
    imageUrl: '/coffee-blockchain-research-optimized.webp',
    imageFit: 'cover',
    features: [
      'Immutable data architecture for agricultural logistics',
      'Data security and traceability focus',
    ],
    date: 'Dec 2025',
    role: 'Researcher',
  },
  {
    id: 'edge-ai-vision',
    title: 'Edge-AI Vision App for the Visually Impaired',
    shortDescription:
      'A fully offline Flutter app recognising local currency denominations in real time, with spoken feedback.',
    fullDescription:
      'A cross-platform Flutter and Dart mobile app running a TensorFlow Lite computer-vision model entirely on the device, recognising local currency denominations in real time and giving text-to-speech audio feedback. Offline by design, because the people who need it should not need a connection to use it.',
    tags: ['Flutter', 'TensorFlow Lite', 'On-device CV', 'Accessibility'],
    features: [
      'Fully offline TensorFlow Lite inference',
      'Real-time currency denomination recognition',
      'Text-to-speech audio feedback',
    ],
    date: 'Mar 2024',
    role: 'Design and build',
  },
  {
    id: '2-dof-arm',
    title: 'IoT Smart Fluid Control and Automated Gantry',
    shortDescription:
      'A 2-DOF planar gantry, CAD-modelled and 3D-printed, automating fluid dispensing for volumetric quality control.',
    fullDescription:
      'A two-degree-of-freedom planar actuator gantry with CAD-modelled and 3D-printed mechanics, microcontrollers and stepper motors, driven by G-code path planning to automate fluid dispensing for volumetric quality control.',
    tags: ['CAD', 'Embedded systems', 'G-code', 'Stepper motors'],
    imageUrl: '/2-dof-robot-arm-poster.webp',
    imageFit: 'contain',
    videoUrl: '/2-dof-robot-arm-preview.mp4',
    posterUrl: '/2-dof-robot-arm-poster.webp',
    features: [
      'CAD-modelled and 3D-printed mechanics',
      'Stepper motor and microcontroller integration',
      'G-code path planning for volumetric dispensing',
    ],
    date: '2024',
    role: 'Design and build',
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
    organization: 'Agentic AI Build Week, Physical AI and Robotics track',
    date: 'Jul 2026',
    description:
      'For Mira, a voice-controlled SO-101 agent mapping LLM tool calls onto motion primitives, with a camera scan the model can trigger itself.',
    category: 'Hackathon',
  },
  {
    id: 'a2',
    title: 'Top 12 Finalist and Outstanding Leader, Smart Engineering Track',
    organization: 'iNext Leader by iConneX',
    date: 'Jun 2026',
    description:
      'Selected from 1,500 contestants for an EV fleet and battery-swap pilot plan covering charging-failure monitoring, hub placement and operational KPIs.',
    category: 'Competition',
    imageUrl: '/inext-leader-top-12-smart-engineering.webp',
    gallery: ['/inext-leader-finalists.webp', '/inext-leader-presentation.webp'],
  },
  {
    id: 'a3',
    title: 'Top 7 Finalist and Stage Presenter',
    organization: 'Qwen AI Build Day',
    date: 'May 2026',
    description:
      'For Healix, a bilingual multimodal health platform, rearchitected mid-event after the audio endpoint failed and pitched on stage.',
    category: 'Hackathon',
  },
  {
    id: 'a4',
    title: 'Consolation Prize, CTD Scholar',
    organization: 'CTD Scholar',
    date: 'Jan 2026',
    description:
      'For the thesis Real-Time and Continuous Inventory Supervision with AIMS, an AIoT system using edge vision devices.',
    category: 'Award',
  },
  {
    id: 'a5',
    title: 'Third Prize, UEH Young Researcher Award',
    organization: 'UEH University',
    date: 'Dec 2025',
    description:
      'For research on blockchain-based data security and traceability in the coffee supply chain.',
    category: 'Award',
  },
];
