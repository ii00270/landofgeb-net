// ── Shared across every page: the hamburger menu ─────────────────────────
// One list of links for the whole site, so adding a page means editing it here.
// Local time, written the house way: "Fri 24 Oct 2026, 14:30 AST (UTC-04:00)".
// St. Croix keeps Atlantic Standard Time all year (no daylight saving).
window.gebTime = (d = new Date()) => {
  const t = new Date(d.getTime() - 4 * 3600e3);
  const D = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][t.getUTCDay()];
  const M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][t.getUTCMonth()];
  const p = n => String(n).padStart(2, '0');
  return { date: `${D} ${t.getUTCDate()} ${M} ${t.getUTCFullYear()}`, time: `${p(t.getUTCHours())}:${p(t.getUTCMinutes())}`, zone: 'AST (UTC-04:00)', year: t.getUTCFullYear(),
    full: `${D} ${t.getUTCDate()} ${M} ${t.getUTCFullYear()}, ${p(t.getUTCHours())}:${p(t.getUTCMinutes())} AST (UTC-04:00)` };
};

(() => {
  const EMAIL = 'bixxville@proton.me';   // the one public address (decided 23 Oct 2026)
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
        <p style="margin-top:14px">Send us the operation and the date you need it ready by. We answer by email.</p>
      </div>
      <div>
        <h5>Where we're going</h5>
        <div class="menu-next"><span>Electronics</span><span>Robotics</span><span>Mathematics</span></div>
      </div>
      <div class="menu-clock">Land of Geb, LLC · Christiansted, St. Croix, U.S. Virgin Islands<br><b id="menuClock">—</b></div>
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

  const tick = () => { const el = document.getElementById('menuClock'); if (el) el.textContent = window.gebTime().full; };
  tick(); setInterval(tick, 15000);
})();
