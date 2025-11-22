// =========================
// DADOS INICIAIS
// =========================
const symbols = [
  { id: 'engine', title: 'Check Engine', severity: 'Grave', desc: 'Pode indicar falha no motor, sensor, injeção ou catalisador. Evite dirigir por longas distâncias.' },
  { id: 'oil', title: 'Pressão do óleo', severity: 'Crítico', desc: 'Baixa pressão de óleo. Pare o veículo imediatamente e verifique o nível/óleo vazando.' },
  { id: 'battery', title: 'Bateria / Alternador', severity: 'Atenção', desc: 'Problemas de carga ou bateria fraca. Pode deixar o carro sem energia elétrica.' },
  { id: 'abs', title: 'ABS', severity: 'Atenção', desc: 'Falha no sistema de freios antibloqueio. Dirija com cuidado e procure assistência.' },
  { id: 'airbag', title: 'Airbag', severity: 'Grave', desc: 'Problema no sistema de airbags — segurança comprometida. Procure uma oficina imediatamente.' },
  { id: 'temp', title: 'Temperatura do motor', severity: 'Crítico', desc: 'Motor superaquecendo. Pare e aguarde, verifique líquido de arrefecimento.' }
];

const workshops = [
  { name: 'Auto Prime Franca', address: 'R. São Paulo, 123 - Centro', phone: '(16) 99999-0001', rating: 4.8, specialties: ['Diagnóstico eletrônico', 'Injeção', 'Transmissão'] },
  { name: 'Oficina Cavallino', address: 'Av. Major Nicácio, 222 - Centro', phone: '(16) 99999-0002', rating: 4.7, specialties: ['Suspensão', 'Freios', 'Climatização'] },
  { name: 'Elite Motors', address: 'R. 7 de Setembro, 45 - Vila Bianchi', phone: '(16) 99999-0003', rating: 4.9, specialties: ['Carros premium', 'Eletrônica', 'Serviço rápido'] }
];


// =========================
// HELPERS
// =========================
const el = id => document.getElementById(id);
const create = tag => document.createElement(tag);


// =========================
// RODAPÉ
// =========================
el('year').textContent = new Date().getFullYear();


// =========================
// GRID DE SÍMBOLOS
// =========================
const symbolsGrid = el('symbols');
const dashSymbols = el('dashSymbols');

symbols.forEach(s => {

  // Card principal
  const card = create('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="title">${s.title}</div>
    <div class="desc">${s.desc.substring(0,120)}</div>
    <div class="muted">Gravidade: ${s.severity}</div>

    <div class="actions">
      <button class="call">Detalhes</button>
      <button class="map">Pesquisar</button>
    </div>
  `;

  // Modal - detalhes
  const detailsBtn = card.querySelector('.call');
  detailsBtn.addEventListener('click', () => 
    openModal(s.title, s.desc, `Gravidade: ${s.severity}`)
  );

  // Pesquisar no Google
  card.querySelector('.map').addEventListener('click', () => {
    const q = encodeURIComponent(s.title + ' painel carro');
    window.open('https://www.google.com/search?q=' + q, '_blank');
  });

  symbolsGrid.appendChild(card);

  // Mini-card (dashboard)
  const small = create('div');
  small.className = 'dash-card';
  small.innerHTML = `
    <div class="label">${s.title}</div>
    <div class="mini">${s.severity}</div>
  `;

  dashSymbols.appendChild(small);
});


// =========================
// LISTA DE OFICINAS
// =========================
const workshopGrid = el('workshop-list');

workshops.forEach(w => {
  const card = create('div');
  card.className = 'card';

  card.innerHTML = `
    <div class="title">${w.name}</div>
    <div class="desc">${w.address}</div>
    <div class="muted">Especialidades: ${w.specialties.join(', ')}</div>

    <div style="margin-top:10px;display:flex;gap:8px;">
      <a 
        class="call"
        href="tel:${w.phone.replace(/\D/g,'')}"
        style="flex:1;text-decoration:none;padding:10px;border-radius:10px;background:rgba(255,255,255,0.04);text-align:center;color:#fff;">
        Ligar
      </a>

      <a
        class="map"
        href="https://www.google.com/maps/search/${encodeURIComponent(w.name + ' ' + w.address)}"
        target="_blank"
        style="flex:1;text-decoration:none;padding:10px;border-radius:10px;background:linear-gradient(90deg,#c00000,#ff2d2d);text-align:center;color:#fff;">
        Ver no mapa
      </a>
    </div>
  `;

  workshopGrid.appendChild(card);
});


// =========================
// MODAL
// =========================
const modal = el('modal');
const modalTitle = el('modalTitle');
const modalDesc  = el('modalDesc');
const modalExtra = el('modalExtra');

el('modalClose').addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

function openModal(title, desc, extra) {
  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  modalExtra.textContent = extra;
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
}


// =========================
// NAVEGAÇÃO SUAVE
// =========================
document.querySelectorAll('.btn-main, .btn-outline, #heroWorkshops')
  .forEach(btn => {
    btn.addEventListener('click', (e) => {

      const idMap = {
        heroDiagnose: 'diagnose',
        diagnoseBtn: 'diagnose',
        heroWorkshops: 'workshops'
      };

      const mapId = idMap[e.target.id] || null;
      if (mapId) {
        document.getElementById(mapId).scrollIntoView({
          behavior:'smooth',
          block:'start'
        });
      }
    });
  });


// =========================
// BOTÃO SOBRE
// =========================
el('aboutBtn').addEventListener('click', () => {
  alert('SOS Motors — Demo. Adicione informações reais na área administrativa.');
});
// =========================
// SINTOMAS - QUICK SELECT
// =========================
const symptoms = [
  { name: 'Motor superaquecendo', desc: 'Verifique o líquido de arrefecimento e aguarde antes de dirigir.' },
  { name: 'Falha no ABS', desc: 'Sistema de freios com problemas. Dirija com cuidado e procure assistência.' },
  { name: 'Bateria fraca', desc: 'Pode deixar o carro sem energia elétrica. Cheque o alternador/bateria.' },
  { name: 'Airbag', desc: 'Problema no sistema de airbags — segurança comprometida.' }
];

const symptomsGrid = el('symptoms-grid');

symptoms.forEach(s => {
  const btn = create('button');
  btn.className = 'symptom-btn';
  btn.textContent = s.name;

  btn.addEventListener('click', () => {
    openModal('Sintoma Selecionado', s.desc, '');
  });

  symptomsGrid.appendChild(btn);
});


// =========================
// EMERGÊNCIA
// =========================
const emergencyBtn = el('emergency-btn');

emergencyBtn.addEventListener('click', () => {
  openModal(
    'Emergência!',
    'Se você estiver em situação crítica, chame imediatamente o socorro ou leve o veículo para uma oficina segura.',
    'Ligue: 192 / Consulte oficina mais próxima'
  );
});


// =========================
// AVALIAÇÕES / REVIEWS
// =========================
const reviews = [
  { text: 'Excelente atendimento e rapidez no serviço!', author: 'João P.' },
  { text: 'Profissionais competentes, solucionaram meu problema em tempo recorde.', author: 'Maria E.' },
  { text: 'Recomendo a todos que precisam de diagnósticos confiáveis.', author: 'Carlos T.' }
];

const reviewsGrid = el('reviews-grid');

reviews.forEach(r => {
  const card = create('div');
  card.className = 'review-card';
  card.innerHTML = `
    <div class="review-text">${r.text}</div>
    <div class="review-author">— ${r.author}</div>
  `;
  reviewsGrid.appendChild(card);
});
