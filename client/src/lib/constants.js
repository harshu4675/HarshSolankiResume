export const PERSONAL = {
  name: "Harsh Solanki",
  firstName: "Harsh",
  lastName: "Solanki",
  role: "Full Stack MERN Developer",
  tagline: "Building Full-Stack Applications That Solve Real Problems",
  shortBio:
    "Full Stack MERN Developer with internship experience at Kodrish Innovation.",
  longBio: `I'm a Full Stack MERN Developer based in Indore, India, with a B.Tech in Computer Science Engineering from IPS Academy.`,
  email: "harshu6278@gmail.com",
  phone: "+91 7898969930",
  location: "Indore, Madhya Pradesh, India",
  availability: "Open to Work",
};

export const SOCIAL = {
  github: "https://github.com/harshu4675",
  linkedin: "https://www.linkedin.com/in/harsh-solanki-2b3a04310/",
  hackerrank: "https://www.hackerrank.com/harshu6278",
  email: "mailto:harshu6278@gmail.com",
};

export const METRICS = [
  {
    id: "projects",
    value: 20,
    suffix: "+",
    label: "Major Projects",
    description: "Production-ready applications",
  },
  {
    id: "experience",
    value: 3,
    suffix: " Mo",
    label: "Industry Experience",
    description: "At Kodrish Innovation",
  },
  {
    id: "stack",
    value: "MERN",
    suffix: "",
    label: "Tech Stack",
    description: "Full Stack Developer",
    isText: true,
  },
  {
    id: "graduation",
    value: "B.Tech",
    suffix: "",
    label: "CSE Graduate",
    description: "IPS Academy",
    isText: true,
  },
];

// ━━━ Skills with experience tags instead of percentages ━━━
export const SKILLS = {
  Frontend: [
    {
      name: "React.js",
      icon: "⚛️",
      tags: ["Daily Use", "Production"],
      description: "Built 20+ apps with hooks, context, and routing",
    },
    {
      name: "JavaScript ES6+",
      icon: "📜",
      tags: ["Daily Use", "Advanced"],
      description: "Async/await, closures, modern syntax patterns",
    },
    {
      name: "Tailwind CSS",
      icon: "🎨",
      tags: ["Daily Use", "Production"],
      description: "Custom design systems & responsive layouts",
    },
    {
      name: "HTML5",
      icon: "🌐",
      tags: ["Expert", "Semantic"],
      description: "Accessible, SEO-friendly markup",
    },
    {
      name: "CSS3",
      icon: "✨",
      tags: ["Advanced", "Animations"],
      description: "Flexbox, Grid, custom animations",
    },
    {
      name: "Responsive Design",
      icon: "📱",
      tags: ["Mobile-First", "Production"],
      description: "Pixel-perfect on all screen sizes",
    },
  ],
  Backend: [
    {
      name: "Node.js",
      icon: "🟢",
      tags: ["Daily Use", "Production"],
      description: "Server runtime for all backend projects",
    },
    {
      name: "Express.js",
      icon: "🚀",
      tags: ["Production", "REST APIs"],
      description: "Built scalable APIs with middleware",
    },
    {
      name: "REST APIs",
      icon: "🔌",
      tags: ["Production", "Best Practices"],
      description: "RESTful design with proper status codes",
    },
    {
      name: "JWT Authentication",
      icon: "🔐",
      tags: ["Production", "Secure"],
      description: "Token-based auth with refresh logic",
    },
    {
      name: "Socket.io",
      icon: "⚡",
      tags: ["Real-Time", "Production"],
      description: "Built TalishTalks chat with live messaging",
    },
  ],
  Database: [
    {
      name: "MongoDB",
      icon: "🍃",
      tags: ["Daily Use", "Production"],
      description: "Mongoose ODM, aggregations, indexes",
    },
    {
      name: "MySQL",
      icon: "🗄️",
      tags: ["Learning", "Fundamentals"],
      description: "SQL queries, joins, normalization",
    },
  ],
  Tools: [
    {
      name: "Git & GitHub",
      icon: "📦",
      tags: ["Daily Use", "Collaboration"],
      description: "Version control, PRs, branching",
    },
    {
      name: "Postman",
      icon: "🧪",
      tags: ["API Testing", "Daily Use"],
      description: "Testing & documenting endpoints",
    },
    {
      name: "VS Code",
      icon: "💻",
      tags: ["Primary Editor", "Daily Use"],
      description: "Customized workflow with extensions",
    },
    {
      name: "Cloudinary",
      icon: "☁️",
      tags: ["Production", "Media"],
      description: "Image/video uploads with optimization",
    },
    {
      name: "Razorpay",
      icon: "💳",
      tags: ["Production", "Payments"],
      description: "E-commerce payment integration",
    },
    {
      name: "Render / Netlify",
      icon: "🌍",
      tags: ["Deployment", "CI/CD"],
      description: "Production deployments & DNS",
    },
  ],
  Concepts: [
    {
      name: "Real-Time Systems",
      icon: "⚡",
      tags: ["Built", "Production"],
      description: "WebSockets, live updates, notifications",
    },
    {
      name: "Auth & Authorization",
      icon: "🔐",
      tags: ["Built", "Secure"],
      description: "JWT, RBAC, protected routes",
    },
    {
      name: "PWA Development",
      icon: "📲",
      tags: ["Built", "Offline-First"],
      description: "Service workers, push notifications",
    },
    {
      name: "Component Architecture",
      icon: "🧩",
      tags: ["Daily Use", "Best Practices"],
      description: "Reusable, composable React patterns",
    },
    {
      name: "Performance Optimization",
      icon: "⚡",
      tags: ["Advanced", "Production"],
      description: "Code splitting, lazy loading, caching",
    },
    {
      name: "API Design",
      icon: "🔌",
      tags: ["RESTful", "Best Practices"],
      description: "Clean, versioned, documented APIs",
    },
  ],
};

export const PROJECTS = [
  // ━━━ 1. TalishTalks (Flagship) ━━━
  {
    id: "talishtalks",
    title: "TalishTalks",
    subtitle: "Real-Time Chat Application",
    tagline: "A production-grade messaging platform with advanced features",
    description:
      "TalishTalks is a full-featured real-time chat application built with the MERN stack and Socket.io. It rivals commercial messaging apps with features like PWA support, hidden chats, PIN protection, disappearing messages, and rich media uploads.",
    type: "Flagship Project",
    isFeatured: true,
    color: "#E94B3C",
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "Cloudinary",
      "PWA",
    ],
    features: [
      "Real-time messaging with Socket.io",
      "Typing indicators & read receipts",
      "Push notifications (Web Push API)",
      "Hidden chats with PIN protection",
      "User blocking & management",
      "Disappearing messages",
      "Cloudinary media uploads",
      "Full offline support (Service Worker)",
      "Progressive Web App (PWA)",
      "Dynamic themes & customization",
    ],
    stats: [
      { label: "Real-Time", value: "Socket.io" },
      { label: "Storage", value: "Cloudinary" },
      { label: "Offline", value: "PWA Ready" },
      { label: "Security", value: "JWT + PIN" },
    ],
    github: "https://github.com/harshu4675/TalishTalks",
    live: "https://talishtalks.netlify.app",
    image: "/assets/projects/talishtalks.png",
    mockupBg: "#1A1A2E",
    icon: "💬",
  },

  // ━━━ 2. ShopEasy (E-Commerce) ━━━ FIRST IN GRID
  {
    id: "shopeasy",
    title: "ShopEasy",
    subtitle: "Full-Stack E-Commerce Platform",
    tagline: "Complete clothing & accessories store with Razorpay",
    description:
      "ShopEasy is a complete e-commerce platform for clothing and accessories with customer storefront and full-featured admin dashboard. Integrates Razorpay for secure payments, real-time order tracking, inventory management, and JWT-based authentication.",
    type: "E-Commerce",
    isFeatured: false,
    color: "#5B5FC7",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Razorpay", "JWT"],
    features: [
      "Product catalog with categories",
      "Advanced search & smart filters",
      "Shopping cart & checkout flow",
      "Razorpay payment integration",
      "Real-time order tracking",
      "Admin dashboard with CMS",
      "Inventory management",
      "JWT authentication",
      "Order history & invoices",
      "Fully responsive design",
    ],
    stats: [
      { label: "Payments", value: "Razorpay" },
      { label: "Auth", value: "JWT" },
      { label: "Panel", value: "Admin CMS" },
      { label: "Database", value: "MongoDB" },
    ],
    github: "https://github.com/harshu4675/ShopEasy",
    live: "https://shopeasy-fashionstore.netlify.app",
    image: "/assets/projects/shopeasy.png",
    mockupBg: "#EEF1FF",
    icon: "🛍️",
  },

  // ━━━ 3. BlogSpace (Blog Platform) ━━━ SECOND IN GRID
  {
    id: "blogspace",
    title: "BlogSpace",
    subtitle: "Modern Blogging Platform",
    tagline: "Feature-rich blogging platform with CMS",
    description:
      "BlogSpace is a full-featured blogging platform with clean reading experience and powerful admin capabilities. Features rich content publishing, social interactions (likes, comments, bookmarks), category organization, dark mode support, and SEO-friendly structure.",
    type: "Content Platform",
    isFeatured: false,
    color: "#7C3AED",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Cloudinary", "JWT"],
    features: [
      "Rich blog publishing editor",
      "Likes, comments & bookmarks",
      "Category organization",
      "Admin panel & user management",
      "JWT authentication",
      "Dark mode support",
      "SEO-friendly structure",
      "Cloudinary image uploads",
      "Reading time estimation",
      "Responsive layout",
    ],
    stats: [
      { label: "Content", value: "Rich Editor" },
      { label: "Images", value: "Cloudinary" },
      { label: "Mode", value: "Dark Mode" },
      { label: "Friendly", value: "SEO Ready" },
    ],
    github: "https://github.com/harshu4675/BlogSpace",
    live: "https://blogspacebyharshuu.netlify.app",
    image: "/assets/projects/blogspace.png",
    mockupBg: "#F5EEFF",
    icon: "✍️",
  },

  // ━━━ 4. BrewHaven (Coffee Shop PWA) ━━━
  {
    id: "brewhaven",
    title: "BrewHaven",
    subtitle: "Coffee Shop E-Commerce + PWA",
    tagline: "Premium coffee ordering with offline support",
    description:
      "BrewHaven is a complete coffee shop e-commerce platform with PWA capabilities. Features include offline shopping, real-time order tracking, admin dashboard, shop status indicator, and product reviews — all designed for a smooth mobile-first experience.",
    type: "E-Commerce + PWA",
    isFeatured: false,
    color: "#8B4513",
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PWA",
      "Service Worker",
    ],
    features: [
      "Progressive Web App (PWA)",
      "Offline shopping capability",
      "Real-time shop status",
      "Product reviews & ratings",
      "Admin dashboard",
      "Order tracking",
      "Cart management",
      "JWT authentication",
      "Install prompt for mobile",
    ],
    stats: [
      { label: "Type", value: "PWA App" },
      { label: "Offline", value: "Yes" },
      { label: "Reviews", value: "Built-in" },
      { label: "Admin", value: "Full CMS" },
    ],
    github: "https://github.com/harshu4675/BrewHaven",
    live: "https://your-own-brewhaven.netlify.app",
    image: "/assets/projects/brewhaven.png",
    mockupBg: "#F5E6D3",
    icon: "☕",
  },

  // ━━━ 5. CodeMart (Code Marketplace) ━━━
  {
    id: "codemart",
    title: "CodeMart",
    subtitle: "Digital Code Marketplace",
    tagline: "Buy & sell code templates with secure payments",
    description:
      "CodeMart is a full-fledged digital marketplace for buying and selling code templates, components, and starter projects. Features Razorpay integration, real-time notifications via Socket.io, email verification, password recovery, downloadable products, and comprehensive admin analytics.",
    type: "Marketplace",
    isFeatured: false,
    color: "#2563EB",
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Razorpay",
      "Socket.io",
      "JWT",
    ],
    features: [
      "Razorpay payment integration",
      "Real-time admin notifications",
      "Email verification flow",
      "Password reset via email",
      "Downloadable digital products",
      "Wishlist & purchases tracking",
      "User reviews & ratings",
      "Admin analytics dashboard",
      "Product management CMS",
    ],
    stats: [
      { label: "Payments", value: "Razorpay" },
      { label: "Real-Time", value: "Socket.io" },
      { label: "Analytics", value: "Built-in" },
      { label: "Auth", value: "JWT + Email" },
    ],
    github: "https://github.com/harshu4675/CodeMart",
    live: "https://yourscodemart.netlify.app",
    image: "/assets/projects/codemart.png",
    mockupBg: "#EEF2FF",
    icon: "🛒",
  },

  // ━━━ 6. EdTech (Education Platform) ━━━
  {
    id: "edtech",
    title: "EdTech",
    subtitle: "Interactive Learning Platform",
    tagline: "Modern education platform for tech learners",
    description:
      "EdTech is a comprehensive education platform designed for developers and tech learners. Features include curated learning content, interactive lessons, save articles for later, scroll-aware navigation, mobile-responsive design, and a smooth reading experience built with modern React patterns.",
    type: "EdTech Platform",
    isFeatured: false,
    color: "#0F766E",
    tech: ["React.js", "LocalStorage", "CSS3", "Component Architecture"],
    features: [
      "Interactive learning content",
      "Save lessons for later",
      "Smooth navigation experience",
      "Toast notifications",
      "Scroll-aware navbar",
      "Mobile-responsive menu",
      "Labs section for experiments",
      "Persistent saved content",
      "Modern UI/UX design",
    ],
    stats: [
      { label: "Type", value: "EdTech" },
      { label: "Storage", value: "LocalStorage" },
      { label: "UI", value: "Modern" },
      { label: "Mobile", value: "Responsive" },
    ],
    github: "https://github.com/harshu4675/EdTech",
    live: "https://edtechbyharsh.netlify.app",
    image: "/assets/projects/edtech.png",
    mockupBg: "#ECFDF5",
    icon: "🎓",
  },
];

export const GITHUB_PROFILE_URL = "https://github.com/harshu4675";

export const EXPERIENCE = [
  {
    id: "kodrish",
    company: "Kodrish Innovation",
    role: "Full Stack Web Development Intern",
    duration: "3 Months",
    period: "2024",
    type: "Internship",
    location: "Indore, India",
    description:
      "Worked as a Full Stack Web Development Intern at Kodrish Innovation, contributing to real-world production applications using the MERN stack.",
    responsibilities: [
      "Built and maintained full-stack web features using React.js and Node.js",
      "Developed RESTful APIs with Express.js and MongoDB",
      "Implemented JWT authentication and role-based access control",
      "Collaborated with the engineering team on production deployments",
      "Performed code reviews and maintained clean, documented codebases",
      "Integrated third-party services and optimized application performance",
    ],
    achievements: [
      "Successfully delivered production-ready features on schedule",
      "Reduced API response times through database query optimization",
      "Received Web Development Certification upon completion",
    ],
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "REST APIs",
      "Git",
    ],
  },
];

export const EDUCATION = [
  {
    id: "ips-academy",
    institution: "IPS Academy",
    degree: "Bachelor of Technology",
    field: "Computer Science Engineering",
    shortField: "B.Tech CSE",
    period: "2022 – 2026",
    status: "Completed",
    location: "Indore, Madhya Pradesh, India",
    description:
      "Completed B.Tech in Computer Science Engineering with focus on software development, algorithms, and modern web technologies.",
    highlights: [
      "Core Computer Science fundamentals",
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Software Engineering principles",
      "Web Technology & Application Development",
      "Object-Oriented Programming",
    ],
  },
];

// ━━━ Certifications with View Links ━━━
export const CERTIFICATIONS = [
  {
    id: "kodrish-cert",
    title: "Web Development Certification",
    issuer: "Kodrish Technology",
    year: "2024",
    type: "Professional",
    color: "#E94B3C",
    description:
      "Certification in Full Stack Web Development covering MERN stack technologies.",
    skills: ["React.js", "Node.js", "MongoDB", "Express.js", "REST APIs"],
    certificateUrl: "/assets/certificates/kodrish-certificate.jpg", // ← Add your certificate image
    verifyUrl: "", // optional: external verification link
  },
  {
    id: "ypsilon-cert",
    title: "Core & Advanced Java",
    issuer: "Ypsilon Technology",
    year: "2023",
    type: "Professional",
    color: "#5B5FC7",
    description:
      "Certification covering Core Java fundamentals and Advanced Java programming concepts.",
    skills: ["Core Java", "Advanced Java", "OOP", "Collections", "JDBC"],
    certificateUrl: "/assets/certificates/ypsilon-certificate.jpg",
    verifyUrl: "",
  },
  {
    id: "hr-js",
    title: "JavaScript (Intermediate)",
    issuer: "HackerRank",
    year: "2024",
    type: "Skill Verified",
    color: "#00EA64",
    description:
      "Verified JavaScript intermediate skills through HackerRank assessment.",
    skills: [
      "JavaScript",
      "ES6+",
      "DOM",
      "Async/Await",
      "Functional Programming",
    ],
    certificateUrl: "/assets/certificates/hr-javascript.jpg",
    verifyUrl: "https://www.hackerrank.com/certificates/YOUR_CERT_ID", // ← Paste your HR verify link
  },
  {
    id: "hr-react",
    title: "React (Basic)",
    issuer: "HackerRank",
    year: "2024",
    type: "Skill Verified",
    color: "#00EA64",
    description:
      "Verified React fundamentals through HackerRank skill certification.",
    skills: ["React", "JSX", "Components", "Props", "State"],
    certificateUrl: "/assets/certificates/hr-react.jpg",
    verifyUrl: "https://www.hackerrank.com/certificates/YOUR_CERT_ID",
  },
  {
    id: "hr-problem",
    title: "Problem Solving (Basic)",
    issuer: "HackerRank",
    year: "2024",
    type: "Skill Verified",
    color: "#00EA64",
    description: "Verified problem-solving and algorithmic thinking skills.",
    skills: ["DSA", "Algorithms", "Logic", "Optimization"],
    certificateUrl: "/assets/certificates/hr-problem-solving.jpg",
    verifyUrl: "https://www.hackerrank.com/certificates/YOUR_CERT_ID",
  },
  {
    id: "hr-sql",
    title: "SQL (Basic)",
    issuer: "HackerRank",
    year: "2024",
    type: "Skill Verified",
    color: "#00EA64",
    description: "Verified SQL fundamentals and database querying skills.",
    skills: ["SQL", "Queries", "Joins", "Database Design"],
    certificateUrl: "/assets/certificates/hr-sql.jpg",
    verifyUrl: "https://www.hackerrank.com/certificates/YOUR_CERT_ID",
  },
];
// ━━━ Updated What I Build colors ━━━
export const WHAT_I_BUILD = [
  {
    id: "realtime",
    title: "Real-Time Systems",
    icon: "⚡",
    description:
      "Chat apps, live notifications, and collaborative tools using Socket.io and WebSockets.",
    examples: ["TalishTalks", "Live Updates", "Notifications"],
    color: "#E94B3C",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Platforms",
    icon: "🛍️",
    description:
      "Full-featured stores with payment gateways, inventory management, and admin dashboards.",
    examples: ["Razorpay", "Order Tracking", "Admin CMS"],
    color: "#5B5FC7",
  },
  {
    id: "auth",
    title: "Authentication Systems",
    icon: "🔐",
    description:
      "Secure auth flows with JWT tokens, role-based access control, and protected routes.",
    examples: ["JWT Auth", "RBAC", "OAuth"],
    color: "#0F0F12",
  },
  {
    id: "blogs",
    title: "Content Platforms",
    icon: "✍️",
    description:
      "Blogging platforms and CMS systems with rich editors, categories, and SEO structure.",
    examples: ["Rich Editor", "Categories", "SEO"],
    color: "#7C3AED",
  },
  {
    id: "dashboards",
    title: "Admin Dashboards",
    icon: "📊",
    description:
      "Data-rich admin panels with analytics, CRUD operations, and management interfaces.",
    examples: ["Analytics", "CRUD", "User Mgmt"],
    color: "#0F766E",
  },
  {
    id: "pwa",
    title: "Progressive Web Apps",
    icon: "📲",
    description:
      "Offline-capable web apps with service workers, push notifications, and native-like UX.",
    examples: ["Offline", "Push", "Installable"],
    color: "#B45309",
  },
];

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
