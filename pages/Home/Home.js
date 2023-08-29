import './home.css';

const Home = () => {
  return `
  <h2 id=homeTitle>Home</h2> 
  <div id="homeContainer">
       <img id="profileImage" src="" alt="Profile Image">
       <h2 id="name"></h2>
       <p id="job"></p>
       <p id= "description"></p>
      <ul id="homeLinks"></ul>
  </div>
    `;
};

export default Home;
