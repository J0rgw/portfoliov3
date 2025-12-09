# Portfolio V3

> Once again I'm here rebuilding my portfolio as I always think I can do better.

SO FAR: only a staggered menu and a revamped version of my logo has been developed

## Live Demo

🔗 [View Portfolio](https://j0rgw.github.io/portfoliov3) *(coming soon)*

## Built With

- **React** + **TypeScript** + **GSAP**

## Customization System

Creating a config folder to **fully and easily customize** the UI as much as I want.

### Configuration Options

The config system allows you to modify the entire portfolio without touching component code:

| Config Property | Description | Example Values |
|----------------|-------------|----------------|
| `menuItems` | Navigation links and labels | Home, About, Projects, Experience, Contact |
| `socialItems` | Social media links | GitHub, LinkedIn, Mail |
| `position` | Menu position | `'left'` or `'right'` |
| `displaySocials` | Show/hide social links | `true` / `false` |
| `displayItemNumbering` | Number menu items | `true` / `false` |
| `menuButtonColor` | Default button color | `'#fff'` |
| `openMenuButtonColor` | Button color when open | `'#000'` |
| `colors` | Theme gradient colors | `['#efcd9eff', '#d48e60ff']` |
| `logoUrl` | Portfolio logo path | `'./src/images/logo.png'` |
| `accentColor` | Accent color theme | `'#ff6b6b'` |

## Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   └── StaggeredMenu/
│   │       ├── StaggeredMenu.tsx
│   │       └── StaggeredMenu.css
│   ├── config/
│   │   └── navigation.ts        # ⚙️ Customize everything here
│   ├── images/
│   │   ├── logo.png
│   │   ├── Logo2.png
│   │   ├── LogobgB.png
│   │   └── favicon.ico
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

*Continuously developing and improving myself.*