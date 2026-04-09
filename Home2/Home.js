
window.addEventListener("load", () => {
  document.querySelectorAll(".fade-up").forEach(el => {
    el.style.animationPlayState = "running";
  });
});


document.getElementById("dirToggle").onclick = () => {
  const body = document.body;
  const html = document.documentElement;
  const btn = document.getElementById("dirToggle");

  body.classList.toggle("rtl");

  if (body.classList.contains("rtl")) {
    html.setAttribute("dir", "rtl");
    btn.textContent = "RTL";
  } else {
    html.setAttribute("dir", "ltr");
    btn.textContent = "LTR";
  }
};


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".fade-up, .fade-left, .fade-right")
  .forEach(el => observer.observe(el));


document.addEventListener("DOMContentLoaded", function () {

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("show");
      }
    });
  });

  document.querySelectorAll(".steps-section .fade-up").forEach(el=>{
    observer.observe(el);
  });

});


document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".testimonial-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "0.6s ease";
    observer.observe(card);
  });
});









document.addEventListener("DOMContentLoaded", () => {

  const section = document.querySelector('.impact');
  const counters = document.querySelectorAll('.counter');

  if (!section || counters.length === 0) return; 

  const startCounter = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;

      const update = () => {
        const increment = target / 100;

        if (count < target) {
          count += increment;
          counter.innerText = Math.floor(count);
          requestAnimationFrame(update);
        } else {
          counter.innerText = target + "+";
        }
      };

      update();
    });
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounter();
        obs.disconnect(); // run only once
      }
    });
  });

  observer.observe(section);

});



document.querySelectorAll('.cta a').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.style.transform = "scale(0.95)";
    setTimeout(() => {
      btn.style.transform = "scale(1)";
    }, 150);
  });
});