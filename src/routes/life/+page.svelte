<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { isTemplateMiddleOrTemplateTail } from 'typescript';
 

  // Structure for life events awarding spendable points
  type LifeEventDef = {
    title: string;
    description: string;
    pointsReward: number;
    optional?: boolean;
    ageTrigger?: number; 
    weight?: number;     
    good?: boolean;       
  };

  type Manual = {
    title: string;
    equipped: boolean;
    method: string;
    methodInfo: string;
  };

  type Body = {
    grade: string;
    description: string;
  }

  type Core = {
    grade: number;
    description: string;
  }

  type LifeEvent = {
    id: number;
    title: string;
    description: string;
    date: string;
  };

  type ExploreHerbEventDef = {
  name: string;
  description: string;
  statRequirements: Record<string, number>;
  rewards: Record<string, number>;
  weight: number;
  };


  type Character = {
    name: string;
    stats: Record<string, number>;
    statsOf: Record<string, number>;
    createdAt: string;
    spiritstones: number;
    age: number;
    lifespan: number;
    unallocatedPoints: number;
    lifeEvents: LifeEvent[];       
    stage: boolean[];  // which stage
    qiPoints: number;  
    qiCapacity: number;
    usedStam: number;
    lostHealth: number;
    manuals: Manual[]
    body: Body;
    core: Core;
  };


  let actionCount = 0;
  let activeHerbWindows: { id: number, herb: ExploreHerbEventDef }[] = [];

  let character: Character | null = null;
  // Selected actions for the current year
  let selectedActions: LifeEventDef[] = [];

  $: actionCounts = selectedActions.reduce((acc, act) => {
    acc[act.title] = (acc[act.title] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  let groupedLifeEvents: { event: LifeEvent; count: number }[] = [];
  $: if (character) {
    const map = new Map<string, { event: LifeEvent; count: number }>();
    for (const ev of character.lifeEvents) {
      if (map.has(ev.title)) {
        map.get(ev.title)!.count += 1;
      } else {
        map.set(ev.title, { event: ev, count: 1 });
      }
    }
    groupedLifeEvents = Array.from(map.values());
  } else {
    groupedLifeEvents = [];
  }


  // Event pools
  const childhoodEvents: LifeEventDef[] = [
    { title: 'First Steps', description: 'You took your first steps.', pointsReward: 0, weight: 0.175, good: true },
    { title: 'Early Memory', description: 'You remember your first friend.', pointsReward: 0, weight: 0.175, good: true },
    { title: 'Play Time', description: 'You played games.', pointsReward: 0, weight: 0.175, good: true },
    { title: 'Lullaby', description: 'You heard a soothing lullaby.', pointsReward: 0, weight: 0.175, good: true },
    { title: 'Nothing happens', description: 'Nothing special happened this year.', pointsReward: 0, weight: 0.30, good: false }
  ];
  const chronologicalEvents: LifeEventDef[] = [
    { ageTrigger: 5, title: 'Learn Cultivation', description: 'You first learned cultivation basics.', pointsReward: 2, weight: 1, good: true },
    { ageTrigger: 8, title: 'Town Excursion', description: 'You visited a nearby town.', pointsReward: 0, weight: 1, good: false },
    { ageTrigger: 12, title: 'Apprentice Training', description: 'You began formal training.', pointsReward: 2, weight: 1, good: true },
    { ageTrigger: 15, title: 'Clan Visit', description: 'You returned to your clan for training.', pointsReward: 0, weight: 1, good: false },
    { ageTrigger: 18, title: 'Coming-of-Age Ceremony', description: 'You participated in your coming-of-age ceremony.', pointsReward: 3, weight: 1, good: true }
  ];
  const injuryEvents: LifeEventDef[] = [
    { title: 'Cultivation Strain', description: 'You overexerted and need rest.', pointsReward: 0, optional: true, weight: 0.175, good: false },
    { title: 'Battle Wound', description: 'You were injured in sparring.', pointsReward: 0, optional: true, weight: 0.175, good: false },
    { title: 'Minor Bruise', description: 'You stumbled and bruised yourself.', pointsReward: 0, optional: true, weight: 0.175, good: false },
    { title: 'Lion Scratch', description: 'A wild creature scratched you.', pointsReward: 0, optional: true, weight: 0.175, good: false },
    { title: 'Nothing happens', description: 'Nothing special happened this year.', pointsReward: 0, weight: 0.30, good: false }
  ];
  const chanceEvents: LifeEventDef[] = [
    { title: 'Found Treasure', description: 'You discovered something valuable!', pointsReward: 1, optional: true, weight: 0.175, good: true },
    { title: 'Lost Artifact', description: 'You misplaced a precious item.', pointsReward: 0, optional: true, weight: 0.175, good: false },
    { title: 'Lucky Encounter', description: 'You had a stroke of luck.', pointsReward: 1, optional: true, weight: 0.175, good: true },
    { title: 'Rainy Day', description: 'It rained heavily.', pointsReward: 0, optional: true, weight: 0.175, good: false },
    { title: 'Nothing happens', description: 'Nothing unusual occurred.', pointsReward: 0, weight: 0.30, good: false }
  ];
  const worldEvents: LifeEventDef[] = [
    { title: 'Heavenly Disaster', description: 'A calamity strikes.', pointsReward: 0, weight: 0.25, good: false },
    { title: 'Market Boom', description: 'Trade flourishes.', pointsReward: 1, optional: true, weight: 0.15, good: true },
    { title: 'Harvest Festival', description: 'A grand harvest festival is celebrated.', pointsReward: 1, weight: 0.20, good: true },
    { title: 'Drought', description: 'A severe drought affects the land.', pointsReward: 0, optional: true, weight: 0.10, good: false },
    { title: 'Solar Eclipse', description: 'A rare solar eclipse occurs.', pointsReward: 0, optional: true, weight: 0.30, good: false }
  ];
  const sectEvents: LifeEventDef[] = [
    { title: 'Sect Trial', description: 'You passed a sect trial.', pointsReward: 1, weight: 0.25, good: true },
    { title: 'Sect Feast', description: 'You attended a grand feast.', pointsReward: 0, optional: true, weight: 0.15, good: true },
    { title: 'Sect Training', description: 'You trained with other disciples.', pointsReward: 1, weight: 0.20, good: true },
    { title: 'Sect Challenge', description: 'You accepted a challenging trial.', pointsReward: 0, optional: true, weight: 0.10, good: false },
    { title: 'Nothing happens', description: 'Nothing of note happened in the sect.', pointsReward: 0, weight: 0.30, good: false }
  ];

  // Action events available to choose as life events
  const actionEvents5: LifeEventDef[] = [
    { title: 'Imagine', description: 'You let your imagination run wild.', pointsReward: 0, good: false },
    { title: 'Play', description: 'You played joyfully.', pointsReward: 0, good: true },
    { title: 'Observe', description: 'You studied your surroundings.', pointsReward: 0, good: false },  
  ];

  const actionEvents5Up: LifeEventDef[] = [
    { title: 'Train Meridians', description: 'You let your imagination run wild.', pointsReward: 0, good: false },
    { title: 'Gather Qi', description: 'You played joyfully.', pointsReward: 0, good: true },
    { title: 'Explore', description: 'You studied your surroundings.', pointsReward: 0, good: false },
    { title: 'Socialize', description: 'You studied your surroundings.', pointsReward: 0, good: false },
    { title: 'Train the Sword', description: 'You studied your surroundings.', pointsReward: 0, good: false }

  ];

  // Explore events
    //Explore Herb
const exploreHerbEvents: ExploreHerbEventDef[] = [
  // Super Rare Qi Capacity
  {
    name: 'Worldroot',
    description: 'Said to nourish the soul and body, drastically boosting qi capacity.',
    statRequirements: { qiAffinity: 15, constitution: 15 },
    rewards: { qiCapacityPercent: 15 },
    weight: 0.01
  },
  // Super Rare Qi Points
  {
    name: 'Ethereal Stalk',
    description: 'A legendary herb that brims with qi beyond mortal imagination.',
    statRequirements: { qiAffinity: 18 },
    rewards: { qiPoints: 500 },
    weight: 0.01
  },
  
  // Rare Herbs (Qi Affinity, Lifespan, Qi Points 300-400)
  {
    name: 'Spirit Grass',
    description: 'A glowing herb known to enhance qi flow.',
    statRequirements: { qiAffinity: 10 },
    rewards: { qiAffinity: 1 },
    weight: 0.05
  },
  {
    name: 'Longevity Berry',
    description: 'A berry rumored to extend one\'s lifespan.',
    statRequirements: { constitution: 10 },
    rewards: { lifespan: 2 },
    weight: 0.05
  },
  {
    name: 'Mindspire Blossom',
    description: 'Elevates one\'s understanding of cultivation.',
    statRequirements: { intelligence: 9 },
    rewards: { qiAffinity: 1 },
    weight: 0.05
  },
  {
    name: 'Ether Fern',
    description: 'Rare fern that refines qi flow.',
    statRequirements: { qiAffinity: 11 },
    rewards: { qiAffinity: 2 },
    weight: 0.05
  },
  {
    name: 'Crescent Dew',
    description: 'Purifies the body and boosts qi.',
    statRequirements: { qiAffinity: 11 },
    rewards: { qiPoints: 150 },
    weight: 0.05
  },
  {
    name: 'Celestial Orchid',
    description: 'Blooming once in a century, extends lifespan.',
    statRequirements: { qiAffinity: 11 },
    rewards: { lifespan: 4 },
    weight: 0.05
  },
  {
    name: 'Skycloud Sprig',
    description: 'Said to be kissed by the heavens, brimming with dense qi.',
    statRequirements: { qiAffinity: 12 },
    rewards: { qiPoints: 400 },
    weight: 0.05
  },
  {
    name: 'Moonveil Herb',
    description: 'A mysterious herb glowing under moonlight, its qi is potent.',
    statRequirements: { qiAffinity: 11 },
    rewards: { qiPoints: 350 },
    weight: 0.05
  },
  {
    name: 'Duskroot',
    description: 'An elusive herb found at dusk, containing strong qi essence.',
    statRequirements: { qiAffinity: 12 },
    rewards: { qiPoints: 300 },
    weight: 0.05
  },
  {
    name: 'Dawnroot Ginseng',
    description: 'A sacred herb that subtly extends life.',
    statRequirements: { constitution: 10 },
    rewards: { lifespan: 2 },
    weight: 0.05
  },
  {
    name: 'Silverleaf Berry',
    description: 'Grants those who consume it a chance to lengthen their years.',
    statRequirements: { constitution: 10 },
    rewards: { lifespan: 3 },
    weight: 0.05
  },
  {
    name: 'Pine of Longevity',
    description: 'A rare pine that fortifies the body, extending lifespan.',
    statRequirements: { constitution: 9 },
    rewards: { lifespan: 2 },
    weight: 0.05
  },
  
  // Common Herbs (Qi Points 100-200, Stats)
  {
    name: 'Ironroot Lotus',
    description: 'Strengthens the body like iron.',
    statRequirements: { strength: 8 },
    rewards: { strength: 2 },
    weight: 0.3
  },
  {
    name: 'Veilflower',
    description: 'Sharpens the mind.',
    statRequirements: { intelligence: 8 },
    rewards: { intelligence: 2 },
    weight: 0.2
  },
  {
    name: 'Shadow Moss',
    description: 'Cultivates stealth and perception.',
    statRequirements: { luck: 6 },
    rewards: { luck: 2 },
    weight: 0.2
  },
  {
    name: 'Heartleaf Orchid',
    description: 'Improves resilience.',
    statRequirements: { constitution: 7 },
    rewards: { constitution: 2 },
    weight: 0.15
  },
  {
    name: 'Burning Reed',
    description: 'Enhances strength.',
    statRequirements: { strength: 9 },
    rewards: { strength: 3 },
    weight: 0.2
  },
  {
    name: 'Skyvine',
    description: 'Boosts agility and awareness.',
    statRequirements: { luck: 8 },
    rewards: { luck: 3 },
    weight: 0.15
  },
  {
    name: 'Ghost Petal',
    description: 'Slightly extends lifespan.',
    statRequirements: { constitution: 9 },
    rewards: { lifespan: 1 },
    weight: 0.05
  },
  {
    name: 'Stonebark Root',
    description: 'Hardens the body.',
    statRequirements: { strength: 8 },
    rewards: { constitution: 2 },
    weight: 0.15
  },
  {
    name: 'Silent Sprout',
    description: 'Enhances patience.',
    statRequirements: { intelligence: 7 },
    rewards: { intelligence: 1 },
    weight: 0.15
  },
  {
    name: 'Dragonroot',
    description: 'Grants raw power.',
    statRequirements: { strength: 9 },
    rewards: { strength: 4 },
    weight: 0.1
  },
  {
    name: 'Mistleaf',
    description: 'Slightly extends lifespan.',
    statRequirements: { constitution: 9 },
    rewards: { lifespan: 1 },
    weight: 0.05
  },
  {
    name: 'Wraith Vine',
    description: 'Boosts luck.',
    statRequirements: { luck: 8 },
    rewards: { luck: 2 },
    weight: 0.1
  },
  {
    name: 'Azure Leaf',
    description: 'Stimulates qi circulation.',
    statRequirements: { qiAffinity: 8 },
    rewards: { qiPoints: 100 },
    weight: 0.1
  },
  {
    name: 'Emerald Grass',
    description: 'Strengthens luck and constitution.',
    statRequirements: { luck: 7, constitution: 7 },
    rewards: { luck: 1, constitution: 1 },
    weight: 0.2
  },
  {
    name: 'Stormroot',
    description: 'A volatile herb that boosts strength.',
    statRequirements: { strength: 9 },
    rewards: { strength: 3 },
    weight: 0.15
  },
  {
    name: 'Echo Lotus',
    description: 'Refines the user’s intelligence.',
    statRequirements: { intelligence: 8 },
    rewards: { intelligence: 2 },
    weight: 0.15
  },
  {
    name: 'Hidden Fern',
    description: 'Increases perception and luck.',
    statRequirements: { luck: 7 },
    rewards: { luck: 2 },
    weight: 0.1
  },
  {
    name: 'Qi Drift Mushroom',
    description: 'Exudes qi, enhancing qi points.',
    statRequirements: { qiAffinity: 7 },
    rewards: { qiPoints: 120 },
    weight: 0.1
  },
  {
    name: 'Ember Lily',
    description: 'Sparks intense physical power.',
    statRequirements: { strength: 9 },
    rewards: { strength: 4 },
    weight: 0.1
  },
  {
    name: 'Dreamvine',
    description: 'Brings clarity of thought.',
    statRequirements: { intelligence: 9 },
    rewards: { intelligence: 3 },
    weight: 0.1
  },
  // New Qi Point focused herbs (100-200)
  {
    name: 'Windbloom',
    description: 'A gentle herb that softly pulses with qi.',
    statRequirements: { qiAffinity: 8 },
    rewards: { qiPoints: 150 },
    weight: 0.2
  },
  {
    name: 'Mist Petal',
    description: 'A common herb that refines one’s qi.',
    statRequirements: { qiAffinity: 6 },
    rewards: { qiPoints: 100 },
    weight: 0.2
  },
  {
    name: 'Clearroot',
    description: 'Commonly used by disciples to boost qi.',
    statRequirements: { qiAffinity: 5 },
    rewards: { qiPoints: 100 },
    weight: 0.2
  },
  {
    name: 'Blazeleaf',
    description: 'Provides a quick burst of qi energy.',
    statRequirements: { qiAffinity: 7 },
    rewards: { qiPoints: 150 },
    weight: 0.2
  },
  {
    name: 'Soothing Vine',
    description: 'Calms the body and gently enhances qi flow.',
    statRequirements: { qiAffinity: 8 },
    rewards: { qiPoints: 200 },
    weight: 0.2
  },
  {
    name: 'Whispering Bloom',
    description: 'Whispers to the cultivator’s soul, refining qi mildly.',
    statRequirements: { qiAffinity: 7 },
    rewards: { qiPoints: 180 },
    weight: 0.2
  },
  {
    name: 'Glowcap Mushroom',
    description: 'A glowing fungus that seeps qi.',
    statRequirements: { qiAffinity: 6 },
    rewards: { qiPoints: 120 },
    weight: 0.2
  },
  {
    name: 'Sunpetal',
    description: 'Radiates warmth and qi.',
    statRequirements: { qiAffinity: 8 },
    rewards: { qiPoints: 200 },
    weight: 0.2
  },
  {
    name: 'Aurora Grass',
    description: 'Colorful grass that amplifies qi.',
    statRequirements: { qiAffinity: 9 },
    rewards: { qiPoints: 180 },
    weight: 0.2
  },
  {
    name: 'Rainleaf',
    description: 'Its qi is crisp and energizing.',
    statRequirements: { qiAffinity: 9 },
    rewards: { qiPoints: 200 },
    weight: 0.2
  },
  {
    name: 'Fogseed',
    description: 'Hidden in fog, moderately boosts qi.',
    statRequirements: { qiAffinity: 9 },
    rewards: { qiPoints: 190 },
    weight: 0.2
  }
];


  // Choose up to 3 actions per year
    // Choose up to 3 actions per year (duplicates allowed)
  function selectAction(def: LifeEventDef) {
  if (!character) return;
    if (selectedActions.length < 3) {
      selectedActions = [...selectedActions, def];
    }
  }

  function clearSelectedActions() {
    selectedActions = [];
  }
  

  function saveCharacter() {
    if (character) localStorage.setItem('cultivationCharacter', JSON.stringify(character));
  }

  // Check and apply breakthrough when Qi threshold reached
  
  function tryBreakthroughQiRef() {
  if (!character) return;
  if (character.qiPoints < 500 || !character.stage[1]) return;

  const roll = Math.random() * 100;
  let isBreak = false;
  const qi = character.qiPoints;
  const cap = character.qiCapacity;

  function setBodyLifespanPoints() {
    if (cap >= 1050) {
      character.unallocatedPoints += 8;
      character.stats.constitution += 3;
      character.qiCapacity *= 1.3;
      character.stats.lifespan  += 15;
    } else if (cap > 750) {
      character.unallocatedPoints += 5;
      character.stats.constitution += 2;
      character.qiCapacity *= 1.18;
      character.stats.lifespan  += 10;
    } else {
      character.unallocatedPoints += 5;
      character.stats.constitution += 2;
      character.qiCapacity *= 1.09;
      character.stats.lifespan  += 5;
      
    }
  }

  if (cap === qi) {
    if (roll >= 5) {
      isBreak = true;
      setBodyLifespanPoints();
    } else {
      character.lostHealth += ((baseStatsOf.health / 100) * 50); 
    }
  } else if ((qi >= (3 * (cap / 4))) && (qi < cap)) {
    if (roll <= 35) {
      isBreak = true;
      setBodyLifespanPoints();
    } else {
      character.lostHealth += ((baseStatsOf.health / 100) * 65);
    }
  } else if ((qi < (3 * (cap / 4))) && (qi >=  (cap / 2))) {
    if (roll <= 90) {
      isBreak = true;
      setBodyLifespanPoints();
    } else {
      character.lostHealth += ((baseStatsOf.health / 100) * 95);
    }
  }

  const result = {
    id: Date.now(),
    title: isBreak ? `Age ${character.age}: Qi Refinement Breakthrough: Success` : `Age ${character.age}: Qi Refinement Breakthrough: Failed`,
    description: isBreak
      ? `You have laid the Qi Refinement for your cultivation.`
      : 'You failed to reach Qi Refinement',
    date: new Date().toISOString()
  };

  character.lifeEvents.push(result);
  
  if (isBreak) {
    character.stage[1] = false;
    character.stage[2] = true;
    
  }
  isBreak = false;

  saveCharacter();
}

function tryBreakthroughFoundation() {
  if (!character) return;
  if (character.qiPoints < 1500 || !character.stage[2]) return;

  const roll = Math.random() * 100;
  let isBreak = false;
  const qi = character.qiPoints;
  const cap = character.qiCapacity;

  function setBodyLifespanPoints() {
    if (cap >= 3000) {
      character.unallocatedPoints += 12;
      character.stats.constitution += 9;
      character.qiCapacity *= 1.5;
      character.body = { grade: "Heaven", description: "A body blessed by the heavens themselves, radiating unmatched purity." };
      character.stats.lifespan += 20;
    } else if (cap > 2250) {
      character.unallocatedPoints += 9;
      character.stats.constitution += 6;
      character.qiCapacity *= 1.3;
      character.body = { grade: "Earth", description: "A body forged from the earth, stable and admired by many cultivators." };
      character.stats.lifespan += 15;
    } else {
      character.unallocatedPoints += 6;
      character.stats.constitution += 3;
      character.qiCapacity *= 1.15;
      character.body = { grade: "Mortal", description: "An ordinary mortal body, a path walked by countless others." };
      character.stats.lifespan += 10;
    }
  }

  if (cap === qi) {
    if (roll >= 5) {
      isBreak = true;
      setBodyLifespanPoints();
    } else {
      character.lostHealth += ((baseStatsOf.health / 100) * 50); 
    }
  } else if ((qi >= (3 * (cap / 4))) && (qi < cap)) {
    if (roll <= 35) {
      isBreak = true;
      setBodyLifespanPoints();
    } else {
      character.lostHealth += ((baseStatsOf.health / 100) * 65);
    }
  } else if ((qi < (3 * (cap / 4))) && (qi >=  (cap / 2))) {
    if (roll <= 10) {
      isBreak = true;
      setBodyLifespanPoints();
    } else {
      character.lostHealth += ((baseStatsOf.health / 100) * 95);
    }
  }

  const result = {
    id: Date.now(),
    title: `Age ${character.age}: Foundation Establishment`,
    description: `You have achieved Foundation Establishment. Your body is of ${character.body.grade} grade. ${character.body.description}`,
    date: new Date().toISOString()
  };

  character.lifeEvents.push(result);
  if (isBreak) {
    character.stage[2] = false;
    character.stage[3] = true;
    isBreak = false;
  }

  saveCharacter();
}

function tryBreakthroughGoldenCore() {
  if (!character) return;
  if (character.qiPoints < 7500 || !character.stage[3]) return;

  const roll = Math.random() * 100;
  let isBreak = false;
  const qi = character.qiPoints;
  const cap = character.qiCapacity;

  function setBodyLifespanPoints() {
    if (cap >= 15000) {
      character.unallocatedPoints += 15;
      character.stats.constitution += 12;
      character.qiCapacity *= 1.8;
      character.core = { grade: 1, description: "A divine golden core forms, resonating with the laws of the cosmos themselves." };
      character.stats.lifespan  += 20;
    } else if (cap >= 12000){
      character.unallocatedPoints += 12;
      character.stats.constitution += 10;
      character.qiCapacity *= 1.55;
      character.core = { grade: 2, description: "Your golden core shines like a star, drawing the gaze of celestial beings." };
      character.stats.lifespan  += 20;
    } else if (cap >= 9750) {
      character.unallocatedPoints += 9;
      character.stats.constitution += 8;
      character.qiCapacity *= 1.30;
      character.core = { grade: 3, description: "An exceptional golden core forms, admired among mortals and envied by lesser sects." };
      character.stats.lifespan  += 15;
    } else if (cap >= 8250) {
      character.unallocatedPoints += 7;
      character.stats.constitution += 6;
      character.qiCapacity *= 1.15;
      character.core = { grade: 4, description: "A stable golden core emerges, ensuring a solid future though lacking brilliance." };
      character.stats.lifespan  += 15;
    } else {
      character.unallocatedPoints += 5;
      character.stats.constitution += 3;
      character.qiCapacity *= 1.09;
      character.core = { grade: 5, description: "A dim golden core takes shape, common among the masses who strive but fall short of legend." };
      character.stats.lifespan  += 10;
    }
  }

  if (cap === qi) {
    if (roll >= 5) {
      isBreak = true;
      setBodyLifespanPoints();
    } else {
      character.lostHealth += ((baseStatsOf.health / 100) * 50); 
    }
  } else if ((qi >= (3 * (cap / 4))) && (qi < cap)) {
    if (roll <= 35) {
      isBreak = true;
      setBodyLifespanPoints();
    } else {
      character.lostHealth += ((baseStatsOf.health / 100) * 65);
    }
  } else if ((qi < (3 * (cap / 4))) && (qi >=  (cap / 2))) {
    if (roll <= 10) {
      isBreak = true;
      setBodyLifespanPoints();
    } else {
      character.lostHealth += ((baseStatsOf.health / 100) * 95);
    }
  }

  const result = {
  id: Date.now(),
  title: isBreak
    ? `Age ${character.age}: Golden Core Formation: Success`
    : `Age ${character.age}: Golden Core Formation: Failed`,
  description: isBreak
    ? `You have formed a Golden Core of Grade ${character.core.grade}. ${character.core.description}`
    : 'Your attempt to form a Golden Core has failed, leaving your cultivation stagnant.',
  date: new Date().toISOString()
};

  character.lifeEvents.push(result);
  if (isBreak) {
    character.stage[3] = false;
    character.stage[4] = true;
    isBreak = false;
  }

  saveCharacter();
}
  

  $: equippedManual = character?.manuals
    ? character.manuals.find(m => m.equipped)?.title ?? 'None'
    : 'No Manual Eqipped';
  $: equippedManualMethod = character?.manuals
    ? character.manuals.find(m => m.equipped)?.method ?? 'None'
    : 'No Manual Eqipped';

  // Allocate unallocated points to stats
  function allocatePoint(key: keyof Character['stats']) {
    if (!character || character.unallocatedPoints <= 0) return;
    character.stats[key] += 1;
    character.unallocatedPoints -= 1;
    saveCharacter();
  }

  function performAction(def: LifeEventDef) {
  if (!character) return;

  const roll = Math.random() * 100;

  switch (def.title) {
    case 'Imagine':
      if (roll < 23) {
        character.stats.qiAffinity += 2;
      } else if (roll < 95) {
        character.stats.intelligence += 1;
      } else {
        character.stats.luck += 1;
      }
      break;
    case 'Play':
      if (roll < 1) {
        character.stats.luck += 2;
      } else if (roll < 10) {
        character.stats.charisma += 3;
      } else if (roll < 50) {
        character.stats.constitution += 1;
      } else {
        character.stats.strength += 1;
      }
      break;
    case 'Observe':
      if (roll < 69) {
        character.stats.intelligence += 1;
      } else if (roll < 99) {
        character.stats.charisma += 2;
      } else {
        character.stats.luck += 2;
      }
      break;
    case 'Train Meridians':
      if (roll <= 30){
        character.qiCapacity += character.stats.qiAffinity * 0.8 * realmNumber;
      } else if ((roll <= 95) && (roll > 30)) {
        character.qiCapacity += character.stats.qiAffinity * 1.2 * realmNumber;
      } else if ((roll <= 100) && (roll > 95)) {
        character.qiCapacity += character.stats.qiAffinity * 2 * realmNumber;
      }

      break;
      
    case 'Gather Qi':
      if (equippedManual === "Basic Qi Manual"){
        character.qiPoints += Math.round(character.stats.qiAffinity * 1.5 * realmNumber);
      }
      if (character.qiPoints >= character.qiCapacity){
        character.qiPoints = character.qiCapacity;
      }
      break;

    case 'Explore':
      const eRoll = Math.random() * 100;

      if (character.stage[1]) {
        if (eRoll >= 0) {
          //herb
          triggerHerbEvent();
        } else if ((eRoll >= 20) && (eRoll < 85)) {
          //battle


        } else if ((eRoll >= 30) && (eRoll < 35)) {
          //encounter
          
        } else {
          //nothing
        }
        
      } else if (character.stage[2]) {

      } else if (character.stage[3]) {

      } else if (character.stage[4]) {

      }
      break;
  }

  character.lifeEvents.push({
    id: Date.now() + Math.random(),
    title: `Age ${character.age}: ${def.title}`,
    description: def.description,
    date: new Date().toISOString()
  });
}

  // Weighted picker: uses 'weight' field
  function weightedPick(pool: LifeEventDef[]): LifeEventDef {
    const total = pool.reduce((sum, e) => sum + (e.weight ?? 0), 0);
    let r = Math.random() * total;
    for (const e of pool) {
      r -= e.weight ?? 0;
      if (r <= 0) return e;
    }
    return pool[pool.length - 1];
  }

  function rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
   
  // Advance one year and award points
  function advanceYear() {
    if (!character) return;
    character.age++;

    if (character.qiPoints > character.qiCapacity) {
      character.qiPoints =  character.qiCapacity;
    }

    character.stats.lifespan--;
    // apply selected actions
    selectedActions.forEach(def => performAction(def));
    
    // clear after applying
    selectedActions = [];

    const eventsThisYear: LifeEventDef[] = [];
    if (character.age < 16) {
      eventsThisYear.push(weightedPick(childhoodEvents));
    }
    chronologicalEvents.forEach(def => {
      if (def.ageTrigger === character.age) eventsThisYear.push(def);
    });
    if (character.age >= 16) {
      const isGood = Math.random() < 0.5;
      let pool = [...chanceEvents, ...injuryEvents, ...worldEvents];
      if (character.lifeEvents.some(e => e.title.includes('Learn Cultivation'))) pool.push(...sectEvents);
      pool = pool.filter(e => e.good === isGood);
      const nothing = [...chanceEvents, ...injuryEvents, ...worldEvents, ...sectEvents].find(e => e.title === 'Nothing happens');
      const count = rand(1, 3);
      for (let i = 0; i < count; i++) {
        const pickPool = nothing ? pool.concat(nothing) : pool;
        const pick = weightedPick(pickPool);
        eventsThisYear.push(pick);
        if (pick.title === 'Nothing happens') break;
      }
    }
    eventsThisYear.forEach(def => {
      character!.qiPoints += def.pointsReward;
      if (def.good) character!.unallocatedPoints += def.pointsReward;
      character!.lifeEvents.push({
        id: Date.now() + Math.random(),
        title: `Age ${character!.age}: ${def.title}`,
        description: def.description,
        date: new Date().toISOString()
      });
    });

    character.lostHealth -= (baseStatsOf.health / 5);
    if (character.lostHealth < 0) {
      character.lostHealth = 0;
    } 
    saveCharacter();
    selectedActions = [];
  }

  function resetCharacter() {
    if (confirm('Reset character and start over?')) {
      localStorage.removeItem('cultivationCharacter');
      goto('/');
    }
  }



  onMount(() => {
    const stored = localStorage.getItem('cultivationCharacter');
    if (!stored) {
      alert('No character found. Redirecting...');
      goto('/');
      return;
    }
    character = JSON.parse(stored);
    character.age ??= 0;
    character.spiritstones ??= 0;
    character.unallocatedPoints ??= 0;
    character.qiPoints ??= 0;
    character.usedStam  ??= 0;
    character.lostHealth ??= 0;
    if (!Array.isArray(character.stage) || character.stage.length !== 12) {
    character.stage = Array(12).fill(false);

    }
    if (!character.lifeEvents || character.lifeEvents.length === 0) {
      const birth: LifeEvent = { id: Date.now(), title: 'Age 0: Birth', description: 'You were born.', date: character.createdAt };
      character.lifeEvents = [birth];
      saveCharacter();
    }
    if (character.manuals.length < 1){
      character.manuals = []
    }
  });



  $: realmNumber = character
  ? character.stage.findIndex(flag => flag === true) : 0;

  $: baseStatsOf = character
  ? {
      health: Math.round(character.stats.constitution * 4 * realmNumber),
      stamina:
        Math.round(((character.stats.constitution + character.stats.dexterity) / 2) *  realmNumber),
      dodge:
      ((((character.stats.dexterity / 8) * realmNumber) / 2) / 1000).toFixed(2),
      pAttack: Math.round(character.stats.strength * 2 * realmNumber),
      sAttack:
        Math.round((character.stats.qiAffinity + character.stats.intelligence / 2) * (character.qiPoints * 0.005)),
      pDef: Math.round(((character.stats.strength + character.stats.constitution) * 1.5) * realmNumber),
      sDef: Math.round(((character.stats.qiAffinity + character.stats.intelligence) * 1.5) * realmNumber),
      persuasion: ((((character.stats.charisma / 4) * realmNumber) / 2) / 1000).toFixed(2),
    }
  : {
      health: 0,
      stamina: 0,
      speed: 0,
      dodge: 0,
      vdodge: 0,
      pAttack: 0,
      sAttack: 0,
      pDef:  0,
      sDef:  0,
      persuasion: 0
    };

  $: currStam = character
  ? {
     c: baseStatsOf.stamina - character.usedStam
  }
  : {
    c: baseStatsOf.stamina
  }

  $: currHealth = character
  ? {
     c: baseStatsOf.health - character.lostHealth
  }
  : {
    c: baseStatsOf.health
  }

  
  

    //event buttons
  //learn-cultivation
  // manual selection buttons
  function exitLearnCultivation() {
    document.getElementById( 'learn-cultivation' ).style.display = 'none';
  }

  function addBasicQiManual() {
    const newManual: Manual = {
      title: 'Basic Qi Manual',
      equipped: true,
      method: 'character.stats.qiAffinity',
      methodInfo: 'Qi Affinity is the base, Qi is the tree, Holding the world'
    };

    // If somehow it's still undefined, fall back to []
    const existing = Array.isArray(character.manuals)
      ? character.manuals
      : [];

    // Spread into a new array so Svelte re‑renders
    character.manuals = [...existing, newManual];

    document.getElementById( 'basic-qi-manual-button' ).style.display = 'none'
  }

  //herb function
  function weightedPickHerb(pool: ExploreHerbEventDef[]): ExploreHerbEventDef {
  const totalWeight = pool.reduce((sum, e) => sum + e.weight, 0);
  let r = Math.random() * totalWeight;
  for (const e of pool) {
    r -= e.weight;
    if (r <= 0) return e;
  }
  return pool[pool.length - 1];
  }

  function canCollectHerb(herb: ExploreHerbEventDef): boolean {
  return Object.entries(herb.statRequirements).every(
    ([stat, req]) => (character.stats[stat] ?? 0) >= req
  );
  }

  function collectHerb(windowId: number) {
    const window = activeHerbWindows.find(w => w.id === windowId);
    if (!window) return;

    // Apply rewards
    for (const [stat, value] of Object.entries(window.herb.rewards)) {
      if (stat === 'qiCapacityPercent') {
        character.qiCapacity = Math.floor(character.qiCapacity * (1 + value / 100));
      } else if (stat in character.stats) {
        character.stats[stat] += value;
      } else if (stat === 'qiPoints') {
        character.qiPoints += value;
      }
    }

    // Add life event
    character.lifeEvents.push({
      id: Date.now(),
      title: `Age ${character.age}: Collected ${window.herb.name}`,
      description: `You successfully collected the ${window.herb.name}. ${window.herb.description}`,
      date: new Date().toISOString()
    });

    activeHerbWindows = activeHerbWindows.filter(w => w.id !== windowId);
    saveCharacter();
  }

  function giveUpHerb(windowId: number) {
    const window = activeHerbWindows.find(w => w.id === windowId);
    if (!window) return;

    character.lifeEvents.push({
      id: Date.now(),
      title: `Age ${character.age}: Gave up ${window.herb.name}`,
      description: `You chose to leave the ${window.herb.name} untouched.`,
      date: new Date().toISOString()
    });

    activeHerbWindows = activeHerbWindows.filter(w => w.id !== windowId);
    saveCharacter();
  }

  function triggerHerbEvent() {
    const herb = weightedPickHerb(exploreHerbEvents);
    activeHerbWindows = [...activeHerbWindows, { id: Date.now() + Math.random(), herb }];
  }
</script>

<main>
  {#if character}
    <div class="character-info-container">
      <h1>🌿 Life of {character.name}</h1>
      <p>Age: {character.age}</p>
      <p>Realm: {realmNumber - 1}</p>
      {#if character.body}
        <p>Body: {character.body.grade}</p>
        <p>{character.body.description}</p>
      {/if}
      {#if character.core}
        <p>Core: {character.core.grade}</p>
        <p>{character.core.description}</p>
      {/if}

      <p>Lifespan: {character.stats.lifespan}</p>
      <p>Unallocated Points: {character.unallocatedPoints}</p>
      {#if character.age >= 5}
        <p>Manual: {equippedManual}</p>
      {/if}

      <section class="stats">
        <h3>Attributes</h3>
        <ul>
          {#each Object.entries(character.stats) as [key, value]}
            <li>
              <strong style="flex:1;">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </strong>
              <span>{value}</span>
              {#if character.unallocatedPoints > 0}
                <button type="button" onclick={() => allocatePoint(key)}>
                  +1
                </button>
              {/if}
            </li>
          {/each}
        </ul>

        <h3>Stats</h3>
        <ul>
          <li>
            <strong>Health:</strong>
            <span>{currHealth.c}/{baseStatsOf.health}</span>
          </li>
          <li>
            <strong>Qi:</strong>
            <span>{Math.round(character.qiPoints)}/{Math.round(character.qiCapacity)}</span>
          </li>
          <li>
            <strong>Stamina:</strong>
            <span>{currStam.c}/{baseStatsOf.stamina}</span>
          </li>
          <li>
            <strong>Pyhsical Attack:</strong>
            <span>{baseStatsOf.pAttack}</span>
          </li>
          <li>
            <strong>Spiritual Attack:</strong>
            <span>{baseStatsOf.sAttack}</span>
          </li>
          <li>
            <strong>Pyhsical Defense:</strong>
            <span>{baseStatsOf.pDef}</span>
          </li>
          <li>
            <strong>Spiritual Defense:</strong>
            <span>{baseStatsOf.sDef}</span>
          </li>
          <li>
            <strong>Dodge:</strong>
            <span>{baseStatsOf.dodge}%</span>
          </li>
          <li>
            <strong>Persuasion:</strong>
            <span>{baseStatsOf.persuasion}%</span>
          </li>
          <br />
        </ul>
      </section>
    </div>

    <section class="life-events">
      <h2>Life Events</h2>
      <ul>
        {#each groupedLifeEvents as item}
          <li>
            <strong>
              {item.event.title}{item.count > 1 ? ` ×${item.count}` : ""}
            </strong>
            <span> - {new Date(item.event.date).toLocaleDateString()}</span>
            <p>{item.event.description}</p>
          </li>
        {/each}
      </ul>
    </section>

    <div class="main-action-container">
      <!-- Action buttons to choose actions -->
      <section class="actions">
        <h2>Actions (choose up to 3)</h2>
        <div class="actions-container">
          {#if character.age < 5}
            {#each actionEvents5 as act}
              <button
                type="button"
                onclick={() => selectAction(act)}
                disabled={selectedActions.length >= 3}
              >
                {act.title}
              </button>
            {/each}
          {/if}

          {#if character.age >= 5}
            {#each actionEvents5Up as act}
              <button
                type="button"
                onclick={() => selectAction(act)}
                disabled={selectedActions.length >= 3}
              >
                {act.title}
              </button>
            {/each}
          {/if}
        </div>
      </section>
      <!-- Selected actions display -->
      <section class="selected-actions">
        <h2>Selected Actions</h2>
        <button
          type="button"
          onclick={clearSelectedActions}
          disabled={selectedActions.length === 0}
        >
          Clear
        </button>
        <div class="selected-actions-container">
          {#each selectedActions as act}
            <ul>
              <li>{act.title}</li>
            </ul>
          {/each}
        </div>
      </section>
    </div>

    <!-- Controls unchanged -->
    <div class="controls">
      {#if character.stats.lifespan > 0}
        <button onclick={advanceYear}>Next Year</button>
      {/if}
      <button onclick={resetCharacter}>🔄 Reset Character</button>
      {#if character.age >= 5}
        <button popovertarget="manuals">Manuals</button>
      {/if}
      {#if (character.stage[1]) && character.qiPoints > 500}
        <button onclick={tryBreakthroughQiRef}>Breakthrough Qi Refinement</button>
      {/if}
      {#if (character.stage[2]) && character.qiPoints > 1500}
        <button onclick={tryBreakthroughFoundation}>Breakthrough Foundation</button>
      {/if}
      {#if (character.stage[3]) && character.qiPoints > 7500}
        <button onclick={tryBreakthroughGoldenCore}>Breakthrough Golden Core</button>
      {/if}
    </div>

    <div class="event-panels-container"></div>       
    {#if character.age === 5}
      <div class="learn-cultivation" id="learn-cultivation">
        <button onclick={addBasicQiManual} id="basic-qi-manual-button"
          >Basic Qi Manual</button
        >
        <p style="color: red;">
          If you do not select a manual you may not get another chance!
        </p>
        <button onclick={exitLearnCultivation}>Exit</button>
      </div>
    {/if}    
    <div popover id="manuals">
      {#if character.manuals}
        {#each character.manuals as manual}
          <p>Manual: {manual.title}</p>
          <p>Method: {manual.methodInfo}</p>
        {/each}
      {:else}
        <p>No Manuals Aquired</p>
      {/if}
      <button popovertarget="manuals">Exit</button>
    </div>
  {/if}

  {#each activeHerbWindows as window (window.id)}
  <div class="herb-window">
    <h2>Age {character.age}: {window.herb.name}</h2>
    <p>{window.herb.description}</p>
    <h3>Stat Requirements:</h3>
    <ul>
      {#each Object.entries(window.herb.statRequirements) as [stat, req]}
        <li>{stat}: {character.stats[stat] ?? 0} / {req}</li>
      {/each}
    </ul>
    <button onclick={() => collectHerb(window.id)} disabled={!canCollectHerb(window.herb)}>Collect</button>
    <button onclick={() => giveUpHerb(window.id)}>Give Up</button>
  </div>
{/each}
</main>

<!-- panels for events -->

<!-- button ui panels -->

<style>
  main {
    margin: 2rem;
    padding: 2rem;
    background-color: #999;
    color: black;
    display: flex;
    flex-direction: row;
  }

  .life-events {
    width: 384px;
    height: 768px;
    border-radius: 0.75rem;
    background-color: whitesmoke;
    padding: 1rem;
    margin-right: 1rem;
    overflow-y: scroll;
  }

  .character-info-container {
    height: 768px;
    border-radius: 0.75rem;
    background-color: whitesmoke;
    padding: 1rem;
    margin-right: 1rem;
  }
  .main-action-container {
    height: 768px;
    border-radius: 0.75rem;
    background-color: whitesmoke;
    padding: 1rem;
    margin-right: 1rem;
  }

  .actions-container > button {
    margin-right: 1rem;
  }

  /* event panels */
  .event-panels-container > div {
    /* display: none; */
  }

  .learn-cultivation {
    position: absolute;
    left: 4rem;
    right: 4rem;
    top: 4rem;
    bottom: 4rem;
    display: flex;
    flex-direction: column;
    background-color: #999;
    border: black 0.5rem solid;
    border-radius: 0.5rem;
  }

  /* button ui panels */
  .herb-window {
  position: fixed;
  top: 20%;
  left: 20%;
  width: 60%;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}
</style>
