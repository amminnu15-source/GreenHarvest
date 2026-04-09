(function(){
  'use strict';

  /* ─── Post data ─── */
  const posts = [
    {
      title:   'How AI is Predicting Harvest Yields',
      excerpt: 'Machine learning models trained on satellite imagery and soil sensors are giving farmers a 6-week advance view of what their fields will produce.',
      cat:     'Technology', catClass: 'rc-blue',
      date:    'April 2, 2025', readTime: '2 min read', views: '3,840 views',
      author:  'Priya Krishnamurthy', authorRole: 'Head of Research',
      authorImg: '../images/author-1.jpg',
      cover:   '../images/card-img-2.jpg',
      thumb:   '../images/blog-js.jpg',
      caption: 'AI-powered analytics dashboard used by GreenHarvest vendors — Hyderabad, 2025.',
      toc:     ['How the Models Work','What This Means for Farmers','Practical Access for Small Farmers','Limitations to Know']
    },
    {
      title:   'The Rise of Direct-to-Consumer Sales',
      excerpt: 'Across South India, a new generation of farmers is selling directly to urban buyers — and keeping the margin that was previously lost in the chain.',
      cat:     'Market Trends', catClass: 'rc-accent',
      date:    'March 25, 2025', readTime: '2 min read', views: '5,120 views',
      author:  'Arjun Rao', authorRole: 'CEO, GreenHarvest',
      authorImg: '../images/author-4.jpg',
      cover:   '../images/card-img-1.jpg',
      thumb:   '../images/small-2.jpg',
      caption: 'A direct-to-consumer market day in Jubilee Hills, Hyderabad.',
      toc:     ['Why Direct Sales Are Rising Now','Building a Loyal Buyer Base','What You Need to Start']
    },
    {
      title:   '5 Natural Ways to Improve Soil Fertility',
      excerpt: 'These five natural practices have been proven to improve long-term soil fertility while reducing external input costs by 30–50%.',
      cat:     'Farming Tips', catClass: 'rc-green',
      date:    'March 18, 2025', readTime: '2 min read', views: '4,260 views',
      author:  'Vikram Singh', authorRole: 'Vendor Success, GreenHarvest',
      authorImg: '../images/author-5.jpg',
      cover:   '../images/service-soil.jpg',
      thumb:   '../images/small-2.jpg',
      caption: 'Healthy soil structure on a GreenHarvest vendor farm in Warangal.',
      toc:     ['1. Vermicomposting','2. Green Manure Cover Crops','3. Mulching','4. Microbial Biofertilisers','5. Biochar Application']
    },
    {
      title:   'Reducing Post-Harvest Loss in Logistics',
      excerpt: 'India loses 15–18% of its fruit and vegetable production between harvest and consumer. These strategies reduce that risk significantly.',
      cat:     'Logistics', catClass: 'rc-teal',
      date:    'March 10, 2025', readTime: '2 min read', views: '3,100 views',
      author:  'Meena Patel', authorRole: 'Operations, GreenHarvest',
      authorImg: '../images/author-6-small.jpg',
      cover:   '../images/mobile.jpg',
      thumb:   '../images/mobile.jpg',
      caption: 'GreenHarvest delivery vehicles loading produce for Hyderabad routes.',
      toc:     ['Harvest at the Right Time','Pre-Cooling Before Transport','Route Optimisation in Delivery']
    },
    {
      title:   'Sustainable Packaging for Small Farms',
      excerpt: 'Urban buyers are actively choosing vendors who use sustainable packaging. This is no longer just ethics — it is a commercial advantage.',
      cat:     'Sustainability', catClass: 'rc-green',
      date:    'March 3, 2025', readTime: '2 min read', views: '2,780 views',
      author:  'Anita Reddy', authorRole: 'Vendor Success, GreenHarvest',
      authorImg: '../images/author-small-7.jpg',
      cover:   '../images/card-img-1.jpg',
      thumb:   '../images/card-img-1-small.jpg',
      caption: 'Banana-leaf-wrapped produce from a GreenHarvest vendor in Secunderabad.',
      toc:     ['Banana Leaf Wrapping','Bamboo Baskets and Crates','Newspaper and Recycled Paper']
    },
    {
      title:   'Precision Irrigation for Small-Scale Farms',
      excerpt: 'Simple, affordable irrigation technology pays for itself in one season while saving up to 50% of water compared to flood irrigation.',
      cat:     'Technology', catClass: 'rc-blue',
      date:    'February 24, 2025', readTime: '2 min read', views: '3,450 views',
      author:  'Priya Krishnamurthy', authorRole: 'Head of Research',
      authorImg: '../images/author-1-small.jpg',
      cover:   '../images/blog-d-hero.jpg',
      thumb:   '../images/blog-d-hero-small.jpg',
      caption: 'Drip irrigation installed on a GreenHarvest vendor farm in Karimnagar district.',
      toc:     ['Drip Irrigation: The Foundation','Soil Moisture Sensors','Fertigation: Irrigation + Fertilisation Together']
    }
  ];

  let currentPost = 0;

  /* ─── Build sidebar: all posts list ─── */
  function buildSidebarPosts(){
    const el = document.getElementById('bdAllPosts');
    el.innerHTML = posts.map((p, i) => `
      <div class="bd-post-item ${i === currentPost ? 'active' : ''}" data-post="${i}">
        <div class="bd-pi-thumb"><img src="${p.thumb}" alt="" loading="lazy"/></div>
        <div>
          <div class="bd-pi-title">${p.title}</div>
          <div class="bd-pi-meta">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ${p.readTime}
          </div>
        </div>
      </div>
    `).join('');
    el.querySelectorAll('.bd-post-item').forEach(item => {
      item.addEventListener('click', () => switchPost(parseInt(item.dataset.post)));
    });
  }

  /* ─── Build TOC ─── */
  function buildTOC(postIdx){
    const toc = posts[postIdx].toc;
    document.getElementById('bdTOC').innerHTML = toc.map((item, i) => `
      <div class="bd-toc-item ${i === 0 ? 'active' : ''}" data-toc="${i}">
        <span class="bd-toc-num">${String(i+1).padStart(2,'0')}</span>
        ${item}
      </div>
    `).join('');
    document.querySelectorAll('.bd-toc-item').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.bd-toc-item').forEach(x => x.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }

  /* ─── Build related articles ─── */
  function buildRelated(postIdx){
    const others = posts.filter((_, i) => i !== postIdx).slice(0, 3);
    document.getElementById('bdRelatedGrid').innerHTML = others.map(p => `
      <div class="bd-rel-card" onclick="switchPostByTitle('${p.title.replace(/'/g,"\\'")}')">
        <div class="bd-rc-img">
          <img src="${p.thumb.replace('w=200','w=600')}" alt="" loading="lazy"/>
          <span class="bd-rc-cat ${p.catClass}">${p.cat}</span>
        </div>
        <div class="bd-rc-body">
          <div class="bd-rc-meta">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            ${p.date} &bull; ${p.readTime}
          </div>
          <div class="bd-rc-title">${p.title}</div>
          <div class="bd-rc-excerpt">${p.excerpt}</div>
          <div class="bd-rc-footer">
            <span class="bd-rc-author">${p.author}</span>
            <span class="bd-rc-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span>
          </div>
        </div>
      </div>
    `).join('');
  }

  /* ─── Switch post ─── */
  function switchPost(idx){
    if(idx === currentPost) return;

    // Hide current panel
    document.getElementById('bdPanel'+currentPost).classList.remove('active');

    currentPost = idx;
    const p = posts[idx];

    // Update header
    document.getElementById('bdBreadcrumbCurrent').textContent = p.title;
    document.getElementById('bdCatText').textContent = p.cat;
    document.getElementById('bdDate').textContent = p.date;
    document.getElementById('bdReadTime').textContent = p.readTime;
    document.getElementById('bdViews').textContent = p.views;
    document.getElementById('bdArtTitle').innerHTML = p.title.replace(/\b(\w+)\b/, '<em>$1</em>');
    document.getElementById('bdArtExcerpt').textContent = p.excerpt;
    document.getElementById('bdAuthorName').textContent = p.author;
    document.getElementById('bdAuthorRole').textContent = p.authorRole;
    document.getElementById('bdAuthorImg').src = p.authorImg;
    document.getElementById('bdCoverImg').src = p.cover;
    document.getElementById('bdCoverCaption').textContent = p.caption;

    // Update tabs
    document.querySelectorAll('.bd-post-tab').forEach((t,i) => t.classList.toggle('active', i === idx));

    // Show new panel
    document.getElementById('bdPanel'+idx).classList.add('active');

    // Update sidebar
    buildTOC(idx);
    buildRelated(idx);
    buildSidebarPosts();

    // Reset reading progress
    document.getElementById('bdProgress').style.width = '0%';
    document.getElementById('bdRiFill').style.width = '0%';
    document.getElementById('bdRiPct').textContent = '0%';
    const mins = parseInt(p.readTime);
    document.getElementById('bdTimeLeft').textContent = mins + ' min';

    // Re-run reveal
    document.querySelectorAll('#bdPanel'+idx+' .reveal').forEach(el => {
      el.classList.remove('visible');
      setTimeout(() => el.classList.add('visible'), 100);
    });

    // Scroll to top of article
    document.querySelector('.bd-hero').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ─── Switch by title (for related cards) ─── */
  window.switchPostByTitle = function(title){
    const idx = posts.findIndex(p => p.title === title);
    if(idx !== -1) switchPost(idx);
  };

  /* ─── Post tab clicks ─── */
  document.getElementById('bdPostTabs').addEventListener('click', e => {
    const tab = e.target.closest('.bd-post-tab');
    if(tab) switchPost(parseInt(tab.dataset.post));
  });

  /* ─── Init ─── */
  buildSidebarPosts();
  buildTOC(0);
  buildRelated(0);

  /* ─── Scroll reveal ─── */
  if('IntersectionObserver' in window){
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.10 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  /* ─── Reading progress ─── */
  const bdProgress  = document.getElementById('bdProgress');
  const bdRiFill    = document.getElementById('bdRiFill');
  const bdRiPct     = document.getElementById('bdRiPct');
  const bdTimeLeft  = document.getElementById('bdTimeLeft');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? Math.round((scrollTop / docH) * 100) : 0;
    bdProgress.style.width = pct + '%';
    bdRiFill.style.width   = pct + '%';
    bdRiPct.textContent    = pct + '%';
    const totalMin = parseInt(posts[currentPost].readTime);
    const remaining = Math.max(0, Math.round(totalMin * (1 - pct / 100) * 0.5));
    bdTimeLeft.textContent = remaining <= 0 ? 'Done!' : remaining + ' min';
  }, { passive: true });

  /* ─── Copy link ─── */
  document.getElementById('bdCopyBtn').addEventListener('click', () => {
    const btn = document.getElementById('bdCopyBtn');
    const orig = btn.innerHTML;
    navigator.clipboard.writeText(window.location.href).then(() => {
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
      setTimeout(() => { btn.innerHTML = orig; }, 2000);
    }).catch(() => {});
  });

  /* ─── Comment submit ─── */
  const cmtBtn = document.getElementById('bdCommentBtn');
  if(cmtBtn){
    cmtBtn.addEventListener('click', () => {
      cmtBtn.classList.add('loading'); cmtBtn.disabled = true;
      setTimeout(() => {
        cmtBtn.classList.remove('loading'); cmtBtn.disabled = false;
        cmtBtn.innerHTML = `<span class="bd-sub-txt" style="display:flex;align-items:center;gap:8px;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>Comment Posted!</span>`;
        setTimeout(() => {
          cmtBtn.innerHTML = `<span class="bd-sub-txt" style="display:flex;align-items:center;gap:8px;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>Post Comment</span>`;
        }, 2500);
      }, 1500);
    });
  }

  /* ─── Newsletter subscribe ─── */
  document.getElementById('bdNlBtn').addEventListener('click', () => {
    const btn = document.getElementById('bdNlBtn');
    const orig = btn.innerHTML;
    btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation:bdspin 0.7s linear infinite;"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-5.49"/></svg> Subscribing...`;
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Subscribed!`;
      setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 2500);
    }, 1600);
  });

})();









// simple fade-in animation
window.addEventListener("load", () => {
  document.querySelector(".bdh-inner").style.opacity = "1";
});