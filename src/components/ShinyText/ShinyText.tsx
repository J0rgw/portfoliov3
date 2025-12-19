import './ShinyText.css';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 5, className = '' }) => {
  return (
    <div
      className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
      style={{ '--shine-duration': `${speed}s` } as React.CSSProperties}
    >
      {text.split('\n').map((line, index) => (
        <span key={index} className="shiny-line">{line}</span>
      ))}
    </div>
  );
};

export default ShinyText;
