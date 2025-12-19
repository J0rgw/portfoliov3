import StaggeredMenu from "./components/StaggeredMenu/StaggeredMenu";
import { menuItems, socialItems, menuConfig } from "./config/navigation";
import ColorBends from "./components/ColorBends/ColorBends";
import { colorBendsConfig } from "./config/colorBends";
import { heroTitleConfig } from "./config/shinyText";
import { logoLoopConfig, logoLoopLogos } from "./config/logoLoop";
import ShinyText from "./components/ShinyText/ShinyText";
import LogoLoop from "./components/LogoLoop/LogoLoop";
import "./App.css";

const App = () => {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Background layer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <ColorBends {...colorBendsConfig} />
      </div>
      {/* Content layer */}
      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", height: "100dvh" }}>
        <StaggeredMenu
          {...menuConfig}
          items={menuItems}
          socialItems={socialItems}
        />
        {/* Hero Title */}
        <ShinyText {...heroTitleConfig} />
      </div>
      {/* Logo Loop - visible on scroll */}
      <div className="logo-loop-section">
        <LogoLoop {...logoLoopConfig} logos={logoLoopLogos} />
      </div>
    </div>
  );
};

export default App;
