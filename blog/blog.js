document.addEventListener("DOMContentLoaded", () => {
  const blogSearch = document.getElementById('blogSearch');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const blogCards = document.querySelectorAll('.blog-card');

  function performFilter() {
    const searchQuery = blogSearch.value.toLowerCase();
    const activeCategory = document.querySelector('.filter-btn.active').dataset.filter;

    blogCards.forEach(card => {
      const title = card.querySelector('h3').innerText.toLowerCase();
      const cardCategory = card.dataset.category;

      const matchesSearch = title.includes(searchQuery);
      const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;

      if (matchesSearch && matchesCategory) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }


  blogSearch.addEventListener('input', performFilter);

 
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      performFilter();
    });
  });
});



document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('full-width-form');
    const btn = form.querySelector('.n-submit-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
     
        btn.style.width = btn.offsetWidth + 'px';
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        btn.style.pointerEvents = 'none';

        setTimeout(() => {
          
            btn.innerHTML = '<i class="fa-solid fa-check"></i> <span>Check Email</span>';
            btn.style.background = '#2d7a32';
            form.querySelector('input').value = '';
        }, 1500);
    });
});





















