// Ano no rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// Sombra na navbar ao rolar
const nav = document.querySelector('.navbar');
const toggleScrolled = () => {
  if (window.scrollY > 16) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
toggleScrolled();
window.addEventListener('scroll', toggleScrolled);

// ===== CLIENTES: movimento automático + arraste real =====
const marquee = document.querySelector('.clients-marquee');
const track = marquee?.querySelector('.track');

if (marquee && track) {
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let lastX = 0;
  let velocity = 0;
  let raf;

  // movimento automático
  function autoScroll() {
    currentX -= 0.5; // velocidade automática
    if (currentX <= -track.scrollWidth / 2) currentX = 0;
    track.style.transform = `translateX(${currentX}px)`;
    raf = requestAnimationFrame(autoScroll);
  }

  // iniciar auto scroll
  autoScroll();

  // parar o auto scroll
  function stopAuto() {
    cancelAnimationFrame(raf);
  }

  // mouse down
  marquee.addEventListener('mousedown', (e) => {
    isDragging = true;
    stopAuto();
    startX = e.pageX - currentX;
    marquee.style.cursor = 'grabbing';
  });

  // mouse move
  marquee.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const x = e.pageX - startX;
    velocity = x - lastX;
    lastX = x;
    currentX = x;
    track.style.transform = `translateX(${currentX}px)`;
  });

  // mouse up
  marquee.addEventListener('mouseup', () => {
    isDragging = false;
    marquee.style.cursor = 'grab';
    // retoma o movimento automático suavemente
    autoScroll();
  });

  // mouse fora
  marquee.addEventListener('mouseleave', () => {
    if (isDragging) {
      isDragging = false;
      marquee.style.cursor = 'grab';
      autoScroll();
    }
  });

  // toque (mobile)
  marquee.addEventListener('touchstart', (e) => {
    isDragging = true;
    stopAuto();
    startX = e.touches[0].clientX - currentX;
  }, { passive: true });

  marquee.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX - startX;
    currentX = x;
    track.style.transform = `translateX(${currentX}px)`;
  }, { passive: true });

  marquee.addEventListener('touchend', () => {
    isDragging = false;
    autoScroll();
  });
}
document.querySelectorAll('.read-more').forEach(btn => {
  btn.addEventListener('click', () => {
    const p = btn.previousElementSibling;
    p.classList.toggle('card-text-limit');
    btn.textContent = p.classList.contains('card-text-limit') ? 'Ler mais' : 'Mostrar menos';
  });
});
