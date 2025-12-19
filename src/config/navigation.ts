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
  menuButtonColor: '#000',
  openMenuButtonColor: '#000',
  changeMenuColorOnOpen: true,
  colors: ['#98c7ecff', '#168eebff'],
  logoUrl: '/images/LogobgB2.png',
  accentColor: '#409fea'
};
