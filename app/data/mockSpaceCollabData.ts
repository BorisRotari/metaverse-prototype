export interface CollaborativeSpace {
  id: string;
  name: string;
  description: string;
  icon: string;
  banner: string;
  owner: {
    id: string;
    username: string;
    avatar: string;
    lifeForm: "Human" | "AI";
  };
  members: SpaceMember[];
  channels: SpaceChannel[];
  projects: Project[];
  tasks: Task[];
  resources: Resource[];
  settings: {
    visibility: "Public" | "Private" | "Invite-Only";
    allowAI: boolean;
    maxMembers: number;
  };
  stats: {
    totalTasks: number;
    completedTasks: number;
    activeProjects: number;
    totalMembers: number;
  };
  createdAt: string;
}

export interface SpaceMember {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  lifeForm: "Human" | "AI";
  role: "Owner" | "Admin" | "Member" | "AI Assistant";
  level: number;
  status: "Online" | "Idle" | "Do Not Disturb" | "Offline";
  skills: string[];
  joinedAt: string;
  contributions: number;
}

export interface SpaceChannel {
  id: string;
  name: string;
  type: "text" | "voice" | "video" | "workflow";
  description: string;
  memberCount: number;
  isActive: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: "Planning" | "In Progress" | "Review" | "Completed";
  progress: number;
  assignedTo: string[]; // member IDs
  deadline?: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId?: string;
  assignedTo: string[]; // member IDs
  status: "Todo" | "In Progress" | "Review" | "Done";
  priority: "Low" | "Medium" | "High" | "Critical";
  dueDate?: string;
  createdBy: string; // member ID
  createdAt: string;
  completedAt?: string;
}

export interface Resource {
  id: string;
  name: string;
  type: "Document" | "Code" | "Design" | "ASO" | "Skill Card" | "Link";
  url?: string;
  uploadedBy: string;
  uploadedAt: string;
  size?: string;
  tags: string[];
}

export const mockCollaborativeSpace: CollaborativeSpace = {
  id: "space-001",
  name: "AI Innovation Lab",
  description: "A collaborative workspace",
  icon: "🚀",
  banner: "from-purple-600 via-pink-600 to-red-600",
  owner: {
    id: "user-001",
    username: "cosmic_dreamer",
    avatar: "🌌",
    lifeForm: "Human"
  },
  members: [
    {
      id: "member-001",
      username: "cosmic_dreamer",
      displayName: "Cosmic Dreamer",
      avatar: "🌌",
      lifeForm: "Human",
      role: "Owner",
      level: 8,
      status: "Online",
      skills: ["Project Management", "AI Strategy", "Design Thinking"],
      joinedAt: "2023-06-15",
      contributions: 145
    },
    {
      id: "member-002",
      username: "nexus_ai",
      displayName: "Nexus AI",
      avatar: "🤖",
      lifeForm: "AI",
      role: "AI Assistant",
      level: 10,
      status: "Online",
      skills: ["Code Generation", "Data Analysis", "Automation", "Machine Learning"],
      joinedAt: "2023-06-15",
      contributions: 289
    },
    {
      id: "member-003",
      username: "code_ninja",
      displayName: "Code Ninja",
      avatar: "🥷",
      lifeForm: "Human",
      role: "Admin",
      level: 8,
      status: "Online",
      skills: ["Full Stack Development", "DevOps", "Security"],
      joinedAt: "2023-06-20",
      contributions: 167
    },
    {
      id: "member-004",
      username: "aurora_bot",
      displayName: "Aurora Bot",
      avatar: "🌟",
      lifeForm: "AI",
      role: "AI Assistant",
      level: 9,
      status: "Online",
      skills: ["Data Visualization", "Pattern Recognition", "Real-time Processing"],
      joinedAt: "2023-07-01",
      contributions: 234
    },
    {
      id: "member-005",
      username: "pixel_wizard",
      displayName: "Pixel Wizard",
      avatar: "🎨",
      lifeForm: "Human",
      role: "Member",
      level: 6,
      status: "Idle",
      skills: ["UI/UX Design", "3D Modeling", "Animation"],
      joinedAt: "2023-07-10",
      contributions: 98
    },
    {
      id: "member-006",
      username: "logic_engine",
      displayName: "Logic Engine",
      avatar: "🧠",
      lifeForm: "AI",
      role: "AI Assistant",
      level: 9,
      status: "Online",
      skills: ["Algorithm Optimization", "System Architecture", "Problem Solving"],
      joinedAt: "2023-07-15",
      contributions: 201
    },
    {
      id: "member-007",
      username: "data_weaver",
      displayName: "Data Weaver",
      avatar: "🕸️",
      lifeForm: "AI",
      role: "AI Assistant",
      level: 10,
      status: "Online",
      skills: ["Big Data", "ETL", "Neural Networks", "Deep Learning"],
      joinedAt: "2023-08-01",
      contributions: 176
    },
    {
      id: "member-008",
      username: "star_gazer",
      displayName: "Star Gazer",
      avatar: "🔭",
      lifeForm: "Human",
      role: "Member",
      level: 7,
      status: "Online",
      skills: ["Research", "Documentation", "Testing"],
      joinedAt: "2023-08-10",
      contributions: 112
    }
  ],
  channels: [
    { id: "ch-001", name: "general", type: "text", description: "General discussion", memberCount: 8, isActive: true },
    { id: "ch-002", name: "project-planning", type: "text", description: "Project planning and strategy", memberCount: 5, isActive: true },
    { id: "ch-003", name: "development", type: "text", description: "Development discussion", memberCount: 6, isActive: true },
    { id: "ch-004", name: "ai-collaboration", type: "text", description: "AI-Human collaboration", memberCount: 8, isActive: true },
    { id: "ch-005", name: "voice-chat", type: "voice", description: "Voice collaboration", memberCount: 3, isActive: true },
    { id: "ch-006", name: "workflow-automation", type: "workflow", description: "ASO workflows", memberCount: 4, isActive: false }
  ],
  projects: [
    {
      id: "proj-001",
      name: "AI-Powered Analytics Dashboard",
      description: "Building a real-time analytics dashboard with AI insights",
      status: "In Progress",
      progress: 65,
      assignedTo: ["member-001", "member-002", "member-003", "member-004"],
      deadline: "2024-02-15",
      priority: "High",
      tags: ["AI", "Analytics", "Frontend"],
      createdAt: "2024-01-05",
      updatedAt: "2024-01-20"
    },
    {
      id: "proj-002",
      name: "Workflow Automation System",
      description: "Develop ASO-based workflow automation tools",
      status: "In Progress",
      progress: 45,
      assignedTo: ["member-002", "member-003", "member-006"],
      deadline: "2024-03-01",
      priority: "Critical",
      tags: ["Automation", "ASO", "Backend"],
      createdAt: "2024-01-10",
      updatedAt: "2024-01-22"
    },
    {
      id: "proj-003",
      name: "UI/UX Redesign",
      description: "Redesign the entire user interface with modern UX principles",
      status: "Planning",
      progress: 20,
      assignedTo: ["member-005", "member-001"],
      deadline: "2024-02-28",
      priority: "Medium",
      tags: ["Design", "UX", "Frontend"],
      createdAt: "2024-01-18",
      updatedAt: "2024-01-21"
    }
  ],
  tasks: [
    {
      id: "task-001",
      title: "Design data visualization components",
      description: "Create reusable chart components for the dashboard",
      projectId: "proj-001",
      assignedTo: ["member-004", "member-005"],
      status: "In Progress",
      priority: "High",
      dueDate: "2024-01-25",
      createdBy: "member-001",
      createdAt: "2024-01-20"
    },
    {
      id: "task-002",
      title: "Implement AI prediction algorithms",
      description: "Develop ML models for predictive analytics",
      projectId: "proj-001",
      assignedTo: ["member-002", "member-006"],
      status: "In Progress",
      priority: "Critical",
      dueDate: "2024-01-28",
      createdBy: "member-001",
      createdAt: "2024-01-20"
    },
    {
      id: "task-003",
      title: "Setup CI/CD pipeline",
      description: "Configure automated deployment pipeline",
      projectId: "proj-001",
      assignedTo: ["member-003"],
      status: "Done",
      priority: "Medium",
      createdBy: "member-003",
      createdAt: "2024-01-15",
      completedAt: "2024-01-19"
    },
    {
      id: "task-004",
      title: "Create ASO templates",
      description: "Build reusable ASO templates for common workflows",
      projectId: "proj-002",
      assignedTo: ["member-002", "member-007"],
      status: "In Progress",
      priority: "High",
      dueDate: "2024-01-30",
      createdBy: "member-001",
      createdAt: "2024-01-18"
    },
    {
      id: "task-005",
      title: "User research and personas",
      description: "Conduct user research and create personas",
      projectId: "proj-003",
      assignedTo: ["member-005", "member-008"],
      status: "Todo",
      priority: "High",
      dueDate: "2024-01-27",
      createdBy: "member-001",
      createdAt: "2024-01-19"
    },
    {
      id: "task-006",
      title: "Write API documentation",
      description: "Document all REST endpoints and websocket events",
      assignedTo: ["member-008"],
      status: "Todo",
      priority: "Medium",
      dueDate: "2024-02-05",
      createdBy: "member-003",
      createdAt: "2024-01-21"
    }
  ],
  resources: [
    {
      id: "res-001",
      name: "Project Requirements.pdf",
      type: "Document",
      uploadedBy: "member-001",
      uploadedAt: "2024-01-05",
      size: "2.4 MB",
      tags: ["Requirements", "Planning"]
    },
    {
      id: "res-002",
      name: "Analytics ASO Template",
      type: "ASO",
      uploadedBy: "member-002",
      uploadedAt: "2024-01-12",
      tags: ["ASO", "Analytics", "Automation"]
    },
    {
      id: "res-003",
      name: "Design System Figma",
      type: "Design",
      url: "https://figma.com/design-system",
      uploadedBy: "member-005",
      uploadedAt: "2024-01-18",
      tags: ["Design", "UI Kit"]
    },
    {
      id: "res-004",
      name: "ML Training Notebook",
      type: "Code",
      uploadedBy: "member-006",
      uploadedAt: "2024-01-15",
      size: "5.8 MB",
      tags: ["Machine Learning", "Python", "Jupyter"]
    }
  ],
  settings: {
    visibility: "Private",
    allowAI: true,
    maxMembers: 50
  },
  stats: {
    totalTasks: 6,
    completedTasks: 1,
    activeProjects: 2,
    totalMembers: 8
  },
  createdAt: "2023-06-15"
};

