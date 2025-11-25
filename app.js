
// Dados Iniciais
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

// Helpers
const el = id => document.getElementById(id);
const create = tag => document.createElement(tag);

// RODAPÉ - atualiza o ano atual
if (el('year')) el('year').textContent = new Date().getFullYear();

// Grid de simbolos
const symbolsGrid = el('symbols');
const dashSymbols = el('dashSymbols');

if (symbolsGrid) {
  symbols.forEach(s => {
    const card = create('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="title">${s.title}</div>
      <div class="desc">${s.desc.substring(0, 120)}</div>
      <div class="muted">Gravidade: ${s.severity}</div>
      <div class="actions">
        <button class="call">Detalhes</button>
        <button class="map"><img src="./imagens/search.png" alt="buscar"></button>
      </div>
    `;

    const detailsBtn = card.querySelector('.call');
    detailsBtn && detailsBtn.addEventListener('click', () => openModal(s.title, s.desc, `Gravidade: ${s.severity}`));

    const mapBtn = card.querySelector('.map');
    mapBtn && mapBtn.addEventListener('click', () => {
      const q = encodeURIComponent(s.title + ' painel carro');
      window.open('https://www.google.com/search?q=' + q, '_blank');
    });

    symbolsGrid.appendChild(card);
  });
}

if (dashSymbols) {
  symbols.forEach(s => {
    const small = create('div');
    small.className = 'dash-card';
    small.innerHTML = `<div class="label">${s.title}</div><div class="mini">${s.severity}</div>`;
    dashSymbols.appendChild(small);
  });
}

// Lista de oficinas
const workshopGrid = el('workshop-list');
if (workshopGrid) {
  workshops.forEach(w => {
    const card = create('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="title">${w.name}</div>
      <div class="desc">${w.address}</div>
      <div class="muted">Especialidades: ${w.specialties.join(', ')}</div>
      <div style="margin-top:10px;display:flex;gap:8px;">
        <a class="call" href="tel:${w.phone.replace(/\D/g, '')}" style="flex:1;text-decoration:none;padding:10px;border-radius:10px;background:rgba(255,255,255,0.04);text-align:center;color:#fff;">
          <img src="./imagens/call.png" alt="call">
        </a>
        <a class="map" href="https://www.google.com/maps/search/${encodeURIComponent(w.name + ' ' + w.address)}" target="_blank" style="flex:1;text-decoration:none;padding:10px;border-radius:10px;background:linear-gradient(90deg,#c00000,#ff2d2d);text-align:center;color:#fff;"> Ver no mapa </a>
      </div>
    `;
    workshopGrid.appendChild(card);
  });
}

// Modal
const modal = el('modal');
const modalTitle = el('modalTitle');
const modalDesc = el('modalDesc');
const modalExtra = el('modalExtra');

if (el('modalClose')) el('modalClose').addEventListener('click', closeModal);
if (modal) {
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
}

function openModal(title, desc, extra) {
  if (!modal) return;
  if (modalTitle) modalTitle.textContent = title;
  if (modalDesc) modalDesc.textContent = desc;
  if (modalExtra) modalExtra.textContent = extra || '';
  modal.classList.remove('hidden');
}
function closeModal() { if (!modal) return; modal.classList.add('hidden'); }

// Sintomas
const symptoms = [
  { name: 'Motor superaquecendo', desc: 'Verifique o líquido de arrefecimento e aguarde antes de dirigir.' },
  { name: 'Falha no ABS', desc: 'Sistema de freios com problemas. Dirija com cuidado e procure assistência.' },
  { name: 'Bateria fraca', desc: 'Pode deixar o carro sem energia elétrica. Cheque o alternador/bateria.' },
  { name: 'Airbag', desc: 'Problema no sistema de airbags — segurança comprometida.' },
  { name: 'Barulho batendo na frente', desc: 'Pode ser suspensão, pivôs, coxins ou algo solto na dianteira.' },
  { name: 'Motor falhando / perda de força', desc: 'Pode indicar problema na ignição, combustível ou injeção eletrônica.' },
  { name: 'Luz da injeção acesa', desc: 'A ECU detectou falha no sistema. Recomendado diagnóstico com scanner.' },
  { name: 'Carro esquentando / fervendo', desc: 'Verifique o líquido de arrefecimento e pare o veículo para evitar danos.' },
  { name: 'Vibração no volante', desc: 'Pode ser desalinhamento, balanceamento ou folga na suspensão/direção.' },
  { name: 'Freio rangendo', desc: 'Pode indicar pastilhas gastas ou sujeira entre pastilha e disco.' }
];

const symptomsGrid = el('symptoms-grid');
if (symptomsGrid) {
  symptoms.forEach(s => {
    const btn = create('button');
    btn.className = 'symptom-btn';
    btn.textContent = s.name;
    btn.addEventListener('click', () => { openModal('Sintoma Selecionado', s.desc, ''); });
    symptomsGrid.appendChild(btn);
  });
}

// Emergência
const emergencyBtnMobile = el('emergency-btn-mobile');
if (emergencyBtnMobile) {
  emergencyBtnMobile.addEventListener('click', () => {
    openModal(
      'Emergência!',
      'Se você estiver em situação crítica, chame imediatamente o socorro ou leve o veículo para uma oficina segura.',
      'Ligue: 192 / Consulte oficina mais próxima'
    );
  });
}

// Formulario de cadastro
const salvarBtn = el('salvarBtn');
if (salvarBtn) {
  salvarBtn.addEventListener('click', () => {
    const placa = el('placa') ? el('placa').value : '';
    const nome = el('nome') ? el('nome').value : '';
    const telefone = el('telefone') ? el('telefone').value : '';
    const msgEl = el('cadastroMsg');
    // não envia, os dados ficam apenas localmente
    if (!placa || !nome || !telefone) {
      if (msgEl) { msgEl.textContent = 'Preencha todos os campos antes de salvar.'; }
      return;
    }
    if (msgEl) {
      msgEl.textContent = `Dados salvos ${placa} — ${nome} — ${telefone}`;
    }
  });
}


// Mapa de imagem do painel
document.querySelectorAll('area[data-symbol]').forEach(area => {
  area.addEventListener('click', (e) => {
    const id = area.getAttribute('data-symbol');
    const found = symbols.find(s => s.id === id);
    if (found) openModal(found.title, found.desc, `Gravidade: ${found.severity}`);
  });
});

// Carregamento do JSON
fetch('./json/painel.json')
  .then(res => res.json())
  .then(painel => {
    document.querySelectorAll('area[data-symbol]').forEach(area => {
      area.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = area.dataset.symbol;
        const found = painel.find(item => item.id === id);
        if (found) {
          openModal(found.title, found.desc, `Gravidade: ${found.severity}`);
        }
      });
    });
  })
  .catch(err => console.error("Erro ao carregar painel.json", err));

  // botões diagnosticar e ver oficinas

  document.getElementById('diagnoseBtn').addEventListener('click', () => {
    window.location.href = './mecanicos.html';
});

  document.getElementById('heroWorkshops').addEventListener('click', () => {
    window.location.href = './mecanicos.html';
});

// função de rolar do botão Prováveis Causas

document.getElementById('heroDiagnose').addEventListener('click', () => {
  const target = document.getElementById('symptoms');
  target.scrollIntoView({ behavior: 'smooth' });
});



