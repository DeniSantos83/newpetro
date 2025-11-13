// ================== AOS (animações de scroll) ==================
AOS.init({
  duration: 900,            // tempo total da animação (ms)
  easing: 'ease-out-quart', // curva mais suave
  once: true,               // anima só na primeira vez
  offset: 120               // inicia o efeito um pouco antes de aparecer
});

// ================== NAVBAR (muda cor ao rolar) ==================
const navbar = document.querySelector('.navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

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

// ================== BOTÃO "LER MAIS" (cards de texto) ==================
document.querySelectorAll('.read-more').forEach(btn => {
  btn.addEventListener('click', () => {
    const p = btn.previousElementSibling;
    p.classList.toggle('card-text-limit');
    btn.textContent = p.classList.contains('card-text-limit')
      ? 'Ler mais'
      : 'Mostrar menos';
  });
});

// ================== MENU FLUTUANTE (canais) ==================
const toggle = document.getElementById('menuToggle');
const options = document.querySelector('.floating-options');

if (toggle && options) {
  toggle.addEventListener('click', () => {
    options.classList.toggle('show');
  });
}

// ================== PORTFÓLIO – FILTRO DE ÁREAS ==================
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length && portfolioItems.length) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      portfolioItems.forEach(item => {
        const show =
          filter === 'all' || item.classList.contains(filter);
        item.style.display = show ? 'block' : 'none';
      });
    });
  });
}

// ================== PORTFÓLIO – MODAL DE PROJETOS ==================
document.addEventListener("DOMContentLoaded", () => {
  const projetosPorArea = {
    assistencia: [
      {
        titulo: "Fiscalização Búzios 5",
        cliente: "Petrobras",
        img: "img/imgportfolio/buzios.jpg",
        descricao: "Apoio à fiscalização de campo do sistema submarino de Búzios 5."
      },
      {
        titulo: "Projeto Sépia",
        cliente: "Petrobras",
        img: "img/imgportfolio/sepia.jpg",
        descricao: "Suporte técnico ao gerenciamento do projeto Sépia."
      }
    ],
    projetos: [
      {
        titulo: "UO-SEAL Engenharia",
        cliente: "Petrobras",
        img: "img/imgportfolio/uoseal.jpg",
        descricao: "Elaboração de projetos de instalações industriais em Sergipe e Alagoas."
      },
      {
        titulo: "Matriz C&E",
        cliente: "Petrobras",
        img: "img/imgportfolio/matrizcee.jpg",
        descricao: "Revisão das matrizes de causa e efeito em plataformas da Bacia de Campos."
      }
    ],
    gerenciamento: [
      {
        titulo: "RPCC Planejamento",
        cliente: "Petrobras",
        img: "img/imgportfolio/rpcc.jpg",
        descricao: "Planejamento de intervenções de manutenção e acompanhamento de projetos."
      }
    ],
    logistica: [
      {
        titulo: "Gestão de Logística – Transpetro",
        cliente: "Transpetro",
        img: "img/imgportfolio/logistica.jpg",
        descricao: "Suporte à operação e controle dos serviços de transporte de materiais."
      }
    ],
    inspecao: [
      {
        titulo: "Inspeção TEMADRE",
        cliente: "Transpetro",
        img: "img/imgportfolio/padrao.jpg",
        descricao: "Suporte à atividade de inspeção e planejamento do nordeste meridional."
      }
    ],
    administrativos: [
      {
        titulo: "Serviços Administrativos RJ",
        cliente: "Transpetro",
        img: "img/imgportfolio/padrao.jpg",
        descricao: "Prestação de serviços administrativos e mensageria."
      }
    ],
    avaliacao: [
      {
        titulo: "Gestão de Bens Imóveis",
        cliente: "Petrobras",
        img: "img/imgportfolio/cst.jpg",
        descricao: "Avaliação e regularização de bens imóveis em todo território nacional."
      }
    ],
    suporte: [
      {
        titulo: "CEOPTO Operações",
        cliente: "Petrobras",
        img: "img/imgportfolio/padrao.jpg",
        descricao: "Suporte técnico e operacional em sistemas automatizados industriais."
      }
    ]
  };

  const botoes = document.querySelectorAll(".ver-projetos");
  const modalLabel = document.getElementById("modalProjetosLabel");
  const conteudoProjetos = document.getElementById("conteudoProjetos");

  if (!botoes.length || !modalLabel || !conteudoProjetos) return;

  botoes.forEach(botao => {
    botao.addEventListener("click", () => {
      const area = botao.getAttribute("data-area");
      const projetos = projetosPorArea[area] || [];

      conteudoProjetos.innerHTML = projetos.length
        ? projetos.map(p => `
            <div class="projeto-card">
              <div class="projeto-thumb">
                <img src="${p.img}" alt="${p.titulo}" loading="lazy" decoding="async">
              </div>
              <h6 class="fw-bold text-primary mb-1">${p.titulo}</h6>
              <p class="small mb-1 text-muted"><strong>Cliente:</strong> ${p.cliente}</p>
              <p class="small">${p.descricao}</p>
            </div>
          `).join("")
        : "<p class='text-muted'>Nenhum projeto cadastrado nesta área.</p>";

      modalLabel.textContent = botao.previousElementSibling
        ? botao.previousElementSibling.textContent
        : "Projetos";

      const modalEl = document.getElementById("modalProjetos");
      if (!modalEl) return;

      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    });
  });
});

// ================== ANIMAÇÃO AO ROLAR ATÉ #noticias ==================
document.addEventListener("scroll", () => {
  const section = document.querySelector("#noticias");
  if (!section) return; // evita erro nas páginas sem essa seção

  const pos = section.getBoundingClientRect().top;
  if (pos < window.innerHeight - 150) {
    section.classList.add("animate__fadeInUp");
  }
});
