import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { addListeners, router } from './router';
import './style.css';

if (window.location.pathname === '/') {
  window.location.pathname = '/home';
}

Header();
Footer();

router();
addListeners();
