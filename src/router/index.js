import Experience from '../pages/Experience/Experience';
import fillHomeData from '../pages/Home/FillHomeData';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import Projects from '../pages/Projects/Projects';
import initializeParticleNetworkAnimation from '../pages/Projects/particlesNet';

const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/experience',
    component: Experience
  },
  {
    path: '/projects',
    component: Projects
  }
];
export const router = () => {
  const path = window.location.pathname;
  const main = document.querySelector('main');
  main.innerHTML = '';
  const route = routes.find((route) => route.path === path);
  if (route) {
    const renderedComponent = route.component();
    if (renderedComponent instanceof HTMLElement) {
      main.appendChild(renderedComponent);
    } else {
      main.innerHTML = renderedComponent;
    }

    if (path === '/home') {
      fillHomeData();
      document.body.classList.add('home-page');
    }
    if (path === '/projects') {
      initializeParticleNetworkAnimation();
    }
  } else {
    main.innerHTML = NotFound();
  }
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', router);

const handleNavLinkClick = (ev) => {
  ev.preventDefault();
  const linkHref = ev.target.href;
  const path = new URL(linkHref).pathname;
  history.pushState(null, null, path);
  router();
};

export const addListeners = () => {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', handleNavLinkClick);
  });
};
