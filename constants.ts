import { Project, Certification, Accomplishment } from './types';

export const HERO_TITLES = [
  "Robot Engineer",
  "AI Engineer",
  "iNext Leader Finalist",
  "Blockchain & AI Researcher",
  "Mechatronics Specialist",
  "Automation Expert"
];

export const PROJECTS: Project[] = [
  {
    id: 'capstone',
    title: 'Smart Factory & Digital Twin',
    shortDescription: 'Comprehensive capstone featuring AMR pallet handling, robotic arm picking, and a complete digital twin.',
    fullDescription: 'This capstone project represents a fully integrated smart factory environment. It features an Autonomous Mobile Robot (AMR) for handling pallets, synchronized with a robotic arm for precise picking operations. The entire physical system is mirrored by a Digital Twin, allowing for real-time monitoring, simulation, and optimization. The project also involved custom circuit design and AI model training (SO101) for object recognition.',
    tags: ['Digital Twin', 'AMR', 'Robotic Arm', 'Circuit Design', 'AI Training'],
    imageUrl: '/capstone.jpg',
    videoUrl: 'https://www.youtube.com/embed/kH4mvG7b4qc',
    secondaryImageUrl: '/capstone-digital-twin.jpg',
    additionalMedia: ['/capstone-circuit.jpg', '/capstone-so101-training.jpg', '/capstone-arm-picking.gif'],
    features: ['Digital Twin Simulation', 'AMR Pallet Handling', 'Robotic Arm Picking', 'Custom Circuitry', 'AI Vision Training'],
    date: '2025',
    role: 'Lead Engineer'
  },
  {
    id: 'turtle-bot',
    title: 'Turtle Bot SLAM & Navigation',
    shortDescription: 'Differential drive mobile robot with SLAM and teleoperation.',
    fullDescription: 'Designed and built a custom differential drive mobile robot platform. This project features a robust 3D-modeled hardware chassis, integrating LiDAR for environmental mapping and SLAM (Simultaneous Localization and Mapping). It supports remote teleoperation and autonomous navigation using ROS2 (Nav2).',
    tags: ['ROS2', 'Nav2', 'SLAM', 'LiDAR', '3D Modeling'],
    imageUrl: '/turtlebot-3d-model.gif',
    videoUrl: '/turtlebot-teleoperating.gif',
    features: ['Custom 3D Printed Chassis', '2D LiDAR Mapping (SLAM)', 'ROS2 Nav2 Integration', 'Remote Teleoperation'],
    date: 'May 2025',
    role: 'ROS Developer',
    collaborators: ['Nhi Hoang', 'Tan Tai', 'Thanh Ly']
  },
  {
    id: 'iot-garden',
    title: 'IoT Smart Garden',
    shortDescription: 'Automated monitoring and care system for plants using IoT sensors.',
    fullDescription: 'Designed an IoT-based smart garden model that automates plant care. The system monitors environmental factors like soil moisture, temperature, and humidity, adjusting watering schedules automatically. The project includes a physical model demonstrating the automated mechanisms and real-time data tracking.',
    tags: ['IoT', 'Automation', 'Sensors', 'Microcontroller'],
    imageUrl: '/iot-smart-garden-model.gif',
    features: ['Automated Watering', 'Environmental Monitoring', 'Real-time Dashboard', 'Hardware Model'],
    date: '2024',
    role: 'Hardware Engineer'
  },
  {
    id: '2-dof-arm',
    title: '2-DOF Robotic Arm',
    shortDescription: 'Custom-built 2-degree-of-freedom robotic arm for precise planar tasks.',
    fullDescription: 'Developed a 2-DOF robotic arm focusing on precise planar kinematics. The project involved calculating forward and inverse kinematics to control the end-effector position accurately. It serves as a foundational platform for understanding robotic manipulation, trajectory planning, and motor control.',
    tags: ['Robotics', 'Kinematics', 'Control Systems', 'Hardware'],
    imageUrl: '/2-dof-robot-arm.gif',
    features: ['Forward & Inverse Kinematics', 'Trajectory Planning', 'Precise Motor Control', 'Custom Hardware'],
    date: '2023',
    role: 'Robotics Engineer'
  },
  {
    id: 'vrp',
    title: 'VRP Logistics Optimizer',
    shortDescription: 'Algorithmic solution for optimizing the Vehicle Routing Problem.',
    fullDescription: 'Implemented an optimization algorithm to solve the Vehicle Routing Problem (VRP). The system calculates the most efficient routes for a fleet of vehicles delivering to multiple locations, minimizing total distance and cost while respecting constraints. This showcases strong capabilities in operations research and algorithmic problem-solving.',
    tags: ['Algorithms', 'Optimization', 'Logistics', 'Data Analytics'],
    imageUrl: '/VRP.png',
    features: ['Route Optimization', 'Cost Minimization', 'Constraint Handling', 'Algorithmic Efficiency'],
    date: '2024',
    role: 'Algorithm Developer'
  },
  {
    id: 'blockchain-coffee',
    title: 'Blockchain in Coffee Supply Chain',
    shortDescription: 'Award-winning research on blockchain application in supply chain management.',
    fullDescription: 'Researched and authored a thesis on "Blockchain Application in Coffee Supply Chain Management." This research explores the intersection of blockchain security, transparency, and supply chain logistics, proposing an innovative model to track and verify the origin and quality of coffee beans. The work was recognized with the Third Prize (Giải C) in the UEH Young Researcher Award.',
    tags: ['Blockchain', 'Supply Chain', 'Research', 'Security', 'Business Models'],
    imageUrl: '/Coffee%20blockchain%20research.jpg',
    features: ['Supply Chain Transparency', 'Blockchain Security', 'Data Analytics', 'Innovative Business Model'],
    date: '2025',
    role: 'Lead Researcher'
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'c1',
    title: 'IELTS 7.5 (Overall)',
    issuer: 'British Council',
    date: 'Sep 2025',
    badgeUrl: '/british-council.svg',
    verifyUrl: 'https://drive.google.com/file/d/1XMzPeHns2E2jnxcN4J_udBvTOIp17ZgZ/view?usp=sharing'
  },
  {
    id: 'c2',
    title: 'Google Advanced Data Analytics Professional Certificate',
    issuer: 'Google',
    date: '2025',
    badgeUrl: 'https://www.gstatic.com/images/branding/googleg/1x/googleg_standard_color_128dp.png',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/professional-cert/86N6I1S14OHG'
  },
  {
    id: 'c3',
    title: 'The Nuts and Bolts of Machine Learning',
    issuer: 'Google',
    date: '2025',
    badgeUrl: 'https://www.gstatic.com/images/branding/googleg/1x/googleg_standard_color_128dp.png',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/records/793FVAWLUPJN'
  },
  {
    id: 'c4',
    title: 'Transformer Models and BERT Model',
    issuer: 'Google Cloud',
    date: '2025',
    badgeUrl: 'https://cdn.simpleicons.org/googlecloud',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/records/PXM5911PMO2V'
  },
  {
    id: 'c5',
    title: 'Blockchain Business Models',
    issuer: 'Duke University',
    date: '2025',
    badgeUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Duke_University_logo.svg',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/records/1NBS5FTE60O8'
  },
  {
    id: 'c6',
    title: 'Harnessing the Power of Data with Power BI',
    issuer: 'Microsoft',
    date: '2025',
    badgeUrl: '/microsoft.svg',
    // Microsoft official logo
    verifyUrl: 'https://www.coursera.org/account/accomplishments/records/KSGEAJSUN7FG'
  },
  {
    id: 'c7',
    title: 'Robotics in High-Tech Manufacturing',
    issuer: 'Coursera',
    date: '2024',
    badgeUrl: 'https://cdn.simpleicons.org/coursera',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/WNMZEYCHLD8Z'
  },
  {
    id: 'c8',
    title: 'Self-Driving Car Specialization Course',
    issuer: 'Packt',
    date: '2024',
    badgeUrl: 'https://cdn.simpleicons.org/coursera',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/IX1ITY29W2JZ'
  },
  {
    id: 'c9',
    title: 'Basics of Robotics',
    issuer: 'Siemens',
    date: '2024',
    badgeUrl: 'https://cdn.simpleicons.org/siemens',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/A860FXKV6RYK'
  },
  {
    id: 'c10',
    title: 'Unilever Supply Chain Data Analyst',
    issuer: 'Unilever / Coursera',
    date: '2024',
    badgeUrl: 'https://cdn.simpleicons.org/coursera',
    verifyUrl: 'https://coursera.org/share/b2fa4a542c40ee9a62298e117f0c4cb5'
  }
];

export const ACCOMPLISHMENTS: Accomplishment[] = [
  {
    id: 'a2',
    title: 'Top 12 Finalist - iNext Leader',
    organization: 'iConneX',
    date: 'June 2026',
    description: 'Attended iNext Leader by iConneX and became a Top 12 finalist from 1,500 contestants. Honored as the Outstanding Smart Engineering Team Track finalist for the competition finale.',
    category: 'Competition',
    imageUrl: '/inext-leader-top-12-smart-engineering.webp',
    gallery: ['/inext-leader-finalists.webp', '/inext-leader-presentation.webp']
  },
  {
    id: 'a1',
    title: 'Third Prize (Giải C) - UEH Young Researcher Award',
    organization: 'University of Economics Ho Chi Minh City (UEH)',
    date: '2025',
    description: 'Awarded for the thesis "Blockchain Application in Coffee Supply Chain Management", demonstrating innovative approaches to supply chain security and transparency.',
    category: 'Award'
  }
];
