export type HumanBattler = {
  name: string;
  stats: {
    constitution: number;
    charisma: number;
    intelligence: number;
    dexterity: number;
    strength: number;
    qiAffinity: number;
    luck: number;
  };
  createdAt: string;
  spiritstones: number;
  age: number;
  stage: number; // cultivation stage (1, 2, 3, etc.)
  qiPoints: number;
  qiCapacity: number;
  curStam: number;
  curHealth: number;
  attack: {
    name: string;
    dmg: number;
    staminaCost: number;
    qiCost: number;
    chance: number;
  }[];
  encounterDescription: string;
};

export type BattleEncounter = {
  id: number;
  enemy: HumanBattler;
  stats: {
    health: number;
    stamina: number;
    dodge: string;
    pAttack: number;
    sAttack: number;
    pDef: number;
    sDef: number;
    persuasion: string;
    chance: number;
  };
  prize: number;
  result?: 'Won' | 'Lost';
};




export function generateHumanBattler(stage: number): HumanBattler {

  const names = [
    'Li Wei', 'Zhang Yong', 'Chen Mei', 'Wang Fang', 'Liu Hui',
    'Zhao Ling', 'Sun Qiang', 'Guo Yan', 'Yao Ming', 'Deng Fei',
    'Hu Rong', 'Nie Lan', 'Xie Bo', 'Fang Ying', 'Gao Lei',
    'Mo Xun', 'Huang Bao', 'Xu Min', 'Peng Zhi', 'Shen Li',
    'Bai Xun', 'Qin Hao', 'Jiang Yue', 'Cai Lin', 'Yu Mei',
    'Luo Han', 'Zhu Jin', 'Yan Qing', 'Tang Hui', 'He Zhi',
    'Meng Rui', 'Kong Lan', 'Fu Guo', 'Shang Xi', 'Lian Chen',
    'Wei Shan', 'Zeng Ling', 'Tan Lei', 'Feng Hui', 'Yin Xiu'
  ];


  const titles = [
    'of the Azure Mist',
    'the Scarlet Flame Disciple',
    'of the Whispering Void',
    'the Jade Tiger',
    'of the Nine Lotus Peak',
    'the Silent Blade',
    'of the Obsidian Moon',
    'the Crimson Viper',
    'of the Endless Sky',
    'the Frost Fang Wanderer',
    'of the Vermilion Bird',
    'the Howling Wolf',
    'of the Shadow Sect',
    'the Iron Root Cultivator',
    'of the Golden River',
    'the Spirit Seeker',
    'of the Celestial Phoenix',
    'the Blood Orchid Adept',
    'of the Hidden Star Valley',
    'the Thunder Palm Ascetic',
    'of the Black Lotus',
    'the Soul Burning Monk',
    'of the Fallen Leaf Sect',
    'the Sapphire Fang',
    'of the Vanishing Mist',
    'the Unseen Fist',
    'of the Eternal Rain',
    'the Crimson Sabre',
    'of the Sky Piercing Gate',
    'the Glimmering Mist Adept',
    'of the Forbidden Tomb',
    'the Jade Claw Saint',
    'of the Broken Sword Sect',
    'the Celestial Thorn',
    'of the Dragon Bone Clan',
    'the Golden Fang',
    'of the Withered Tree Sect',
    'the Moonlit Wanderer',
    'of the Mystic Crane Sect'
  ];

  
  const attackPool = [
  // Basic Attacks (75% chance)
    { name: 'Three Flowers Palm', dmg: 0.8, staminaCost: 0.05, qiCost: 0, chance: 0.75, t: 'physical' },
    { name: 'Lotus Breeze Strike', dmg: 0.85, staminaCost: 0.06, qiCost: 0, chance: 0.75, t: 'spiritual' },
    { name: 'Stone Fist', dmg: 0.9, staminaCost: 0.07, qiCost: 0, chance: 0.75, t: 'physical' },
    { name: 'Drifting Cloud Kick', dmg: 0.8, staminaCost: 0.05, qiCost: 0, chance: 0.75, t: 'physical' },
    { name: 'Iron Palm Smash', dmg: 0.9, staminaCost: 0.08, qiCost: 0, chance: 0.75, t: 'physical' },
    { name: 'Serpent Flicker Jab', dmg: 0.8, staminaCost: 0.05, qiCost: 0, chance: 0.75, t: 'physical' },
    { name: 'Swift Wind Slash', dmg: 0.85, staminaCost: 0.06, qiCost: 0, chance: 0.75, t: 'physical' },
    { name: 'Mountain Step', dmg: 0.9, staminaCost: 0.07, qiCost: 0, chance: 0.75, t: 'physical' },
    { name: 'Blazing Ember Punch', dmg: 0.85, staminaCost: 0.06, qiCost: 0, chance: 0.75, t: 'physical' },
    { name: 'Thunder Clap Strike', dmg: 0.9, staminaCost: 0.08, qiCost: 0, chance: 0.75, t: 'spiritual' },
    { name: 'Piercing Mist Jab', dmg: 0.85, staminaCost: 0.06, qiCost: 0, chance: 0.75, t: 'spiritual' },
    { name: 'Tiger Swipe', dmg: 0.9, staminaCost: 0.08, qiCost: 0, chance: 0.75, t: 'physical' },
    { name: 'Falling Leaf Strike', dmg: 0.8, staminaCost: 0.05, qiCost: 0, chance: 0.75, t: 'spiritual' },
    { name: 'Golden Fang Chop', dmg: 0.85, staminaCost: 0.06, qiCost: 0, chance: 0.75, t: 'physical' },
    { name: 'Crane Wing Cut', dmg: 0.85, staminaCost: 0.06, qiCost: 0, chance: 0.75, t: 'spiritual' },
    { name: 'Shadow Flicker Punch', dmg: 0.9, staminaCost: 0.07, qiCost: 0, chance: 0.75, t: 'physical' },
    { name: 'Rolling Boulder Smash', dmg: 0.9, staminaCost: 0.08, qiCost: 0, chance: 0.75, t: 'physical' },
    { name: 'Whispering Wind Palm', dmg: 0.8, staminaCost: 0.05, qiCost: 0, chance: 0.75, t: 'spiritual' },
    { name: 'Sunset Lotus Chop', dmg: 0.85, staminaCost: 0.06, qiCost: 0, chance: 0.75, t: 'spiritual' },
    { name: 'Emerald Tail Swipe', dmg: 0.9, staminaCost: 0.08, qiCost: 0, chance: 0.75, t: 'physical' },

    // Medium Attacks (20% chance)
    { name: 'Three Flowers Blast', dmg: 1.4, staminaCost: 0.22, qiCost: 0.2, chance: 0.20, t: 'spiritual' },
    { name: 'Blooming Lotus Fist', dmg: 1.5, staminaCost: 0.24, qiCost: 0.2, chance: 0.20, t: 'spiritual' },
    { name: 'Iron Wall Crash', dmg: 1.6, staminaCost: 0.25, qiCost: 0.2, chance: 0.20, t: 'physical' },
    { name: 'Gale Force Kick', dmg: 1.4, staminaCost: 0.22, qiCost: 0.2, chance: 0.20, t: 'physical' },
    { name: 'Tiger Fang Strike', dmg: 1.6, staminaCost: 0.25, qiCost: 0.25, chance: 0.20, t: 'physical' },
    { name: 'Blazing Palm Wave', dmg: 1.5, staminaCost: 0.24, qiCost: 0.2, chance: 0.20, t: 'spiritual' },
    { name: 'Thunder Beast Crash', dmg: 1.5, staminaCost: 0.23, qiCost: 0.2, chance: 0.20, t: 'spiritual' },
    { name: 'Crimson Whip Snap', dmg: 1.5, staminaCost: 0.24, qiCost: 0.2, chance: 0.20, t: 'spiritual' },
    { name: 'Serpent Coil Lash', dmg: 1.6, staminaCost: 0.25, qiCost: 0.2, chance: 0.20, t: 'spiritual' },
    { name: 'Heaven Splitting Slash', dmg: 1.7, staminaCost: 0.26, qiCost: 0.25, chance: 0.20, t: 'spiritual' },
    { name: 'Sky Shatter Palm', dmg: 1.5, staminaCost: 0.24, qiCost: 0.2, chance: 0.20, t: 'spiritual' },
    { name: 'Golden Tiger Roar', dmg: 1.6, staminaCost: 0.25, qiCost: 0.2, chance: 0.20, t: 'physical' },
    { name: 'Howling Gale Claw', dmg: 1.4, staminaCost: 0.22, qiCost: 0.2, chance: 0.20, t: 'spiritual' },
    { name: 'Blood Vine Slam', dmg: 1.6, staminaCost: 0.25, qiCost: 0.25, chance: 0.20, t: 'spiritual' },
    { name: 'Bone Crushing Strike', dmg: 1.7, staminaCost: 0.26, qiCost: 0.25, chance: 0.20, t: 'physical' },
    { name: 'Lava Whirl Chop', dmg: 1.6, staminaCost: 0.25, qiCost: 0.25, chance: 0.20, t: 'physical' },
    { name: 'Dark Mist Wave', dmg: 1.5, staminaCost: 0.24, qiCost: 0.2, chance: 0.20, t: 'spiritual' },
    { name: 'Heaven Spear Rush', dmg: 1.7, staminaCost: 0.26, qiCost: 0.25, chance: 0.20, t: 'spiritual' },
    { name: 'Void Wave Clash', dmg: 1.5, staminaCost: 0.23, qiCost: 0.2, chance: 0.20, t: 'spiritual' },
    { name: 'Blazing Fang Thrust', dmg: 1.6, staminaCost: 0.25, qiCost: 0.25, chance: 0.20, t: 'physical' },

    // High Attacks (5% chance)
    { name: 'Union of the Flower', dmg: 2.5, staminaCost: 0.3, qiCost: 0.4, chance: 0.05, t: 'spiritual' },
    { name: 'Lotus Devourer Blast', dmg: 2.6, staminaCost: 0.32, qiCost: 0.45, chance: 0.05, t: 'spiritual' },
    { name: 'Void Shatter Palm', dmg: 2.7, staminaCost: 0.33, qiCost: 0.5, chance: 0.05, t: 'spiritual' },
    { name: 'Azure Dragon Ascend', dmg: 2.5, staminaCost: 0.3, qiCost: 0.4, chance: 0.05, t: 'spiritual' },
    { name: 'Thunderstorm Roar', dmg: 2.6, staminaCost: 0.32, qiCost: 0.45, chance: 0.05, t: 'spiritual' },
    { name: 'Nine Flames Destruction', dmg: 2.7, staminaCost: 0.34, qiCost: 0.5, chance: 0.05, t: 'spiritual' },
    { name: 'Celestial Spear Pierce', dmg: 2.8, staminaCost: 0.35, qiCost: 0.5, chance: 0.05, t: 'spiritual' },
    { name: 'Heavenly Lotus Eruption', dmg: 2.9, staminaCost: 0.36, qiCost: 0.55, chance: 0.05, t: 'spiritual' },
    { name: 'Demon Suppression Punch', dmg: 3.0, staminaCost: 0.4, qiCost: 0.6, chance: 0.05, t: 'physical' },
    { name: 'Void Collapse Fist', dmg: 3.0, staminaCost: 0.4, qiCost: 0.6, chance: 0.05, t: 'spiritual' },
    { name: 'Soul Crumbling Roar', dmg: 2.9, staminaCost: 0.36, qiCost: 0.55, chance: 0.05, t: 'spiritual' },
    { name: 'Sky Wrath Slash', dmg: 2.8, staminaCost: 0.35, qiCost: 0.5, chance: 0.05, t: 'spiritual' },
    { name: 'Blood Moon Fang', dmg: 2.9, staminaCost: 0.36, qiCost: 0.55, chance: 0.05, t: 'physical' },
    { name: 'Abyss Lotus Crush', dmg: 3.0, staminaCost: 0.4, qiCost: 0.6, chance: 0.05, t: 'spiritual' },
    { name: 'Dragon Emperor Wave', dmg: 2.8, staminaCost: 0.35, qiCost: 0.5, chance: 0.05, t: 'spiritual' },
    { name: 'Crimson Heaven Claw', dmg: 2.9, staminaCost: 0.36, qiCost: 0.55, chance: 0.05, t: 'physical' },
    { name: 'Nightmare Lotus Spear', dmg: 3.0, staminaCost: 0.4, qiCost: 0.6, chance: 0.05, t: 'spiritual' },
    { name: 'Dark Sky Eruption', dmg: 2.9, staminaCost: 0.36, qiCost: 0.55, chance: 0.05, t: 'spiritual' },
    { name: 'Celestial World Break', dmg: 3.0, staminaCost: 0.4, qiCost: 0.6, chance: 0.05, t: 'spiritual' },
    { name: 'Dragon Lotus Requiem', dmg: 3.0, staminaCost: 0.4, qiCost: 0.6, chance: 0.05, t: 'spiritual' },
  ];

  

  const statRanges = {
    0: { min: 40, max: 60 },
    1: { min: 60, max: 115 },
    2: { min: 90, max: 150 },
    3: { min: 130, max: 350 }
  };

  const qiCapacityRanges = {
    0: [500, 1000],
    1: [1200, 3050],
    2: [3050, 15000],
    3: [13000, 35000]
  };

  const spiritStoneRanges = {
    0: [25, 50],
    1: [50, 150],
    2: [120, 200],
    3: [150, 280]
  };

  function getRandomStatTotal(stage: number) {
    const { min, max } = statRanges[stage];
    let remaining = Math.floor(Math.random() * (max - min + 1)) + min;
    const stats = { constitution: 0, charisma: 0, intelligence: 0, dexterity: 0, strength: 0, qiAffinity: 0, luck: 0 };
    const keys = Object.keys(stats);
    while (remaining > 0) {
      const key = keys[Math.floor(Math.random() * keys.length)];
      const toAdd = Math.min(remaining, Math.floor(Math.random() * 5) + 1);
      stats[key as keyof typeof stats] += toAdd;
      remaining -= toAdd;
    }
    return stats;
  }

  function getRandomFromRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomAttackSet(): HumanBattler["attack"] {
    const selected = [...attackPool].sort(() => 0.5 - Math.random()).slice(0, 3);
    return selected.map(a => ({
      name: a.name,
      dmg: a.dmg,
      staminaCost: a.staminaCost,
      qiCost: a.qiCost,
      chance: a.chance
    }));
  }

  const stats = getRandomStatTotal(stage);
  const [qiMin, qiMax] = qiCapacityRanges[stage];
  const qiCapacity = getRandomFromRange(qiMin, qiMax);
  const qiPoints = Math.floor(qiCapacity * (0.65 + Math.random() * 0.35));
  const [stoneMin, stoneMax] = spiritStoneRanges[stage];
  const spiritstones = getRandomFromRange(stoneMin, stoneMax);
  
  
  function generateNameWithTitle(): string {
    const name = names[Math.floor(Math.random() * names.length)];
    const title = titles[Math.floor(Math.random() * titles.length)];
    return `${name} - ${title}`;
  } 

  
  const nameOf = generateNameWithTitle();


  const encounterDescriptions = [
    "You encounter {name}, a cultivator whose aura fills the surroundings with tension and dread.",
    "Before you stands {name}, whose icy gaze freezes the air itself.",
    "A sudden gust reveals {name}, wrapped in flowing robes of ominous energy.",
    "The earth trembles under {name}'s steps, their presence is like a looming mountain.",
    "Shadows twist as {name} emerges from the mist, radiating killing intent.",
    "Lightning crackles around {name}, heralding their arrival like a heavenly judge.",
    "A soft melody precedes {name}, yet the song brings only despair.",
    "The oppressive aura of {name} makes the beasts of the forest kneel in submission.",
    "Even the bravest warriors hesitate at the sight of {name}'s terrifying silhouette.",
    "The scent of blood follows {name}, a reminder of countless fallen before them.",
    "The heavens seem to darken as {name} arrives, exuding an ominous pressure.",
    "You feel your knees weaken before the overwhelming presence of {name}.",
    "The chilling smile of {name} sends shivers down your spine.",
    "A dreadful stillness falls over the battlefield as {name} appears.",
    "The air grows heavy and suffocating in the presence of {name}.",
    "The world seems to bow to {name}'s indomitable will.",
    "{name}'s laughter echoes through the valley, shaking the hearts of the weak.",
    "Even the fiercest beasts retreat upon sensing {name}'s bloodthirsty aura.",
    "The mere gaze of {name} pierces your soul, exposing your weaknesses.",
    "Thunder roars as {name} steps onto the battlefield, eyes filled with disdain.",
    "A crimson mist heralds the arrival of {name}, whispering tales of carnage.",
    "With a flick of their sleeve, {name} silences the winds themselves.",
    "The heavens weep in the presence of {name}, whose fury shakes the firmament.",
    "Rumors speak of {name}, whose blade leaves no bones intact.",
    "You sense the weight of a thousand mountains pressing down from {name}'s aura.",
    "The howling wind carries {name}'s name like a curse to all who oppose them.",
    "The world quivers under the wrath of {name}.",
    "The stars dim as {name} arrives, embodying the will of the heavens.",
    "A trail of shattered bones and dreams leads to {name}'s path.",
    "{name} descends like a calamity, crushing the hopes of the righteous.",
    "The air itself seems to flee from {name}'s suffocating presence.",
    "{name} stands before you, their gaze colder than the void.",
    "Legends speak of {name}, the one who walks with death itself.",
    "You feel as if time has frozen under {name}'s gaze.",
    "The clouds part, yet no warmth reaches you under {name}'s shadow.",
    "Even the immortals fear to tread where {name} walks.",
    "A spectral chill announces {name}'s arrival.",
    "The flick of {name}'s finger can collapse mountains.",
    "A monstrous aura fills the air as {name} approaches.",
    "{name} speaks, and even the heavens dare not reply.",
    "You feel as if the world itself rejects your existence in front of {name}.",
    "A black lotus blooms under {name}'s feet, feeding on fear and despair.",
    "The river of fate twists violently in {name}'s presence.",
    "{name}'s footsteps sound like war drums upon your heart.",
    "The sky burns crimson as {name} arrives, heralding chaos and destruction.",
    "Your mind fractures as {name} smiles gently, hiding a storm within.",
    "Your instincts scream danger as {name} locks eyes with you.",
    "The mere mention of {name}'s name sends ripples through the sects.",
    "The warmth of life flees from the battlefield as {name} arrives.",
    "You struggle to breathe under {name}'s suffocating domain.",
    "{name}'s presence eclipses even the celestial stars.",
    "Fear spreads through the ranks as {name}'s silhouette appears.",
    "Legends call {name} the bringer of endless night.",
    "{name} emerges from a rift, wielding chaos like a blade.",
    "Your spirit trembles before {name}'s ancient and vast cultivation.",
    "The heavens tremble, and mortals kneel at {name}'s oppressive aura.",
    "Even the bravest cultivators avert their eyes from {name}'s gaze.",
    "Your soul screams as {name} draws near, cloaked in spectral flames.",
    "It feels as if the universe itself has bent around {name}'s will.",
    "The sky fractures as {name} descends with overwhelming might.",
    "A suffocating silence falls over the land with {name}'s arrival.",
    "You feel as though your existence is being erased by {name}'s presence.",
    "The world turns grey under {name}'s suffocating pressure.",
    "{name}'s arrival turns courage to ash and resolve to dust.",
    "The elders warn to never cross paths with {name}, the calamity bearer.",
    "{name} appears like a shadow cast by the heavens themselves.",
    "The ground cracks and rivers boil in {name}'s wake.",
    "The roar of dragons echoes as {name} arrives with regal fury.",
    "The world holds its breath as {name} walks onto the battlefield.",
    "You hear the screams of lost souls following {name}'s path.",
    "The sun refuses to shine where {name} treads.",
    "{name}'s killing intent wraps around you like an icy chain.",
    "You feel your spirit falter under the overwhelming gaze of {name}.",
    "The wind carries {name}'s cold laughter as they approach.",
    "A storm of swords and sorrow follows {name}'s every step.",
    "The heavens cannot contain the madness within {name}.",
    "The air turns bitter and heavy as {name} steps forth.",
    "The land weeps beneath {name}'s feet, cursed by their existence.",
    "The path before you darkens as {name} blocks your way."
  ];

  function generateEncounterDescription(): string {
    const descriptionTemplate = encounterDescriptions[Math.floor(Math.random() * encounterDescriptions.length)];
    return descriptionTemplate.replace("{name}", nameOf);
  }



  const encounterDescriptionOf = generateEncounterDescription();

  return {
    name: nameOf,
    stats,
    createdAt: new Date().toISOString(),
    spiritstones: Math.floor(Math.random() * 500),
    age: Math.floor(Math.random() * 30) + 18,
    stage,
    qiPoints,
    qiCapacity,
    curStam: 0,
    curHealth: 0,
    attack: getRandomAttackSet(),
    encounterDescription: encounterDescriptionOf
  };
}


