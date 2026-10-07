// Navbar Status
const navbar = document.getElementById('navbar');
const links = [...navbar.querySelectorAll('a')];
const targets = links.map(a => document.querySelector(a.getAttribute('href')));

function setActive(id) {
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
}

function update() {
    const mid = window.innerHeight / 2;
    let current = targets[0].id;
    targets.forEach(el => {
    if (el.getBoundingClientRect().top <= mid) current = el.id;
    });
    setActive(current);
}

window.addEventListener('scroll', update, { passive: true });
update();
////////

// Navbar Scroll Hiding
let lastY = window.scrollY;

window.addEventListener('scroll', () => {
const y = window.scrollY;
if (Math.abs(y - lastY) < 8) return;          

const scrollingDown = y > lastY;
const pastNavbar = y > 64;                    
const hasFocus = navbar.matches(':focus-within');

navbar.classList.toggle('nav-hidden', scrollingDown && pastNavbar && !hasFocus);
lastY = y;
}, { passive: true });
////////

// About Section Scroll Hiding
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('in-view', entry.isIntersecting);
  });
}, { threshold: 0.25 });

document.querySelectorAll('.scroll-fade').forEach(el => fadeObserver.observe(el));
// Fade in Once Only Way
// const fadeObserver = new IntersectionObserver((entries, observer) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add('in-view');
//       observer.unobserve(entry.target);   // stop watching, so it never fades back out
//     }
//   });
// }, { threshold: 0.4 });

// document.querySelectorAll('.scroll-fade').forEach(el => fadeObserver.observe(el));