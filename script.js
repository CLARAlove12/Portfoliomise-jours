
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').classList.add('gone');
    }, 1400);
  });

  const nav = document.getElementById('nav');
  const backTop = document.getElementById('back-top');
  const scrollBar = document.getElementById('scroll-bar');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const tot = document.documentElement.scrollHeight - window.innerHeight;
    scrollBar.style.width = (y / tot * 100) + '%';
    nav.classList.toggle('sticky', y > 30);
    backTop.classList.toggle('on', y > 300);
  });

  let isDark = false;
  function toggleDark() {
    isDark = !isDark;
    document.body.classList.toggle('dark', isDark);
    document.querySelector('.btn-dark').textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('dark', isDark);
  }
  if (localStorage.getItem('dark') === 'true') toggleDark();

  function openMob() { document.getElementById('mobile-nav').classList.add('open'); }
  function closeMob() { document.getElementById('mobile-nav').classList.remove('open'); }

  const words = ['Developpeuse Front-end', 'Fan de Vue.js', 'Creatrice d interfaces', 'En recherche d alternance'];
  let wi = 0, ci = 0, del = false;
  const el = document.getElementById('typed');

  function typeLoop() {
    const word = words[wi];
    if (!del) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { del = true; setTimeout(typeLoop, 1800); return; }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { del = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(typeLoop, del ? 50 : 85);
  }
  setTimeout(typeLoop, 1200);

  const animEls = document.querySelectorAll('.anim, .anim-left, .anim-right');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
  }, { threshold: 0.12 });
  animEls.forEach(el => io.observe(el));

  function countUp(el) {
    const target = parseInt(el.dataset.count);
    let cur = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      cur = Math.min(cur + step, target);
      el.textContent = cur + (target < 10 ? '' : '+');
      if (cur >= target) clearInterval(timer);
    }, 35);
  }
  const statsSec = document.getElementById('stats');
  const statsIO = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('[data-count]').forEach(countUp);
      statsIO.disconnect();
    }
  }, { threshold: 0.3 });
  statsIO.observe(statsSec);

  function filterS(cat, btn) {
    document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    document.querySelectorAll('.skill-card').forEach(card => {
      const show = cat === 'all' || card.dataset.cat === cat;
      card.style.transition = 'all 0.3s ease';
      card.style.opacity = show ? '1' : '0.2';
      card.style.transform = show ? 'scale(1)' : 'scale(0.92)';
      card.style.pointerEvents = show ? 'auto' : 'none';
    });
  }

  function sendForm(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = 'Envoi en cours...';
    btn.disabled = true;
    setTimeout(() => {
      document.getElementById('form-ok').style.display = 'block';
      btn.textContent = 'Envoye !';
      e.target.reset();
    }, 1500);
  }