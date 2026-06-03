import {
  BriefcaseBusiness,
  Code2,
  Database,
  GraduationCap,
  Layers3,
  Wrench,
} from "lucide-react";

export const profile = {
  name: "Ivan Joseph Jaurigue",
  displayName: "Ivan",
  role: "UI/UX Designer | Front-End Developer | Graphic Designer",
  headline: "Hey, I'm Ivan, a UI/UX-focused Front-End Developer.",
  subtitle:
    "I design and build clean, modern, and interactive web experiences with a strong focus on familiarity, usability, and visual polish.",
  value:
    "I create web experiences that look polished, feel familiar, and help users navigate with ease.",
  about:
    "I'm Ivan Joseph Jaurigue, a UI/UX-focused Front-End Developer and Graphic Designer who enjoys creating clean, modern, and interactive digital experiences. I focus on designing interfaces that feel familiar to users, making websites and systems easier to understand, navigate, and enjoy. My work combines visual design, front-end development, and user-centered thinking to create products that are both functional and memorable.",
  clubRole: "Associate Vice Chief Creative Officer",
  club: "AWS Learning Club",
  focus:
    "My UI/UX focus is centered on familiarity, clean visual hierarchy, smooth interaction, and making digital products easy for users to understand without feeling overwhelmed.",
  workingStyle:
    "Creative, detail-oriented, collaborative, product-minded, and focused on making interfaces feel both useful and visually appealing.",
};

export const socials = [
  { label: "Email", href: "mailto:jaurigue.ijj@gmail.com" },
  { label: "GitHub", href: "https://github.com/amseph" },
  { label: "LinkedIn", href: "http://www.linkedin.com/in/jaurigueivan" },
  { label: "Discord", href: "https://discord.com/users/739709074433769543" },
];

export const projects = [
  {
    name: "ECHO",
    status: "In Progress",
    role: "Full-Stack Developer",
    description:
      "A personal cashflow and expense tracking web app that helps users monitor allowance, expenses, debts, and spending habits in a simple visual way.",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Framer Motion",
      "Recharts",
      "Tesseract.js",
      "Vercel",
    ],
    features: [
      "User authentication",
      "Budget cycle setup",
      "OCR receipt scanning",
      "Financial analytics dashboard",
      "Predicted broke date",
      "Coach/roast feedback mode",
    ],
    live: "https://echo-omega-seven.vercel.app",
    repo: "https://github.com/amseph/echo",
  },
  {
    name: "Ely Sales Agent",
    status: "Prototype / In Progress",
    role: "UI/UX Designer | Front-End Developer",
    description:
      "A real-time AI sales assistant concept designed to support live client conversations by listening, analyzing context, and helping sales representatives respond more effectively.",
    tech: [
      "TypeScript",
      "React",
      "AI integration",
      "Voice AI concepts",
      "UI overlay design",
    ],
    features: [
      "Real-time listening concept",
      "Interactive overlay UI",
      "AI response support",
      "Listening-state animations",
      "Readable glassmorphism",
    ],
    live: "",
    repo: "https://github.com/Eduard-K-A/agora",
  },
];

export const strengths = [
  "UI/UX design",
  "Front-end development",
  "Visual design",
  "Layout composition",
  "Interactive interfaces",
  "Responsive design",
  "Branding",
  "Polished user experiences",
];

export const techGroups = [
  { title: "Languages, Backend & Core", icon: Code2, items: ["HTML", "CSS", "JavaScript", "TypeScript", "Tailwind CSS", "Supabase", "REST APIs"] },
  { title: "Frameworks, Libraries & Runtime", icon: Layers3, items: ["React", "Next.js", "React Bits", "Framer Motion", "Recharts", "Node.js", "npm", "Vercel", "Postman", "Render"] },
  { title: "Database & Tools", icon: Database, items: ["Supabase", "PostgreSQL", "MySQL", "MongoDB"] },
  { title: "Other Tools", icon: Wrench, items: ["Figma", "Canva", "Git", "GitHub"] },
];

export const education = {
  school: "De La Salle Lipa",
  program: "Bachelor of Science in Information Technology",
  level: "4th Year",
  summary:
    "Focused on front-end development, UI/UX design, system development, and building practical software projects.",
  organization: "Associate Vice Chief Creative Officer of the AWS Learning Club",
  highlights: [
    "Agora Hackathon Philippines 2026: Build Next Gen AI Sales Agent",
    "Python Essentials 1 - Cisco Networking Academy",
    "Graphic Design Essentials - Canva",
    "AI Capabilities and Limitations - Anthropic",
    "Introduction to Agent Skills - Anthropic",
    "AI Fluency Framework & Foundations - Anthropic",
    "Claude Code 101 - Anthropic",
    "Claude 101 - Anthropic",
  ],
  icon: GraduationCap,
  proofIcon: BriefcaseBusiness,
};
