import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { addListeners, router } from './router';
import './style.css';

if (window.location.pathname === '/') {
  window.location.pathname = '/home';
}

const app = document.getElementById('app');

const header = Header();
const main = document.createElement('main');
const footer = Footer();
app.append(header, main, footer);
router(main);
addListeners();
