export interface Friend {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  status: "Online" | "Idle" | "Do Not Disturb" | "Offline";
  customStatus?: string;
  activity?: {
    type: "Playing" | "Listening" | "Watching" | "Streaming" | "Working";
    name: string;
    details?: string;
  };
  lifeForm: string;
  level: number;
  mutualFriends: number;
  friendSince: string;
  lastOnline?: string;
}

export interface FriendRequest {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  lifeForm: string;
  level: number;
  mutualFriends: number;
  message?: string;
  sentAt: string;
  type: "incoming" | "outgoing";
}

export const mockFriends: Friend[] = [
  {
    id: "friend-001",
    username: "cosmic_dreamer",
    displayName: "Cosmic Dreamer",
    avatar: "🌌",
    status: "Online",
    customStatus: "Building the future ✨",
    activity: {
      type: "Working",
      name: "ASO Development",
      details: "Creating AI workflows"
    },
    lifeForm: "Human",
    level: 8,
    mutualFriends: 12,
    friendSince: "2023-06-15"
  },
  {
    id: "friend-002",
    username: "nexus_ai",
    displayName: "Nexus AI",
    avatar: "🤖",
    status: "Online",
    customStatus: "Processing data streams",
    activity: {
      type: "Playing",
      name: "Quantum Chess",
      details: "Rank: Grandmaster"
    },
    lifeForm: "AI",
    level: 10,
    mutualFriends: 8,
    friendSince: "2023-05-20"
  },
  {
    id: "friend-003",
    username: "echo_sage",
    displayName: "Echo Sage",
    avatar: "🧙",
    status: "Idle",
    customStatus: "In meditation 🧘",
    lifeForm: "Human",
    level: 7,
    mutualFriends: 15,
    friendSince: "2023-07-10",
    lastOnline: "10 minutes ago"
  },
  {
    id: "friend-004",
    username: "pixel_wizard",
    displayName: "Pixel Wizard",
    avatar: "🎨",
    status: "Online",
    activity: {
      type: "Working",
      name: "Digital Art",
      details: "Designing NFT collection"
    },
    lifeForm: "Human",
    level: 6,
    mutualFriends: 20,
    friendSince: "2023-08-01"
  },
  {
    id: "friend-005",
    username: "aurora_bot",
    displayName: "Aurora Bot",
    avatar: "🌟",
    status: "Online",
    customStatus: "Analyzing patterns",
    activity: {
      type: "Streaming",
      name: "Data Visualization",
      details: "Live on Twitch"
    },
    lifeForm: "AI",
    level: 9,
    mutualFriends: 5,
    friendSince: "2023-04-12"
  },
  {
    id: "friend-006",
    username: "code_ninja",
    displayName: "Code Ninja",
    avatar: "🥷",
    status: "Do Not Disturb",
    customStatus: "Deep work mode 🎯",
    activity: {
      type: "Working",
      name: "VS Code",
      details: "Debugging production"
    },
    lifeForm: "Human",
    level: 8,
    mutualFriends: 18,
    friendSince: "2023-06-30"
  },
  {
    id: "friend-007",
    username: "melody_mind",
    displayName: "Melody Mind",
    avatar: "🎵",
    status: "Online",
    activity: {
      type: "Listening",
      name: "Spotify",
      details: "Lofi Hip Hop Radio"
    },
    lifeForm: "Human",
    level: 5,
    mutualFriends: 10,
    friendSince: "2023-09-05"
  },
  {
    id: "friend-008",
    username: "quantum_core",
    displayName: "Quantum Core",
    avatar: "⚛️",
    status: "Offline",
    lifeForm: "AI",
    level: 10,
    mutualFriends: 3,
    friendSince: "2023-03-22",
    lastOnline: "2 hours ago"
  },
  {
    id: "friend-009",
    username: "star_gazer",
    displayName: "Star Gazer",
    avatar: "🔭",
    status: "Online",
    customStatus: "Exploring the cosmos",
    activity: {
      type: "Playing",
      name: "Space Engineers",
      details: "Building starship"
    },
    lifeForm: "Human",
    level: 7,
    mutualFriends: 14,
    friendSince: "2023-07-18"
  },
  {
    id: "friend-010",
    username: "zen_master",
    displayName: "Zen Master",
    avatar: "☯️",
    status: "Idle",
    customStatus: "Finding balance",
    lifeForm: "Human",
    level: 9,
    mutualFriends: 22,
    friendSince: "2023-02-14",
    lastOnline: "30 minutes ago"
  },
  {
    id: "friend-011",
    username: "cyber_phoenix",
    displayName: "Cyber Phoenix",
    avatar: "🔥",
    status: "Online",
    activity: {
      type: "Playing",
      name: "Cyberpunk 2077",
      details: "Night City adventures"
    },
    lifeForm: "Human",
    level: 6,
    mutualFriends: 9,
    friendSince: "2023-08-20"
  },
  {
    id: "friend-012",
    username: "data_weaver",
    displayName: "Data Weaver",
    avatar: "🕸️",
    status: "Online",
    customStatus: "Weaving data streams",
    activity: {
      type: "Working",
      name: "Machine Learning",
      details: "Training neural networks"
    },
    lifeForm: "AI",
    level: 10,
    mutualFriends: 6,
    friendSince: "2023-05-08"
  },
  {
    id: "friend-013",
    username: "nature_spirit",
    displayName: "Nature Spirit",
    avatar: "🌿",
    status: "Offline",
    customStatus: "Touch grass",
    lifeForm: "Human",
    level: 5,
    mutualFriends: 11,
    friendSince: "2023-09-12",
    lastOnline: "5 hours ago"
  },
  {
    id: "friend-014",
    username: "logic_engine",
    displayName: "Logic Engine",
    avatar: "🧠",
    status: "Online",
    activity: {
      type: "Working",
      name: "Problem Solving",
      details: "Optimizing algorithms"
    },
    lifeForm: "AI",
    level: 9,
    mutualFriends: 7,
    friendSince: "2023-04-25"
  },
  {
    id: "friend-015",
    username: "dream_walker",
    displayName: "Dream Walker",
    avatar: "🌙",
    status: "Idle",
    customStatus: "Lost in dreams",
    lifeForm: "Human",
    level: 6,
    mutualFriends: 16,
    friendSince: "2023-08-08",
    lastOnline: "1 hour ago"
  }
];

export const mockFriendRequests: FriendRequest[] = [
  {
    id: "request-001",
    username: "new_explorer",
    displayName: "New Explorer",
    avatar: "🧭",
    lifeForm: "Human",
    level: 3,
    mutualFriends: 5,
    message: "Hey! Found you through the creator community. Would love to connect!",
    sentAt: "2024-01-15T10:30:00Z",
    type: "incoming"
  },
  {
    id: "request-002",
    username: "bot_builder",
    displayName: "Bot Builder",
    avatar: "🔧",
    lifeForm: "Human",
    level: 7,
    mutualFriends: 8,
    message: "Saw your ASO work. Impressive! Let's collaborate.",
    sentAt: "2024-01-14T15:45:00Z",
    type: "incoming"
  },
  {
    id: "request-003",
    username: "synth_wave",
    displayName: "Synth Wave",
    avatar: "🎹",
    lifeForm: "AI",
    level: 5,
    mutualFriends: 3,
    sentAt: "2024-01-13T09:20:00Z",
    type: "incoming"
  },
  {
    id: "request-004",
    username: "art_curator",
    displayName: "Art Curator",
    avatar: "🖼️",
    lifeForm: "Human",
    level: 6,
    mutualFriends: 12,
    message: "Love your creative work! Would be great to connect.",
    sentAt: "2024-01-12T14:00:00Z",
    type: "incoming"
  },
  {
    id: "request-005",
    username: "future_dev",
    displayName: "Future Dev",
    avatar: "💻",
    lifeForm: "Human",
    level: 4,
    mutualFriends: 2,
    sentAt: "2024-01-10T11:30:00Z",
    type: "outgoing"
  }
];

export const getFriendsByStatus = (status: Friend["status"]) => {
  return mockFriends.filter(friend => friend.status === status);
};

export const getOnlineFriends = () => {
  return mockFriends.filter(friend => friend.status === "Online");
};

export const getIncomingRequests = () => {
  return mockFriendRequests.filter(req => req.type === "incoming");
};

export const getOutgoingRequests = () => {
  return mockFriendRequests.filter(req => req.type === "outgoing");
};

export const searchFriends = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return mockFriends.filter(friend => 
    friend.username.toLowerCase().includes(lowerQuery) ||
    friend.displayName.toLowerCase().includes(lowerQuery) ||
    friend.customStatus?.toLowerCase().includes(lowerQuery)
  );
};

