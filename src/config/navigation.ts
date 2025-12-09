export const menuItems = [
  { label: 'Home', ariaLabel: 'Homepage', link: '/' },
  { label: 'About', ariaLabel: 'Learn about me', link: '/about' },
  { label: 'Projects', ariaLabel: 'View my projects', link: '/projects' },
  { label: 'Experience', ariaLabel: 'recap my experience', link: '/experience' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
];

export const socialItems = [
  { label: 'Mail', link: '' },
  { label: 'GitHub', link: 'https://github.com/J0rgw' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/jorge-arcas-verdejo-18ba29255/' }
];

export const menuConfig = {
  position: 'right' as const,
  displaySocials: true,
  displayItemNumbering: true,
  menuButtonColor: '#fff',
  openMenuButtonColor: '#000',
  changeMenuColorOnOpen: true,
  colors: ['#efcd9eff', '#d48e60ff'],
  logoUrl: './src/images/LogobgB2.png',
  accentColor: '#ff6b6b'
};
