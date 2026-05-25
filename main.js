
const STORAGE_KEY = "dragon-ascendente-save-v1";

const characterCatalog = [
  {
    id: "brasa-draco",
    name: "Brasa Draco",
    rarity: "legendary",
    role: "Atacante de fogo",
    icon: "🐉",
    stats: { atk: 9, def: 4, spd: 6 },
    ability: "Golpe Ígneo",
    bonus: "+20% de dano em golpes seguidos.",
  },
  {
    id: "luna-escudo",
    name: "Luna Escudo",
    rarity: "epic",
    role: "Guardiã lunar",
    icon: "🌙",
    stats: { atk: 5, def: 9, spd: 5 },
    ability: "Barreira Astral",
    bonus: "Absorve parte do próximo ataque.",
  },
  {
    id: "raio-fino",
    name: "Raio Fino",
    rarity: "rare",
    role: "Assassino veloz",
    icon: "⚡",
    stats: { atk: 7, def: 4, spd: 9 },
    ability: "Corrida de Tempestade",
    bonus: "Tem chance de agir duas vezes.",
  },
  {
    id: "terra-forja",
    name: "Terra-Forja",
    rarity: "epic",
    role: "Tanque bruto",
    icon: "🪨",
    stats: { atk: 6, def: 10, spd: 3 },
    ability: "Muralha Sísmica",
    bonus: "Concede armadura extra quando abaixo de 50% HP.",
  },
  {
    id: "vento-nomade",
    name: "Vento Nômade",
    rarity: "rare",
    role: "Duelista aéreo",
    icon: "🌪️",
    stats: { atk: 6, def: 5, spd: 8 },
    ability: "Corte de Corrente",
    bonus: "Aumenta esquiva em batalhas longas.",
  },
  {
    id: "mar-profundo",
    name: "Mar Profundo",
    rarity: "epic",
    role: "Controlador",
    icon: "🌊",
    stats: { atk: 7, def: 7, spd: 5 },
    ability: "Maré Congelante",
    bonus: "Reduz a força do inimigo por 1 turno.",
  },
  {
    id: "cristalina",
    name: "Cristalina",
    rarity: "legendary",
    role: "Curandeira",
    icon: "💎",
    stats: { atk: 5, def: 8, spd: 6 },
    ability: "Restauração Prismática",
    bonus: "Recupera HP após vitórias.",
  },
  {
    id: "sombrio-garra",
    name: "Sombrio Garra",
    rarity: "rare",
    role: "Caçador de sombras",
    icon: "🦂",
    stats: { atk: 8, def: 4, spd: 8 },
    ability: "Ataque da Penumbra",
    bonus: "Crítico forte contra monstros.",
  },
  {
    id: "sol-impetuoso",
    name: "Sol Impetuoso",
    rarity: "legendary",
    role: "Berserker",
    icon: "☀️",
    stats: { atk: 10, def: 5, spd: 6 },
    ability: "Explosão Solar",
    bonus: "Causa dano extra quando vence o primeiro turno.",
  },
  {
    id: "fera-azul",
    name: "Fera Azul",
    rarity: "common",
    role: "Apoiador",
    icon: "🦊",
    stats: { atk: 5, def: 6, spd: 7 },
    ability: "Pulso de Aliado",
    bonus: "Ganha moedas extras em caixas.",
  },
];

const campaignPhases = [
  {
    id: "fase-1",
    title: "Fase 1 - Portões da Cidade",
    enemy: "Sentinela Corrompido",
    hp: 24,
    rewardCoins: 90,
    rewardGems: 4,
    description: "Uma patrulha corrompida bloqueia a entrada da cidade. Derrube o sentinela e libere o acesso.",
  },
  {
    id: "fase-2",
    title: "Fase 2 - Mercado em Ruínas",
    enemy: "Bruto de Cinzas",
    hp: 30,
    rewardCoins: 120,
    rewardGems: 6,
    description: "O monstro espalhou caos pelo centro comercial. Use sua melhor combinação de golpes.",
  },
  {
    id: "fase-3",
    title: "Fase 3 - Núcleo do Monstro",
    enemy: "Monstro da Ruptura",
    hp: 38,
    rewardCoins: 180,
    rewardGems: 10,
    description: "A batalha final para recuperar o mundo e restaurar a energia da cidade.",
  },
];

const storyChapters = [
  {
    title: "Capítulo 1 - O Rasgo no Céu",
    text: "Um monstro antigo abriu uma fenda acima da cidade e liberou sombras por todas as ruas. Você entra na linha de frente para proteger os sobreviventes.",
  },
  {
    title: "Capítulo 2 - O Coração da Cidade",
    text: "As paredes caíram, os guardiões foram dispersos e só restou lutar para salvar os bairros e recuperar a esperança.",
  },
  {
    title: "Capítulo 3 - Restaurar o Mundo",
    text: "Ao derrotar o monstro principal, as energias perdidas voltam para o mundo e a cidade pode ser reconstruída.",
  },
];

const boxCatalog = [
  {
    id: "caixa-bronze",
    name: "Caixa Bronze",
    costCoins: 100,
    description: "Pode vir carta de personagem, fragmentos, moedas ou uma skin simples.",
  },
  {
    id: "caixa-lenda",
    name: "Caixa Lenda",
    costCoins: 220,
    description: "Tem chance maior de vir cartas raras, skins épicas e diamantes.",
  },
];

const app = document.querySelector("#app");
const orientationGate = document.querySelector("#orientationGate");
const toastHost = document.querySelector("#toastHost");

const defaultSave = {
  account: null,
  coins: 320,
  gems: 24,
  boxesOpened: 0,
  activeTab: "colecao",
  screen: "landing",
  ownedCharacters: ["brasa-draco", "fera-azul", "luna-escudo"],
  selectedCharacter: "brasa-draco",
  characterUpgrades: {
    "brasa-draco": { level: 1, shards: 0, skin: "Padrão" },
    "fera-azul": { level: 1, shards: 0, skin: "Padrão" },
    "luna-escudo": { level: 1, shards: 0, skin: "Padrão" },
  },
  tutorialDone: false,
  campaignCleared: 0,
  storyUnlocked: false,
  battleProgress: {
    tutorial: { done: false, hp: 18 },
    campaign: [false, false, false],
    story: [false, false, false],
  },
};

let save = loadSave();
let tutorialState = {
  enemyHp: 18,
  playerHp: 24,
  log: [],
  enemyTurnQueued: false,
  phaseIndex: 0,
};

function loadSave() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(defaultSave);
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(defaultSave),
      ...parsed,
      characterUpgrades: {
        ...structuredClone(defaultSave.characterUpgrades),
        ...(parsed.characterUpgrades ?? {}),
      },
      battleProgress: {
        ...structuredClone(defaultSave.battleProgress),
        ...(parsed.battleProgress ?? {}),
        campaign: parsed.battleProgress?.campaign ?? structuredClone(defaultSave.battleProgress.campaign),
        story: parsed.battleProgress?.story ?? structuredClone(defaultSave.battleProgress.story),
      },
    };
  } catch {
    return structuredClone(defaultSave);
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(save));
}

function getCharacter(id) {
  return characterCatalog.find((character) => character.id === id) ?? characterCatalog[0];
}

function isPortrait() {
  return window.innerHeight >= window.innerWidth;
}

function syncOrientationGate() {
  const shouldBlock = save.screen !== "landing" && !isPortrait();
  orientationGate.classList.toggle("is-hidden", !shouldBlock);
}

function toast(title, message) {
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<strong>${title}</strong><p>${message}</p>`;
  toastHost.appendChild(el);
  window.setTimeout(() => {
    el.remove();
  }, 2400);
}

function setScreen(screen) {
  save.screen = screen;
  persist();
  render();
  syncOrientationGate();
}

function setTab(tab) {
  save.activeTab = tab;
  persist();
  render();
}

function updateCharacterCharacter(id, updater) {
  save.characterUpgrades[id] = {
    level: 1,
    shards: 0,
    skin: "Padrão",
    ...(save.characterUpgrades[id] ?? {}),
    ...updater(save.characterUpgrades[id] ?? { level: 1, shards: 0, skin: "Padrão" }),
  };
  persist();
}

function awardCharacter(id, shardBonus = 1) {
  const ownedBefore = save.ownedCharacters.includes(id);
  if (!ownedBefore) save.ownedCharacters.push(id);
  updateCharacterCharacter(id, (current) => ({
    level: current.level ?? 1,
    shards: (current.shards ?? 0) + shardBonus,
    skin: current.skin ?? "Padrão",
  }));
  persist();
}

function openBox(boxId) {
  const box = boxCatalog.find((item) => item.id === boxId);
  if (!box) return;
  if (save.coins < box.costCoins) {
    toast("Moedas insuficientes", "Faça batalhas ou abra recompensas para conseguir mais moedas.");
    return;
  }
  save.coins -= box.costCoins;
  save.boxesOpened += 1;
  const roll = Math.random();
  const loot = roll < 0.45 ? "shards" : roll < 0.7 ? "coins" : roll < 0.9 ? "gems" : "skin";
  if (loot === "shards") {
    const pool = characterCatalog.map((character) => character.id);
    const target = pool[Math.floor(Math.random() * pool.length)];
    const pieces = Math.random() < 0.55 ? 2 : 1;
    awardCharacter(target, pieces);
    toast("Carta encontrada", `${getCharacter(target).name} recebeu ${pieces} carta(s) nova(s).`);
  } else if (loot === "coins") {
    const amount = 80 + Math.floor(Math.random() * 120);
    save.coins += amount;
    toast("Moedas extras", `Você encontrou ${amount} moedas dentro da caixa.`);
  } else if (loot === "gems") {
    const amount = 4 + Math.floor(Math.random() * 6);
    save.gems += amount;
    toast("Diamantes", `A caixa trouxe ${amount} diamantes.`);
  } else {
    const target = save.ownedCharacters[Math.floor(Math.random() * save.ownedCharacters.length)];
    updateCharacterCharacter(target, (current) => ({
      level: current.level,
      shards: current.shards,
      skin: current.skin === "Padrão" ? "Crimson" : "Padrão Alternativo",
    }));
    toast("Skin liberada", `Uma skin alternativa foi liberada para ${getCharacter(target).name}.`);
  }
  persist();
  render();
}

function upgradeCharacter(id) {
  const upgrades = save.characterUpgrades[id] ?? { level: 1, shards: 0, skin: "Padrão" };
  const cost = upgrades.level * 3;
  if (save.gems < cost) {
    toast("Diamantes insuficientes", "Junte mais diamantes antes de upar o personagem.");
    return;
  }
  if ((upgrades.shards ?? 0) < upgrades.level) {
    toast("Faltam cartas", "Abra caixas ou ganhe recompensas para juntar mais cartas desse personagem.");
    return;
  }
  save.gems -= cost;
  updatesCharacterLevel(id);
  toast("Personagem evoluído", `${getCharacter(id).name} subiu para o nível ${save.characterUpgrades[id].level}.`);
  persist();
  render();
}

function updatesCharacterLevel(id) {
  const current = save.characterUpgrades[id] ?? { level: 1, shards: 0, skin: "Padrão" };
  save.characterUpgrades[id] = {
    ...current,
    level: current.level + 1,
    shards: current.shards - current.level,
  };
}

function selectCharacter(id) {
  save.selectedCharacter = id;
  if (!save.ownedCharacters.includes(id)) {
    awardCharacter(id, 1);
  }
  persist();
  render();
}

function startTutorialBattle() {
  tutorialState = {
    enemyHp: 18,
    playerHp: 24,
    log: [
      "Treinamento iniciado. Use Ataque, Defesa e Agilidade para derrubar o boneco inimigo.",
      "Dica: Agilidade pode evitar o próximo golpe e acelerar seu turno.",
    ],
    enemyTurnQueued: false,
    phaseIndex: 0,
  };
  setScreen("tutorial");
}

function tutorialAction(action) {
  if (save.screen !== "tutorial") return;
  const selected = getCharacter(save.selectedCharacter);
  const stats = selected.stats;
  if (tutorialState.enemyHp <= 0 || tutorialState.playerHp <= 0) return;
  let playerEffect = 0;
  let enemyDamage = 3 + Math.floor(Math.random() * 3);
  if (action === "attack") {
    playerEffect = stats.atk + Math.floor(Math.random() * 3);
    tutorialState.enemyHp -= playerEffect;
    tutorialState.log.unshift(`${selected.name} usou ${selected.ability} e causou ${playerEffect} de dano.`);
  } else if (action === "defend") {
    enemyDamage = Math.max(0, enemyDamage - (stats.def + 2));
    tutorialState.playerHp = Math.min(24, tutorialState.playerHp + 3);
    tutorialState.log.unshift(`${selected.name} levantou defesa e recuperou energia.`);
  } else if (action === "agility") {
    const dodge = Math.min(0.7, 0.22 + stats.spd / 20);
    if (Math.random() < dodge) {
      enemyDamage = 0;
      tutorialState.log.unshift(`${selected.name} desviou do contra-ataque.`);
    } else {
      tutorialState.log.unshift(`${selected.name} tentou esquivar, mas precisou recuar.`);
      enemyDamage = Math.max(1, enemyDamage - 1);
    }
    tutorialState.enemyHp -= Math.max(2, Math.floor(stats.spd * 0.75));
  }
  if (tutorialState.enemyHp > 0) {
    tutorialState.playerHp -= Math.max(0, enemyDamage);
    tutorialState.log.unshift(`O boneco reagiu e causou ${Math.max(0, enemyDamage)} de dano.`);
  }
  if (tutorialState.enemyHp <= 0) {
    tutorialState.enemyHp = 0;
    tutorialState.log.unshift("Treino concluído. Você venceu a batalha inicial.");
    save.battleProgress.tutorial.done = true;
    save.tutorialDone = true;
    save.coins += 120;
    save.gems += 8;
    save.storyUnlocked = true;
    persist();
    setScreen("completion");
    toast("Conclusão", "Você desbloqueou o hub do jogo, a coleção e os modos extras.");
    return;
  }
  if (tutorialState.playerHp <= 0) {
    tutorialState.playerHp = 1;
    tutorialState.log.unshift("Você foi derrubado, mas o treino continua. Tente outra sequência.");
  }
  persist();
  render();
}

function handleSignupSubmit(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = String(form.get("name") || "").trim();
  const username = String(form.get("username") || "").trim();
  if (!name || !username) {
    toast("Campos obrigatórios", "Preencha o nome e o usuário para continuar.");
    return;
  }
  save.account = { name, username };
  save.screen = "tutorial";
  persist();
  startTutorialBattle();
}

function rewardForMode(mode, index) {
  if (mode === "campaign") {
    const phase = campaignPhases[index];
    save.coins += phase.rewardCoins;
    save.gems += phase.rewardGems;
    save.battleProgress.campaign[index] = true;
    save.campaignCleared = save.battleProgress.campaign.filter(Boolean).length;
    if (save.campaignCleared >= 3) save.storyUnlocked = true;
  }
  if (mode === "story") {
    save.coins += 60 + index * 15;
    save.gems += 4 + index * 2;
    save.battleProgress.story[index] = true;
  }
  persist();
}

function startModeBattle(mode, index) {
  const baseHp = mode === "campaign" ? campaignPhases[index].hp : 20 + index * 8;
  const playerDamage = 6 + getCharacter(save.selectedCharacter).stats.atk + Math.floor(Math.random() * 4);
  const enemyDamage = 4 + index * 2 + Math.floor(Math.random() * 4);
  const victory = playerDamage + Math.floor(Math.random() * 6) >= baseHp;
  if (victory) {
    rewardForMode(mode, index);
    const label = mode === "campaign" ? campaignPhases[index].title : storyChapters[index].title;
    toast("Vitória", `${label} concluído. Você ganhou recompensas.`);
    render();
    return true;
  }
  save.coins = Math.max(0, save.coins + 20 - enemyDamage);
  persist();
  toast("Quase", "Você perdeu o teste rápido, mas recebeu recompensas de participação.");
  render();
  return false;
}

function renderLanding() {
  return `
    <section class="landing screen">
      <div class="panel landing-card">
        <div class="hero-copy">
          <span class="eyebrow">Batalha, cartas e história</span>
          <h1 class="hero-title">Dragão <span>Ascendente</span></h1>
          <p class="hero-text">
            Um jogo mobile em orientação vertical com criação de conta, batalha tutorial,
            coleção de personagens, caixas de recompensa, campanha em 3 fases e um modo história
            sobre um monstro que invadiu a cidade.
          </p>
          <div class="hero-actions">
            <button class="button button-primary" id="startGame">Jogar</button>
            <button class="button button-secondary" id="restoreSave">Continuar progresso</button>
          </div>
          <div class="hero-stats">
            <div class="stat">
              <strong>10</strong>
              <span>Personagens com habilidades diferentes</span>
            </div>
            <div class="stat">
              <strong>3</strong>
              <span>Fases da campanha inicial</span>
            </div>
            <div class="stat">
              <strong>1</strong>
              <span>Modo história com o monstro da cidade</span>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="dragon-stage">
            ${dragonIllustration()}
          </div>
        </div>
      </div>
    </section>
  `;
}

function dragonIllustration() {
  return `
    <svg viewBox="0 0 520 520" role="img" aria-label="Desenho de um dragão">
      <defs>
        <linearGradient id="dragonBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffb760" />
          <stop offset="100%" stop-color="#ff6a3d" />
        </linearGradient>
        <linearGradient id="dragonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#7ae7ff" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0.2" />
        </linearGradient>
      </defs>
      <ellipse cx="262" cy="404" rx="138" ry="28" fill="rgba(0,0,0,0.2)" />
      <path
        d="M258 80c56 0 98 40 112 91 10 34 1 73-17 102 14 14 27 38 30 62 6 49-31 98-83 118-24 9-48 11-72 6-28 18-63 26-99 21-31-4-56-18-74-40-20-25-25-62-10-91 16-31 47-47 81-51-20-18-37-44-39-76-3-42 16-79 48-102 34-26 72-40 123-40Z"
        fill="url(#dragonBody)"
        opacity="0.96"
      />
      <path
        d="M304 136c30-20 68-22 93-13-11 15-24 27-40 36 11 15 15 29 14 44-17-10-34-17-52-20"
        fill="url(#dragonGlow)"
      />
      <path
        d="M161 134c-24-17-50-21-78-15 10 15 23 26 39 34-9 12-13 26-12 41 16-8 30-13 48-16"
        fill="url(#dragonGlow)"
        opacity="0.7"
      />
      <circle cx="315" cy="209" r="10" fill="#0d1529" />
      <circle cx="316" cy="206" r="4" fill="#ffffff" />
      <path d="M243 244c23 15 52 18 79 8" stroke="#7d2f1f" stroke-width="8" stroke-linecap="round" fill="none" />
      <path d="M227 280c20 20 45 28 73 22" stroke="#802e2e" stroke-width="10" stroke-linecap="round" fill="none" />
      <path d="M191 233c-20 7-37 20-49 40" stroke="#ffd17f" stroke-width="12" stroke-linecap="round" fill="none" />
      <path d="M351 261c23 0 46 8 62 21" stroke="#ffd17f" stroke-width="12" stroke-linecap="round" fill="none" />
      <path d="M259 75v-28" stroke="#ffd17f" stroke-width="12" stroke-linecap="round" />
      <path d="M285 84l16-22" stroke="#ffd17f" stroke-width="12" stroke-linecap="round" />
      <path d="M233 84l-16-22" stroke="#ffd17f" stroke-width="12" stroke-linecap="round" />
    </svg>
  `;
}

function renderSignup() {
  const account = save.account ?? { name: "", username: "" };
  return `
    <section class="screen">
      <div class="content-grid">
        <aside class="sidebar panel">
          <div class="profile-head">
            <div class="avatar">D</div>
            <div>
              <h2>Criar conta</h2>
              <p>Entre no mundo de Dragão Ascendente</p>
            </div>
          </div>
          <p class="muted">
            Você vai precisar criar o nome da pessoa e o usuário antes da primeira batalha.
          </p>
        </aside>
        <section class="main-panel panel">
          <div class="main-header">
            <div>
              <h2>Cadastro do jogador</h2>
              <p>Preencha seus dados para liberar o treino inicial e salvar seu progresso.</p>
            </div>
          </div>
          <form class="form-grid" id="signupForm">
            <label class="field-label">
              Nome da pessoa
              <input name="name" placeholder="Ex.: Ana Souza" value="${escapeHtml(account.name)}" required />
            </label>
            <label class="field-label">
              Usuário
              <input name="username" placeholder="Ex.: ana_dragao" value="${escapeHtml(account.username)}" required />
            </label>
            <div class="row-actions">
              <button class="button button-primary" type="submit">Entrar no treino</button>
              <button class="button button-secondary" type="button" id="backHome">Voltar</button>
            </div>
          </form>
        </section>
      </div>
    </section>
  `;
}

function renderTutorial() {
  const selected = getCharacter(save.selectedCharacter);
  const hpPct = Math.max(0, Math.min(100, (tutorialState.playerHp / 24) * 100));
  const enemyPct = Math.max(0, Math.min(100, (tutorialState.enemyHp / 18) * 100));
  return `
    <se
 renderTutorial() {
  const selected = getCharacter(save.selectedCharacter);
  const hpPct = Math.max(0, Math.min(100, (tutorialState.playerHp / 24) * 100));
  const enemyPct = Math.max(0, Math.min(100, (tutorialState.enemyHp / 18) * 100));
  return `
    <section class="screen">
      <div class="battle-layout">
        <div class="battle-card battle-stage panel">
          <div class="main-header">
            <div>
              <h2>Batalha teste</h2>
              <p>Aprenda ataque, defesa e agilidade antes de liberar o jogo completo.</p>
            </div>
            <div class="chips">
              <span class="chip">Personagem: ${escapeHtml(selected.name)}</span>
              <span class="chip">Habilidade: ${escapeHtml(selected.ability)}</span>
            </div>
          </div>
          <div class="battle-arena">
            <div class="arena-row">
              <div class="combatant">
                <div class="combatant-head">
                  <strong>${escapeHtml(selected.name)}</strong>
                  <span>${tutorialState.playerHp}/24 HP</span>
                </div>
                <div class="hp-bar"><div class="hp-fill" style="width:${hpPct}%"></div></div>
                <div class="battle-avatar">${escapeHtml(selected.icon)}</div>
              </div>
              <div class="combatant enemy">
                <div class="combatant-head">
                  <strong>Boneco de treino</strong>
                  <span>${tutorialState.enemyHp}/18 HP</span>
                </div>
                <div class="hp-bar"><div class="hp-fill enemy" style="width:${enemyPct}%"></div></div>
                <div class="battle-avatar">🎯</div>
              </div>
            </div>
          </div>
          <div class="battle-controls">
            <div class="hint-box">
              Escolha uma ação. Ataque causa dano, Defesa reduz o contra-ataque, e Agilidade tenta esquivar.
            </div>
            <div class="battle-actions">
              <button class="small-button is-primary" data-action="attack">Ataque</button>
              <button class="small-button" data-action="defend">Defesa</button>
              <button class="small-button" data-action="agility">Agilidade</button>
              <button class="small-button" id="skipTutorial">Pular treino</button>
            </div>
          </div>
        </div>
        <aside class="sidebar panel">
          <div class="section-title">
            <h3>Diário de treino</h3>
            <span class="muted">Etapa inicial</span>
          </div>
          <div class="battle-log">
            ${
              tutorialState.log.length
                ? tutorialState.log.map((entry) => `<p>${escapeHtml(entry)}</p>`).join("")
                : "<p>Prepare-se para atacar o boneco e aprender o ritmo da batalha.</p>"
            }
          </div>
          <div class="section-card" style="margin-top:16px">
            <h3>Recompensas do treino</h3>
            <p class="muted">Ao concluir, você recebe moedas, diamantes e libera o hub do jogo.</p>
          </div>
        </aside>
      </div>
    </section>
  `;
}

function renderCompletion() {
  const account = save.account ?? { name: "Jogador", username: "sem-usuario" };
  const selected = getCharacter(save.selectedCharacter);
  return `
    <section class="screen">
      <div class="completion-grid">
        <div class="completion-card">
          <span class="eyebrow">Concluído</span>
          <h2>${escapeHtml(account.name)} entrou no mundo</h2>
          <p class="hero-text">
            Usuário: <strong>@${escapeHtml(account.username)}</strong><br />
            Você já concluiu a batalha teste e liberou os personagens, caixas, campanha e história.
          </p>
          <div class="resource-grid">
            <div class="resource">
              <strong>${save.coins}</strong>
              <span>Moedas</span>
            </div>
            <div class="resource">
              <strong>${save.gems}</strong>
              <span>Diamantes</span>
            </div>
            <div class="resource">
              <strong>${save.ownedCharacters.length}</strong>
              <span>Personagens</span>
            </div>
          </div>
          <div class="row-actions">
            <button class="button button-primary" id="goHub">Abrir hub</button>
            <button class="button button-secondary" id="replayTutorial">Rejogar treino</button>
          </div>
        </div>
        <div class="completion-card">
          <div class="section-title">
            <h3>Personagem inicial</h3>
            <span class="muted">Selecionado: ${escapeHtml(selected.name)}</span>
          </div>
          <div class="character-card is-selected">
            <div class="character-top">
              <div>
                <span class="character-tag rarity-${selected.rarity}">${selected.rarity}</span>
                <h4 style="margin:12px 0 4px">${escapeHtml(selected.name)}</h4>
                <p class="muted">${escapeHtml(selected.role)}</p>
              </div>
              <div style="font-size:2rem">${escapeHtml(selected.icon)}</div>
            </div>
            <ul class="ability-list">
              <li><strong>Habilidade:</strong> ${escapeHtml(selected.ability)}</li>
              <li><strong>Bônus:</strong> ${escapeHtml(selected.bonus)}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderHub() {
  const account = save.account ?? { name: "Jogador", username: "sem-usuario" };
  const selected = getCharacter(save.selectedCharacter);
  const tab = save.activeTab ?? "colecao";
  return `
    <section class="screen">
      <div class="content-grid">
        <aside class="sidebar panel">
          <div class="profile-head">
            <div class="avatar">${escapeHtml((account.name || "J").slice(0, 1).toUpperCase())}</div>
            <div>
              <h2>${escapeHtml(account.name)}</h2>
              <p>@${escapeHtml(account.username)}</p>
            </div>
          </div>
          <div class="resource-grid">
            <div class="resource">
              <strong>${save.coins}</strong>
              <span>Moedas</span>
            </div>
            <div class="resource">
              <strong>${save.gems}</strong>
              <span>Diamantes</span>
            </div>
            <div class="resource">
              <strong>${save.boxesOpened}</strong>
              <span>Caixas</span>
            </div>
          </div>
          <div class="section-card">
            <strong>Selecionado</strong>
            <p class="muted">${escapeHtml(selected.name)} - nível ${save.characterUpgrades[selected.id]?.level ?? 1}</p>
          </div>
          <div class="nav-list">
            <button class="nav-button ${tab === "colecao" ? "is-active" : ""}" data-tab="colecao">Coleção</button>
            <button class="nav-button ${tab === "caixas" ? "is-active" : ""}" data-tab="caixas">Caixas</button>
            <button class="nav-button ${tab === "batalha" ? "is-active" : ""}" data-tab="batalha">Batalha</button>
            <button class="nav-button ${tab === "campanha" ? "is-active" : ""}" data-tab="campanha">Campanha</button>
            <button class="nav-button ${tab === "historia" ? "is-active" : ""}" data-tab="historia">Modo história</button>
          </div>
        </aside>
        <section class="main-panel panel">
          <div class="main-header">
            <div>
              <h2>Hub principal</h2>
              <p>Monte sua equipe, abra caixas, melhore personagens e avance pelas batalhas.</p>
            </div>
            <div class="chips">
              <span class="chip">Conta salva</span>
              <span class="chip">Treino concluído</span>
              <span class="chip">${save.storyUnlocked ? "História liberada" : "História bloqueada"}</span>
            </div>
          </div>
          ${renderTabContent(tab)}
        </section>
      </div>
    </section>
  `;
}

function renderTabContent(tab) {
  if (tab === "colecao") return renderCollectionTab();
  if (tab === "caixas") return renderBoxTab();
  if (tab === "batalha") return renderBattleTab();
  if (tab === "campanha") return renderCampaignTab();
  if (tab === "historia") return renderStoryTab();
  return renderCollectionTab();
}

function renderCollectionTab() {
  return `
    <div class="section-stack">
      <section class="section-card">
        <div class="section-title">
          <h3>Seus personagens</h3>
          <span class="muted">10 disponíveis para coleção e evolução</span>
        </div>
        <div class="grid-cards">
          ${characterCatalog
            .map((character) => {
              const owned = save.ownedCharacters.includes(character.id);
              const upgrades = save.characterUpgrades[character.id] ?? { level: 1, shards: 0, skin: "Padrão" };
              const selected = save.selectedCharacter === character.id;
              return `
                <article class="character-card ${selected ? "is-selected" : ""}">
                  <div class="character-top">
                    <div>
                      <span class="character-tag rarity-${character.rarity}">${character.rarity}</span>
                      <h4>${escapeHtml(character.name)}</h4>
                      <p class="muted">${escapeHtml(character.role)}</p>
                    </div>
                    <div style="font-size:2rem">${escapeHtml(character.icon)}</div>
                  </div>
                  <ul class="ability-list">
                    <li><strong>Habilidade:</strong> ${escapeHtml(character.ability)}</li>
                    <li><strong>Bônus:</strong> ${escapeHtml(character.bonus)}</li>
                    <li><strong>Stats:</strong> ATK ${character.stats.atk} / DEF ${character.stats.def} / SPD ${character.stats.spd}</li>
                    <li><strong>Nível:</strong> ${upgrades.level} | <strong>Cartas:</strong> ${upgrades.shards} | <strong>Skin:</strong> ${escapeHtml(upgrades.skin ?? "Padrão")}</li>
                  </ul>
                  <div class="card-actions">
                    <button class="small-button ${selected ? "is-primary" : ""}" data-select-character="${character.id}">
                      ${selected ? "Ativo" : owned ? "Selecionar" : "Desbloquear"}
                    </button>
                    <button class="small-button" data-upgrade-character="${character.id}">Upar com diamantes</button>
                  </div>
                </article>
              `;
            })
            .join("")}
        </div>
      </section>
    </div>
  `;
}

function renderBoxTab() {
  return `
    <div class="section-stack">
      <section class="section-card">
        <div class="section-title">
          <h3>Caixas e recompensas</h3>
          <span class="muted">Moedas compram caixas, diamantes upam personagens</span>
        </div>
        <div class="grid-cards">
          ${boxCatalog
            .map(
              (box) => `
                <article class="box-card">
                  <h4>${escapeHtml(box.name)}</h4>
                  <p>${escapeHtml(box.description)}</p>
                  <div class="row-actions">
                    <span class="chip">${box.costCoins} moedas</span>
                    <button class="small-button is-primary" data-open-box="${box.id}">Abrir caixa</button>
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>
    </div>
  `;
}

function renderBattleTab() {
  return `
    <div class="section-stack">
      <section class="battle-card">
        <div class="section-title">
          <h3>Modos de batalha</h3>
          <span class="muted">Selecione um modo e teste sua equipe</span>
        </div>
        <div class="grid-cards">
          <article class="mode-card">
            <h4>Campanha</h4>
            <p>Três fases progressivas para aprender ritmo de jogo e ganhar recompensas.</p>
            <button class="small-button is-primary" data-go-tab="campanha">Abrir campanha</button>
          </article>
          <article class="mode-card">
            <h4>Modo história</h4>
            <p>Acompanhe a invasão do monstro que destruiu a cidade e lute para restaurar o mundo.</p>
            <button class="small-button is-primary" data-go-tab="historia">Abrir história</button>
          </article>
          <article class="mode-card">
            <h4>Treino livre</h4>
            <p>Use seu personagem selecionado para testar combos sem perder progresso.</p>
            <button class="small-button is-primary" id="freeBattle">Iniciar treino</button>
          </article>
        </div>
      </section>
    </div>
  `;
}

function renderCampaignTab() {
  return `
    <div class="section-stack">
      <section class="section-card">
        <div class="section-title">
          <h3>Campanha</h3>
          <span class="muted">${save.campaignCleared}/3 fases concluídas</span>
        </div>
        <div class="mission-list">
          ${campaignPhases
            .map((phase, index) => {
              const done = save.battleProgress.campaign[index];
              return `
                <article class="campaign-card">
                  <div class="mission">
                    <div>
                      <strong>${escapeHtml(phase.title)}</strong>
                      <small>${escapeHtml(phase.description)}</small>
                    </div>
                    <div>
                      <div class="muted">${escapeHtml(phase.enemy)} | HP ${phase.hp}</div>
                      <div class="muted">${phase.rewardCoins} moedas + ${phase.rewardGems} diamantes</div>
                    </div>
                  </div>
                  <div class="row-actions" style="margin-top:12px">
                    <button class="small-button is-primary" data-play-campaign="${index}">
                      ${done ? "Rejogar" : "Jogar fase"}
                    </button>
                  </div>
                </article>
              `;
            })
            .join("")}
        </div>
      </section>
    </div>
  `;
}

function renderStoryTab() {
  return `
    <div class="section-stack">
      <section class="section-card">
        <div class="section-title">
          <h3>Modo história</h3>
          <span class="muted">${save.storyUnlocked ? "Disponível" : "Conclua a campanha para liberar"}</span>
        </div>
        <div class="story-panel">
          <h4>A invasão do monstro</h4>
          <p>
            O monstro rasgou o céu, invadiu a cidade e deixou prédios, ruas e sistemas de energia em ruínas.
            Sua missão é vencer os capítulos e restaurar o mundo.
          </p>
        </div>
        <div class="grid-cards" style="margin-top:16px">
          ${storyChapters
            .map((chapter, index) => {
              const unlocked = save.storyUnlocked || index === 0;
              const done = save.battleProgress.story[index];
              return `
                <article class="mode-card">
                  <h4>${escapeHtml(chapter.title)}</h4>
                  <p>${escapeHtml(chapter.text)}</p>
                  <button class="small-button is-primary" data-play-story="${index}" ${unlocked ? "" : "disabled"}>
                    ${done ? "Rejogar" : unlocked ? "Jogar capítulo" : "Bloqueado"}
                  </button>
                </article>
              `;
            })
            .join("")}
        </div>
      </section>
    </div>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function render() {
  if (save.screen === "landing") {
    app.innerHTML = renderLanding();
  } else if (save.screen === "signup") {
    app.innerHTML = renderSignup();
  } else if (save.screen === "tutorial") {
    app.innerHTML = renderTutorial();
  } else if (save.screen === "completion") {
    app.innerHTML = renderCompletion();
  } else {
    app.innerHTML = renderHub();
  }
  syncOrientationGate();
  bindEvents();
}

function bindEvents() {
  const startGame = document.querySelector("#startGame");
  startGame?.addEventListener("click", () => {
    setScreen("signup");
  });

  const restoreSave = document.querySelector("#restoreSave");
  restoreSave?.addEventListener("click", () => {
    if (save.account) {
      setScreen(save.tutorialDone ? "completion" : "signup");
      if (save.tutorialDone) {
        setScreen("completion");
      }
    } else {
      toast("Sem progresso", "Crie a conta primeiro para salvar os avanços.");
    }
  });

  const backHome = document.querySelector("#backHome");
  backHome?.addEventListener("click", () => setScreen("landing"));

  const signupForm = document.querySelector("#signupForm");
  signupForm?.addEventListener("submit", handleSignupSubmit);

  const skipTutorial = document.querySelector("#skipTutorial");
  skipTutorial?.addEventListener("click", () => {
    save.battleProgress.tutorial.done = true;
    save.tutorialDone = true;
    save.coins += 80;
    save.gems += 6;
    save.storyUnlocked = true;
    persist();
    setScreen("completion");
    toast("Treino pulado", "Você entrou direto na tela concluída com recompensas de entrada.");
  });

  const replayTutorial = document.querySelector("#replayTutorial");
  replayTutorial?.addEventListener("click", startTutorialBattle);

  const goHub = document.querySelector("#goHub");
  goHub?.addEventListener("click", () => setScreen("hub"));

  const freeBattle = document.querySelector("#freeBattle");
  freeBattle?.addEventListener("click", () => {
    toast("Treino livre", "Em seguida você pode usar campanha, história ou abrir caixas.");
    setScreen("hub");
    setTab("batalha");
  });

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      tutorialAction(button.getAttribute("data-action"));
    });
  });

  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => setTab(button.getAttribute("data-tab")));
  });

  document.querySelectorAll("[data-go-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      setScreen("hub");
      setTab(button.getAttribute("data-go-tab"));
    });
  });

  document.querySelectorAll("[data-select-character]").forEach((button) => {
    button.addEventListener("click", () => selectCharacter(button.getAttribute("data-select-character")));
  });

  document.querySelectorAll("[data-upgrade-character]").forEach((button) => {
    button.addEventListener("click", () => upgradeCharacter(button.getAttribute("data-upgrade-character")));
  });

  document.querySelectorAll("[data-open-box]").forEach((button) => {
    button.addEventListener("click", () => openBox(button.getAttribute("data-open-box")));
  });

  document.querySelectorAll("[data-play-campaign]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.getAttribute("data-play-campaign"));
      const phase = campaignPhases[index];
      const won = startModeBattle("campaign", index);
      if (!won) {
        toast("Campanha", `Tente novamente ${phase.title}.`);
      }
    });
  });

  document.querySelectorAll("[data-play-story]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.getAttribute("data-play-story"));
      if (!save.storyUnlocked && index > 0) {
        toast("Bloqueado", "Conclua a campanha para liberar os próximos capítulos.");
        return;
      }
      startModeBattle("story", index);
    });
  });
}

window.addEventListener("resize", syncOrientationGate);
window.addEventListener("orientationchange", syncOrientationGate);
window.add
