import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { addListeners, router } from './router';
import './style.css';

Header();
Footer();

router();
addListeners();
