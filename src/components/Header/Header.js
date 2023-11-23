import './Header.css';

const template = () => {
  return `
    <h1>Portfolio</h1>
    <label class="hamburger-label" for="hamburger">&#9776;</label>
       <input type="checkbox" class="hamburger" id="hamburger" />
    <nav>
        <ul class="nav-list">
            <li>
                <a id="home-link" class="nav-link" href="/home">
                <i class="fas fa-home" style="color: #d64000;"></i>
                Home
                </a>
            </li>
            <li>
                <a id="experience-link" class="nav-link" href="/experience">
                <i class="fa-solid fa-briefcase"></i>
                 Experience
                 </a>
            </li>
            <li>
                <a id="projects-link" class="nav-link" href="/projects">
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
