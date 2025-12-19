import StaggeredMenu from "./components/StaggeredMenu/StaggeredMenu";
import { menuItems, socialItems, menuConfig } from "./config/navigation";
import ColorBends from "./components/ColorBends/ColorBends";
import { colorBendsConfig } from "./config/colorBends";
import { heroTitleConfig } from "./config/shinyText";
import ShinyText from "./components/ShinyText/ShinyText";
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
      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", height: "100vh" }}>
        <StaggeredMenu
          {...menuConfig}
          items={menuItems}
          socialItems={socialItems}
        />
        {/* Hero Title */}
        <ShinyText {...heroTitleConfig} />
      </div>
    </div>
  );
};

export default App;
