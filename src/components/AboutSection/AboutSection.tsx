import ProfileCard from "../ProfileCard/ProfileCard";
import ShinyText from "../ShinyText/ShinyText";
import "./AboutSection.css";

export interface AboutSectionProps {
  profileCard: {
    avatarUrl: string;
    iconUrl?: string;
    grainUrl?: string;
    miniAvatarUrl?: string;
    name?: string;
    title?: string;
    handle?: string;
    status?: string;
    contactText?: string;
    showUserInfo?: boolean;
    behindGlowEnabled?: boolean;
    behindGlowColor?: string;
    enableTilt?: boolean;
    onContactClick?: () => void;
  };
  aboutText: {
    heading: string;
    paragraphs: string[];
  };
  className?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  profileCard,
  aboutText,
  className = "",
}) => {
  return (
    <section className={`about-section ${className}`.trim()}>
      <div className="about-container">
        <div className="about-card">
          <ProfileCard {...profileCard} />
        </div>
        <div className="about-text">
          <ShinyText text={aboutText.heading} className="about-heading" speed={4} />
          {aboutText.paragraphs.map((paragraph, index) => (
            <p key={index} className="about-paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
