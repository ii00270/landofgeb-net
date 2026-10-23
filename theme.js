// ── Light / dark, the same way bixxville.xyz does it ─────────────────────
// The saved choice ("bx-theme") wins; with no choice, the system setting decides;
// with neither, light. The saved choice is applied in each page's <head> before
// anything paints, so there is no flash. This file only wires the button.
(() => {
  const KEY = 'bx-theme', root = document.documentElement;
  const saved = () => { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  const current = () => root.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const label = btn => {
    const next = current() === 'dark' ? 'light' : 'dark';
    btn.setAttribute('aria-label', `Switch to ${next} theme`);
    btn.title = `Switch to ${next} theme`;
  };
  const bar = document.querySelector('.bar');
  if (!bar) return;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 't-theme';
  btn.innerHTML = '<svg class="t-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.4M12 19v2.4M4.6 12H2.2M21.8 12h-2.4M6.5 6.5 4.8 4.8M19.2 19.2l-1.7-1.7M17.5 6.5l1.7-1.7M4.8 19.2l1.7-1.7"/></svg>'
    + '<svg class="t-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 14.4A8.4 8.4 0 0 1 9.6 3.8a8.6 8.6 0 1 0 10.6 10.6z"/></svg>';
  // top right: just before the Shop button, the way bixxville.xyz puts it before Log in
  const anchor = bar.querySelector('.shop-link') || bar.querySelector('.burger');
  bar.insertBefore(btn, anchor);
  btn.addEventListener('click', () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem(KEY, next); } catch (e) { /* private mode: the choice lasts this visit */ }
    label(btn);
    document.dispatchEvent(new CustomEvent('themechange', { detail: next }));
  });
  label(btn);
  // While the visitor has made no choice, follow the system as it changes.
  const mq = matchMedia('(prefers-color-scheme: dark)');
  const onChange = () => { if (!saved()) { label(btn); document.dispatchEvent(new CustomEvent('themechange', { detail: current() })); } };
  mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange);
  window.gebTheme = current;
})();
