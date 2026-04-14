export type Project = {
  id: number
  slug: string
  num: string
  year: string
  type_en: string
  type_es: string
  titleKey: string
  title_en: string
  title_es: string
  descKey: string
  desc_en: string
  desc_es: string
  longDesc_en: string
  longDesc_es: string
  tags: string[]
  image: string
  images: string[]
  link: string
  github: string
  role_en: string
  role_es: string
  duration_en: string
  duration_es: string
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "code-runner",
    num: "01",
    year: "2024",
    type_en: "Game Dev",
    type_es: "Juego",
    titleKey: "projects.1.title",
    title_en: "Code Runner: Invisible Master",
    title_es: "Code Runner: Maestro Invisible",
    descKey: "projects.1.desc",
    desc_en: "A narrative 2D puzzle game built to teach block-based programming concepts.",
    desc_es: "Un juego narrativo de puzzles 2D para enseñar programación por bloques.",
    longDesc_en: "Code Runner: Invisible Master is an educational 2D puzzle game developed in Unity with C#. The game merges narrative storytelling with computational thinking, guiding players through increasingly complex logic challenges. Each level introduces a new programming concept — from loops and conditionals to functions and recursion — embedded naturally into the game mechanics. The project was developed as part of my academic research at UCC and presented as a proof-of-concept for gamified programming education.",
    longDesc_es: "Code Runner: Maestro Invisible es un juego educativo de puzzles 2D desarrollado en Unity con C#. El juego combina narrativa con pensamiento computacional, guiando a los jugadores a través de desafíos lógicos progresivamente más complejos. Cada nivel introduce un nuevo concepto de programación — desde bucles y condicionales hasta funciones y recursión — integrado de forma natural en la mecánica del juego. El proyecto fue desarrollado como parte de mi investigación académica en la UCC.",
    tags: ["Unity", "C#", "Game Design", "AI Logic", "UX Research"],
    image: "/retrato.png",
    images: ["/retrato.png", "/retrato.png", "/retrato.png"],
    link: "https://demo.example.com",
    github: "https://github.com/helenmoncayo",
    role_en: "Solo Developer & Designer",
    role_es: "Desarrolladora & Diseñadora",
    duration_en: "6 months",
    duration_es: "6 meses",
  },
  {
    id: 2,
    slug: "ecommerce-system",
    num: "02",
    year: "2023",
    type_en: "Web App",
    type_es: "App Web",
    titleKey: "projects.2.title",
    title_en: "E-commerce System",
    title_es: "Sistema E-commerce",
    descKey: "projects.2.desc",
    desc_en: "Mobile-first platform with advanced filtering, search, and payment integration.",
    desc_es: "Plataforma mobile-first con filtros avanzados, búsqueda e integración de pagos.",
    longDesc_en: "A full-featured e-commerce platform built with React and Node.js, designed with a mobile-first approach. The system includes advanced product filtering, real-time search with Redis caching, Stripe payment integration, and an admin dashboard for inventory management. The backend is deployed on AWS EC2 with an S3 bucket for media storage and a PostgreSQL database for data persistence.",
    longDesc_es: "Una plataforma de e-commerce completa construida con React y Node.js, diseñada con enfoque mobile-first. El sistema incluye filtrado avanzado de productos, búsqueda en tiempo real con caché Redis, integración de pagos con Stripe y un dashboard de administración. El backend está desplegado en AWS EC2 con S3 para medios y PostgreSQL para persistencia de datos.",
    tags: ["React", "Node.js", "Stripe", "Redis", "PostgreSQL", "AWS"],
    image: "/retrato.png",
    images: ["/retrato.png", "/retrato.png", "/retrato.png"],
    link: "#",
    github: "#",
    role_en: "Full Stack Developer",
    role_es: "Desarrolladora Full Stack",
    duration_en: "4 months",
    duration_es: "4 meses",
  },
  {
    id: 3,
    slug: "research-analytics",
    num: "03",
    year: "2023",
    type_en: "Open Source",
    type_es: "Open Source",
    titleKey: "projects.3.title",
    title_en: "Research Analytics",
    title_es: "Analítica de Investigación",
    descKey: "projects.3.desc",
    desc_en: "Open source data tool for automating academic research workflows.",
    desc_es: "Herramienta open source para automatizar flujos de investigación académica.",
    longDesc_en: "An open-source data analytics tool built for academic researchers, designed to automate repetitive workflows like data collection, cleaning, and visualization. Built with Next.js and PostgreSQL, the tool features an intuitive dashboard with D3.js charts, exportable reports, and collaborative workspaces. The focus was on making data science accessible to researchers without programming backgrounds.",
    longDesc_es: "Una herramienta de análisis de datos open source para investigadores académicos, diseñada para automatizar flujos repetitivos como recolección, limpieza y visualización de datos. Construida con Next.js y PostgreSQL, la herramienta incluye un dashboard intuitivo con gráficos D3.js, reportes exportables y espacios colaborativos.",
    tags: ["Next.js", "PostgreSQL", "D3.js", "Python", "Open Source"],
    image: "/retrato.png",
    images: ["/retrato.png", "/retrato.png", "/retrato.png"],
    link: "#",
    github: "#",
    role_en: "Lead Developer",
    role_es: "Desarrolladora Principal",
    duration_en: "3 months",
    duration_es: "3 meses",
  },
  {
    id: 4,
    slug: "portfolio-core",
    num: "04",
    year: "2024",
    type_en: "Portfolio",
    type_es: "Portafolio",
    titleKey: "projects.4.title",
    title_en: "Portfolio Core",
    title_es: "Núcleo del Portafolio",
    descKey: "projects.4.desc",
    desc_en: "This very portfolio — built with Next.js, Framer Motion and TailwindCSS.",
    desc_es: "Este mismo portafolio — construido con Next.js, Framer Motion y TailwindCSS.",
    longDesc_en: "The portfolio you're currently viewing. Built from scratch with Next.js 14, Framer Motion for animations, and TailwindCSS for styling. Features include a custom cursor, magnetic elements, smooth scroll, animated particle backgrounds, a bilingual EN/ES system, dark/light mode, and a fully responsive layout. Every animation and interaction was carefully designed to reflect my personality as a developer and designer.",
    longDesc_es: "El portafolio que estás viendo ahora mismo. Construido desde cero con Next.js 14, Framer Motion para animaciones y TailwindCSS para estilos. Incluye cursor personalizado, elementos magnéticos, scroll suave, fondos de partículas animadas, sistema bilingüe EN/ES, modo claro/oscuro y diseño completamente responsive.",
    tags: ["Next.js", "Framer Motion", "TypeScript", "TailwindCSS"],
    image: "/retrato.png",
    images: ["/retrato.png", "/retrato.png", "/retrato.png"],
    link: "#",
    github: "#",
    role_en: "Designer & Developer",
    role_es: "Diseñadora & Desarrolladora",
    duration_en: "2 months",
    duration_es: "2 meses",
  },
]