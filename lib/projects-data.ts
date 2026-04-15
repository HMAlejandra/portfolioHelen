export type Project = {
  id: number
  slug: string
  num: string
  year: string
  type_en: string
  type_es: string
  title_en: string
  title_es: string
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
    slug: "kids-platform",
    num: "01",
    year: "2024",
    type_en: "Educational App",
    type_es: "App Educativa",
    title_en: "Kids Learning Platform",
    title_es: "Plataforma para Niños",
    desc_en: "Interactive platform for children aged 3–5 to learn through early stimulation and play.",
    desc_es: "Plataforma interactiva para niños de 3 a 5 años para aprender mediante estimulación temprana y juego.",
    longDesc_en: "An educational platform designed for children between 3 and 5 years old, focused on early stimulation through interactive games, visual exercises, and playful learning modules. The project was built with an emphasis on accessibility, clear UI patterns suited for toddlers, and engaging animations that hold young learners' attention. Developed as part of a Software Quality academic project at UCC.",
    longDesc_es: "Una plataforma educativa diseñada para niños de 3 a 5 años, enfocada en la estimulación temprana a través de juegos interactivos, ejercicios visuales y módulos de aprendizaje lúdico. El proyecto fue construido con énfasis en accesibilidad, patrones de UI claros para infantes y animaciones llamativas que mantienen la atención de los pequeños. Desarrollado como proyecto académico de Calidad de Software en la UCC.",
    tags: ["React", "CSS", "UX para Niños", "Calidad de Software", "Accesibilidad"],
    image: "/kids-platform.png",
    images: ["/kids-platform.png", "/kids-platform.png"],
    link: "#",
    github: "https://github.com/HMAlejandra/ProyectoCalidad",
    role_en: "Frontend Developer & UX Designer",
    role_es: "Desarrolladora Frontend & Diseñadora UX",
    duration_en: "3 months",
    duration_es: "3 meses",
  },
  {
    id: 2,
    slug: "music-player",
    num: "02",
    year: "2023",
    type_en: "Web App",
    type_es: "App Web",
    title_en: "Music Player",
    title_es: "Reproductor de Música",
    desc_en: "A stylish music player web app built with design patterns and a clean playlist interface.",
    desc_es: "Una app web de reproductor de música construida con patrones de diseño e interfaz limpia de playlist.",
    longDesc_en: "A fully functional music player built as part of a Software Design Patterns course. The app features playlist management, playback controls, track progress, and a clean visual interface. The architecture is based on behavioral and structural design patterns (Observer, Singleton, Strategy) applied to real audio playback logic. Built with vanilla JavaScript and modern CSS.",
    longDesc_es: "Un reproductor de música completamente funcional construido como parte del curso de Patrones de Diseño de Software. La app incluye gestión de playlists, controles de reproducción, progreso de pista e interfaz visual limpia. La arquitectura se basa en patrones de diseño conductuales y estructurales (Observer, Singleton, Strategy) aplicados a lógica real de reproducción de audio.",
    tags: ["JavaScript", "CSS", "Patrones de Diseño", "HTML5 Audio", "UX"],
    image: "/music.png",
    images: ["/music.png", "/music.png"],
    link: "#",
    github: "https://github.com/HMAlejandra/Patrones/tree/main/playlist-app%20(1)",
    role_en: "Solo Developer & Designer",
    role_es: "Desarrolladora & Diseñadora",
    duration_en: "2 months",
    duration_es: "2 meses",
  },
  {
    id: 3,
    slug: "soul-trip",
    num: "03",
    year: "2024",
    type_en: "Video Game",
    type_es: "Videojuego",
    title_en: "SoulTrip",
    title_es: "SoulTrip",
    desc_en: "A Unity 3D adventure game with immersive storytelling and soul-based mechanics.",
    desc_es: "Un juego de aventura en Unity 3D con narrativa inmersiva y mecánicas basadas en el alma.",
    longDesc_en: "SoulTrip is a 3D adventure game developed in Unity as a collaborative academic project. The game features an original narrative where the player guides a soul through different realms, solving puzzles and overcoming obstacles. Built with C# scripting, custom shaders, and original level design. The project explores themes of identity, journey, and transformation through immersive gameplay.",
    longDesc_es: "SoulTrip es un juego de aventura 3D desarrollado en Unity como proyecto académico colaborativo. El juego presenta una narrativa original donde el jugador guía un alma a través de diferentes reinos, resolviendo puzzles y superando obstáculos. Construido con scripting en C#, shaders personalizados y diseño de niveles original. El proyecto explora temas de identidad, viaje y transformación.",
    tags: ["Unity", "C#", "3D", "Game Design", "Level Design", "Narrativa"],
    image: "/SoulTrip.png",
    images: ["/SoulTrip.png", "/SoulTrip.png"],
    link: "#",
    github: "https://github.com/Rodrigueza02/SoulTrip",
    role_en: "Game Developer & Designer",
    role_es: "Desarrolladora de Juegos & Diseñadora",
    duration_en: "4 months",
    duration_es: "4 meses",
  },
  {
    id: 4,
    slug: "portfolio",
    num: "04",
    year: "2024",
    type_en: "Portfolio",
    type_es: "Portafolio",
    title_en: "Portfolio — Helen Moncayo",
    title_es: "Portafolio — Helen Moncayo",
    desc_en: "This very portfolio — built from scratch with Next.js, Framer Motion and TailwindCSS.",
    desc_es: "Este mismo portafolio — construido desde cero con Next.js, Framer Motion y TailwindCSS.",
    longDesc_en: "The portfolio you are currently viewing. Built from scratch with Next.js 14, Framer Motion for fluid animations, and TailwindCSS for styling. Features include a custom magnetic cursor, animated particle backgrounds, bilingual EN/ES translation system, dark/light mode, smooth scroll, a skills accordion, and individual project detail pages. Every interaction was carefully designed to reflect my identity as a developer and designer.",
    longDesc_es: "El portafolio que estás viendo ahora mismo. Construido desde cero con Next.js 14, Framer Motion para animaciones fluidas y TailwindCSS para estilos. Incluye cursor magnético personalizado, fondos de partículas animadas, sistema de traducción bilingüe EN/ES, modo claro/oscuro, scroll suave, acordeón de habilidades y páginas de detalle para cada proyecto.",
    tags: ["Next.js", "Framer Motion", "TypeScript", "TailwindCSS", "Diseño UI"],
    image: "/portfolio.png",
    images: ["/portfolio.png", "/portfolio.png"],
    link: "#",
    github: "https://github.com/HMAlejandra/portfolioHelen",
    role_en: "Designer & Developer",
    role_es: "Diseñadora & Desarrolladora",
    duration_en: "2 months",
    duration_es: "2 meses",
  },
]