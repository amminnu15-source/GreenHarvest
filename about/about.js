
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
  let scroll = window.scrollY;


  document.querySelector('.hero-bg').style.transform =
    `scale(1.1) translateY(${scroll * 0.2}px)`;
});



const counters = document.querySelectorAll('.count');
const stats = document.querySelectorAll('.stat');

let started = false;

function startCounter(){
  counters.forEach(counter => {

    const target = +counter.getAttribute('data-target');
    let count = 0;

    const speed = target / 100; // control speed

    const updateCount = () => {
      count += speed;

      if(count < target){
        counter.innerText = Math.floor(count);
        requestAnimationFrame(updateCount);
      } else {
      
        if(target >= 1000){
          counter.innerText = (target/1000) + "K+";
        } else if(target === 18){
          counter.innerText = target + " States";
        } else if(target === 50){
          counter.innerText = target + "+";
        } else {
          counter.innerText = target;
        }
      }
    };

    updateCount();
  });
}


function showStats(){
  stats.forEach(stat => stat.classList.add('show'));

  if(!started){
    startCounter();
    started = true;
  }
}


window.addEventListener('scroll', () => {
  const section = document.querySelector('.stats-section');
  const sectionTop = section.getBoundingClientRect().top;

  if(sectionTop < window.innerHeight - 100){
    showStats();
  }
});

const mission = document.querySelector(".mission-section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      mission.classList.add("show");
    }
  });
}, { threshold: 0.3 });

observer.observe(mission);



document.addEventListener("DOMContentLoaded", () => {

  const teamCards = document.querySelectorAll('.team-card');

  if (!teamCards.length) return; 

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.2 });

  teamCards.forEach(card => observer.observe(card));

});




document.addEventListener("DOMContentLoaded", () => {

  const items = document.querySelectorAll('.timeline-item, .partner-card');

  const observer = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold:0.2 });

  items.forEach(el=>{
    if(el) observer.observe(el);
  });

});