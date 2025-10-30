export interface SkillCard {
  id: string;
  name: string;
  category: string;
  creator: string;
  level: number;
  uses: number;
  steps: number;
  stepDescriptions: string[];
  description: string;
  icon: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  estimatedTime: string;
  tags: string[];
  approved: boolean;
  approvedBy?: string;
}

export const mockSkillCards: SkillCard[] = [
  {
    id: "skill-001",
    name: "Light & Shadow Render Routine",
    category: "Animation",
    creator: "Level 3 Artist",
    level: 3,
    uses: 142,
    steps: 4,
    stepDescriptions: [
      "Collect 3D models from shared asset pool",
      "Run light simulation (Day/Night mode toggle)",
      "Export 15-second preview video to shared folder",
      "Notify group chat when render is complete"
    ],
    description: "Automated 3D rendering workflow with day/night toggle. Optimizes light sources and shadow calculations for realistic scenes.",
    icon: "🎬",
    difficulty: "Intermediate",
    estimatedTime: "15 min",
    tags: ["3D", "Rendering", "Lighting", "Blender"],
    approved: true,
    approvedBy: "Level 4 Reviewer"
  },
  {
    id: "skill-002",
    name: "AI Test Environment Setup",
    category: "Development",
    creator: "Level 3 Developer",
    level: 3,
    uses: 89,
    steps: 4,
    stepDescriptions: [
      "Clone target repo and scan dependencies",
      "Auto-generate local .env config file",
      "Create test logs and link to BoloboloMi Console",
      "Run smoke test with feedback summary"
    ],
    description: "Auto-configure development environment with comprehensive testing suite. Includes smoke tests and automated feedback.",
    icon: "⚙️",
    difficulty: "Intermediate",
    estimatedTime: "10 min",
    tags: ["Testing", "CI/CD", "Automation", "DevOps"],
    approved: true,
    approvedBy: "Level 4 Reviewer"
  },
  {
    id: "skill-003",
    name: "Project Report Generator",
    category: "Management",
    creator: "Level 4 PM",
    level: 4,
    uses: 201,
    steps: 5,
    stepDescriptions: [
          "Collect task completion data from all team members",
          "Analyze performance metrics and identify bottlenecks",
          "Generate visualizations for key performance indicators",
          "Compile comprehensive summary with optimization suggestions",
          "Distribute report to stakeholders and project leads"
    ],
    description: "Generate comprehensive project summaries with performance metrics, bottlenecks, and optimization suggestions.",
    icon: "📊",
    difficulty: "Advanced",
    estimatedTime: "20 min",
    tags: ["Reports", "Analytics", "Management", "Documentation"],
    approved: true,
    approvedBy: "Level 4 Reviewer"
  },
  {
    id: "skill-004",
    name: "Asset Pipeline Optimizer",
    category: "Animation",
    creator: "Level 4 Tech Lead",
    level: 4,
    uses: 76,
    steps: 6,
    stepDescriptions: [
          "Scan 3D asset directory for optimization candidates",
          "Analyze polygon count and texture resolution",
          "Apply compression algorithms while preserving quality",
          "Generate optimized versions in multiple LOD levels",
          "Update asset references in project files",
          "Create optimization report with size comparisons"
    ],
    description: "Optimize and compress 3D assets for production. Reduces file sizes while maintaining visual quality.",
    icon: "🎨",
    difficulty: "Advanced",
    estimatedTime: "25 min",
    tags: ["3D", "Optimization", "Assets", "Performance"],
    approved: true,
    approvedBy: "Level 4 Reviewer"
  },
  {
    id: "skill-005",
    name: "Code Review Workflow",
    category: "Development",
    creator: "Level 5 Architect",
    level: 5,
    uses: 134,
    steps: 3,
    stepDescriptions: [
          "Scan pull request for code changes",
          "Run automated linting and style checks",
          "Generate review comments with suggestions"
    ],
    description: "Automated code quality checks and pull request management with best practices enforcement.",
    icon: "🔍",
    difficulty: "Expert",
    estimatedTime: "12 min",
    tags: ["Code Review", "Quality", "Git", "Best Practices"],
    approved: true,
    approvedBy: "Level 4 Reviewer"
  },
  {
    id: "skill-006",
    name: "Pomodoro Task Splitter",
    category: "Productivity",
    creator: "Level 3 Designer",
    level: 3,
    uses: 267,
    steps: 4,
    stepDescriptions: [
          "Parse project description and requirements",
          "Break down into discrete, time-boxed tasks",
          "Schedule tasks with 25-minute work intervals",
          "Add 5-minute breaks between sessions"
    ],
    description: "Break down large projects into timed work sessions with automatic break scheduling and progress tracking.",
    icon: "⏱️",
    difficulty: "Beginner",
    estimatedTime: "5 min",
    tags: ["Productivity", "Time Management", "Organization"],
    approved: true,
    approvedBy: "Level 4 Reviewer"
  },
  {
    id: "skill-007",
    name: "Database Migration Script",
    category: "Development",
    creator: "Level 5 DBA",
    level: 5,
    uses: 93,
    steps: 7,
    stepDescriptions: [
          "Backup current database state",
          "Analyze schema differences",
          "Generate migration SQL scripts",
          "Validate data integrity constraints",
          "Execute migration in transaction",
          "Verify migration success",
          "Create rollback script"
    ],
    description: "Safe database schema migrations with rollback support and data integrity validation.",
    icon: "🗄️",
    difficulty: "Expert",
    estimatedTime: "30 min",
    tags: ["Database", "Migration", "SQL", "Data"],
    approved: true,
    approvedBy: "Level 4 Reviewer"
  },
  {
    id: "skill-008",
    name: "UI Component Generator",
    category: "Design",
    creator: "Level 4 Designer",
    level: 4,
    uses: 178,
    steps: 5,
    stepDescriptions: [
          "Parse component specifications and props",
          "Generate base component structure",
          "Add accessibility attributes (ARIA labels, keyboard nav)",
          "Implement theme-aware styling",
          "Create unit tests for component"
    ],
    description: "Generate responsive UI components with accessibility features and theme support built-in.",
    icon: "🎯",
    difficulty: "Advanced",
    estimatedTime: "18 min",
    tags: ["UI", "Components", "Design System", "Accessibility"],
    approved: true,
    approvedBy: "Level 4 Reviewer"
  },
  {
    id: "skill-009",
    name: "API Documentation Builder",
    category: "Development",
    creator: "Level 4 Developer",
    level: 4,
    uses: 112,
    steps: 4,
    stepDescriptions: [
          "Scan codebase for API endpoints",
          "Extract JSDoc comments and type definitions",
          "Generate OpenAPI/Swagger specification",
          "Create interactive documentation portal"
    ],
    description: "Auto-generate comprehensive API documentation from code comments and type definitions.",
    icon: "📝",
    difficulty: "Intermediate",
    estimatedTime: "14 min",
    tags: ["API", "Documentation", "OpenAPI", "TypeScript"],
    approved: true,
    approvedBy: "Level 4 Reviewer"
  },
  {
    id: "skill-010",
    name: "Security Audit Scanner",
    category: "Security",
    creator: "Level 5 Security Lead",
    level: 5,
    uses: 87,
    steps: 8,
    stepDescriptions: [
          "Initialize security scanning tools",
          "Scan dependencies for known vulnerabilities",
          "Analyze code for common security flaws",
          "Check for exposed secrets and credentials",
          "Test authentication and authorization flows",
          "Generate threat assessment report",
          "Provide fix recommendations with priority levels",
          "Create remediation tracking tickets"
    ],
    description: "Comprehensive security vulnerability scanning with fix recommendations and threat assessment.",
    icon: "🔒",
    difficulty: "Expert",
    estimatedTime: "35 min",
    tags: ["Security", "Audit", "Vulnerabilities", "Protection"],
    approved: true,
    approvedBy: "Level 4 Reviewer"
  },
  {
    id: "skill-011",
    name: "Email Campaign Automation",
    category: "Marketing",
    creator: "Level 3 Marketer",
    level: 3,
    uses: 156,
    steps: 5,
    stepDescriptions: [
          "Design email template with brand guidelines",
          "Segment audience based on user behavior",
          "Set up A/B test variants",
          "Schedule send times for optimal engagement",
          "Track open rates, click-through, and conversions"
    ],
    description: "Automated email campaign creation with A/B testing, scheduling, and analytics tracking.",
    icon: "📧",
    difficulty: "Intermediate",
    estimatedTime: "22 min",
    tags: ["Marketing", "Email", "Automation", "Analytics"],
    approved: true,
    approvedBy: "Level 4 Reviewer"
  },
  {
    id: "skill-012",
    name: "Performance Profiler",
    category: "Development",
    creator: "Level 5 Performance Engineer",
    level: 5,
    uses: 104,
    steps: 6,
    stepDescriptions: [
          "Inject performance monitoring hooks",
          "Run application under load conditions",
          "Collect timing and resource usage data",
          "Identify performance bottlenecks",
          "Generate flame graphs and call stack analysis",
          "Provide optimization recommendations"
    ],
    description: "Deep performance analysis with bottleneck detection and optimization recommendations.",
    icon: "⚡",
    difficulty: "Expert",
    estimatedTime: "28 min",
    tags: ["Performance", "Optimization", "Profiling", "Speed"],
    approved: true,
    approvedBy: "Level 4 Reviewer"
  },
  {
    id: "skill-013",
    name: "Content Localization Pipeline",
    category: "Internationalization",
    creator: "Level 4 i18n Specialist",
    level: 4,
    uses: 68,
    steps: 7,
    stepDescriptions: [
          "Extract translatable strings from codebase",
          "Send content to translation service API",
          "Review translations for cultural appropriateness",
          "Generate locale-specific resource files",
          "Validate translated content in UI",
          "Create locale switcher component",
          "Update deployment configuration"
    ],
    description: "Automated content translation and localization workflow with quality checks and cultural adaptation.",
    icon: "🌍",
    difficulty: "Advanced",
    estimatedTime: "40 min",
    tags: ["i18n", "Translation", "Localization", "Global"],
    approved: true,
    approvedBy: "Level 4 Reviewer"
  },
  {
    id: "skill-014",
    name: "Backup & Recovery System",
    category: "Infrastructure",
    creator: "Level 5 DevOps",
    level: 5,
    uses: 121,
    steps: 5,
    stepDescriptions: [
          "Schedule automated backup intervals",
          "Create incremental backup snapshots",
          "Encrypt backup data",
          "Upload to redundant storage locations",
          "Verify backup integrity"
    ],
    description: "Automated backup scheduling with incremental backups and one-click disaster recovery.",
    icon: "💾",
    difficulty: "Expert",
    estimatedTime: "32 min",
    tags: ["Backup", "Recovery", "Infrastructure", "Safety"],
    approved: true,
    approvedBy: "Level 4 Reviewer"
  },
  {
    id: "skill-015",
    name: "Social Media Scheduler",
    category: "Marketing",
    creator: "Level 3 Social Media Manager",
    level: 3,
    uses: 189,
    steps: 4,
    stepDescriptions: [
          "Upload content and media assets",
          "Select target social platforms",
          "Schedule optimal posting times",
          "Track engagement metrics"
    ],
    description: "Schedule and publish content across multiple social platforms with engagement analytics.",
    icon: "📱",
    difficulty: "Beginner",
    estimatedTime: "8 min",
    tags: ["Social Media", "Marketing", "Scheduling", "Content"],
    approved: true,
    approvedBy: "Level 4 Reviewer"
  },
  {
    id: "skill-016",
    name: "Machine Learning Pipeline",
    category: "AI/ML",
    creator: "Level 6 ML Engineer",
    level: 6,
    uses: 94,
    steps: 9,
    stepDescriptions: [
          "Load and validate training dataset",
          "Clean and preprocess data",
          "Split into training and validation sets",
          "Define model architecture",
          "Train model with hyperparameter tuning",
          "Evaluate model performance metrics",
          "Export model for deployment",
          "Set up inference endpoint",
          "Monitor model performance in production"
    ],
    description: "End-to-end ML pipeline with data preprocessing, model training, validation, and deployment.",
    icon: "🤖",
    difficulty: "Expert",
    estimatedTime: "60 min",
    tags: ["Machine Learning", "AI", "Data Science", "Pipeline"],
    approved: true,
    approvedBy: "Level 4 Reviewer"
  },
  {
    id: "skill-017",
    name: "Dependency Update Manager",
    category: "Development",
    creator: "Level 4 Maintainer",
    level: 4,
    uses: 145,
    steps: 4,
    stepDescriptions: [
          "Scan package.json for outdated dependencies",
          "Check for breaking changes in release notes",
          "Run automated compatibility tests",
          "Create pull request with updates"
    ],
    description: "Automated dependency updates with breaking change detection and compatibility testing.",
    icon: "📦",
    difficulty: "Intermediate",
    estimatedTime: "16 min",
    tags: ["Dependencies", "Updates", "Maintenance", "npm"],
    approved: true,
    approvedBy: "Level 4 Reviewer"
  },
  {
    id: "skill-018",
    name: "Video Transcoding Workflow",
    category: "Media",
    creator: "Level 4 Media Engineer",
    level: 4,
    uses: 81,
    steps: 6,
    stepDescriptions: [
          "Upload source video file",
          "Extract metadata (resolution, codec, duration)",
          "Transcode to multiple output formats",
          "Generate thumbnails at key frames",
          "Optimize for adaptive streaming",
          "Upload processed videos to CDN"
    ],
    description: "Transcode videos to multiple formats and resolutions with quality optimization and thumbnail generation.",
    icon: "🎥",
    difficulty: "Advanced",
    estimatedTime: "45 min",
    tags: ["Video", "Transcoding", "Media", "ffmpeg"],
    approved: true,
    approvedBy: "Level 4 Reviewer"
  }
];

export const getSkillCardsByCategory = (category: string) => {
  return mockSkillCards.filter(card => card.category === category);
};

export const getSkillCardsByDifficulty = (difficulty: SkillCard["difficulty"]) => {
  return mockSkillCards.filter(card => card.difficulty === difficulty);
};

export const getTotalSkillCards = () => mockSkillCards.length;

