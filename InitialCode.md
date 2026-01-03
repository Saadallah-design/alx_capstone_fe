html:
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/3.0.0/uicons-solid-rounded/css/uicons-solid-rounded.css'>
      <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/3.0.0/uicons-thin-rounded/css/uicons-thin-rounded.css'>
  <title>Document</title>
</head>
<body>
      <nav>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>
  <section class="hero-section">
     <div class="left-container">
<!--     Logos Icons    -->
       <div class="cars-logo">
                <ul>
                    <li>
                        <a href="#" data-target="tab1">
                            <i class="fi fi-tr-car-side-bolt"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#" data-target="tab2">
                            <i class="fi fi-tr-car-alt"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#" data-target="tab3">
                            <i class="fi fi-tr-truck-pickup"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#" data-target="tab4">
                            <i class="fi fi-tr-electric-bike"></i>
                        </a>
                    </li>
                </ul>
            </div>
<!--    Images Tabs     -->
       <div class="imgs-tabs">
          <div class="tab tab1" id="tab1">
           <img src="https://salaheddinelp.com/wp-content/uploads/2024/10/Untitled-design-23-1.png"/>
         <div class="info-card">
              <div class='info-header'>
              <i class="fi fi-tr-crown"></i>
              <h3>best in city</h3>
             </div>
              <div class="price">
                <h3>Rent</h3>
                <h4>$119.00</h4>
              </div>
              <div class="info-footer">
                <i class="fi fi-tr-marker"></i>
                <i class="fi fi-tr-arrow-circle-right icon-to-rotate"></i>
                
              </div>
            </div>
            <div class="info2">
    <h3>Daily Plans</h3>
    <i class="fi fi-sr-location-arrow icon-to-rotate"></i>
    <p>Starting from $25.00
2023 new brand cars available</p>
  </div>
         </div>
          <div class="tab tab2" id="tab2">
           <img src="https://salaheddinelp.com/wp-content/uploads/2024/10/Untitled-design-22-1-1.png"/>
            <div class="info-card">
              <div class='info-header'>
              <i class="fi fi-tr-crown"></i>
              <h3>SUVs</h3>
             </div>
              <div class="price">
                <h3>Rent</h3>
                <h4>$90.00</h4>
              </div>
              <div class="info-footer"></div>
            </div>
             <div class="info2">
    <h3>SUVs 2024 </h3>
    <i class="fi fi-sr-location-arrow icon-to-rotate"></i>
    <p>Starting from $25.00
2023 new brand cars available</p>
  </div>
         </div>
          <div class="tab tab3" id="tab3">
           <img src="https://salaheddinelp.com/wp-content/uploads/2024/10/Untitled-design-23-1.png"/>
            <div class="info-card">
              <div class='info-header'>
              <i class="fi fi-tr-crown"></i>
              <h3>Pickup</h3>
             </div>
              <div class="price">
                <h3>Rent</h3>
                <h4>$100.00</h4>
              </div>
              <div class="info-footer"></div>
            </div>
             <div class="info2">
    <h3>Something Big</h3>
    <i class="fi fi-sr-location-arrow icon-to-rotate"></i>
    <p>Starting from $25.00
2023 new brand cars available</p>
  </div>
         </div>
          <div class="tab tab4" id="tab4">
         <img src="https://salaheddinelp.com/wp-content/uploads/2024/10/Untitled-design-23-1.png"/>
            <div class="info-card">
              <div class='info-header'>
              <i class="fi fi-tr-crown"></i>
              <h3>bicycles</h3>
             </div>
              <div class="price">
                <h3>Rent</h3>
                <h4>$9.00</h4>
              </div>
              <div class="info-footer"></div>
            </div>
             <div class="info2">
    <h3>DEco Friendly</h3>
    <i class="fi fi-sr-location-arrow icon-to-rotate"></i>
    <p>Keep the environment clean eco-friendly bikes for your daily trips in town.</p>
  </div>
       </div>
         
<!--   info card 1      -->
            
         </div>
    </div>
    <div class="right-container">
      <div>
        <i class="fi fi-tr-arrow-right"></i>
        <h3>Best Cars Rental Service in Morocco</h3>
      </div>
      
      <h1>Drive Through Marrakech in Style!</h1>
      <p>Just fast and elegent style</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
      <div class="btns-wrapper">
        <button id="btn1">
          <span>explore now</span>
            <i class="fi fi-tr-arrow-circle-right"></i>
          </button>
        <button id="btn2">
          <span>watch video</span>
          <i class="fi fi-tr-play-circle"></i>
        </button>
      </div>
    </div>
           
           
  
  </section>
 
</body>
</html>

css: 
* {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}

body {
    font-family: "lato", Arial, sans-serif;
    background-color: #f4f4f4;
    color: #333;
    --h1 : clamp(2rem, -0.286rem + 4.762vw, 4rem);
  --sub-s: clamp(1rem, 0.771rem + 0.476vw, 1.2rem);
}
nav {
    width: 100%;
    height: 8vh;
    background-color: gold;
    display: flex;
    justify-content: center;
    align-items: center;
}
nav ul {
    list-style: none;
    display: flex;
    gap: 20px;
}
nav ul a {
    text-decoration: none;
    color: grey;
    font-weight: bold;
}
nav ul a:hover {
    color: #000;
}

.hero-section {
  min-height: 100vh;
  display: flex;
  background-color: #F0E2CB;
}
.left-container,
.right-container {
  width: 50%;
}
.left-container {
    position: relative;
}
.logos {
  background-color: #f1ff95;
  padding: 10px 20px;
  width: 50%;
  display: flex;
  position: relative;
  top: 10px;
  left: 50%;
  transform: translateX(-50%); 
}
.logos ul {
  list-style: none;
  display: flex;
  gap: 10px;
}
.imgs-tabs {
  height: 80vh;
  width: 100%;
  position: absolute;
  bottom: 0px;
}
.imgs-tabs img {
  width: 100%;
  position: absolute;
  bottom: 0px;
}
.tab {
  display: none;
}
.tab.active {
  display: block;
}

/* Info card inside the imgs tab */
.info-card {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 15px;
  padding: 1rem;

  /* Glassmorphism core */
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);

  /* Text & appearance */
  color: white;

  /* Hover-ready transform */
  transition: transform 0.2s ease;
  transform-style: preserve-3d;

  /* Rendering optimizations */
  will-change: transform;
}

/* Optional light overlay for glossy edge */
.info-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05));
  border-radius: inherit;
  z-index: -1;
  pointer-events: none;
}

/* Optional icon rotation inside */
.info-card:hover .icon-to-rotate {
  transform: rotate(-25deg);
}

.info-header  {
  color: grey;
  display: flex;
  padding: 0.5em;
  gap: 10px;
  border: 1px solid gold;
  border-radius: 10px;
  margin-bottom: 10px;
  position: relative;
}
.info-card .price{
  color: grey;
  font-size: 1.2rem;
}
.info-card .price h4{
  color: black;
  font-size: 1.8rem;
}
.info-card .info-footer {
  display: flex;
  color: grey;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
  position: absolute;
  bottom: 10px;
  left: 20px;
  right: 20px;
  
}

/* Info 2 CSS style */
.info2 {
  display: inline-block;
  padding: 15px;
  position: relative;
  line-height: 1.4rem;
  transition: all 0.3s ease;
}
.info2 h3 {
  margin-bottom: 10px;
}
.info2 .fi{
  position: absolute;
  top: 20%;
  right: 20%;
  color: lightgrey;
  transition: all 0.2s ease-in-out;
}
.info2:hover .fi {
  color: red;
transform: rotate(3deg) translateX(2px) scale(1.2);
}
.info2 p {
  font-size: 14px;
  width: 24ch;
  margin-top: 0px;
}
/* End of Info 2 CSS style */
/* Cars Logo tabs CSS STYLE */
.cars-logo {
    width: auto;
    background-size: cover;
    background-position: center;
    position: absolute;
    top: 20px;
    transform: translateX(-50%);
    left: 50%;
    padding: 10px;
    border-radius: 10px;
    z-index: 2;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
}
.cars-logo ul {
    list-style: none;
    display: flex;
    gap: 20px;
}
.cars-logo ul li {
    color: grey;
    background-color: lightcyan;
    border: none;
    border-radius: 50%;
    padding: 10px 16px;
}
.cars-logo ul li:hover {
    background-color: gold;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.cars-logo ul li a {
    text-decoration: none;

}

/* CSS code for icons */
.cars-logo i {
    font-size: 34px;
    color: #333;
    transition: color 0.3s ease;
}
.cars-logo i:hover {
    color: #000;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transform: scale(1.1);
}
/* CSS for right container */
.right-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  padding: 2rem;
}
.right-container h1 {
  color: black;
  font-family: "lato";
  font-size: var(--h1);
}
.right-container h3 p {
  font-size: var(--sub-s);
}
.right-container .btns-wrapper {
   display: flex;
  justify-content: flex-start;  
  align-items: center;
  justify-items: center;
  gap: 20px;
  padding: 20px 0px;
}
.right-container button {
  border: 0px transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  padding: 14px 28px;
  font-size: var(--sub-s);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
}
.right-container #btn1 {
  background-color: #C14438;
  color: white;
}
.btns-wrapper  i {
  font-size: 20px;

}
.right-container button:hover {
  transform: scale(1.05);
}

.right-container > div:first-child {
  display: flex;
  align-items: center;
  gap: 20px;
}
.right-container .fi:first-child{
  font-size: 30px;
}

/* card hover effect */
.info-card {
    background: rgba(255, 255, 255, 0.1); /* Lighter transparent white */
    backdrop-filter: blur(5px); /* Lighter blur effect */
    -webkit-backdrop-filter: blur(5px); /* For Safari support */
    border: 1px solid rgba(255, 255, 255, 0.2); /* Lighter border */
    border-radius: 25px; /* Rounded corners */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); /* Softer shadow */
    padding: 20px; /* Padding inside the container */
    color: #fff; /* Text color */
}
/* Existing glass effect container styles remain unchanged */

/* Add rotation effect for the icon */
.icon-to-rotate {
    transition: transform 0.5s ease; /* Smooth rotation transition */
}

/* Rotate the icon when the container is hovered */
.info-card:hover .icon-to-rotate {
    transform: rotate(-25deg); /* Rotate the icon */
}
js:

const links = document.querySelectorAll(".cars-logo a");
  const tabs = document.querySelectorAll(".tab");

  links.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      
      // Remove active class from all tabs
      tabs.forEach(tab => tab.classList.remove("active"));

      // Get the target tab by ID
      const targetId = this.getAttribute("data-target");
      const targetTab = document.getElementById(targetId);

      // Add active class to the target tab
      if (targetTab) {
        targetTab.classList.add("active");
      }
    });
  });

  // Optional: activate the first tab on page load
  if (tabs.length > 0) {
    tabs[0].classList.add("active");
  }
    
    // nouse effect for the card
const card = document.querySelector('.info-card');

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 10;
    const rotateY = (x - centerX) / 10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
  });
