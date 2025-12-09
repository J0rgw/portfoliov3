import StaggeredMenu from './components/StaggeredMenu/StaggeredMenu';
import { menuItems, socialItems, menuConfig } from './config/navigation';
import './App.css';

const App = () => {
  return (
    <div style={{ height: '100vh', background: '#1a1a1a' }}>
      <StaggeredMenu
        {...menuConfig}
        items={menuItems}
        socialItems={socialItems}
      />
    </div>

  );
};

export default App;
