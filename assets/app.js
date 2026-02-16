const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled])';

function trapFocus(container, event) {
  const nodes = [...container.querySelectorAll(focusableSelector)];
  if (!nodes.length || event.key !== 'Tab') return;
  const first = nodes[0];
  const last = nodes[nodes.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

const drawer = document.querySelector('[data-drawer]');
const drawerToggle = document.querySelector('[data-drawer-open]');
const drawerClose = document.querySelector('[data-drawer-close]');
const backdrop = document.querySelector('[data-backdrop]');

const openDrawer = () => {
  drawer?.classList.add('open');
  backdrop?.classList.add('open');
  document.body.classList.add('no-scroll');
  drawer?.querySelector('a,button')?.focus();
};
const closeDrawer = () => {
  drawer?.classList.remove('open');
  backdrop?.classList.remove('open');
  document.body.classList.remove('no-scroll');
  drawerToggle?.focus();
};

drawerToggle?.addEventListener('click', openDrawer);
drawerClose?.addEventListener('click', closeDrawer);
backdrop?.addEventListener('click', () => {
  if (drawer?.classList.contains('open')) closeDrawer();
  if (modalOverlay?.classList.contains('open')) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeDrawer();
    closeModal();
  }
  if (drawer?.classList.contains('open')) trapFocus(drawer, e);
  if (modalOverlay?.classList.contains('open')) trapFocus(modal, e);
});

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  const btn = item.querySelector('.faq-btn');
  btn?.addEventListener('click', () => {
    faqItems.forEach((f) => f.classList.remove('active'));
    item.classList.add('active');
  });
});

const modalOverlay = document.querySelector('[data-modal-overlay]');
const modal = document.querySelector('[data-modal]');
const modalOpen = document.querySelectorAll('[data-open-privacy]');
const modalClose = document.querySelectorAll('[data-close-privacy]');

const openModal = () => {
  modalOverlay?.classList.add('open');
  document.body.classList.add('no-scroll');
  modal?.querySelector('button')?.focus();
};
const closeModal = () => {
  modalOverlay?.classList.remove('open');
  document.body.classList.remove('no-scroll');
};
modalOpen.forEach((btn) => btn.addEventListener('click', (e) => {
  e.preventDefault();
  openModal();
}));
modalClose.forEach((btn) => btn.addEventListener('click', closeModal));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.2 });

document.querySelectorAll('.section').forEach((section) => observer.observe(section));
