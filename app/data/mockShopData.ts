export interface ShopItem {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: "Avatar" | "Profile" | "Boost" | "Bundle" | "Emoji" | "Theme" | "Effect" | "Premium";
  type: "One-Time" | "Subscription" | "Consumable";
  price: {
    coins?: number;
    premium?: boolean;
    original?: number; // For discounts
  };
  preview: string; // Emoji or icon
  banner: string;
  images?: string[];
  features?: string[];
  discount?: number; // Percentage
  isNew?: boolean;
  isFeatured?: boolean;
  isPremiumOnly?: boolean;
  stock?: number; // For limited items
  purchases: number;
  rating: number;
  reviews: number;
  tags: string[];
}

export const mockShopItems: ShopItem[] = [
  {
    id: "item-001",
    name: "Premium Membership",
    description: "Unlock all premium features and exclusive content",
    longDescription: "Get access to all premium features including custom themes, exclusive emojis, priority support, ad-free experience, and more. Support the platform while enjoying the best experience.",
    category: "Premium",
    type: "Subscription",
    price: {
      coins: 999,
      premium: true
    },
    preview: "👑",
    banner: "from-yellow-500 via-amber-500 to-orange-500",
    features: [
      "All premium themes unlocked",
      "Exclusive emoji packs",
      "Custom profile decorations",
      "Priority support",
      "Ad-free experience",
      "Early access to features",
      "Increased file upload limit",
      "Custom status messages"
    ],
    isNew: false,
    isFeatured: true,
    isPremiumOnly: false,
    purchases: 15670,
    rating: 4.9,
    reviews: 3240,
    tags: ["Premium", "Subscription", "Best Value"]
  },
  {
    id: "item-002",
    name: "Cosmic Avatar Frame",
    description: "Animated galaxy frame for your profile avatar",
    longDescription: "Stand out with this stunning animated galaxy frame. Features swirling cosmic colors and twinkling stars that move around your avatar. Premium quality animation that works everywhere.",
    category: "Avatar",
    type: "One-Time",
    price: {
      coins: 500
    },
    preview: "🌌",
    banner: "from-indigo-600 via-purple-600 to-pink-600",
    features: [
      "Animated galaxy effect",
      "Twinkling stars",
      "Smooth animations",
      "Works in all spaces"
    ],
    discount: 20,
    isNew: true,
    isFeatured: true,
    isPremiumOnly: false,
    purchases: 8920,
    rating: 4.8,
    reviews: 1456,
    tags: ["Avatar", "Animated", "Popular"]
  },
  {
    id: "item-003",
    name: "Dragon Fire Effect",
    description: "Add epic dragon fire breathing effect to your messages",
    longDescription: "Make your messages unforgettable with animated dragon fire effects. Your text appears to be written in flames, complete with smoke and ember particles.",
    category: "Effect",
    type: "Consumable",
    price: {
      coins: 250
    },
    preview: "🐉",
    banner: "from-red-600 via-orange-600 to-yellow-600",
    features: [
      "50 uses included",
      "Animated fire effect",
      "Particle effects",
      "Customizable colors"
    ],
    isNew: false,
    isFeatured: false,
    isPremiumOnly: false,
    stock: 500,
    purchases: 12340,
    rating: 4.7,
    reviews: 2890,
    tags: ["Effect", "Animated", "Limited"]
  },
  {
    id: "item-004",
    name: "Ultimate Creator Bundle",
    description: "Everything you need to build and create in BoloboloMi",
    longDescription: "The complete creator toolkit! Includes premium ASO templates, skill card packs, workflow automation tools, custom themes, and exclusive creator badge. Perfect for serious creators.",
    category: "Bundle",
    type: "One-Time",
    price: {
      coins: 2499,
      original: 3999
    },
    preview: "🎨",
    banner: "from-cyan-500 via-blue-500 to-indigo-500",
    features: [
      "10 Premium ASO Templates",
      "20 Exclusive Skill Cards",
      "Workflow Automation Suite",
      "5 Custom Theme Packs",
      "Creator Badge",
      "Priority Review Access",
      "Lifetime Updates"
    ],
    discount: 37,
    isNew: true,
    isFeatured: true,
    isPremiumOnly: false,
    purchases: 3450,
    rating: 4.9,
    reviews: 678,
    tags: ["Bundle", "Creator", "Best Deal", "Limited Time"]
  },
  {
    id: "item-005",
    name: "Neon Glow Profile",
    description: "Electric neon glow effect for your entire profile",
    longDescription: "Transform your profile with vibrant neon colors. Choose from 12 different neon color schemes that pulse and glow. Make your profile impossible to miss.",
    category: "Profile",
    type: "One-Time",
    price: {
      coins: 750
    },
    preview: "⚡",
    banner: "from-pink-500 via-purple-500 to-blue-500",
    features: [
      "12 neon color schemes",
      "Pulsing glow animation",
      "Customizable intensity",
      "Profile-wide effect"
    ],
    isNew: false,
    isFeatured: false,
    isPremiumOnly: false,
    purchases: 6780,
    rating: 4.6,
    reviews: 1234,
    tags: ["Profile", "Glow", "Customizable"]
  },
  {
    id: "item-006",
    name: "Legendary Emoji Pack",
    description: "100+ exclusive animated emojis for premium members",
    longDescription: "Express yourself like never before! Over 100 hand-crafted animated emojis exclusive to BoloboloMi. Updated monthly with new additions.",
    category: "Emoji",
    type: "One-Time",
    price: {
      coins: 600
    },
    preview: "😎",
    banner: "from-yellow-400 via-orange-400 to-red-400",
    features: [
      "100+ animated emojis",
      "Monthly new additions",
      "High quality animations",
      "Exclusive designs"
    ],
    isNew: false,
    isFeatured: true,
    isPremiumOnly: false,
    purchases: 11230,
    rating: 4.8,
    reviews: 2567,
    tags: ["Emoji", "Animated", "Growing Collection"]
  },
  {
    id: "item-007",
    name: "Rainbow Username",
    description: "Animated rainbow gradient for your username",
    longDescription: "Make your username shine with a smooth rainbow gradient animation. Cycles through all colors of the spectrum in a mesmerizing loop.",
    category: "Profile",
    type: "One-Time",
    price: {
      coins: 450
    },
    preview: "🌈",
    banner: "from-red-400 via-yellow-400 to-green-400",
    features: [
      "Smooth color transitions",
      "Full spectrum animation",
      "Adjustable speed",
      "Works everywhere"
    ],
    isNew: false,
    isFeatured: false,
    isPremiumOnly: false,
    purchases: 9870,
    rating: 4.7,
    reviews: 1890,
    tags: ["Profile", "Rainbow", "Animated"]
  },
  {
    id: "item-008",
    name: "XP Boost Mega Pack",
    description: "3x XP multiplier for 7 days + bonus rewards",
    longDescription: "Level up faster! Triple your XP gains for an entire week. Also includes bonus daily rewards and increased coin drops from quests.",
    category: "Boost",
    type: "Consumable",
    price: {
      coins: 800
    },
    preview: "⚡",
    banner: "from-purple-600 via-pink-600 to-red-600",
    features: [
      "3x XP for 7 days",
      "Bonus daily rewards",
      "Increased coin drops",
      "Stackable with events"
    ],
    isNew: false,
    isFeatured: true,
    isPremiumOnly: false,
    purchases: 14560,
    rating: 4.9,
    reviews: 3456,
    tags: ["Boost", "XP", "Popular", "Best Value"]
  },
  {
    id: "item-009",
    name: "Cyberpunk Theme",
    description: "Futuristic neon cyberpunk theme with animations",
    longDescription: "Transform your interface with this stunning cyberpunk theme. Features neon accents, holographic effects, glitch animations, and a futuristic color palette.",
    category: "Theme",
    type: "One-Time",
    price: {
      coins: 650
    },
    preview: "🤖",
    banner: "from-cyan-600 via-blue-600 to-purple-600",
    features: [
      "Complete theme overhaul",
      "Neon accent colors",
      "Glitch animations",
      "Custom sound effects",
      "Holographic effects"
    ],
    isNew: true,
    isFeatured: true,
    isPremiumOnly: false,
    purchases: 7890,
    rating: 4.8,
    reviews: 1567,
    tags: ["Theme", "Cyberpunk", "Animated", "New"]
  },
  {
    id: "item-010",
    name: "Golden Crown Badge",
    description: "Exclusive golden crown badge for your profile",
    longDescription: "Show your status with this prestigious golden crown badge. Features real-time lighting effects and subtle sparkle animations. Limited availability.",
    category: "Profile",
    type: "One-Time",
    price: {
      coins: 999
    },
    preview: "👑",
    banner: "from-yellow-600 via-amber-600 to-orange-600",
    features: [
      "Animated golden crown",
      "Real-time lighting",
      "Sparkle effects",
      "Limited edition"
    ],
    isNew: false,
    isFeatured: true,
    isPremiumOnly: false,
    stock: 100,
    purchases: 2340,
    rating: 4.9,
    reviews: 567,
    tags: ["Badge", "Premium", "Limited", "Exclusive"]
  },
  {
    id: "item-011",
    name: "Voice Effects Pack",
    description: "10 premium voice modulation effects for voice channels",
    longDescription: "Transform your voice with 10 high-quality voice effects: Robot, Echo, Deep, Chipmunk, Radio, Reverb, Chorus, and more. Professional-grade audio processing.",
    category: "Effect",
    type: "One-Time",
    price: {
      coins: 550
    },
    preview: "🎙️",
    banner: "from-green-500 via-teal-500 to-cyan-500",
    features: [
      "10 voice effects",
      "Real-time processing",
      "High audio quality",
      "Easy toggle on/off"
    ],
    isNew: false,
    isFeatured: false,
    isPremiumOnly: false,
    purchases: 5670,
    rating: 4.6,
    reviews: 1123,
    tags: ["Voice", "Effect", "Audio"]
  },
  {
    id: "item-012",
    name: "Starter Bundle",
    description: "Perfect bundle for new users to get started",
    longDescription: "Everything you need to customize your experience! Includes avatar frame, emoji pack, theme, and bonus coins. Great value for newcomers.",
    category: "Bundle",
    type: "One-Time",
    price: {
      coins: 999,
      original: 1800
    },
    preview: "🎁",
    banner: "from-blue-400 via-cyan-400 to-teal-400",
    features: [
      "Starter Avatar Frame",
      "Basic Emoji Pack (30)",
      "2 Premium Themes",
      "500 Bonus Coins",
      "Welcome Badge"
    ],
    discount: 44,
    isNew: false,
    isFeatured: true,
    isPremiumOnly: false,
    purchases: 18920,
    rating: 4.8,
    reviews: 4567,
    tags: ["Bundle", "Starter", "Best Value"]
  },
  {
    id: "item-013",
    name: "Particle Trail Effect",
    description: "Leave a trail of particles wherever your cursor goes",
    longDescription: "Add magic to every interaction! Your cursor leaves beautiful particle trails with customizable colors and shapes. Choose from stars, hearts, sparkles, and more.",
    category: "Effect",
    type: "One-Time",
    price: {
      coins: 400
    },
    preview: "✨",
    banner: "from-pink-400 via-rose-400 to-red-400",
    features: [
      "Cursor particle trails",
      "10 particle types",
      "Customizable colors",
      "Adjustable intensity"
    ],
    isNew: false,
    isFeatured: false,
    isPremiumOnly: false,
    purchases: 10230,
    rating: 4.7,
    reviews: 2134,
    tags: ["Effect", "Cursor", "Interactive"]
  },
  {
    id: "item-014",
    name: "VIP Status",
    description: "30 days of VIP status with exclusive perks",
    longDescription: "Live like a VIP! Get exclusive access to VIP-only channels, priority in voice channels, special VIP badge, increased storage, and more. Renewable monthly.",
    category: "Premium",
    type: "Subscription",
    price: {
      coins: 1200
    },
    preview: "💎",
    banner: "from-purple-700 via-violet-700 to-indigo-700",
    features: [
      "VIP badge and role",
      "Access to VIP channels",
      "Priority voice queuing",
      "50GB cloud storage",
      "Custom status colors",
      "Ad-free experience"
    ],
    isNew: false,
    isFeatured: false,
    isPremiumOnly: false,
    purchases: 6540,
    rating: 4.8,
    reviews: 1432,
    tags: ["VIP", "Subscription", "Exclusive"]
  },
  {
    id: "item-015",
    name: "Seasonal Spring Pack",
    description: "Limited time spring-themed cosmetic bundle",
    longDescription: "Celebrate spring with this beautiful seasonal pack! Includes cherry blossom avatar frame, spring emoji set, pastel theme, and nature-inspired effects. Available only during spring!",
    category: "Bundle",
    type: "One-Time",
    price: {
      coins: 1499,
      original: 2200
    },
    preview: "🌸",
    banner: "from-pink-300 via-rose-300 to-pink-400",
    features: [
      "Cherry Blossom Frame",
      "50 Spring Emojis",
      "Pastel Dream Theme",
      "Petal Fall Effect",
      "Spring Badge",
      "Limited Edition"
    ],
    discount: 32,
    isNew: true,
    isFeatured: true,
    isPremiumOnly: false,
    stock: 500,
    purchases: 4320,
    rating: 4.9,
    reviews: 891,
    tags: ["Bundle", "Seasonal", "Limited", "Spring"]
  },
  {
    id: "item-016",
    name: "Holographic Avatar",
    description: "Turn your avatar into a hologram with scan line effects",
    longDescription: "Sci-fi coolness! Transform your avatar with holographic effects including scan lines, digital glitches, and a translucent blue glow. Straight out of a sci-fi movie.",
    category: "Avatar",
    type: "One-Time",
    price: {
      coins: 700
    },
    preview: "👤",
    banner: "from-cyan-500 via-blue-500 to-indigo-600",
    features: [
      "Hologram effect",
      "Scan line animations",
      "Digital glitch effects",
      "Adjustable opacity"
    ],
    isNew: false,
    isFeatured: false,
    isPremiumOnly: false,
    purchases: 5890,
    rating: 4.7,
    reviews: 1234,
    tags: ["Avatar", "Sci-Fi", "Animated"]
  },
  {
    id: "item-017",
    name: "Coin Multiplier",
    description: "2x coins from all sources for 30 days",
    longDescription: "Maximize your earnings! Double all coin rewards from quests, daily bonuses, and activities for an entire month. Stack with other boosts for massive gains.",
    category: "Boost",
    type: "Consumable",
    price: {
      coins: 1100
    },
    preview: "🪙",
    banner: "from-yellow-500 via-amber-500 to-orange-500",
    features: [
      "2x coins for 30 days",
      "Applies to all sources",
      "Stackable with events",
      "Automatic activation"
    ],
    isNew: false,
    isFeatured: true,
    isPremiumOnly: false,
    purchases: 9870,
    rating: 4.9,
    reviews: 2345,
    tags: ["Boost", "Coins", "Monthly"]
  },
  {
    id: "item-018",
    name: "Animated Background Pack",
    description: "10 premium animated backgrounds for your profile",
    longDescription: "Make your profile dynamic! Choose from 10 beautifully animated backgrounds: Ocean Waves, Starry Night, Northern Lights, Cherry Blossoms, and more.",
    category: "Profile",
    type: "One-Time",
    price: {
      coins: 850
    },
    preview: "🖼️",
    banner: "from-blue-600 via-purple-600 to-pink-600",
    features: [
      "10 animated backgrounds",
      "Smooth loop animations",
      "HD quality",
      "Easy switching"
    ],
    isNew: true,
    isFeatured: false,
    isPremiumOnly: false,
    purchases: 7650,
    rating: 4.8,
    reviews: 1678,
    tags: ["Profile", "Background", "Animated"]
  },
  {
    id: "item-019",
    name: "Developer Tools Bundle",
    description: "Essential tools for ASO and workflow developers",
    longDescription: "Professional developer toolkit! Includes advanced debugging tools, performance monitoring, testing suite, documentation generator, and developer badge. Must-have for serious developers.",
    category: "Bundle",
    type: "One-Time",
    price: {
      coins: 1899
    },
    preview: "🛠️",
    banner: "from-gray-700 via-slate-700 to-zinc-700",
    features: [
      "Advanced Debugger",
      "Performance Monitor",
      "Automated Testing Suite",
      "API Documentation Gen",
      "Developer Badge",
      "Priority API Access"
    ],
    isNew: false,
    isFeatured: false,
    isPremiumOnly: false,
    purchases: 2340,
    rating: 4.9,
    reviews: 456,
    tags: ["Bundle", "Developer", "Tools", "Professional"]
  },
  {
    id: "item-020",
    name: "Mystery Box",
    description: "Random premium item worth up to 2000 coins!",
    longDescription: "Feeling lucky? Each mystery box contains a random premium item! You're guaranteed to get something worth at least 500 coins, with a chance for items worth up to 2000 coins. Limited to 3 per user.",
    category: "Bundle",
    type: "Consumable",
    price: {
      coins: 400
    },
    preview: "🎁",
    banner: "from-violet-600 via-purple-600 to-fuchsia-600",
    features: [
      "Random premium item",
      "Minimum 500 coin value",
      "Up to 2000 coin value",
      "No duplicates",
      "3 per user limit"
    ],
    isNew: true,
    isFeatured: true,
    isPremiumOnly: false,
    stock: 1000,
    purchases: 8920,
    rating: 4.6,
    reviews: 2134,
    tags: ["Mystery", "Random", "Limited", "Fun"]
  }
];

export const getItemsByCategory = (category: ShopItem["category"]) => {
  return mockShopItems.filter(item => item.category === category);
};

export const getFeaturedItems = () => {
  return mockShopItems.filter(item => item.isFeatured);
};

export const getNewItems = () => {
  return mockShopItems.filter(item => item.isNew);
};

export const getItemsOnSale = () => {
  return mockShopItems.filter(item => item.discount && item.discount > 0);
};

export const getPremiumItems = () => {
  return mockShopItems.filter(item => item.isPremiumOnly);
};

export const getPopularItems = (limit: number = 10) => {
  return [...mockShopItems]
    .sort((a, b) => b.purchases - a.purchases)
    .slice(0, limit);
};

