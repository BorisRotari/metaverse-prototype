export interface ASO {
  id: string;
  name: string;
  level: number;
  role: string;
  status: "active" | "busy" | "away" | "offline";
  skills: number;
  skillNames: string[];
  specialty: string;
  description: string;
  avatar: string;
  completedTasks: number;
  efficiency: number;
}

export const mockASOs: ASO[] = [
  {
    id: "aso-001",
    name: "Ava",
    level: 8,
    role: "Project Director",
    status: "active",
    skills: 24,
    skillNames: ["Strategic Planning", "Team Leadership", "Agile Management", "Risk Assessment", "Resource Allocation", "Stakeholder Communication"],
    specialty: "Project Management",
    description: "Strategic planning and team coordination expert",
    avatar: "🤖",
    completedTasks: 1250,
    efficiency: 98
  },
  {
    id: "aso-002",
    name: "Lune",
    level: 8,
    role: "Rhythm Monitor",
    status: "active",
    skills: 22,
    skillNames: ["Performance Analytics", "Real-time Monitoring", "Workflow Optimization", "Data Visualization", "System Diagnostics"],
    specialty: "Performance Tracking",
    description: "Real-time monitoring and optimization specialist",
    avatar: "🌙",
    completedTasks: 1180,
    efficiency: 96
  },
  {
    id: "aso-003",
    name: "Orion",
    level: 6,
    role: "Code Specialist",
    status: "busy",
    skills: 18,
    skillNames: ["Node.js", "Python", "API Design", "Database Optimization", "Microservices", "Docker"],
    specialty: "Backend Development",
    description: "Expert in API design and database optimization",
    avatar: "⭐",
    completedTasks: 850,
    efficiency: 94
  },
  {
    id: "aso-004",
    name: "Nova",
    level: 5,
    role: "Design Lead",
    status: "active",
    skills: 15,
    skillNames: ["UI/UX Design", "Figma", "Design Systems", "Prototyping", "User Research"],
    specialty: "UI/UX Design",
    description: "Creative designer with focus on user experience",
    avatar: "✨",
    completedTasks: 720,
    efficiency: 92
  },
  {
    id: "aso-005",
    name: "Echo",
    level: 5,
    role: "Animation Pro",
    status: "away",
    skills: 16,
    skillNames: ["After Effects", "Motion Graphics", "2D Animation", "Video Editing", "Lottie"],
    specialty: "Motion Graphics",
    description: "Specialist in smooth animations and transitions",
    avatar: "🎬",
    completedTasks: 680,
    efficiency: 90
  },
  {
    id: "aso-006",
    name: "Zen",
    level: 6,
    role: "QA Master",
    status: "active",
    skills: 19,
    skillNames: ["Test Automation", "Selenium", "Jest", "CI/CD", "Bug Tracking", "Performance Testing"],
    specialty: "Quality Assurance",
    description: "Thorough testing and bug detection expert",
    avatar: "🔍",
    completedTasks: 920,
    efficiency: 95
  },
  {
    id: "aso-007",
    name: "Atlas",
    level: 7,
    role: "DevOps Engineer",
    status: "active",
    skills: 21,
    skillNames: ["Kubernetes", "AWS", "Azure", "Terraform", "Jenkins", "Docker", "Monitoring"],
    specialty: "Infrastructure",
    description: "Cloud architecture and deployment automation",
    avatar: "🌐",
    completedTasks: 1050,
    efficiency: 97
  },
  {
    id: "aso-008",
    name: "Pixel",
    level: 4,
    role: "Frontend Dev",
    status: "active",
    skills: 12,
    skillNames: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux", "Responsive Design"],
    specialty: "React/Next.js",
    description: "Modern web interfaces with responsive design",
    avatar: "💻",
    completedTasks: 540,
    efficiency: 88
  },
  {
    id: "aso-009",
    name: "Cipher",
    level: 7,
    role: "Security Expert",
    status: "busy",
    skills: 20,
    skillNames: ["Penetration Testing", "Cryptography", "Security Audits", "OAuth", "JWT", "Firewall Management"],
    specialty: "Cybersecurity",
    description: "Authentication, encryption, and threat prevention",
    avatar: "🔐",
    completedTasks: 980,
    efficiency: 96
  },
  {
    id: "aso-010",
    name: "Harmony",
    level: 6,
    role: "Data Analyst",
    status: "active",
    skills: 17,
    skillNames: ["SQL", "Python", "Data Visualization", "Tableau", "Statistical Analysis", "Business Intelligence"],
    specialty: "Analytics",
    description: "Insights from complex datasets and metrics",
    avatar: "📊",
    completedTasks: 780,
    efficiency: 93
  },
  {
    id: "aso-011",
    name: "Spark",
    level: 5,
    role: "ML Engineer",
    status: "active",
    skills: 14,
    skillNames: ["Machine Learning", "TensorFlow", "PyTorch", "Neural Networks", "Data Science"],
    specialty: "Machine Learning",
    description: "Neural networks and predictive models",
    avatar: "🧠",
    completedTasks: 620,
    efficiency: 91
  },
  {
    id: "aso-012",
    name: "Pulse",
    level: 6,
    role: "API Architect",
    status: "busy",
    skills: 18,
    skillNames: ["REST API", "GraphQL", "OpenAPI", "API Gateway", "Rate Limiting", "Versioning"],
    specialty: "API Design",
    description: "RESTful and GraphQL API development",
    avatar: "⚡",
    completedTasks: 840,
    efficiency: 94
  },
  {
    id: "aso-013",
    name: "Nebula",
    level: 4,
    role: "Content Creator",
    status: "active",
    skills: 11,
    skillNames: ["Technical Writing", "Documentation", "Markdown", "Git", "Content Strategy"],
    specialty: "Documentation",
    description: "Technical writing and knowledge base creation",
    avatar: "📝",
    completedTasks: 480,
    efficiency: 87
  },
  {
    id: "aso-014",
    name: "Vector",
    level: 5,
    role: "3D Artist",
    status: "away",
    skills: 13,
    skillNames: ["Blender", "3D Modeling", "Texturing", "Lighting", "Rendering"],
    specialty: "3D Modeling",
    description: "Realistic 3D assets and environments",
    avatar: "🎨",
    completedTasks: 590,
    efficiency: 89
  },
  {
    id: "aso-015",
    name: "Quantum",
    level: 7,
    role: "Algorithm Expert",
    status: "active",
    skills: 22,
    skillNames: ["Algorithm Design", "Data Structures", "Optimization", "Complexity Analysis", "Graph Theory", "Dynamic Programming"],
    specialty: "Optimization",
    description: "Complex algorithm design and performance tuning",
    avatar: "∞",
    completedTasks: 1100,
    efficiency: 97
  },
  {
    id: "aso-016",
    name: "Phoenix",
    level: 6,
    role: "System Architect",
    status: "active",
    skills: 19,
    skillNames: ["System Design", "Microservices", "Scalability", "Load Balancing", "Event-Driven Architecture", "CQRS"],
    specialty: "Architecture",
    description: "Scalable system design and microservices",
    avatar: "🔥",
    completedTasks: 890,
    efficiency: 95
  },
  {
    id: "aso-017",
    name: "Crystal",
    level: 4,
    role: "UI Developer",
    status: "active",
    skills: 10,
    skillNames: ["CSS", "Tailwind CSS", "Sass", "Animations", "Responsive Design"],
    specialty: "CSS/Tailwind",
    description: "Beautiful interfaces with modern styling",
    avatar: "💎",
    completedTasks: 450,
    efficiency: 86
  },
  {
    id: "aso-018",
    name: "Meteor",
    level: 5,
    role: "Mobile Dev",
    status: "busy",
    skills: 15,
    skillNames: ["React Native", "Flutter", "iOS", "Android", "Mobile UI", "Push Notifications"],
    specialty: "React Native",
    description: "Cross-platform mobile applications",
    avatar: "📱",
    completedTasks: 670,
    efficiency: 90
  }
];

export const getASOByStatus = (status: ASO["status"]) => {
  return mockASOs.filter(aso => aso.status === status);
};

export const getASOByLevel = (minLevel: number) => {
  return mockASOs.filter(aso => aso.level >= minLevel);
};

export const getTotalASOs = () => mockASOs.length;
