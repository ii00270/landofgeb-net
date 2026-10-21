// ── Shared across every page: the hamburger menu ─────────────────────────
// One list of links for the whole site, so adding a page means editing it here.
(() => {
  const EMAIL = 'bixxvill@proton.me';
  const LINKS = [
    ['index.html', 'Home'],
    ['services.html', 'Services'],
    ['about.html', 'About'],
    ['index.html#pricing', 'Pricing'],
    ['index.html#bixxville', 'Bixxville'],
    ['https://bixxville.myshopify.com', 'Shop'],
  ];
  const here = location.pathname.split('/').pop() || 'index.html';
  const bar = document.querySelector('.bar');
  if (!bar) return;

  const burger = document.createElement('button');
  burger.className = 'burger';
  burger.setAttribute('aria-label', 'Open menu');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-controls', 'menu');
  burger.innerHTML = '<i></i><i></i><i></i>';
  bar.appendChild(burger);

  const menu = document.createElement('div');
  menu.id = 'menu';
  menu.setAttribute('role', 'dialog');
  menu.setAttribute('aria-label', 'Menu');
  menu.setAttribute('aria-hidden', 'true');
  menu.innerHTML = `
    <nav class="menu-links">
      ${LINKS.map(([href, name], i) => {
        const ext = href.startsWith('http');
        const cur = !ext && href === here ? ' aria-current="page"' : '';
        return `<a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}${cur} style="transition-delay:${0.12 + i * 0.05}s"><small>0${i + 1}</small>${name}</a>`;
      }).join('')}
    </nav>
    <div class="menu-side">
      <div>
        <h5>Get in touch</h5>
        <a class="mail" href="mailto:${EMAIL}">${EMAIL}</a>
        <p style="margin-top:14px">Questions, projects, classes — send an email and we'll be in contact.</p>
      </div>
      <div>
        <h5>Where we're going</h5>
        <div class="menu-next"><span>Electronics</span><span>Robotics</span><span>Mathematics</span></div>
      </div>
      <div class="menu-clock">Land of Geb, LLC · St. Croix, U.S. Virgin Islands<br>AyeAye <b id="menuClock">--:--:--</b> UTC−4</div>
    </div>`;
  document.body.appendChild(menu);

  const links = [...menu.querySelectorAll('a')];
  const setOpen = open => {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', String(!open));
    links.forEach(a => { a.tabIndex = open ? 0 : -1; });
    if (open) setTimeout(() => links[0]?.focus({ preventScroll: true }), 300);
  };
  setOpen(false);
  burger.addEventListener('click', () => setOpen(!document.body.classList.contains('menu-open')));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && document.body.classList.contains('menu-open')) { setOpen(false); burger.focus(); } });
  // Same-page anchors close the menu before scrolling.
  links.forEach(a => a.addEventListener('click', () => setOpen(false)));

  const tick = () => { const el = document.getElementById('menuClock'); if (el) el.textContent = new Date(Date.now() - 4 * 3600e3).toISOString().slice(11, 19); };
  tick(); setInterval(tick, 1000);
})();
