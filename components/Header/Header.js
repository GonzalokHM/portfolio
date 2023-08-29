import './Header.css';

const template = () => {
  return `
    <h1>Portfolio</h1>
    <nav>
        <ul>
            <li>
            <a href="/home">
            <i class="fas fa-home" style="color: #d64000;"></i>
                Home</a>
            </li>
            <li>
                <a
                href="/experience">
                <i class="fa-solid fa-briefcase"></i>
                 Experience
                 </a>
            </li>
            <li>
                <a
                href="/projects">
                <i class="fa-solid fa-diagram-project"></i>
                Projects
                </a>
            </li>
        </ul>
    </nav>
    `;
};

const Header = () => {
  document.querySelector('header').innerHTML = template();
};

export default Header;
