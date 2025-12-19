import { AboutSectionProps } from "../components/AboutSection/AboutSection";

export const aboutSectionConfig: AboutSectionProps = {
  profileCard: {
    avatarUrl: "/images/avatar4.png",
    iconUrl: "/images/miniLogo.png",
    name: "Jorge Arcas",
    title: "Software Analist & Developer",
    handle: "j0rgw",
    status: "Available",
    contactText: "Contact",
    showUserInfo: true,
    behindGlowEnabled: true,
    behindGlowColor: "rgba(64, 159, 234, 0.5)",
    enableTilt: true,
  },
  aboutText: {
    heading: "About Me",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc eget nisl.",
    ],
  },
};
