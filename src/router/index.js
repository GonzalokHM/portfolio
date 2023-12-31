import Experience from '../pages/Experience/Experience';
import fillHomeData from '../pages/Home/FillHomeData';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import Projects from '../pages/Projects/Projects';
import initializeParticleNetworkAnimation from '../pages/Projects/particlesNet';
import drawPieChart from '../pages/Experience/Piechart';
import jobsList from '../pages/Experience/jobs';

//Vamos a crear un array de objetos que incluya la ruta y el componente de cada una de las páginas
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

//Creamos la función que se encarga de actualizar el contenido del main según la ruta del navegador, teniendo como referencia nuestro array de rutas
export const router = () => {
  //Recuperamos el path del navegador
  const path = window.location.pathname;

  //Sacar cada uno de los componentes de mi array si existe la coincidencia entre el path y lo que tenemos en el array de objetos
  const { component } = routes.find((route) => route.path === path) || {};
  //Vamos a renderizar el componente si existe en la etiqueta main y si no pintamos la ruta NotFound
  if (component) {
    document.querySelector('main').innerHTML = component();
    document.body.classList.remove('home-page');
    if (path === '/home') {
      fillHomeData();
      document.body.classList.add('home-page');
    }
    if (path === '/projects') {
      initializeParticleNetworkAnimation();
    }
    if (path === '/experience') {
      setTimeout(() => {
        drawPieChart();
        jobsList();
      }, 100);
    }
  } else {
    document.querySelector('main').innerHTML = NotFound();
  }
};

//Vamos a añadirle un evento popstate a window para que lance la función router cada vez que vayamos hacia adelante o hacia atrás en el navegador
window.addEventListener('popstate', router);

//Vamos a añadirle un evento DomContentLoaded al documento para cargar la página cada vez que se actualice el contenido del main
document.addEventListener('DOMContentLoaded', router);

const handleNavLinkClick = (ev) => {
  ev.preventDefault();
  const linkHref = ev.target.href;
  console.log('El link apunta a:', linkHref);
  const path = new URL(linkHref).pathname;
  history.pushState(null, null, path);
  router();
};

//Vamos a encapsular los listeners en una función para que se lancen después del router y le de tiempo a encontrar los anchors
export const addListeners = () => {
  //Vamos a añadirle un evento click a todos los links del nav
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', handleNavLinkClick);
  });
};
