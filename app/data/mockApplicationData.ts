export interface Application {
  id: string;
  name: string;
  developer: string;
  category: string;
  description: string;
  longDescription: string;
  icon: string;
  bannerColor: string;
  installs: number;
  rating: number;
  verified: boolean;
  tags: string[];
  permissions: string[];
  commands?: string[];
  features: string[];
  screenshots?: string[];
  supportServer?: string;
  website?: string;
}

export const mockApplications: Application[] = [
  {
    id: "app-001",
    name: "TaskMaster Pro",
    developer: "ProductivityCo",
    category: "Productivity",
    description: "Advanced task management and project tracking with AI-powered insights",
    longDescription: "TaskMaster Pro transforms how teams collaborate. Track tasks, set deadlines, automate workflows, and get AI-driven productivity insights. Perfect for teams of any size.",
    icon: "✅",
    bannerColor: "from-blue-500 to-cyan-500",
    installs: 125000,
    rating: 4.8,
    verified: true,
    tags: ["Tasks", "Projects", "Automation", "AI"],
    permissions: ["Read Messages", "Send Messages", "Manage Channels"],
    commands: ["/task create", "/task list", "/task assign", "/project status"],
    features: [
      "Create and assign tasks with due dates",
      "AI-powered workload balancing",
      "Automated status reports",
      "Integration with 50+ tools",
      "Real-time collaboration"
    ],
    supportServer: "discord.gg/taskmaster",
    website: "https://taskmaster.pro"
  },
  {
    id: "app-002",
    name: "MusicBox",
    developer: "AudioStream Inc",
    category: "Music",
    description: "High-quality music streaming with playlist sharing and live DJ features",
    longDescription: "Stream millions of songs with crystal-clear audio. Create shared playlists, host live DJ sessions, and discover new music with AI recommendations.",
    icon: "🎵",
    bannerColor: "from-purple-500 to-pink-500",
    installs: 450000,
    rating: 4.9,
    verified: true,
    tags: ["Music", "Streaming", "Playlists", "Entertainment"],
    permissions: ["Connect to Voice", "Speak in Voice", "Use Voice Activity"],
    commands: ["/play", "/pause", "/skip", "/queue", "/playlist"],
    features: [
      "50M+ songs library",
      "Lossless audio quality",
      "Collaborative playlists",
      "Live DJ mode",
      "Smart recommendations"
    ],
    supportServer: "discord.gg/musicbox",
    website: "https://musicbox.fm"
  },
  {
    id: "app-003",
    name: "CodeReview Bot",
    developer: "DevTools Labs",
    category: "Developer Tools",
    description: "Automated code review with AI-powered suggestions and best practices",
    longDescription: "Get instant code reviews powered by AI. Detect bugs, security issues, and code smells. Enforce team coding standards automatically.",
    icon: "💻",
    bannerColor: "from-green-500 to-teal-500",
    installs: 78000,
    rating: 4.7,
    verified: true,
    tags: ["Development", "Code Review", "AI", "Quality"],
    permissions: ["Read Messages", "Send Messages", "Embed Links"],
    commands: ["/review", "/analyze", "/standards", "/stats"],
    features: [
      "AI-powered code analysis",
      "Security vulnerability detection",
      "Code style enforcement",
      "Performance optimization tips",
      "GitHub/GitLab integration"
    ],
    supportServer: "discord.gg/codereview",
    website: "https://codereviewbot.dev"
  },
  {
    id: "app-004",
    name: "PollMaker",
    developer: "CommunityTools",
    category: "Utility",
    description: "Create beautiful polls and surveys with real-time results visualization",
    longDescription: "Engage your community with interactive polls. Multiple question types, anonymous voting, live results, and detailed analytics.",
    icon: "📊",
    bannerColor: "from-yellow-500 to-orange-500",
    installs: 320000,
    rating: 4.6,
    verified: true,
    tags: ["Polls", "Surveys", "Community", "Engagement"],
    permissions: ["Read Messages", "Send Messages", "Add Reactions"],
    commands: ["/poll create", "/poll close", "/survey start", "/results"],
    features: [
      "Multiple choice polls",
      "Anonymous voting option",
      "Live result updates",
      "Export to CSV",
      "Scheduled polls"
    ],
    supportServer: "discord.gg/pollmaker",
    website: "https://pollmaker.io"
  },
  {
    id: "app-005",
    name: "GameStats",
    developer: "GamingMetrics",
    category: "Gaming",
    description: "Track gaming statistics, leaderboards, and achievements across platforms",
    longDescription: "Connect your gaming accounts and track stats across all platforms. Compete on leaderboards, earn achievements, and analyze your gameplay.",
    icon: "🎮",
    bannerColor: "from-red-500 to-pink-500",
    installs: 580000,
    rating: 4.8,
    verified: true,
    tags: ["Gaming", "Stats", "Leaderboards", "Achievements"],
    permissions: ["Read Messages", "Send Messages", "Embed Links"],
    commands: ["/stats", "/leaderboard", "/compare", "/achievements"],
    features: [
      "Multi-platform support",
      "Real-time stat tracking",
      "Global leaderboards",
      "Achievement tracking",
      "Gameplay analytics"
    ],
    supportServer: "discord.gg/gamestats",
    website: "https://gamestats.gg"
  },
  {
    id: "app-006",
    name: "TranslateNow",
    developer: "GlobalComm",
    category: "Utility",
    description: "Real-time message translation supporting 100+ languages",
    longDescription: "Break language barriers with instant translation. Auto-detect languages, translate messages, and enable global communication.",
    icon: "🌍",
    bannerColor: "from-indigo-500 to-purple-500",
    installs: 210000,
    rating: 4.5,
    verified: false,
    tags: ["Translation", "Languages", "Communication", "Global"],
    permissions: ["Read Messages", "Send Messages"],
    commands: ["/translate", "/auto-translate", "/language set"],
    features: [
      "100+ languages supported",
      "Auto-detection",
      "Real-time translation",
      "Pronunciation guide",
      "Language learning mode"
    ],
    supportServer: "discord.gg/translatenow"
  },
  {
    id: "app-007",
    name: "DrawTogether",
    developer: "ArtistryHub",
    category: "Social",
    description: "Collaborative drawing canvas for creative teams and fun activities",
    longDescription: "Draw together in real-time! Perfect for brainstorming, sketching ideas, or just having fun with friends. Save and share your creations.",
    icon: "🎨",
    bannerColor: "from-pink-500 to-rose-500",
    installs: 156000,
    rating: 4.7,
    verified: true,
    tags: ["Art", "Collaboration", "Creative", "Fun"],
    permissions: ["Read Messages", "Send Messages", "Attach Files"],
    commands: ["/draw start", "/draw save", "/canvas clear"],
    features: [
      "Real-time collaborative drawing",
      "Multiple brush types",
      "Color palette library",
      "Save and export",
      "Drawing games"
    ],
    supportServer: "discord.gg/drawtogether",
    website: "https://drawtogether.art"
  },
  {
    id: "app-008",
    name: "ReminderPro",
    developer: "TimeManagement Inc",
    category: "Productivity",
    description: "Smart reminders and calendar integration with natural language processing",
    longDescription: "Never forget important tasks. Set reminders with natural language, integrate calendars, and get smart notifications.",
    icon: "⏰",
    bannerColor: "from-amber-500 to-yellow-500",
    installs: 198000,
    rating: 4.6,
    verified: true,
    tags: ["Reminders", "Calendar", "Time Management", "AI"],
    permissions: ["Read Messages", "Send Messages"],
    commands: ["/remind", "/reminders list", "/calendar sync"],
    features: [
      "Natural language parsing",
      "Recurring reminders",
      "Calendar integration",
      "Timezone support",
      "Smart notifications"
    ],
    supportServer: "discord.gg/reminderpro"
  },
  {
    id: "app-009",
    name: "Trivia Master",
    developer: "QuizGames",
    category: "Entertainment",
    description: "Host trivia games with 50,000+ questions across all categories",
    longDescription: "Engage your community with exciting trivia games. Multiple game modes, custom questions, leaderboards, and prizes.",
    icon: "❓",
    bannerColor: "from-violet-500 to-purple-500",
    installs: 425000,
    rating: 4.9,
    verified: true,
    tags: ["Trivia", "Games", "Quiz", "Entertainment"],
    permissions: ["Read Messages", "Send Messages", "Add Reactions"],
    commands: ["/trivia start", "/trivia custom", "/leaderboard"],
    features: [
      "50,000+ questions",
      "Multiple categories",
      "Custom trivia creation",
      "Global leaderboards",
      "Prize system"
    ],
    supportServer: "discord.gg/triviamaster",
    website: "https://triviamaster.fun"
  },
  {
    id: "app-010",
    name: "ServerBackup",
    developer: "SafetyFirst",
    category: "Utility",
    description: "Automated server backups with one-click restore functionality",
    longDescription: "Protect your server with automated backups. Schedule backups, restore with one click, and never lose your data.",
    icon: "💾",
    bannerColor: "from-slate-500 to-gray-600",
    installs: 89000,
    rating: 4.8,
    verified: true,
    tags: ["Backup", "Safety", "Administration", "Recovery"],
    permissions: ["Administrator"],
    commands: ["/backup now", "/backup schedule", "/restore"],
    features: [
      "Automated backups",
      "One-click restore",
      "Encrypted storage",
      "Version history",
      "Disaster recovery"
    ],
    supportServer: "discord.gg/serverbackup",
    website: "https://serverbackup.io"
  },
  {
    id: "app-011",
    name: "VoiceEffects",
    developer: "AudioFX Studios",
    category: "Entertainment",
    description: "Real-time voice effects and soundboard for voice channels",
    longDescription: "Transform your voice with real-time effects. Add soundboards, create custom effects, and entertain your friends.",
    icon: "🎙️",
    bannerColor: "from-cyan-500 to-blue-500",
    installs: 340000,
    rating: 4.7,
    verified: false,
    tags: ["Voice", "Effects", "Audio", "Entertainment"],
    permissions: ["Connect to Voice", "Speak in Voice", "Use Voice Activity"],
    commands: ["/effect apply", "/soundboard play", "/voice settings"],
    features: [
      "20+ voice effects",
      "Custom soundboards",
      "Real-time processing",
      "Effect mixing",
      "Recording capability"
    ],
    supportServer: "discord.gg/voiceeffects"
  },
  {
    id: "app-012",
    name: "WelcomeBot",
    developer: "CommunityBuilders",
    category: "Moderation",
    description: "Customizable welcome messages and auto-role assignment for new members",
    longDescription: "Create the perfect first impression. Custom welcome messages, auto-roles, verification, and member onboarding.",
    icon: "👋",
    bannerColor: "from-emerald-500 to-green-500",
    installs: 520000,
    rating: 4.8,
    verified: true,
    tags: ["Welcome", "Moderation", "Auto-Role", "Community"],
    permissions: ["Manage Roles", "Read Messages", "Send Messages"],
    commands: ["/welcome setup", "/autorole config", "/verify setup"],
    features: [
      "Custom welcome messages",
      "Auto-role assignment",
      "Member verification",
      "Welcome DMs",
      "Embed customization"
    ],
    supportServer: "discord.gg/welcomebot",
    website: "https://welcomebot.pro"
  },
  {
    id: "app-013",
    name: "CryptoTracker",
    developer: "FinTech Solutions",
    category: "Finance",
    description: "Real-time cryptocurrency price tracking and portfolio management",
    longDescription: "Track crypto prices, manage portfolios, set price alerts, and get market insights. Support for 5000+ cryptocurrencies.",
    icon: "₿",
    bannerColor: "from-orange-500 to-amber-500",
    installs: 245000,
    rating: 4.6,
    verified: true,
    tags: ["Crypto", "Finance", "Trading", "Portfolio"],
    permissions: ["Read Messages", "Send Messages", "Embed Links"],
    commands: ["/price", "/portfolio", "/alert set", "/market"],
    features: [
      "5000+ cryptocurrencies",
      "Real-time prices",
      "Portfolio tracking",
      "Price alerts",
      "Market analysis"
    ],
    supportServer: "discord.gg/cryptotracker",
    website: "https://cryptotracker.live"
  },
  {
    id: "app-014",
    name: "MovieNight",
    developer: "StreamTogether",
    category: "Entertainment",
    description: "Watch movies and shows together with synchronized playback",
    longDescription: "Host movie nights with friends. Synchronized playback, chat reactions, and support for multiple streaming platforms.",
    icon: "🎬",
    bannerColor: "from-red-600 to-rose-600",
    installs: 178000,
    rating: 4.7,
    verified: false,
    tags: ["Movies", "Streaming", "Watch Party", "Social"],
    permissions: ["Read Messages", "Send Messages", "Embed Links"],
    commands: ["/watch start", "/sync", "/reactions"],
    features: [
      "Synchronized playback",
      "Multiple platforms",
      "Live reactions",
      "Watch history",
      "Voting system"
    ],
    supportServer: "discord.gg/movienight"
  },
  {
    id: "app-015",
    name: "FitnessTracker",
    developer: "HealthTech",
    category: "Lifestyle",
    description: "Track workouts, set fitness goals, and compete with friends",
    longDescription: "Stay motivated with fitness tracking. Log workouts, track progress, compete on leaderboards, and achieve your health goals.",
    icon: "💪",
    bannerColor: "from-lime-500 to-green-600",
    installs: 92000,
    rating: 4.5,
    verified: false,
    tags: ["Fitness", "Health", "Tracking", "Goals"],
    permissions: ["Read Messages", "Send Messages"],
    commands: ["/workout log", "/progress", "/challenge", "/goals"],
    features: [
      "Workout logging",
      "Progress tracking",
      "Fitness challenges",
      "Calorie calculator",
      "Achievement system"
    ],
    supportServer: "discord.gg/fitnesstracker"
  },
  {
    id: "app-016",
    name: "MemeGenerator",
    developer: "MemeFactory",
    category: "Entertainment",
    description: "Create and share memes with templates and AI-powered captions",
    longDescription: "Generate hilarious memes instantly. 1000+ templates, AI caption suggestions, and easy sharing.",
    icon: "😂",
    bannerColor: "from-fuchsia-500 to-pink-500",
    installs: 410000,
    rating: 4.8,
    verified: true,
    tags: ["Memes", "Fun", "Images", "AI"],
    permissions: ["Read Messages", "Send Messages", "Attach Files"],
    commands: ["/meme create", "/meme random", "/template search"],
    features: [
      "1000+ meme templates",
      "AI caption generation",
      "Custom text and images",
      "Trending memes",
      "Easy sharing"
    ],
    supportServer: "discord.gg/memegen",
    website: "https://memegen.lol"
  },
  {
    id: "app-017",
    name: "StudyBuddy",
    developer: "EduTech",
    category: "Education",
    description: "Study sessions, flashcards, and collaborative learning tools",
    longDescription: "Enhance your learning with study tools. Create flashcards, host study sessions, track progress, and collaborate with peers.",
    icon: "📚",
    bannerColor: "from-sky-500 to-blue-600",
    installs: 134000,
    rating: 4.6,
    verified: true,
    tags: ["Education", "Study", "Learning", "Collaboration"],
    permissions: ["Read Messages", "Send Messages", "Embed Links"],
    commands: ["/flashcard create", "/study start", "/quiz", "/notes"],
    features: [
      "Digital flashcards",
      "Study session timer",
      "Quiz generation",
      "Progress tracking",
      "Collaborative notes"
    ],
    supportServer: "discord.gg/studybuddy"
  },
  {
    id: "app-018",
    name: "EventScheduler",
    developer: "PlanIt Software",
    category: "Productivity",
    description: "Schedule events with RSVP tracking and automatic reminders",
    longDescription: "Organize events effortlessly. Create events, manage RSVPs, send reminders, and track attendance.",
    icon: "📅",
    bannerColor: "from-teal-500 to-cyan-600",
    installs: 267000,
    rating: 4.7,
    verified: true,
    tags: ["Events", "Calendar", "RSVP", "Organization"],
    permissions: ["Read Messages", "Send Messages", "Manage Events"],
    commands: ["/event create", "/rsvp", "/attendance", "/remind"],
    features: [
      "Event creation",
      "RSVP management",
      "Auto reminders",
      "Attendance tracking",
      "Calendar sync"
    ],
    supportServer: "discord.gg/eventscheduler",
    website: "https://eventscheduler.app"
  },
  {
    id: "app-019",
    name: "RoleManager",
    developer: "ServerTools",
    category: "Moderation",
    description: "Advanced role management with reaction roles and automation",
    longDescription: "Simplify role management. Reaction roles, role menus, auto-assignment, and detailed permission control.",
    icon: "🎭",
    bannerColor: "from-purple-600 to-violet-600",
    installs: 385000,
    rating: 4.9,
    verified: true,
    tags: ["Roles", "Moderation", "Automation", "Management"],
    permissions: ["Manage Roles", "Read Messages", "Add Reactions"],
    commands: ["/role give", "/reaction-role", "/role menu", "/autorole"],
    features: [
      "Reaction roles",
      "Role menus",
      "Auto-assignment rules",
      "Role templates",
      "Bulk operations"
    ],
    supportServer: "discord.gg/rolemanager",
    website: "https://rolemanager.pro"
  },
  {
    id: "app-020",
    name: "AIAssistant",
    developer: "NextGen AI",
    category: "AI & ML",
    description: "GPT-powered AI assistant for natural conversations and task automation",
    longDescription: "Your intelligent assistant powered by advanced AI. Ask questions, automate tasks, generate content, and get smart responses.",
    icon: "🤖",
    bannerColor: "from-indigo-600 to-purple-600",
    installs: 620000,
    rating: 4.9,
    verified: true,
    tags: ["AI", "Chatbot", "Automation", "GPT"],
    permissions: ["Read Messages", "Send Messages", "Read Message History"],
    commands: ["/ask", "/generate", "/summarize", "/translate"],
    features: [
      "Natural conversations",
      "Content generation",
      "Task automation",
      "Context awareness",
      "Multi-language support"
    ],
    supportServer: "discord.gg/aiassistant",
    website: "https://aiassistant.ai"
  }
];

export const getApplicationsByCategory = (category: string) => {
  return mockApplications.filter(app => app.category === category);
};

export const getVerifiedApplications = () => {
  return mockApplications.filter(app => app.verified);
};

export const getTopApplications = (limit: number = 10) => {
  return [...mockApplications]
    .sort((a, b) => b.installs - a.installs)
    .slice(0, limit);
};

