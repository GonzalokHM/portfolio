import fillHomeData from '../pages/Home/FillHomeData';
import NotFound from '../pages/NotFound/NotFound';
import initializeParticleNetworkAnimation from '../pages/Projects/particlesNet';
import routes from '../utils/routes';

export const router = () => {
  const path = window.location.pathname;
  const main = document.querySelector('main');
  main.innerHTML = '';
  const checkRoute = routes.find((route) => route.path === path);
  if (checkRoute) {
    const renderedComponent = checkRoute.component();
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
