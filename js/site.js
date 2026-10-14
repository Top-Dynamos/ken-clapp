/* Ken Clapp. Small and self contained: no jQuery, no demo plugins.
   The demo's own script.js is not loaded, because it throws on the first
   missing plugin and stops everything after it. */
(function () {
  'use strict';

  var nav = document.getElementById('kcNav');
  var onScroll = function () {
    if (!nav) return;
    if (window.scrollY > 40) { nav.classList.add('kc-solid'); }
    else { nav.classList.remove('kc-solid'); }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var burger = document.getElementById('kcBurger');
  var links = document.getElementById('kcLinks');
  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('kc-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close the menu' : 'Open the menu');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('kc-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Open the menu');
        document.body.style.overflow = '';
      }
    });
  }

  /* Reveal. Anything the observer never reaches still has to be readable,
     so the fallback shows everything rather than hiding it. */
  var items = [].slice.call(document.querySelectorAll('.kc-rev'));
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || reduce) {
    items.forEach(function (el) { el.classList.add('kc-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('kc-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    items.forEach(function (el) { io.observe(el); });
  }
})();
