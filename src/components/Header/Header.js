import './Header.css';

const Header = () => {
  const header = document.createElement('header');
  header.innerHTML = '';

  const title = document.createElement('h1');
  title.textContent = 'Portfolio';

  const hamburgerLabel = document.createElement('label');
  hamburgerLabel.classList.add('hamburger-label');
  hamburgerLabel.setAttribute('for', 'hamburger');
  hamburgerLabel.innerHTML = '&#9776;';

  const hamburgerInput = document.createElement('input');
  hamburgerInput.classList.add('hamburger');
  hamburgerInput.id = 'hamburger';
  hamburgerInput.type = 'checkbox';

  const nav = document.createElement('nav');
  const navList = document.createElement('ul');
  navList.classList.add('nav-list');

  const links = [
    { id: 'home-link', href: '/home', icon: 'fas fa-home', text: 'Home', color: '#d64000' },
    {
      id: 'experience-link',
      href: '/experience',
      icon: 'fa-solid fa-briefcase',
      text: 'Experience'
    },
    {
      id: 'projects-link',
      href: '/projects',
      icon: 'fa-solid fa-diagram-project',
      text: 'Projects'
    }
  ];

  links.forEach((link) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.id = link.id;
    a.classList.add('nav-link');
    a.href = link.href;
    a.innerHTML = `<i class="${link.icon}" style="color: ${link.color || 'inherit'};"></i> ${
      link.text
    }`;
    li.appendChild(a);
    navList.appendChild(li);
  });

  nav.appendChild(navList);
  header.append(title, hamburgerLabel, hamburgerInput, nav);

  return header;
};

export default Header;
