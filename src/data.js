import ToolReactJS from "/assets/tools/reactjs.png";
import ToolJS from "/assets/tools/js.png";
import ToolTS from "/assets/tools/ts.png";
import ToolHTML from "/assets/tools/html.png";
import ToolCSS from "/assets/tools/css.png";
import ToolFigma from "/assets/tools/figma.png";
import ToolAI from "/assets/tools/ai.png";
import ToolPS from "/assets/tools/ps.png";
import ToolPR from "/assets/tools/pr.png";
import ToolNode from "/assets/tools/node logo.png";
import ToolTailwind from "/assets/tools/tailwind logo.png";
import ToolPostgre from "/assets/tools/postgre.png";
import ToolNext from "/assets/tools/nextjs.png";
import ToolGSAP from "/assets/tools/gsap.png";

export const listTools = [
  { id: 1, gambar: ToolReactJS, nama: "React JS", ket: "Framework", dad: "100" },
  { id: 13, gambar: ToolNext, nama: "Next JS", ket: "Framework", dad: "150" },
  { id: 2, gambar: ToolJS, nama: "Javascript", ket: "Language", dad: "200" },
  { id: 3, gambar: ToolTS, nama: "TypeScript", ket: "Language", dad: "300" },
  { id: 4, gambar: ToolHTML, nama: "HTML", ket: "Language", dad: "400" },
  { id: 5, gambar: ToolCSS, nama: "CSS", ket: "Language", dad: "500" },
  { id: 10, gambar: ToolNode, nama: "Node JS", ket: "Runtime", dad: "600" },
  { id: 11, gambar: ToolTailwind, nama: "Tailwind", ket: "Framework", dad: "700" },
  { id: 12, gambar: ToolPostgre, nama: "PostgreSQL", ket: "Database", dad: "800" },
  { id: 6, gambar: ToolFigma, nama: "Figma", ket: "Design", dad: "900" },
  { id: 7, gambar: ToolAI, nama: "Illustrator", ket: "Design", dad: "1000" },
  { id: 8, gambar: ToolPS, nama: "Photoshop", ket: "Design", dad: "1100" },
  { id: 14, gambar: ToolGSAP, nama: "GSAP", ket: "Animation", dad: "1200" },
];

import CertixImg from "/assets/proyek/certixx.png";
import Proyek1 from "/assets/proyek/project1.png";
import Proyek2 from "/assets/proyek/project2.png";
import Proyek3 from "/assets/proyek/project3.png";
import Proyek4 from "/assets/proyek/project4.png";
import Proyek5 from "/assets/proyek/project5.png";
import DamianosImg from "/assets/proyek/damianos_production.png";
import TypePaperImg from "/assets/proyek/Type Paper.png";
import ThinkWaysLogin from "/assets/ThinkWays/Login Page.png";
import ThinkWaysPersonality from "/assets/ThinkWays/personality.png";
import ThinkWaysCourse from "/assets/ThinkWays/Course.png";
import ThinkWaysJourney from "/assets/ThinkWays/Journey.png";

import RupiahFlowHome from "/assets/RupiahFlow/Home Page.png";
import RupiahFlowCategories from "/assets/RupiahFlow/Categories Page.png";
import RupiahFlowReports from "/assets/RupiahFlow/Reports Page.png";

import TypePaperStart from "/assets/Type Paper/Start Typing.png";
import TypePaperSettings from "/assets/Type Paper/Settings.png";
import TypePaperResult from "/assets/Type Paper/Result.png";

import DamianosHero from "/assets/Damianos Prod/Screenshot 2026-04-02 052006.png";
import DamianosWorks from "/assets/Damianos Prod/Screenshot 2026-04-02 052047.png";
import DamianosServices from "/assets/Damianos Prod/Screenshot 2026-04-02 052125.png";
import DamianosClients from "/assets/Damianos Prod/Screenshot 2026-04-02 052159.png";
import DamianosFooter from "/assets/Damianos Prod/Screenshot 2026-04-02 052238.png";

import DrevelopmentLanding from "/assets/drevelopment/Screenshot 2026-04-02 050949.png";

import CertixWelcome from "/assets/certix/Welcome Scren.png";
import CertixHome from "/assets/certix/Home.png";

import NanceDashboard from "/assets/Nance/Dashboard - Light Mode 1.png";
import NanceCover from "/assets/Nance/cover.png";
import NanceReceipt from "/assets/Nance/Success Receipt - Light Mode 1.png";
import NanceTransactions from "/assets/Nance/Transactions - Light Mode 1.png";
import NanceTransfer from "/assets/Nance/Transfer Money - Light Mode 1.png";
import NanceStats from "/assets/Nance/Updated Statistics - Growth Chart 1.png";

import WhoofMeowCover from "/assets/whoof & Meow/cover.png";
import WhoofMeowHome from "/assets/whoof & Meow/home.jpeg";
import WhoofMeowGameplay from "/assets/whoof & Meow/gameplay.jpeg";
import WhoofMeowMode from "/assets/whoof & Meow/mode.jpeg";
import WhoofMeowResult from "/assets/whoof & Meow/match result.jpeg";

const listProyekBase = [
  {
    id: 8,
    slug: "whoof-meow",
    image: WhoofMeowCover,
    images: [WhoofMeowCover, WhoofMeowHome, WhoofMeowGameplay, WhoofMeowMode, WhoofMeowResult],
    title: "Whoof and Meow",
    category: "Game",
    subtitle: "A high-energy Tic Tac Toe game featuring Cat vs Dog personalization, real-time multiplayer, and AI mode.",
    role: "Fullstack Developer",
    duration: "2 weeks",
    features: [
      "Developed a personalized Tic Tac Toe experience where users can choose between Cat and Dog characters with unique icons.",
      "Implemented a real-time multiplayer system using Pusher, allowing players to compete with friends via invite codes.",
      "Built a challenging AI opponent for single-player mode, ensuring an engaging experience for solo users.",
      "Designed a vibrant Neo-Brutalist interface with fluid animations using Framer Motion and GSAP."
    ],
    impact: "Modernized a classic game with real-time connectivity and a unique visual style, resulting in a highly interactive and social gaming experience.",
    borderColor: "#333",
    gradient: "transparent",
    url: "https://whoofmeow.vercel.app/",
    year: "2026",
    techstack: ["Next JS", "Tailwind", "React JS", "GSAP"],
    themeColor: "#050505",
    dad: "800",
    processSteps: [
      { title: "Multiplayer Architecture", icon: "FiServer", color: "bg-blue-600" },
      { title: "Logic & State Handling", icon: "FiCode", color: "bg-[#0ea5e9]" },
      { title: "AI Opponent Brain", icon: "FiCpu", color: "bg-[#22c55e]" },
      { title: "Real-time Syncing", icon: "FiActivity", color: "bg-[#84cc16]" },
      { title: "Juicy Animations", icon: "FiStar", color: "bg-[#eab308]" },
    ],
    pageImages: [
      { src: WhoofMeowHome, title: "Landing Page", desc: "The main hero section introducing the game characters and the high-energy Neo-Brutalist visual style." },
      { src: WhoofMeowMode, title: "Game Mode Selection", desc: "An interface where players can choose between VS AI, Local PVP, or Online Real-time multiplayer." },
      { src: WhoofMeowGameplay, title: "Game Board", desc: "The core gameplay interface featuring the synchronized Cat and Dog icons and real-time status updates." },
      { src: WhoofMeowResult, title: "Match Results", desc: "A dynamic end-game screen celebrating the winner with personalized character animations." }
    ]
  },
  {
    id: 3,
    slug: "drevelopment",
    image: Proyek3,
    images: [Proyek3, Proyek1, Proyek4],
    title: "Drevelopment",
    category: "Website",
    subtitle: "A professional landing page for Web Development & UI/UX Design services.",
    role: "Frontend Developer & UI/UX Designer",
    duration: "2 weeks",
    features: [
      "Designed and developed a professional landing page tailored for a digital agency.",
      "Implemented a sleek, modern aesthetic using React JS and Tailwind CSS to build trust with potential clients.",
      "Showcased service packages, portfolios, and client testimonials with highly visible and interactive layouts."
    ],
    impact: "Enhanced the digital footprint of the agency, providing a scalable and visually striking platform to attract and convert new clients.",
    borderColor: "#333",
    gradient: "transparent",
    url: null,
    year: "2026",
    techstack: ["React JS", "Tailwind", "Javascript", "Figma", "GSAP"],
    themeColor: "#2d2f4a",
    dad: "300",
    processSteps: [
      { title: "Service Strategy", icon: "FiSearch", color: "bg-purple-500" },
      { title: "Visual Identity", icon: "FiPenTool", color: "bg-rose-500" },
      { title: "Frontend Core", icon: "FiCode", color: "bg-blue-600" },
      { title: "Scroll Experience", icon: "FiActivity", color: "bg-emerald-500" },
      { title: "Showcase Launch", icon: "FiGlobe", color: "bg-amber-500" },
    ],
    pageImages: [
      { src: DrevelopmentLanding, title: "Parallax Agency Landing", desc: "A sleek and immersive landing page offering Website creation and UI/UX Design services. It features dynamic parallax scrolling effects that create a premium, deep visual experience for visitors." }
    ]
  },
  {
    id: 2,
    slug: "rupiah-flow",
    image: Proyek2,
    images: [Proyek2, Proyek5, Proyek1],
    title: "Rupiah Flow",
    category: "Website",
    subtitle: "A fullstack app to manage your income, expenses, and categories.",
    role: "Fullstack Developer",
    duration: "4 months",
    features: [
      "Developed a fullstack financial dashboard web application using React, Node.js, and PostgreSQL for structured financial data management.",
      "Built RESTful APIs to handle financial transactions (income & expenses) with full CRUD functionality.",
      "Designed a responsive and modern dashboard UI using Tailwind CSS, focusing on clarity and usability.",
      "Implemented financial data summaries and visualizations to help users track and analyze their financial status."
    ],
    impact: "Streamlined personal finance management by enabling users to easily track their income and expenses, export data to PDF, and view comprehensive monthly or yearly financial summaries.",
    borderColor: "#333",
    gradient: "transparent",
    url: "UNDER_MAINTENANCE",
    year: "2025",
    techstack: ["Node JS", "React JS", "Tailwind", "PostgreSQL", "Javascript"],
    themeColor: "#0b0c14",
    dad: "200",
    processSteps: [
      { title: "Financial Logic", icon: "FiCpu", color: "bg-indigo-600" },
      { title: "REST API Setup", icon: "FiServer", color: "bg-slate-700" },
      { title: "Postgres Schema", icon: "FiDatabase", color: "bg-sky-600" },
      { title: "PDF Export System", icon: "FiCheckCircle", color: "bg-emerald-600" },
      { title: "Data Dashboard", icon: "FiLayout", color: "bg-amber-500" },
    ],
    pageImages: [
      { src: RupiahFlowHome, title: "Main Dashboard", desc: "A comprehensive overview displaying current balances, total income vs expenses, a visual transaction bar graph, recent history, and a quick-action shortcut to instantly log transactions." },
      { src: RupiahFlowCategories, title: "Category Settings", desc: "A streamlined category management interface where users can view and organize income and expense groupings, featuring full CRUD capability to freely add, edit, or delete items." },
      { src: RupiahFlowReports, title: "Financial Reports", desc: "An advanced reporting view offering monthly and yearly financial data. It features detailed spending breakdowns per category and allows users to export these summaries directly to PDF." }
    ]
  },
  {
    id: 1,
    slug: "thinkways",
    image: Proyek1,
    images: [Proyek1, Proyek2, Proyek3],
    title: "ThinkWays",
    category: "UI/UX",
    subtitle: "A personalized learning application tailored to individual learning styles.",
    role: "UI/UX Designer",
    duration: "3 weeks",
    features: [
      "Conducted user research to identify diverse learning styles and define application requirements.",
      "Designed wireframes and high-fidelity mockups focusing on an adaptive, personalized user journey.",
      "Created an intuitive interface using Figma and Illustrator that enhances engagement and retention."
    ],
    impact: "Provided a highly customized learning path, allowing users to consume educational content in ways tailored to their unique personalities, thereby increasing overall engagement.",
    borderColor: "#333",
    gradient: "transparent",
    url: null,
    year: "2024",
    techstack: ["Figma", "Illustrator"],
    themeColor: "#1a1e36",
    dad: "100",
    processSteps: [
      { title: "Learning Research", icon: "FiSearch", color: "bg-blue-500" },
      { title: "User Flows", icon: "FiMap", color: "bg-[#0ea5e9]" },
      { title: "Adaptive Layout", icon: "FiLayout", color: "bg-[#22c55e]" },
      { title: "Gamified UI", icon: "FiStar", color: "bg-lime-500" },
      { title: "Personality Sync", icon: "FiActivity", color: "bg-[#f59e0b]" },
    ],
    pageImages: [
      { src: ThinkWaysLogin, title: "Login Experience", desc: "A clean and accessible authentication screen welcoming the user to begin their personalized educational experience." },
      { src: ThinkWaysPersonality, title: "Personality Test", desc: "An initial diagnostic questionnaire to analyze learning styles, allowing the AI to recommend and curate a customized course roadmap." },
      { src: ThinkWaysCourse, title: "Course Overview", desc: "A comprehensive preview of the selected course, detailing the learning objectives, modules, and structure before the user begins." },
      { src: ThinkWaysJourney, title: "Learning Journey", desc: "A gamified progress map that visually tracks the user's progress level by level as they successfully complete course materials." }
    ]
  },
  {
    id: 6,
    slug: "certix",
    image: CertixImg,
    images: [CertixImg, Proyek2, Proyek3],
    title: "Certix",
    category: "UI/UX",
    subtitle: "A concert discovery and ticketing app for your city.",
    role: "UI/UX Designer",
    duration: "1 week",
    features: [
      "Designed an intuitive mobile application interface for live concert discovery and ticketing.",
      "Created user flows for browsing event lineups, reviewing artist profiles, and securing tickets seamlessly.",
      "Used Figma and Illustrator to establish a vibrant, energetic visual identity suited for the music industry."
    ],
    impact: "Simplified the process of finding and purchasing event tickets, ensuring users have a smooth, reliable experience discovering local live music.",
    borderColor: "#333",
    gradient: "transparent",
    url: null,
    year: "2026",
    techstack: ["Figma", "Illustrator"],
    themeColor: "#1e0b3d",
    dad: "600",
    processSteps: [
      { title: "Event Exploration", icon: "FiSearch", color: "bg-indigo-500" },
      { title: "Ticket Purchase Flow", icon: "FiActivity", color: "bg-rose-500" },
      { title: "Vibrant UI", icon: "FiStar", color: "bg-orange-500" },
      { title: "Lineup Discovery", icon: "FiLayers", color: "bg-emerald-500" },
      { title: "Mobile Polish", icon: "FiLayout", color: "bg-slate-700" },
    ],
    pageImages: [
      { src: CertixWelcome, title: "Welcome Screen", desc: "An inviting, energetic splash and onboarding screen that hooks users into the personalized concert discovery experience." },
      { src: CertixHome, title: "Discovery Homepage", desc: "The main hub where users can seamlessly browse various concert genres, select specific dates, and discover exactly what live events are available." }
    ]
  },
  {
    id: 4,
    slug: "damianos-production",
    image: DamianosImg,
    images: [DamianosImg, Proyek1, Proyek2],
    title: "Damianos Production",
    category: "Website",
    subtitle: "A comprehensive company profile showcasing a high-end creative agency's end-to-end production workflow.",
    role: "Frontend Developer",
    duration: "1 week",
    features: [
      "Built a professional agency landing page using Next.js and GSAP for fluid, high-end transitions.",
      "Developed a dedicated 'How We Work' section detailing the agency's full production cycle: Pre-Production, Production, and Post-Production.",
      "Implemented responsive project showcases and interactive carousels to highlight diverse creative outputs.",
      "Optimized performance and SEO to ensure a premium, reliable experience for potential high-value clients."
    ],
    impact: "Successfully communicated the agency's professional workflow and depth of service, positioning them as a premium partner for end-to-end creative projects.",
    borderColor: "#333",
    gradient: "transparent",
    url: "UNDER_MAINTENANCE",
    year: "2026",
    techstack: ["Next JS", "Tailwind", "React JS", "GSAP"],
    themeColor: "#4f46e5",
    dad: "400",
    processSteps: [
      { title: "Concept Design", icon: "FiPenTool", color: "bg-blue-600" },
      { title: "Pre-Production", icon: "FiSearch", color: "bg-purple-500" },
      { title: "Full Production", icon: "FiActivity", color: "bg-rose-500" },
      { title: "Post-Production", icon: "FiCode", color: "bg-[#0ea5e9]" },
      { title: "Client Handoff", icon: "FiCheckCircle", color: "bg-emerald-600" },
    ],
    pageImages: [
      { src: DamianosHero, title: "Hero Section", desc: "A captivating landing page emphasizing bold typography and high-quality hero imagery to instantly establish brand identity." },
      { src: DamianosWorks, title: "How We Work", desc: "A detailed breakdown of our creative workflow, showcasing our end-to-end process from initial Pre-Production and concept development through to high-quality Production and final Post-Production delivery." },
      { src: DamianosServices, title: "Projects Carousel", desc: "An interactive carousel component displaying a curated selection of previously completed projects, allowing visitors to easily swipe through the agency's showcase." },
      { src: DamianosClients, title: "About Us", desc: "A narrative section detailing the agency's roots, creative mission, and historical background within the creative industry." },
      { src: DamianosFooter, title: "Complete Portfolio Gallery", desc: "A comprehensive showcase presenting an extensive collection of successful client projects completed by Damianos since its founding as a creative agency." }
    ]
  },
  {
    id: 5,
    slug: "type-paper",
    image: TypePaperImg,
    images: [TypePaperImg],
    title: "Type Paper",
    category: "Game",
    subtitle: "A minimalist typing test inspired by Monkeytype.",
    role: "Frontend Developer",
    duration: "4 days",
    features: [
      "Built a minimalist, distraction-free typing test application inspired by Monkeytype.",
      "Developed real-time WPM tracking and precision accuracy metrics using React JS state management.",
      "Implemented smooth character-by-character validation and animations with Framer Motion."
    ],
    impact: "Provided users with an aesthetically pleasing, focus-driven environment to practice and analyze their typing speed and accuracy.",
    borderColor: "#e67e22",
    gradient: "transparent",
    url: null,
    year: "2026",
    techstack: ["Next JS", "Tailwind", "React JS", "GSAP"],
    themeColor: "#331804",
    dad: "500",
    processSteps: [
      { title: "WPM Logic Design", icon: "FiCode", color: "bg-blue-600" },
      { title: "Real-time Validation", icon: "FiActivity", color: "bg-[#0ea5e9]" },
      { title: "Performance Metrics", icon: "FiCpu", color: "bg-[#22c55e]" },
      { title: "Minimalist Interface", icon: "FiLayout", color: "bg-[#84cc16]" },
      { title: "Refining Experience", icon: "FiStar", color: "bg-[#eab308]" },
    ],
    pageImages: [
      { src: TypePaperStart, title: "Typing Interface", desc: "A clean, distraction-free environment focused entirely on the user's typing process, inspired by minimal design principles." },
      { src: TypePaperResult, title: "Performance Results", desc: "Comprehensive post-test data visualization displaying actual WPM, raw speed, accuracy percentage, and specific error tracking." },
      { src: TypePaperSettings, title: "Test Customization", desc: "Deep customization menu allowing users to personalize their experience by selecting various color themes and keystroke sound effects." }
    ]
  },
  {
    id: 7,
    slug: "nance",
    image: NanceCover,
    images: [NanceCover, NanceTransfer, NanceStats],
    title: "Nance",
    category: "UI/UX",
    subtitle: "A modern finance application for seamless money transfers and insightful financial analysis.",
    role: "UI/UX Designer",
    duration: "2 weeks",
    features: [
      "Designed a comprehensive finance application interface focusing on clarity, trust, and ease of use.",
      "Created intuitive flows for money transfers, guaranteeing smooth and accessible transaction experiences.",
      "Developed advanced analytics and statistical dashboards that visually present financial growth and transaction history."
    ],
    impact: "Empowered users to effortlessly manage their finances, execute rapid secure transfers, and gain comprehensive insights into their monetary habits.",
    borderColor: "#333",
    gradient: "transparent",
    url: null,
    year: "2026",
    techstack: ["Figma", "Illustrator"],
    themeColor: "#041c17",
    dad: "700",
    pageImages: [
      { src: NanceDashboard, title: "Main Dashboard", desc: "A clean and comprehensive dashboard providing quick access to total balances, recent activity, and core financial tools." },
      { src: NanceStats, title: "Financial Statistics", desc: "An advanced analytical charting view allowing users to visualize their portfolio growth and financial trends over time." },
      { src: NanceTransfer, title: "Transfer Money", desc: "A streamlined, secure transaction interface designed to make sending money as quick and error-free as possible." },
      { src: NanceReceipt, title: "Transaction Receipt", desc: "A clear, professionally formatted success receipt providing immediate proof of a completed transfer." },
      { src: NanceTransactions, title: "Transaction History", desc: "A detailed and filterable ledger containing all past incoming and outgoing monetary interactions." }
    ],
    processSteps: [
      { title: "Finance Research", icon: "FiSearch", color: "bg-blue-600" },
      { title: "Transfer Flow UX", icon: "FiActivity", color: "bg-[#0ea5e9]" },
      { title: "Analytics Charts", icon: "FiStar", color: "bg-[#22c55e]" },
      { title: "Secure Dashboard", icon: "FiLayout", color: "bg-[#84cc16]" },
      { title: "Receipt Engine", icon: "FiCheckCircle", color: "bg-[#eab308]" },
    ]
  }
];

export const listProyek = [
  ...listProyekBase
];

// Kategori terpisah
export const listProyekWeb = listProyek.filter(p => p.category === "Fullstack" || p.category === "Website");
export const listProyekUIUX = listProyek.filter(p => p.category === "UI/UX");
export const listProyekGame = listProyek.filter(p => p.category === "Game");

import DishubLogo from "/assets/Career/Dishub.png";
import DuniaSandangLogo from "/assets/Career/Dunia Sandang.jpeg";
import LinestagLogo from "/assets/Career/Linestag.webp";

export const listExperience = [
  {
    id: 4,
    company: "Damianos Productions",
    role: "Web Developer",
    period: "Feb 2026 - Present",
    logo: DamianosImg,
    description: "Developed a high-end company profile website for a creative agency using Next.js and GSAP for fluid, premium transitions.",
  },
  {
    id: 1,
    company: "Dinas Perhubungan",
    role: "Full-stack Developer (Internship)",
    period: "Feb 2026 - Present",
    logo: DishubLogo,
    description: "Developed and maintained web applications using Next.js, React.js, and modern web technologies.",
  },
  {
    id: 2,
    company: "Dunia Sandang",
    role: "Web Maintenance (Freelance)",
    period: "Oct 2024",
    logo: DuniaSandangLogo,
    description: "Maintained web platforms and implemented continuous updates utilizing WordPress and PHP environments.",
  },
  {
    id: 3,
    company: "Linestag Indonesia",
    role: "Creative Designer & Script Writer",
    period: "Apr 2022 - Sep 2022",
    logo: LinestagLogo,
    description: "Designed creative assets using Adobe Illustrator & Photoshop, wrote TikTok Live scripts, and organized events.",
  }
];
