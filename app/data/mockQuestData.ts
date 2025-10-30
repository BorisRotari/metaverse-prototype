export interface Quest {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: string;
  banner: string;
  category: "Daily" | "Weekly" | "Monthly" | "Special" | "Community";
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  rewards: {
    xp: number;
    coins: number;
    badge?: string;
    items?: string[];
  };
  requirements: string[];
  progress: {
    current: number;
    total: number;
  };
  timeRemaining?: string;
  isActive: boolean;
  isCompleted: boolean;
  isPremium: boolean;
  participants: number;
  acceptedBy?: number;
}

export const mockQuests: Quest[] = [
  {
    id: "quest-001",
    name: "Community Builder",
    description: "Invite 5 new members to your space and help them get started",
    longDescription: "Welcome new members to the community! Invite at least 5 people to your space and make sure they complete their profile setup. Building a strong community starts with you!",
    icon: "👥",
    banner: "from-blue-500 via-cyan-500 to-teal-500",
    category: "Daily",
    difficulty: "Easy",
    rewards: {
      xp: 500,
      coins: 250,
      badge: "Community Champion"
    },
    requirements: [
      "Invite 5 new members",
      "Help them set up their profile",
      "Send them a welcome message"
    ],
    progress: {
      current: 3,
      total: 5
    },
    timeRemaining: "14h 32m",
    isActive: true,
    isCompleted: false,
    isPremium: false,
    participants: 12450,
    acceptedBy: 8920
  },
  {
    id: "quest-002",
    name: "Voice Chat Master",
    description: "Spend 2 hours in voice channels this week",
    longDescription: "Engage with your community through voice! Join voice channels and participate in conversations. Voice communication builds stronger connections.",
    icon: "🎙️",
    banner: "from-purple-500 via-pink-500 to-rose-500",
    category: "Weekly",
    difficulty: "Medium",
    rewards: {
      xp: 1000,
      coins: 500,
      badge: "Voice Champion",
      items: ["Custom Voice Badge", "Priority Speaker"]
    },
    requirements: [
      "Join voice channels 5 times",
      "Spend total 2 hours in voice",
      "Use voice in 3 different channels"
    ],
    progress: {
      current: 87,
      total: 120
    },
    timeRemaining: "3d 8h",
    isActive: true,
    isCompleted: false,
    isPremium: false,
    participants: 8670,
    acceptedBy: 5430
  },
  {
    id: "quest-003",
    name: "Content Creator",
    description: "Share 10 messages with media attachments",
    longDescription: "Enrich conversations with visual content! Share images, videos, or other media files to make discussions more engaging and informative.",
    icon: "📸",
    banner: "from-orange-500 via-red-500 to-pink-500",
    category: "Daily",
    difficulty: "Easy",
    rewards: {
      xp: 300,
      coins: 150
    },
    requirements: [
      "Share 10 messages with attachments",
      "Get at least 5 reactions total",
      "Post in 3 different channels"
    ],
    progress: {
      current: 7,
      total: 10
    },
    timeRemaining: "8h 15m",
    isActive: true,
    isCompleted: false,
    isPremium: false,
    participants: 15670,
    acceptedBy: 11230
  },
  {
    id: "quest-004",
    name: "Skill Master",
    description: "Complete 3 skill card workflows successfully",
    longDescription: "Demonstrate your expertise! Complete three different skill card workflows from the workflow library. Master new skills and contribute to the community.",
    icon: "🎯",
    banner: "from-green-500 via-emerald-500 to-teal-500",
    category: "Weekly",
    difficulty: "Hard",
    rewards: {
      xp: 2000,
      coins: 1000,
      badge: "Skill Master",
      items: ["Premium Skill Card Access", "Custom Workflow Template"]
    },
    requirements: [
      "Complete 3 different skill cards",
      "Achieve 90%+ success rate",
      "Share results in community"
    ],
    progress: {
      current: 1,
      total: 3
    },
    timeRemaining: "5d 12h",
    isActive: true,
    isCompleted: false,
    isPremium: true,
    participants: 3450,
    acceptedBy: 2180
  },
  {
    id: "quest-005",
    name: "Social Butterfly",
    description: "React to 50 messages and start 5 conversations",
    longDescription: "Be an active community member! Show your engagement by reacting to messages and starting meaningful conversations with others.",
    icon: "🦋",
    banner: "from-pink-400 via-rose-400 to-red-400",
    category: "Daily",
    difficulty: "Easy",
    rewards: {
      xp: 400,
      coins: 200,
      badge: "Social Star"
    },
    requirements: [
      "React to 50 messages",
      "Start 5 new conversations",
      "Reply to at least 10 people"
    ],
    progress: {
      current: 0,
      total: 50
    },
    timeRemaining: "18h 45m",
    isActive: false,
    isCompleted: false,
    isPremium: false,
    participants: 18920,
    acceptedBy: 0
  },
  {
    id: "quest-006",
    name: "ASO Developer",
    description: "Deploy 2 new ASOs and test them in production",
    longDescription: "Contribute to the ASO ecosystem! Create and deploy two new Autonomous Service Operators. Test them thoroughly and share your results.",
    icon: "🤖",
    banner: "from-indigo-500 via-purple-500 to-pink-500",
    category: "Monthly",
    difficulty: "Expert",
    rewards: {
      xp: 5000,
      coins: 2500,
      badge: "ASO Architect",
      items: ["Premium ASO Templates", "Priority Deployment", "Custom Avatar Frame"]
    },
    requirements: [
      "Create 2 functional ASOs",
      "Deploy to production",
      "Achieve 95% uptime for 7 days",
      "Get 10+ community endorsements"
    ],
    progress: {
      current: 0,
      total: 2
    },
    timeRemaining: "24d 6h",
    isActive: false,
    isCompleted: false,
    isPremium: true,
    participants: 890,
    acceptedBy: 0
  },
  {
    id: "quest-007",
    name: "Emoji Collector",
    description: "Use 25 different emojis in your messages",
    longDescription: "Express yourself! Use a variety of emojis to add emotion and personality to your messages. Diversity makes conversations colorful!",
    icon: "😊",
    banner: "from-yellow-400 via-orange-400 to-red-400",
    category: "Daily",
    difficulty: "Easy",
    rewards: {
      xp: 250,
      coins: 125
    },
    requirements: [
      "Use 25 different emojis",
      "Send messages in 5 channels",
      "Get reactions on your emoji messages"
    ],
    progress: {
      current: 18,
      total: 25
    },
    timeRemaining: "11h 20m",
    isActive: true,
    isCompleted: false,
    isPremium: false,
    participants: 22340,
    acceptedBy: 16780
  },
  {
    id: "quest-008",
    name: "Event Organizer",
    description: "Create and host 2 community events this week",
    longDescription: "Bring the community together! Organize and host events like game nights, workshops, or discussion sessions. Great events create lasting memories.",
    icon: "🎉",
    banner: "from-cyan-500 via-blue-500 to-indigo-500",
    category: "Weekly",
    difficulty: "Medium",
    rewards: {
      xp: 1500,
      coins: 750,
      badge: "Event Master",
      items: ["Event Planning Kit", "Custom Event Banner"]
    },
    requirements: [
      "Create 2 scheduled events",
      "Have 10+ attendees each",
      "Collect feedback from participants"
    ],
    progress: {
      current: 0,
      total: 2
    },
    timeRemaining: "6d 14h",
    isActive: false,
    isCompleted: false,
    isPremium: false,
    participants: 4560,
    acceptedBy: 0
  },
  {
    id: "quest-009",
    name: "Helper Hero",
    description: "Answer 10 questions from community members",
    longDescription: "Share your knowledge! Help community members by answering their questions. Your expertise makes the community stronger.",
    icon: "🦸",
    banner: "from-lime-500 via-green-500 to-emerald-500",
    category: "Daily",
    difficulty: "Medium",
    rewards: {
      xp: 600,
      coins: 300,
      badge: "Community Helper"
    },
    requirements: [
      "Answer 10 questions",
      "Get 5+ thank you reactions",
      "Help users in 3 different channels"
    ],
    progress: {
      current: 6,
      total: 10
    },
    timeRemaining: "9h 50m",
    isActive: true,
    isCompleted: false,
    isPremium: false,
    participants: 7890,
    acceptedBy: 5620
  },
  {
    id: "quest-010",
    name: "Streak Master",
    description: "Log in for 7 consecutive days",
    longDescription: "Build your daily habit! Log in every day for a week straight. Consistency is key to being an active community member.",
    icon: "🔥",
    banner: "from-orange-600 via-red-600 to-pink-600",
    category: "Weekly",
    difficulty: "Easy",
    rewards: {
      xp: 800,
      coins: 400,
      badge: "Streak Champion",
      items: ["Streak Protection Shield"]
    },
    requirements: [
      "Log in 7 consecutive days",
      "Send at least 1 message per day",
      "Check notifications daily"
    ],
    progress: {
      current: 4,
      total: 7
    },
    timeRemaining: "4d 2h",
    isActive: true,
    isCompleted: false,
    isPremium: false,
    participants: 31240,
    acceptedBy: 24680
  },
  {
    id: "quest-011",
    name: "Theme Designer",
    description: "Create and share a custom theme configuration",
    longDescription: "Express your creativity! Design a unique theme with custom colors and share it with the community. Beautiful themes enhance user experience.",
    icon: "🎨",
    banner: "from-violet-500 via-purple-500 to-fuchsia-500",
    category: "Special",
    difficulty: "Medium",
    rewards: {
      xp: 1200,
      coins: 600,
      badge: "Theme Creator",
      items: ["Premium Color Palette", "Theme Showcase Feature"]
    },
    requirements: [
      "Create custom theme",
      "Get 20+ downloads",
      "Receive 5-star rating from 10 users"
    ],
    progress: {
      current: 0,
      total: 1
    },
    timeRemaining: "Unlimited",
    isActive: false,
    isCompleted: false,
    isPremium: true,
    participants: 2340,
    acceptedBy: 0
  },
  {
    id: "quest-012",
    name: "Early Bird",
    description: "Send your first message before 8 AM for 5 days",
    longDescription: "Rise and shine! Be an early bird by sending messages before 8 AM. Morning activity helps kickstart the day for the community.",
    icon: "🌅",
    banner: "from-sky-400 via-blue-400 to-cyan-400",
    category: "Weekly",
    difficulty: "Easy",
    rewards: {
      xp: 500,
      coins: 250,
      badge: "Early Bird"
    },
    requirements: [
      "Send message before 8 AM",
      "Do this for 5 days",
      "Messages must be meaningful"
    ],
    progress: {
      current: 2,
      total: 5
    },
    timeRemaining: "6d 22h",
    isActive: true,
    isCompleted: false,
    isPremium: false,
    participants: 9870,
    acceptedBy: 6540
  },
  {
    id: "quest-013",
    name: "Feedback Champion",
    description: "Provide detailed feedback on 5 projects or workflows",
    longDescription: "Help others improve! Give constructive feedback on community projects and workflows. Quality feedback drives continuous improvement.",
    icon: "📝",
    banner: "from-teal-500 via-cyan-500 to-blue-500",
    category: "Weekly",
    difficulty: "Medium",
    rewards: {
      xp: 1000,
      coins: 500,
      badge: "Feedback Pro"
    },
    requirements: [
      "Review 5 projects",
      "Write detailed feedback (100+ words each)",
      "Get appreciation from creators"
    ],
    progress: {
      current: 3,
      total: 5
    },
    timeRemaining: "4d 18h",
    isActive: true,
    isCompleted: false,
    isPremium: false,
    participants: 5430,
    acceptedBy: 3890
  },
  {
    id: "quest-014",
    name: "Achievement Hunter",
    description: "Complete 10 different quests this month",
    longDescription: "Master the quest system! Complete a variety of quests to earn this prestigious achievement. True hunters never stop exploring.",
    icon: "🏆",
    banner: "from-yellow-500 via-amber-500 to-orange-500",
    category: "Monthly",
    difficulty: "Hard",
    rewards: {
      xp: 3000,
      coins: 1500,
      badge: "Quest Master",
      items: ["Golden Quest Badge", "Double XP Booster", "Rare Avatar Frame"]
    },
    requirements: [
      "Complete 10 different quests",
      "Must include daily, weekly, and special",
      "Maintain 90%+ completion rate"
    ],
    progress: {
      current: 4,
      total: 10
    },
    timeRemaining: "21d 9h",
    isActive: true,
    isCompleted: false,
    isPremium: true,
    participants: 6780,
    acceptedBy: 4320
  },
  {
    id: "quest-015",
    name: "Tutorial Master",
    description: "Create a tutorial video or guide for new users",
    longDescription: "Help newcomers! Create a comprehensive tutorial that helps new users understand the platform. Great tutorials welcome new members effectively.",
    icon: "🎓",
    banner: "from-green-600 via-teal-600 to-cyan-600",
    category: "Special",
    difficulty: "Hard",
    rewards: {
      xp: 2500,
      coins: 1250,
      badge: "Tutorial Creator",
      items: ["Content Creator Badge", "Featured Tutorial Spot", "Premium Support"]
    },
    requirements: [
      "Create tutorial (video or written)",
      "Cover at least 5 key features",
      "Get 50+ views and positive feedback"
    ],
    progress: {
      current: 0,
      total: 1
    },
    timeRemaining: "Unlimited",
    isActive: false,
    isCompleted: false,
    isPremium: false,
    participants: 1890,
    acceptedBy: 0
  },
  {
    id: "quest-016",
    name: "Night Owl",
    description: "Be active after midnight for 3 nights this week",
    longDescription: "For the night owls! Stay active and engage with the community during late-night hours. Night shifts keep the community alive 24/7.",
    icon: "🦉",
    banner: "from-indigo-900 via-purple-900 to-violet-900",
    category: "Weekly",
    difficulty: "Easy",
    rewards: {
      xp: 600,
      coins: 300,
      badge: "Night Owl"
    },
    requirements: [
      "Be active after 12 AM",
      "Send 5+ messages per night",
      "Do this for 3 nights"
    ],
    progress: {
      current: 1,
      total: 3
    },
    timeRemaining: "5d 3h",
    isActive: true,
    isCompleted: false,
    isPremium: false,
    participants: 8920,
    acceptedBy: 5670
  },
  {
    id: "quest-017",
    name: "Collaboration King",
    description: "Successfully complete 3 team projects with other members",
    longDescription: "Teamwork makes the dream work! Collaborate with other community members on projects. Great partnerships create amazing results.",
    icon: "🤝",
    banner: "from-blue-600 via-indigo-600 to-purple-600",
    category: "Monthly",
    difficulty: "Hard",
    rewards: {
      xp: 3500,
      coins: 1750,
      badge: "Team Player",
      items: ["Collaboration Tools Access", "Team Badge", "Project Showcase"]
    },
    requirements: [
      "Join 3 team projects",
      "Contribute significantly to each",
      "Complete all projects successfully"
    ],
    progress: {
      current: 1,
      total: 3
    },
    timeRemaining: "18d 11h",
    isActive: true,
    isCompleted: false,
    isPremium: true,
    participants: 3210,
    acceptedBy: 1890
  },
  {
    id: "quest-018",
    name: "Welcome Wagon",
    description: "Welcome 20 new members with a personalized message",
    longDescription: "Be the friendly face! Greet new members with warm, personalized welcome messages. First impressions matter in building community.",
    icon: "👋",
    banner: "from-pink-500 via-rose-500 to-red-500",
    category: "Daily",
    difficulty: "Easy",
    rewards: {
      xp: 350,
      coins: 175,
      badge: "Welcomer"
    },
    requirements: [
      "Welcome 20 new members",
      "Messages must be personalized",
      "Include helpful tips"
    ],
    progress: {
      current: 0,
      total: 20
    },
    timeRemaining: "12h 30m",
    isActive: false,
    isCompleted: false,
    isPremium: false,
    participants: 14560,
    acceptedBy: 0
  },
  {
    id: "quest-019",
    name: "Bug Hunter",
    description: "Report 3 valid bugs and suggest improvements",
    longDescription: "Help us improve! Identify bugs, report them with details, and suggest improvements. Your feedback makes the platform better.",
    icon: "🐛",
    banner: "from-red-600 via-orange-600 to-yellow-600",
    category: "Special",
    difficulty: "Medium",
    rewards: {
      xp: 1800,
      coins: 900,
      badge: "Bug Hunter",
      items: ["Beta Tester Access", "Bug Reporter Badge", "Priority Support"]
    },
    requirements: [
      "Report 3 valid bugs",
      "Provide reproduction steps",
      "Bugs must be confirmed by team"
    ],
    progress: {
      current: 0,
      total: 3
    },
    timeRemaining: "Unlimited",
    isActive: false,
    isCompleted: false,
    isPremium: false,
    participants: 2780,
    acceptedBy: 0
  },
  {
    id: "quest-020",
    name: "Legendary Contributor",
    description: "Reach Level 10 and complete 50 total quests",
    longDescription: "Become a legend! Reach Level 10 and complete 50 quests to earn this ultimate achievement. Only the most dedicated members achieve this status.",
    icon: "⭐",
    banner: "from-yellow-400 via-orange-500 to-red-500",
    category: "Special",
    difficulty: "Expert",
    rewards: {
      xp: 10000,
      coins: 5000,
      badge: "Legendary Member",
      items: ["Legendary Avatar Frame", "All Premium Features", "Exclusive Role", "Custom Badge Design"]
    },
    requirements: [
      "Reach Level 10",
      "Complete 50 total quests",
      "Maintain 95%+ quest completion rate",
      "Be nominated by 10 community members"
    ],
    progress: {
      current: 12,
      total: 50
    },
    timeRemaining: "Unlimited",
    isActive: true,
    isCompleted: false,
    isPremium: true,
    participants: 450,
    acceptedBy: 320
  }
];

export const getQuestsByCategory = (category: Quest["category"]) => {
  return mockQuests.filter(quest => quest.category === category);
};

export const getActiveQuests = () => {
  return mockQuests.filter(quest => quest.isActive);
};

export const getCompletedQuests = () => {
  return mockQuests.filter(quest => quest.isCompleted);
};

export const getAvailableQuests = () => {
  return mockQuests.filter(quest => !quest.isActive && !quest.isCompleted);
};

export const calculateTotalRewards = (quests: Quest[]) => {
  return quests.reduce(
    (acc, quest) => ({
      xp: acc.xp + quest.rewards.xp,
      coins: acc.coins + quest.rewards.coins
    }),
    { xp: 0, coins: 0 }
  );
};

