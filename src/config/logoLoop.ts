import { LogoLoopProps } from "../components/LogoLoop/LogoLoop";

export const logoLoopConfig: Omit<LogoLoopProps, "logos"> = {
  speed: 120,
  direction: "left",
  logoHeight: 40,
  gap: 48,
  pauseOnHover: true,
  fadeOut: true,
  fadeOutColor: "#f0f0f0",
  scaleOnHover: true,
};

export const logoLoopLogos = [
  { src: "/images/logo/react_dark.svg", alt: "React" },
  { src: "/images/logo/typescript.svg", alt: "TypeScript" },
  { src: "/images/logo/nodejs.svg", alt: "Node.js" },
  { src: "/images/logo/javascript.svg", alt: "JavaScript" },
  { src: "/images/logo/vitejs.svg", alt: "Vite" },
  { src: "/images/logo/github.svg", alt: "GitHub" },
  { src: "/images/logo/fastapi.svg", alt: "FastAPI" },
  { src: "/images/logo/python.svg", alt: "Python" },
  { src: "/images/logo/spring.svg", alt: "Spring Boot" },
  { src: "/images/logo/java.svg", alt: "Java" },
  { src: "/images/logo/swift.svg", alt: "Swift" },
  { src: "/images/logo/firebase.svg", alt: "Firebase" },
  { src: "/images/logo/supabase.svg", alt: "Supabase" },
  { src: "/images/logo/dotenv.svg", alt: ".env" },
];
