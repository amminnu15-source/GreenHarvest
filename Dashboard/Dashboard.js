(function(){
  'use strict';

  const html = document.documentElement;


  let dark = localStorage.getItem('gh-theme') === 'dark';
  function applyTheme(d){
    html.setAttribute('data-theme', d ? 'dark' : 'light');
    const ico = document.getElementById('themeIco');
    ico.innerHTML = d
      ? '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'
      : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
    localStorage.setItem('gh-theme', d ? 'dark' : 'light');
    setTimeout(() => {
      const ar = document.querySelector('.pill.active');
      if(ar) drawChart(ranges[ar.dataset.range]);
    }, 60);
  }
  applyTheme(dark);
  document.getElementById('themeBtn').addEventListener('click', () => { dark = !dark; applyTheme(dark); });


  let rtl = localStorage.getItem('gh-dir') === 'rtl';
  function applyDir(r){
    html.setAttribute('dir', r ? 'rtl' : 'ltr');
    document.getElementById('dirBtn').textContent = r ? 'RTL' : 'LTR';
    localStorage.setItem('gh-dir', r ? 'rtl' : 'ltr');
  }
  applyDir(rtl);
  document.getElementById('dirBtn').addEventListener('click', () => { rtl = !rtl; applyDir(rtl); });


  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('overlay');
  const menuBtn  = document.getElementById('menuBtn');
  const closeBtn = document.getElementById('closeSidebar');

  function openSB(){
    sidebar.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function closeSB(){
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }
  menuBtn.addEventListener('click', openSB);
  closeBtn.addEventListener('click', closeSB);
  overlay.addEventListener('click', closeSB);
  window.addEventListener('resize', () => { if(window.innerWidth > 1023) closeSB(); });

  document.querySelectorAll('.sb-link').forEach(link => {
    link.addEventListener('click', function(){
      document.querySelectorAll('.sb-link').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      if(window.innerWidth <= 1023) closeSB();
    });
  });

  // Persist active state based on current page
  (function setSidebarActive(){
    const current = location.pathname.toLowerCase().replace(/\/+$/, '');
    document.querySelectorAll('.sb-link[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const resolved = new URL(href, location.href).pathname.toLowerCase().replace(/\/+$/, '');
      if (resolved === current ||
          (resolved.endsWith('/index.html') && resolved.replace('/index.html','') === current)) {
        document.querySelectorAll('.sb-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  })();


  function counter(elId, end, duration, fmt){
    const el = document.getElementById(elId);
    if(!el) return;
    let start = null;
    function step(ts){
      if(!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(end * ease);
      if(p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  counter('statOrders',  248,    900,  v => Math.round(v).toLocaleString());
  counter('statRevenue', 186400, 1100, v => '₹' + Math.round(v).toLocaleString('en-IN'));
  counter('statProducts',34,     950,  v => Math.round(v));
  counter('statRating',  4.7,    1000, v => v.toFixed(1));


  const activities = [
    { cls:'a-green',  icon:'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0', title:'New order received', sub:'Order GH-1021 • Fresh Tomatoes' },
    { cls:'a-blue',   icon:'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z', title:'Product updated', sub:'Spinach stock updated to 42 units' },
    { cls:'a-gold',   icon:'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', title:'New review', sub:'You received a 5★ rating' },
    { cls:'a-accent', icon:'M1 3h15v13H1zM16 8h4l3 5v4h-7V8zM5.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM18.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z', title:'Shipment dispatched', sub:'Order GH-1019 marked as shipped' }
  ];

  const actList = document.getElementById('activityList');
  actList.innerHTML = activities.map((a, i) => `
    <li class="activity-item fade-up" style="animation-delay:${0.08*i}s;">
      <div class="a-icon ${a.cls}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="${a.icon}"/>
        </svg>
      </div>
      <div>
        <div class="a-title">${a.title}</div>
        <div class="a-sub">${a.sub}</div>
      </div>
    </li>
  `).join('');


  const orders = [
    { id:'GH-1021', customer:'Akhil',   product:'Fresh Tomatoes',  status:'paid',      amount:1290,  date:'Feb 28' },
    { id:'GH-1020', customer:'Meena',   product:'Organic Spinach', status:'pending',   amount:560,   date:'Feb 27' },
    { id:'GH-1019', customer:'Ravi',    product:'Bananas (10kg)',  status:'shipped',   amount:2100,  date:'Feb 26' },
    { id:'GH-1018', customer:'Anjali',  product:'Wheat (25kg)',    status:'paid',      amount:1950,  date:'Feb 25' },
    { id:'GH-1017', customer:'Suresh',  product:'Chilli Powder',   status:'cancelled', amount:750,   date:'Feb 24' },
  ];

  document.getElementById('ordersBody').innerHTML = orders.map((o,i) => `
    <tr class="fade-up" style="animation-delay:${0.06*i}s;">
      <td>${o.id}</td>
      <td>${o.customer}</td>
      <td>${o.product}</td>
      <td><span class="badge ${o.status}">${o.status.charAt(0).toUpperCase()+o.status.slice(1)}</span></td>
      <td>₹${o.amount.toLocaleString('en-IN')}</td>
      <td>${o.date}</td>
    </tr>
  `).join('');


  const canvas = document.getElementById('salesChart');
  const ctx    = canvas.getContext('2d');

  const ranges = {
    7:  [12,18,14,22,19,28,26],
    30: [8,10,12,9,14,13,15,17,16,18,14,20,19,22,21,18,24,23,26,25,28,26,30,29,31,27,33,32,35,34],
    90: Array.from({length:90},(_,i)=>10+Math.round(10*Math.sin(i/6)+(i%7)*0.6))
  };

  function drawChart(values){
    const dpr = window.devicePixelRatio || 1;
    const W   = canvas.parentElement.clientWidth || 400;
    const H   = 150;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,W,H);

    const style  = getComputedStyle(html);
    const green  = style.getPropertyValue('--green').trim() || '#2b7a2b';
    const border = style.getPropertyValue('--border').trim() || 'rgba(28,28,10,0.09)';

    const pad = 14;
    const max = Math.max(...values) * 1.15;
    const min = Math.min(...values) * 0.80;
    const xStep = (W - pad*2) / (values.length - 1);

    ctx.globalAlpha = 0.3;
    ctx.strokeStyle = border;
    ctx.lineWidth   = 1;
    for(let i=0;i<5;i++){
      const y = pad + i * (H-pad*2)/4;
      ctx.beginPath(); ctx.moveTo(pad,y); ctx.lineTo(W-pad,y); ctx.stroke();
    }
    ctx.globalAlpha = 1;

    const pts = values.map((v,i)=>({
      x: pad + i * xStep,
      y: pad + (H-pad*2) * (1-(v-min)/(max-min))
    }));


    const grad = ctx.createLinearGradient(0,pad,0,H-pad);
    grad.addColorStop(0,'rgba(43,122,43,0.22)');
    grad.addColorStop(1,'rgba(43,122,43,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    pts.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y));
    ctx.lineTo(W-pad,H-pad); ctx.lineTo(pad,H-pad); ctx.closePath(); ctx.fill();


    ctx.strokeStyle = green;
    ctx.lineWidth   = 2.5;
    ctx.lineJoin    = 'round';
    ctx.lineCap     = 'round';
    ctx.beginPath();
    pts.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y));
    ctx.stroke();


    pts.forEach((p,i)=>{
      ctx.beginPath();
      ctx.arc(p.x,p.y,i===pts.length-1?5:3,0,Math.PI*2);
      ctx.fillStyle = i===pts.length-1 ? green : 'rgba(43,122,43,0.35)';
      ctx.fill();
    });
  }

  document.querySelectorAll('.pill').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.pill').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      drawChart(ranges[btn.dataset.range]);
    });
  });

  drawChart(ranges[7]);
  window.addEventListener('resize',()=>{
    const ar=document.querySelector('.pill.active');
    if(ar) drawChart(ranges[ar.dataset.range]);
  });

})();