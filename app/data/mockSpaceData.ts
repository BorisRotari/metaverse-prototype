export interface Space {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: string;
  banner: string;
  members: number;
  online: number;
  verified: boolean;
  featured: boolean;
  category: string;
  tags: string[];
  features: string[];
  channels: {
    text: number;
    voice: number;
    total: number;
  };
  emojis: number;
  boosts: number;
  createdAt: string;
  inviteLink?: string;
}

export const mockSpaces: Space[] = [
  {
    id: "space-001",
    name: "Creative Minds Hub",
    description: "A vibrant community for artists, designers, and creative professionals",
    longDescription: "Join our thriving community of over 50,000 creative professionals! Share your work, get feedback, collaborate on projects, and learn from industry experts. We host weekly workshops, portfolio reviews, and creative challenges.",
    icon: "🎨",
    banner: "from-purple-500 via-pink-500 to-red-500",
    members: 52340,
    online: 12450,
    verified: true,
    featured: true,
    category: "Creative Arts",
    tags: ["Art", "Design", "3D", "Animation", "Digital Art"],
    features: [
      "Weekly portfolio reviews",
      "Daily creative challenges",
      "Industry expert AMAs",
      "Resource library",
      "Collaboration channels",
      "Job board"
    ],
    channels: { text: 45, voice: 12, total: 57 },
    emojis: 250,
    boosts: 14,
    createdAt: "2022-03-15",
    inviteLink: "creative-minds"
  },
  {
    id: "space-002",
    name: "Code Warriors",
    description: "Elite programming community for developers of all levels",
    longDescription: "Whether you're a beginner or a seasoned developer, Code Warriors is your home for learning, collaboration, and growth. Get help with coding problems, share projects, participate in hackathons, and stay updated with the latest tech trends.",
    icon: "💻",
    banner: "from-cyan-500 via-blue-500 to-indigo-500",
    members: 78920,
    online: 18230,
    verified: true,
    featured: true,
    category: "Technology",
    tags: ["Programming", "Web Dev", "AI/ML", "Open Source"],
    features: [
      "24/7 coding help",
      "Monthly hackathons",
      "Code review sessions",
      "Tech talk events",
      "Interview prep",
      "Pair programming"
    ],
    channels: { text: 68, voice: 15, total: 83 },
    emojis: 180,
    boosts: 22,
    createdAt: "2021-08-20",
    inviteLink: "code-warriors"
  },
  {
    id: "space-003",
    name: "Gamer's Paradise",
    description: "The ultimate gaming community for all platforms and genres",
    longDescription: "Join thousands of gamers for team-ups, tournaments, game nights, and discussions about the latest releases. We support all platforms: PC, PlayStation, Xbox, Nintendo Switch, and mobile gaming.",
    icon: "🎮",
    banner: "from-green-500 via-emerald-500 to-teal-500",
    members: 145600,
    online: 34500,
    verified: true,
    featured: true,
    category: "Gaming",
    tags: ["FPS", "RPG", "Strategy", "Esports", "Streaming"],
    features: [
      "LFG channels for all games",
      "Weekly tournaments",
      "Gaming news updates",
      "Coaching services",
      "Streamer support",
      "Clan recruitment"
    ],
    channels: { text: 92, voice: 28, total: 120 },
    emojis: 420,
    boosts: 35,
    createdAt: "2021-01-10",
    inviteLink: "gamers-paradise"
  },
  {
    id: "space-004",
    name: "Music Producers Club",
    description: "Connect with music producers, beatmakers, and audio engineers",
    longDescription: "A professional community for music production. Share your tracks, get feedback, collaborate with other producers, and learn production techniques from Grammy-nominated professionals.",
    icon: "🎵",
    banner: "from-orange-500 via-red-500 to-pink-500",
    members: 34780,
    online: 6890,
    verified: true,
    featured: false,
    category: "Music",
    tags: ["Production", "Beats", "Mixing", "EDM", "Hip Hop"],
    features: [
      "Feedback channels",
      "Collaboration matching",
      "Sample libraries",
      "Masterclasses",
      "Producer showcases",
      "Sound design workshops"
    ],
    channels: { text: 38, voice: 10, total: 48 },
    emojis: 95,
    boosts: 8,
    createdAt: "2022-06-05",
    inviteLink: "music-producers"
  },
  {
    id: "space-005",
    name: "Fitness & Wellness",
    description: "Your support system for health, fitness, and mental wellness",
    longDescription: "Join our supportive community dedicated to health and wellness. Share your fitness journey, get workout advice, nutrition tips, and mental health support. We have certified trainers and nutritionists available.",
    icon: "💪",
    banner: "from-lime-500 via-green-500 to-emerald-500",
    members: 41250,
    online: 8340,
    verified: true,
    featured: false,
    category: "Lifestyle",
    tags: ["Fitness", "Nutrition", "Yoga", "Mental Health", "Wellness"],
    features: [
      "Workout challenges",
      "Meal prep guides",
      "Certified trainer advice",
      "Progress tracking",
      "Meditation sessions",
      "Accountability partners"
    ],
    channels: { text: 32, voice: 8, total: 40 },
    emojis: 120,
    boosts: 6,
    createdAt: "2022-02-18",
    inviteLink: "fitness-wellness"
  },
  {
    id: "space-006",
    name: "Startup Founders",
    description: "Network with entrepreneurs building the next big thing",
    longDescription: "Connect with fellow founders, investors, and startup enthusiasts. Get advice on fundraising, product development, marketing, and scaling your business. Regular pitch sessions and investor meet-ups.",
    icon: "🚀",
    banner: "from-yellow-500 via-amber-500 to-orange-500",
    members: 28940,
    online: 5670,
    verified: true,
    featured: true,
    category: "Business",
    tags: ["Startups", "Entrepreneurship", "Funding", "SaaS", "Growth"],
    features: [
      "Pitch practice sessions",
      "Investor connections",
      "Co-founder matching",
      "Resource sharing",
      "Expert mentorship",
      "Market research help"
    ],
    channels: { text: 42, voice: 9, total: 51 },
    emojis: 85,
    boosts: 12,
    createdAt: "2021-11-22",
    inviteLink: "startup-founders"
  },
  {
    id: "space-007",
    name: "Anime & Manga Haven",
    description: "Discuss, share, and celebrate Japanese anime and manga culture",
    longDescription: "The largest anime and manga community! Discuss the latest episodes, recommend series, share fan art, and participate in watch parties. We cover everything from classics to seasonal anime.",
    icon: "🎌",
    banner: "from-rose-500 via-pink-500 to-fuchsia-500",
    members: 98450,
    online: 24560,
    verified: true,
    featured: false,
    category: "Entertainment",
    tags: ["Anime", "Manga", "Japanese Culture", "Watch Parties"],
    features: [
      "Episode discussions",
      "Watch parties",
      "Fan art galleries",
      "Manga recommendations",
      "Cosplay showcase",
      "Japanese language learning"
    ],
    channels: { text: 76, voice: 18, total: 94 },
    emojis: 380,
    boosts: 18,
    createdAt: "2021-05-14",
    inviteLink: "anime-haven"
  },
  {
    id: "space-008",
    name: "Photography Masters",
    description: "A community for photography enthusiasts and professionals",
    longDescription: "From beginners to professional photographers, join us to improve your craft. Share your photos, get constructive feedback, learn editing techniques, and discover the best gear.",
    icon: "📷",
    banner: "from-slate-500 via-gray-500 to-zinc-500",
    members: 36720,
    online: 7120,
    verified: true,
    featured: false,
    category: "Creative Arts",
    tags: ["Photography", "Editing", "Gear", "Portraits", "Landscape"],
    features: [
      "Photo critique sessions",
      "Weekly photo challenges",
      "Gear reviews",
      "Editing tutorials",
      "Location scouting",
      "Portfolio building"
    ],
    channels: { text: 34, voice: 6, total: 40 },
    emojis: 110,
    boosts: 9,
    createdAt: "2022-04-08",
    inviteLink: "photo-masters"
  },
  {
    id: "space-009",
    name: "Book Club Central",
    description: "For readers who love to discuss books and discover new authors",
    longDescription: "Join fellow book lovers in discussing classics, bestsellers, and hidden gems. Monthly book selections, author Q&As, writing workshops, and a vast library of recommendations.",
    icon: "📚",
    banner: "from-amber-600 via-yellow-600 to-orange-600",
    members: 24580,
    online: 4230,
    verified: false,
    featured: false,
    category: "Education",
    tags: ["Books", "Reading", "Literature", "Writing", "Authors"],
    features: [
      "Monthly book club",
      "Author AMAs",
      "Writing workshops",
      "Genre discussions",
      "Book recommendations",
      "Reading challenges"
    ],
    channels: { text: 28, voice: 5, total: 33 },
    emojis: 65,
    boosts: 4,
    createdAt: "2022-07-12",
    inviteLink: "book-club"
  },
  {
    id: "space-010",
    name: "Crypto Traders",
    description: "Cryptocurrency trading, blockchain tech, and market analysis",
    longDescription: "Stay ahead in the crypto market with real-time analysis, trading strategies, and blockchain discussions. Learn from experienced traders and stay updated with market trends.",
    icon: "₿",
    banner: "from-blue-600 via-cyan-600 to-teal-600",
    members: 56890,
    online: 15670,
    verified: true,
    featured: true,
    category: "Finance",
    tags: ["Crypto", "Trading", "Blockchain", "DeFi", "NFT"],
    features: [
      "Market analysis",
      "Trading signals",
      "Technical analysis lessons",
      "DeFi discussions",
      "NFT marketplace",
      "Whale alerts"
    ],
    channels: { text: 52, voice: 11, total: 63 },
    emojis: 145,
    boosts: 16,
    createdAt: "2021-09-30",
    inviteLink: "crypto-traders"
  },
  {
    id: "space-011",
    name: "Language Learners",
    description: "Practice and learn languages with native speakers worldwide",
    longDescription: "Learn any language with help from native speakers! Practice conversation, get cultural insights, share resources, and make international friends. Supporting 50+ languages.",
    icon: "🌍",
    banner: "from-teal-500 via-cyan-500 to-sky-500",
    members: 67430,
    online: 16890,
    verified: true,
    featured: false,
    category: "Education",
    tags: ["Languages", "Culture", "Learning", "Exchange", "Travel"],
    features: [
      "Language exchange partners",
      "Native speaker help",
      "Grammar lessons",
      "Culture discussions",
      "Voice practice rooms",
      "Resource library"
    ],
    channels: { text: 84, voice: 20, total: 104 },
    emojis: 280,
    boosts: 11,
    createdAt: "2021-07-25",
    inviteLink: "language-learners"
  },
  {
    id: "space-012",
    name: "Movie Buffs",
    description: "Discuss films, TV shows, and everything cinema",
    longDescription: "A community for cinema enthusiasts! Discuss new releases, classics, hidden gems, and TV series. Weekly movie nights, director spotlights, and film analysis.",
    icon: "🎬",
    banner: "from-red-600 via-rose-600 to-pink-600",
    members: 43210,
    online: 9870,
    verified: true,
    featured: false,
    category: "Entertainment",
    tags: ["Movies", "TV Shows", "Cinema", "Reviews", "Discussions"],
    features: [
      "Weekly watch parties",
      "Film analysis",
      "Director spotlights",
      "Movie recommendations",
      "Review discussions",
      "Spoiler-free channels"
    ],
    channels: { text: 48, voice: 10, total: 58 },
    emojis: 190,
    boosts: 7,
    createdAt: "2022-01-20",
    inviteLink: "movie-buffs"
  },
  {
    id: "space-013",
    name: "Pet Lovers Paradise",
    description: "Share adorable pet photos and get care advice",
    longDescription: "A wholesome community for all pet lovers! Share photos, get veterinary advice, discuss training tips, and connect with other pet parents. All pets welcome!",
    icon: "🐾",
    banner: "from-pink-400 via-rose-400 to-red-400",
    members: 89670,
    online: 21340,
    verified: true,
    featured: false,
    category: "Lifestyle",
    tags: ["Pets", "Dogs", "Cats", "Animals", "Care"],
    features: [
      "Pet photo sharing",
      "Veterinary Q&A",
      "Training advice",
      "Adoption support",
      "Product recommendations",
      "Pet loss support"
    ],
    channels: { text: 56, voice: 8, total: 64 },
    emojis: 320,
    boosts: 13,
    createdAt: "2021-12-08",
    inviteLink: "pet-lovers"
  },
  {
    id: "space-014",
    name: "Tech Innovators",
    description: "Explore emerging technologies and innovation",
    longDescription: "Dive deep into emerging tech: AI, robotics, quantum computing, biotech, and more. Connect with researchers, engineers, and tech enthusiasts shaping the future.",
    icon: "🤖",
    banner: "from-indigo-600 via-purple-600 to-violet-600",
    members: 38940,
    online: 8120,
    verified: true,
    featured: true,
    category: "Technology",
    tags: ["AI", "Innovation", "Research", "Future Tech", "Science"],
    features: [
      "Research paper discussions",
      "Tech demos",
      "Expert talks",
      "Innovation showcases",
      "Collaboration projects",
      "Funding opportunities"
    ],
    channels: { text: 44, voice: 9, total: 53 },
    emojis: 130,
    boosts: 10,
    createdAt: "2022-05-03",
    inviteLink: "tech-innovators"
  },
  {
    id: "space-015",
    name: "Travel Explorers",
    description: "Share travel experiences and discover amazing destinations",
    longDescription: "Connect with travelers worldwide! Share your adventures, get destination tips, find travel buddies, and plan your next trip. Digital nomads welcome!",
    icon: "✈️",
    banner: "from-sky-500 via-blue-500 to-indigo-500",
    members: 52180,
    online: 11450,
    verified: true,
    featured: false,
    category: "Lifestyle",
    tags: ["Travel", "Adventure", "Culture", "Digital Nomad", "Photography"],
    features: [
      "Destination guides",
      "Travel buddy matching",
      "Photo sharing",
      "Budget tips",
      "Safety advice",
      "Accommodation reviews"
    ],
    channels: { text: 62, voice: 12, total: 74 },
    emojis: 240,
    boosts: 15,
    createdAt: "2021-10-17",
    inviteLink: "travel-explorers"
  },
  {
    id: "space-016",
    name: "DIY & Crafts",
    description: "Create, share, and inspire with DIY projects and crafts",
    longDescription: "A creative space for makers and crafters! Share your projects, get inspiration, learn new techniques, and participate in monthly craft challenges.",
    icon: "🛠️",
    banner: "from-orange-400 via-amber-400 to-yellow-400",
    members: 31450,
    online: 6780,
    verified: false,
    featured: false,
    category: "Creative Arts",
    tags: ["DIY", "Crafts", "Handmade", "Woodworking", "Sewing"],
    features: [
      "Project tutorials",
      "Monthly challenges",
      "Material sourcing tips",
      "Technique workshops",
      "Marketplace",
      "Collaboration projects"
    ],
    channels: { text: 36, voice: 7, total: 43 },
    emojis: 95,
    boosts: 5,
    createdAt: "2022-08-14",
    inviteLink: "diy-crafts"
  },
  {
    id: "space-017",
    name: "Career Growth Hub",
    description: "Advance your career with mentorship and professional development",
    longDescription: "Level up your career! Get resume reviews, interview prep, mentorship, networking opportunities, and career advice from industry professionals.",
    icon: "💼",
    banner: "from-gray-700 via-slate-700 to-zinc-700",
    members: 44560,
    online: 9230,
    verified: true,
    featured: true,
    category: "Business",
    tags: ["Career", "Jobs", "Mentorship", "Networking", "Skills"],
    features: [
      "Resume reviews",
      "Mock interviews",
      "Mentor matching",
      "Job board",
      "Skill workshops",
      "Networking events"
    ],
    channels: { text: 38, voice: 8, total: 46 },
    emojis: 75,
    boosts: 8,
    createdAt: "2022-03-28",
    inviteLink: "career-growth"
  },
  {
    id: "space-018",
    name: "Food & Cooking",
    description: "Share recipes, cooking tips, and culinary adventures",
    longDescription: "A delicious community for food lovers and home cooks! Share recipes, cooking techniques, restaurant recommendations, and food photography.",
    icon: "🍳",
    banner: "from-red-500 via-orange-500 to-yellow-500",
    members: 61290,
    online: 13680,
    verified: true,
    featured: false,
    category: "Lifestyle",
    tags: ["Cooking", "Recipes", "Baking", "Food", "Restaurants"],
    features: [
      "Recipe library",
      "Cooking classes",
      "Food photography",
      "Restaurant reviews",
      "Technique videos",
      "Meal planning help"
    ],
    channels: { text: 54, voice: 10, total: 64 },
    emojis: 215,
    boosts: 12,
    createdAt: "2021-06-19",
    inviteLink: "food-cooking"
  },
  {
    id: "space-019",
    name: "Mental Health Support",
    description: "A safe space for mental health discussions and peer support",
    longDescription: "A supportive, judgment-free community for mental health. Share experiences, find coping strategies, and connect with others who understand. Professional resources available.",
    icon: "🧠",
    banner: "from-purple-400 via-violet-400 to-indigo-400",
    members: 28730,
    online: 6140,
    verified: true,
    featured: false,
    category: "Lifestyle",
    tags: ["Mental Health", "Support", "Wellness", "Therapy", "Self-Care"],
    features: [
      "Peer support groups",
      "Coping strategies",
      "Professional resources",
      "Anonymous channels",
      "Crisis support",
      "Wellness activities"
    ],
    channels: { text: 24, voice: 6, total: 30 },
    emojis: 80,
    boosts: 6,
    createdAt: "2022-02-05",
    inviteLink: "mental-health"
  },
  {
    id: "space-020",
    name: "Science Geeks",
    description: "Discuss scientific discoveries and fascinating research",
    longDescription: "For science enthusiasts! Discuss the latest discoveries, share research, debate theories, and explore all scientific fields from astronomy to zoology.",
    icon: "🔬",
    banner: "from-cyan-600 via-blue-600 to-indigo-600",
    members: 39850,
    online: 8760,
    verified: true,
    featured: false,
    category: "Education",
    tags: ["Science", "Research", "Physics", "Biology", "Chemistry"],
    features: [
      "Paper discussions",
      "Science news",
      "Expert AMAs",
      "Study groups",
      "Lab tours",
      "Career guidance"
    ],
    channels: { text: 48, voice: 10, total: 58 },
    emojis: 165,
    boosts: 9,
    createdAt: "2021-11-05",
    inviteLink: "science-geeks"
  }
];

export const getSpacesByCategory = (category: string) => {
  return mockSpaces.filter(space => space.category === category);
};

export const getFeaturedSpaces = () => {
  return mockSpaces.filter(space => space.featured);
};

export const getVerifiedSpaces = () => {
  return mockSpaces.filter(space => space.verified);
};

export const getTopSpacesByMembers = (limit: number = 10) => {
  return [...mockSpaces]
    .sort((a, b) => b.members - a.members)
    .slice(0, limit);
};

