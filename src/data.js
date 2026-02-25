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
  { id: 9, gambar: ToolPR, nama: "Premiere Pro", ket: "Editing", dad: "1200" },
];

import CertixImg from "/assets/proyek/certixx.png";
import Proyek1 from "/assets/proyek/project1.png";
import Proyek2 from "/assets/proyek/project2.png";
import Proyek3 from "/assets/proyek/project3.png";
import Proyek4 from "/assets/proyek/project4.png";
import Proyek5 from "/assets/proyek/project5.png";
import DamianosImg from "/assets/proyek/damianos_production.png";
import TypePaperImg from "/assets/proyek/Type Paper.png";


export const listProyek = [
  {
    id: 1,
    slug: "thinkways",
    image: Proyek1,
    images: [Proyek1, Proyek2, Proyek3], // Multiple images for carousel
    title: "ThinkWays",
    category: "UI/UX",
    subtitle: "A personalized learning application tailored to individual learning styles.",
    fullDescription: "ThinkWays is an adaptive learning app that personalizes content based on your unique personality. By analyzing your learning style, it delivers customized lessons and paths to enhance engagement and retention. A smarter way to learn, built just for you.",
    borderColor: "#333",
    gradient: "transparent",
    url: null,
    year: "2024",
    techstack: ["Figma", "Illustrator"],
    dad: "100",
  },
  {
    id: 3,
    slug: "drevelopment",
    image: Proyek3,
    images: [Proyek3, Proyek1, Proyek4], // Multiple images for carousel
    title: "Drevelopment",
    category: "Web Development",
    subtitle: "A professional landing page for Web Development & UI/UX Design services.",
    fullDescription: "Drevelopment is a modern landing page designed for a digital agency specializing in Web Development and UI/UX Design services. The website showcases the agency's portfolio, service packages, and client testimonials with a sleek, professional aesthetic that builds trust and highlights their creative expertise.",
    borderColor: "#333",
    gradient: "transparent",
    url: "https://drevelopments.vercel.app/",
    year: "2024",
    techstack: ["React JS", "Tailwind", "Javascript", "Figma"],
    dad: "300",
  },
  {
    id: 2,
    slug: "rupiah-flow",
    image: Proyek2,
    images: [Proyek2, Proyek5, Proyek1], // Multiple images for carousel
    title: "Rupiah Flow",
    category: "Fullstack",
    subtitle: "A fullstack app to manage your income, expenses, and categories.",
    fullDescription: "Rupiah Flow is a powerful web application designed for complete financial control. It allows users to easily track income and expenses, manage transaction categories, and visualize their financial health. Key features include real-time balance updates and the ability to generate and download detailed financial reports as PDF files for offline records.",
    borderColor: "#333",
    gradient: "transparent",
    url: "UNDER_MAINTENANCE",
    year: "2025",
    techstack: ["Node JS", "React JS", "Tailwind", "PostgreSQL", "Javascript"],
    dad: "200",
  },
  {
    id: 6,
    slug: "certix",
    image: CertixImg,
    images: [CertixImg, Proyek2, Proyek3], // Multiple images for carousel
    title: "Certix",
    category: "UI/UX",
    subtitle: "A concert discovery and ticketing app for your city.",
    fullDescription: "Certix is your go-to app for discovering live concerts and music events in your city. Browse lineups, view artist profiles, and secure tickets instantly. Whether it's a massive festival or an intimate gig, Certix ensures you never miss the music you love.",
    borderColor: "#333",
    gradient: "transparent",
    url: null,
    year: "2024",
    techstack: ["Figma", "Illustrator"],
    dad: "600",
  },
  {
    id: 4,
    slug: "damianos-production",
    image: DamianosImg,
    images: [DamianosImg, Proyek1, Proyek2],
    title: "Damianos Production",
    category: "Web Development",
    subtitle: "A modern company profile tailored for a creative agency.",
    fullDescription: "Damianos Production is a modern company profile website that represents a creative agency. Built with Next.js and Tailwind CSS, it features a sleek design to showcase their portfolio and services with high performance and elegance.",
    borderColor: "#333",
    gradient: "transparent",
    url: "UNDER_MAINTENANCE",
    year: "2025",
    techstack: ["Next JS", "Tailwind", "React JS"],
    dad: "400",
  },
  {
    id: 5,
    slug: "type-paper",
    image: TypePaperImg,
    images: [TypePaperImg],
    title: "Type Paper",
    category: "Web Development",
    subtitle: "A minimalist typing test inspired by Monkeytype.",
    fullDescription: "Type Paper is a clean, minimalist typing experience crafted for speed and focus. Inspired by the tactical feel of vintage typewriters and modern productivity tools, Type Paper offers a distraction-free environment to hone your typing skills. Built with Next.js and Tailwind CSS, it features real-time WPM tracking, precision accuracy metrics, and smooth character-by-character animations.",
    borderColor: "#e67e22",
    gradient: "transparent",
    url: null,
    year: "2025",
    techstack: ["Next JS", "Tailwind", "React JS", "Framer Motion"],
    dad: "500",
  },

];

// Kategori terpisah
export const listProyekWeb = listProyek.filter(p => p.category === "Fullstack" || p.category === "Web Development");
export const listProyekUIUX = listProyek.filter(p => p.category === "UI/UX");
