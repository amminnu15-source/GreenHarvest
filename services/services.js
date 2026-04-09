const items = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
});

items.forEach(el => observer.observe(el));


// Smooth row highlight animation
const rows = document.querySelectorAll("tbody tr");

rows.forEach(row => {
  row.addEventListener("mouseenter", () => {
    row.style.transition = "0.3s";
  });
});



document.addEventListener("DOMContentLoaded", function() {
  const observerOptions = {
    threshold: 0.2 // Trigger when 20% of the element is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, observerOptions);

  // Target all elements with the .fade-up class
  const animatedElements = document.querySelectorAll(".fade-up");
  animatedElements.forEach((el) => observer.observe(el));
});





















document.querySelectorAll('.accordion-header').forEach(button => {
  button.addEventListener('click', () => {
    const accordionItem = button.parentElement;
    
    // Close other items (Optional: remove this if you want multiple open)
    document.querySelectorAll('.accordion-item').forEach(item => {
      if (item !== accordionItem) {
        item.classList.remove('active');
      }
    });

    // Toggle current item
    accordionItem.classList.toggle('active');
  });
});