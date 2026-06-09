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
    value: 4,
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
    tagline: "Production-grade messaging platform with PWA support",
    description:
      "TalishTalks is a full-featured real-time chat application built with the MERN stack and Socket.io. Features include PWA support, hidden chats, PIN protection, disappearing messages, and rich media uploads.",
    type: "Real-Time App",
    isFeatured: true,
    iconName: "chat",
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
  },

  // ━━━ 2. ShopEasy ━━━
  {
    id: "shopeasy",
    title: "ShopEasy",
    subtitle: "Full-Stack E-Commerce Platform",
    tagline: "Complete clothing store with Razorpay integration",
    description:
      "ShopEasy is a complete e-commerce platform for clothing and accessories with customer storefront and full-featured admin dashboard. Integrates Razorpay for secure payments, real-time order tracking, inventory management.",
    type: "E-Commerce",
    isFeatured: false,
    iconName: "shop",
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
      "Responsive design",
    ],
    stats: [
      { label: "Payments", value: "Razorpay" },
      { label: "Auth", value: "JWT" },
      { label: "Panel", value: "Admin CMS" },
      { label: "Database", value: "MongoDB" },
    ],
    github: "https://github.com/harshu4675/ShopEasy",
    live: "https://shopeasy-fashionstore.netlify.app",
  },

  // ━━━ 3. BlogSpace ━━━
  {
    id: "blogspace",
    title: "BlogSpace",
    subtitle: "Modern Blogging Platform",
    tagline: "Feature-rich blog platform with CMS and dark mode",
    description:
      "BlogSpace is a full-featured blogging platform with clean reading experience and powerful admin capabilities. Features rich content publishing, likes, comments, bookmarks, dark mode, and SEO-friendly structure.",
    type: "Content Platform",
    isFeatured: false,
    iconName: "blog",
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
  },

  // ━━━ 4. BrewHaven ━━━
  {
    id: "brewhaven",
    title: "BrewHaven",
    subtitle: "Coffee Shop E-Commerce + PWA",
    tagline: "Premium coffee ordering with offline support",
    description:
      "BrewHaven is a complete coffee shop e-commerce platform with PWA capabilities. Features offline shopping, real-time order tracking, admin dashboard, shop status indicator, and product reviews.",
    type: "PWA E-Commerce",
    isFeatured: false,
    iconName: "coffee",
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
  },

  // ━━━ 5. CodeMart ━━━
  {
    id: "codemart",
    title: "CodeMart",
    subtitle: "Digital Code Marketplace",
    tagline: "Buy & sell code templates with secure payments",
    description:
      "CodeMart is a full-fledged digital marketplace for buying and selling code templates. Features Razorpay integration, real-time notifications, email verification, downloadable products, and admin analytics.",
    type: "Marketplace",
    isFeatured: false,
    iconName: "marketplace",
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
  },

  // ━━━ 6. EdTech ━━━
  {
    id: "edtech",
    title: "EdTech",
    subtitle: "Interactive Learning Platform",
    tagline: "Modern education platform for tech learners",
    description:
      "EdTech is a comprehensive education platform for developers. Features curated learning content, interactive lessons, save articles for later, scroll-aware navigation, and smooth reading experience.",
    type: "EdTech Platform",
    isFeatured: false,
    iconName: "education",
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
  },
];

export const GITHUB_PROFILE_URL = "https://github.com/harshu4675";

export const EXPERIENCE = [
  {
    id: "kodrish",
    company: "Kodrish Innovation",
    role: "Full Stack Web Development Intern",
    duration: "4 Months",
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
export const CERTIFICATIONS = [
  {
    id: "kodrish-cert",
    title: "Web Development Internship",
    issuer: "KodRish Innovation & Solutions",
    year: "2025",
    duration: "May 2025 – Aug 2025",
    type: "Internship Certificate",
    category: "professional",
    color: "#E94B3C",
    description:
      "Successfully completed a 4-month internship in Web Development. Worked on real-world MERN stack projects, demonstrated consistency and hard work throughout the internship period.",
    skills: [
      "MERN Stack",
      "React.js",
      "Node.js",
      "MongoDB",
      "Express.js",
      "REST APIs",
    ],
    credentialId: "KDRS2025786-934",
    internshipId: "KDRS25-083",
    issuedBy: "Krish Bhagat (Founder)",
    certificateUrl: "/assets/certificates/kodrish-certificate.jpg",
    verifyUrl: "",
  },

  {
    id: "ypsilon-cert",
    title: "Core & Advanced Java Internship",
    issuer: "Ypsilon IT Solutions",
    year: "2024",
    duration: "May 2024 – June 2024",
    type: "Internship Certificate",
    category: "professional",
    color: "#5B5FC7",
    description:
      "Successfully completed internship program at Ypsilon IT Solutions Pvt. Ltd. Worked on assigned client projects using Core Java and Advanced Java concepts during 4th semester.",
    skills: [
      "Core Java",
      "Advanced Java",
      "OOP",
      "Collections",
      "JDBC",
      "Multithreading",
    ],
    credentialId: "YPS/202406/7607",
    issuedBy: "Pranay Pariwal (Director)",
    certificateUrl: "/assets/certificates/ypsilon-certificate.jpg",
    verifyUrl: "",
  },

  {
    id: "hr-js-intermediate",
    title: "JavaScript (Intermediate)",
    issuer: "HackerRank",
    year: "2026",
    type: "Skill Verified",
    category: "hackerrank",
    color: "#00EA64",
    description:
      "Passed the HackerRank JavaScript (Intermediate) skill certification test, demonstrating proficiency in advanced JavaScript concepts, async programming, and ES6+ features.",
    skills: [
      "JavaScript",
      "ES6+",
      "Async/Await",
      "Closures",
      "Higher-Order Functions",
    ],
    credentialId: "6581BC9B1DA8",
    certificateUrl: "/assets/certificates/hr-javascript-intermediate.jpg",
    verifyUrl: "https://www.hackerrank.com/certificates/6581BC9B1DA8",
  },

  {
    id: "hr-frontend-react",
    title: "Frontend Developer (React)",
    issuer: "HackerRank",
    year: "2026",
    type: "Role Certified",
    category: "hackerrank",
    color: "#00EA64",
    description:
      "Passed the HackerRank Frontend Developer (React) role certification test, validating expertise in React.js, components, hooks, and modern frontend development.",
    skills: [
      "React.js",
      "JSX",
      "Hooks",
      "Components",
      "State Management",
      "Props",
    ],
    credentialId: "7520501F487D",
    certificateUrl: "/assets/certificates/hr-frontend-react.jpg",
    verifyUrl: "https://www.hackerrank.com/certificates/7520501F487D",
  },

  {
    id: "fcc-responsive",
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    year: "2026",
    duration: "300 Hours",
    type: "Developer Certification",
    category: "freecodecamp",
    color: "#0A0A23",
    description:
      "Successfully completed Legacy Responsive Web Design V8 Developer Certification. 300-hour curriculum covering HTML5, CSS3, Flexbox, Grid, and accessibility.",
    skills: ["HTML5", "CSS3", "Flexbox", "Grid", "Responsive Design", "A11y"],
    certificateUrl: "/assets/certificates/fcc-responsive-web.jpg",
    verifyUrl:
      "https://www.freecodecamp.org/certification/harshu6278/responsive-web-design",
  },

  {
    id: "fcc-javascript",
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    year: "2026",
    duration: "300 Hours",
    type: "Developer Certification",
    category: "freecodecamp",
    color: "#0A0A23",
    description:
      "Successfully completed Legacy JavaScript Algorithms and Data Structures V8 Developer Certification. 300-hour curriculum covering ES6, OOP, functional programming, and algorithms.",
    skills: [
      "JavaScript",
      "Algorithms",
      "Data Structures",
      "OOP",
      "Functional Programming",
      "Regex",
    ],
    certificateUrl: "/assets/certificates/fcc-javascript.jpg",
    verifyUrl:
      "https://www.freecodecamp.org/certification/harshu6278/javascript-algorithms-and-data-structures",
  },

  {
    id: "fcc-frontend",
    title: "Front-End Development Libraries",
    issuer: "freeCodeCamp",
    year: "2026",
    duration: "300 Hours",
    type: "Developer Certification",
    category: "freecodecamp",
    color: "#0A0A23",
    description:
      "Successfully completed Front-End Development Libraries V8 Developer Certification. 300-hour curriculum covering React, Redux, Bootstrap, Sass, and jQuery.",
    skills: ["React", "Redux", "Bootstrap", "Sass", "jQuery", "Modern UI"],
    certificateUrl: "/assets/certificates/fcc-frontend-libraries.jpg",
    verifyUrl:
      "https://www.freecodecamp.org/certification/harshu6278/front-end-development-libraries",
  },

  {
    id: "scaler-sql",
    title: "SQL for Beginners with MySQL",
    issuer: "Scaler Topics",
    year: "2025",
    duration: "5 Modules",
    type: "Course Certification",
    category: "course",
    color: "#2563EB",
    description:
      "Completed comprehensive SQL course covering MySQL fundamentals, database design, queries, joins, and indexing. 48 video tutorials, 5 modules, and 5 hands-on challenges.",
    skills: ["SQL", "MySQL", "Database Design", "Queries", "Joins", "Indexing"],
    issuedBy: "Anshuman Singh (Co-founder, Scaler)",
    courseDetails: "48 Tutorials • 5 Modules • 5 Challenges",
    certificateUrl: "/assets/certificates/scaler-sql.jpg",
    verifyUrl: "",
  },
];
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
