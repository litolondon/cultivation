<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
 

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
    weight: number;
    statRequirements: Record<string, number>;
  };

  type Treasure = {
    id: number;
    equipped: boolean;
    name: string;
    grade: string;
    description: string;
    inheritanceOf: string;
    stats: Record<string, number>;
    weight: number;
    statRequirements: Record<string, number>;
  }

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
    addedStats: Record<string, number>;
    statsOf: Record<string, number>;
    createdAt: string;
    spiritstones: number;
    age: number;
    heir: string;
    lifespan: number;
    unallocatedPoints: number;
    lifeEvents: LifeEvent[];       
    stage: boolean[];  // which stage
    qiPoints: number;  
    qiCapacity: number;
    usedStam: number;
    lostHealth: number;
    manuals: Manual[]
    treasures: Treasure[];
    body: Body;
    core: Core;
  };


  let window: {
    id: number;
    treasure: Treasure | Manual;
    type: "treasure" | "manual";
  }   

  let actionCount = 0;
  let activeHerbWindows: { id: number, herb: ExploreHerbEventDef }[] = [];
  let activeTreasureWindows: { id: number; treasure: Treasure | Manual; type: 'treasure' | 'manual' }[] = [];
  $: hasStarterManual = character?.manuals?.some(m => m.title === starterManuals[character.heir]?.title) ?? false;

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

  const starterManuals: Record<string, Manual> = {
    'Cultivation': {
      title: 'Celestial Foundation Sutra',
      equipped: false,
      method: 'Orthodox',
      methodInfo: 'A respected cultivation clan\'s beginner sutra, focusing on harmonizing qi and laying a firm foundation.',
      weight: 0.3,
      statRequirements: { qiAffinity: 5 }
    },
    'Rich': {
      title: 'Wealth-Backed Qi Method',
      equipped: false,
      method: 'Orthodox',
      methodInfo: 'A method known among aristocratic families, allowing rapid but unstable qi accumulation through lavish resources.',
      weight: 0.3,
      statRequirements: { qiAffinity: 3, luck: 3 }
    },
    'Humble': {
      title: 'Grassroots Breathing Art',
      equipped: false,
      method: 'Common',
      methodInfo: 'A basic breathing art known among peasants, simple yet steady and reliable.',
      weight: 0.3,
      statRequirements: { constitution: 3 }
    }
  };

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

  const swordTreasures: Treasure[] = [
    {
      id: 1,
      equipped: false,
      name: 'Rustling Bamboo Sword',
      grade: 'Mortal',
      description: 'A simple bamboo sword that assists beginners in stabilizing their qi.',
      inheritanceOf: 'Ancient Farmer Sect',
      stats: { qiAffinity: 5 },
      weight: 0.5,
      statRequirements: { strength: 5 }
    },
    {
      id: 2,
      equipped: false,
      name: 'Cloud Drizzle Sword',
      grade: 'Mortal',
      description: 'A sword that hums gently, nurturing the cultivator’s spirit.',
      inheritanceOf: 'Cloud Drizzle Sect',
      stats: { qiAffinity: 5 },
      weight: 0.5,
      statRequirements: { intelligence: 5 }
    },
    {
      id: 3,
      equipped: false,
      name: 'Emerald Fang Sword',
      grade: 'Mortal',
      description: 'Basic sword that increases qi flow during duels.',
      inheritanceOf: 'Fang Clan',
      stats: { qiAffinity: 5 },
      weight: 0.5,
      statRequirements: { strength: 5 }
    },
    {
      id: 4,
      equipped: false,
      name: 'Tiger Roar Sword',
      grade: 'Earth',
      description: 'Resonates like a roaring tiger, boosting cultivation speed.',
      inheritanceOf: 'Tiger Howl Sect',
      stats: { qiAffinity: 10, strength: 5 },
      weight: 1,
      statRequirements: { strength: 10, qiAffinity: 8 }
    },
    {
      id: 5,
      equipped: false,
      name: 'Celestial Phoenix Blade',
      grade: 'Heaven',
      description: 'A divine sword that amplifies cultivation and burns impurities.',
      inheritanceOf: 'Phoenix Sacred Palace',
      stats: { qiAffinity: 15, intelligence: 5 },
      weight: 2,
      statRequirements: { qiAffinity: 15, intelligence: 10 }
    }
  ];

  const cultivationManuals: Manual[] = [
    // Orthodox Manuals
    {
      title: 'Flowing River Method',
      equipped: false,
      method: 'Orthodox',
      methodInfo: 'A gentle orthodox method focusing on calm qi flow.',
      weight: 0.4,
      statRequirements: { qiAffinity: 5 }
    },
    {
      title: 'Mountain Iron Scripture',
      equipped: false,
      method: 'Orthodox',
      methodInfo: 'Earth-grade orthodox scripture that tempers the body.',
      weight: 0.6,
      statRequirements: { strength: 10 }
    },
    {
      title: 'Celestial Pure Heart Sutra',
      equipped: false,
      method: 'Orthodox',
      methodInfo: 'Heaven-grade orthodox sutra that harmonizes mind and qi.',
      weight: 1,
      statRequirements: { qiAffinity: 15, intelligence: 10 }
    },

    // Unorthodox Manuals
    {
      title: 'Blood Thorn Chant',
      equipped: false,
      method: 'Unorthodox',
      methodInfo: 'A ruthless earth-grade unorthodox method boosting qi through pain.',
      weight: 0.6,
      statRequirements: { constitution: 12 }
    },
    {
      title: 'Bone Whispering Method',
      equipped: false,
      method: 'Unorthodox',
      methodInfo: 'A sinister method of earth grade, consuming one’s life for qi bursts.',
      weight: 0.6,
      statRequirements: { constitution: 12 }
    },

    // Very Rare Manuals
    {
      title: 'Demon Emperor Scripture',
      equipped: false,
      method: 'Demon',
      methodInfo: 'Forbidden demon method corrupting qi into demonic energy.',
      weight: 1.5,
      statRequirements: { strength: 15, qiAffinity: 15 }
    },
    {
      title: 'Sky Immortal Sutra',
      equipped: false,
      method: 'Heaven',
      methodInfo: 'Heaven-grade rare manual believed to lead to immortality itself.',
      weight: 2,
      statRequirements: { qiAffinity: 18, intelligence: 15 }
    }
  ];

  const artifactTreasures: Treasure[] = [
    // Heaven Grade (2)
    {
      id: 101,
      equipped: false,
      name: 'Nine Heavens Mirror',
      grade: 'Heaven',
      description: 'Reflects and absorbs celestial energies.',
      inheritanceOf: 'Heavenly Realm',
      stats: { qiAffinity: 15, luck: 5 },
      weight: 2,
      statRequirements: { qiAffinity: 15, intelligence: 12 }
    },
    {
      id: 102,
      equipped: false,
      name: 'Void Suppressing Bell',
      grade: 'Heaven',
      description: 'Shakes the void, greatly enhancing cultivation speed.',
      inheritanceOf: 'Void Palace',
      stats: { qiAffinity: 15 },
      weight: 2,
      statRequirements: { qiAffinity: 15, constitution: 15 }
    },

    // Earth Grade (4)
    {
      id: 103,
      equipped: false,
      name: 'Dragon Coiling Banner',
      grade: 'Earth',
      description: 'Summons fierce qi winds around the user.',
      inheritanceOf: 'Dragon Banner Sect',
      stats: { qiAffinity: 10 },
      weight: 1,
      statRequirements: { strength: 10 }
    },
    {
      id: 104,
      equipped: false,
      name: 'Soul Shaking Gong',
      grade: 'Earth',
      description: 'Disrupts opponents while boosting qi circulation.',
      inheritanceOf: 'Ancient Soul Sect',
      stats: { qiAffinity: 10, luck: 3 },
      weight: 1,
      statRequirements: { constitution: 10 }
    },
    {
      id: 105,
      equipped: false,
      name: 'Spirit Guard Talisman',
      grade: 'Earth',
      description: 'Protects the user while enhancing qi flow.',
      inheritanceOf: 'Guardian Sect',
      stats: { qiAffinity: 10 },
      weight: 1,
      statRequirements: { qiAffinity: 10 }
    },
    {
      id: 106,
      equipped: false,
      name: 'Blazing Fire Banner',
      grade: 'Earth',
      description: 'Burns away impurities while hastening cultivation.',
      inheritanceOf: 'Fire Domain',
      stats: { qiAffinity: 10, strength: 3 },
      weight: 1,
      statRequirements: { strength: 10 }
    },

    // Mortal Grade (7)
    {
      id: 107,
      equipped: false,
      name: 'Reflecting Mist Mirror',
      grade: 'Mortal',
      description: 'Helps in focusing qi during meditation.',
      inheritanceOf: 'Mist Valley',
      stats: { qiAffinity: 5 },
      weight: 0.5,
      statRequirements: { qiAffinity: 5 }
    },
    {
      id: 108,
      equipped: false,
      name: 'Stone Chime Bell',
      grade: 'Mortal',
      description: 'Its sound harmonizes qi flow.',
      inheritanceOf: 'Stone Chime Pavilion',
      stats: { qiAffinity: 5 },
      weight: 0.5,
      statRequirements: { constitution: 5 }
    },
    {
      id: 109,
      equipped: false,
      name: 'Amber Seal',
      grade: 'Mortal',
      description: 'Boosts stability during cultivation breakthroughs.',
      inheritanceOf: 'Amber Sect',
      stats: { qiAffinity: 5 },
      weight: 0.5,
      statRequirements: { qiAffinity: 5 }
    },
    {
      id: 110,
      equipped: false,
      name: 'Wood Spirit Drum',
      grade: 'Mortal',
      description: 'Boosts stamina and cultivation.',
      inheritanceOf: 'Wood Spirit Clan',
      stats: { qiAffinity: 5, strength: 2 },
      weight: 0.5,
      statRequirements: { constitution: 5 }
    },
    {
      id: 111,
      equipped: false,
      name: 'Silk Binding Banner',
      grade: 'Mortal',
      description: 'Slows enemies while nurturing the user’s qi.',
      inheritanceOf: 'Silken Mist Sect',
      stats: { qiAffinity: 5 },
      weight: 0.5,
      statRequirements: { luck: 5 }
    },
    {
      id: 112,
      equipped: false,
      name: 'Moonlight Reflecting Flag',
      grade: 'Mortal',
      description: 'Gently boosts qi flow during nighttime cultivation.',
      inheritanceOf: 'Moonlight Pavilion',
      stats: { qiAffinity: 5 },
      weight: 0.5,
      statRequirements: { qiAffinity: 5 }
    },
    {
      id: 113,
      equipped: false,
      name: 'Iron Whisper Talisman',
      grade: 'Mortal',
      description: 'Enhances concentration while subtly improving qi flow.',
      inheritanceOf: 'Iron Whisper Sect',
      stats: { qiAffinity: 5 },
      weight: 0.5,
      statRequirements: { intelligence: 5 }
    }
  ];

  //pool combinations
  const treasurePools = [...swordTreasures, ...artifactTreasures];
  const manualPools = [...cultivationManuals];

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
    : 'No Manual Equipped';
  $: equippedManualMethod = character?.manuals
    ? character.manuals.find(m => m.equipped)?.method ?? 'None'
    : 'No Manual Equipped';
  $: equippedTreasure = character?.treasures
    ? character.treasures.find(t => t.equipped)?.name ?? 'None'
    : 'No Treasure Equipped';

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
  if (equippedManual === "Grassroots Breathing Art") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 1.3 * realmNumber);

  } else if (equippedManual === "Wealth-Backed Qi Method") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 1.5 * (realmNumber + 1));

  } else if (equippedManual === "Celestial Foundation Sutra") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 1.8 * realmNumber);

  } else if (equippedManual === "Flowing River Method") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 1.5 * realmNumber);

  } else if (equippedManual === "Mountain Iron Scripture") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 1.7 * realmNumber);
    character.qiPoints += Math.round(getEffectiveStat('constitution') * 0.5);

  } else if (equippedManual === "Celestial Pure Heart Sutra") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 2.2 * realmNumber);
    character.qiPoints += Math.round(getEffectiveStat('intelligence') * 0.7);

  } else if (equippedManual === "Blood Thorn Chant") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 1.9 * realmNumber);
    character.lostHealth += 5;

  } else if (equippedManual === "Bone Whispering Method") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 1.8 * realmNumber);
    character.stats.constitution = Math.max(1, Math.floor(getEffectiveStat('constitution') * 0.9));

  } else if (equippedManual === "Demon Emperor Scripture") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 2.5 * realmNumber);
    character.qiPoints += Math.round(getEffectiveStat('strength') * 0.5);
    character.lostHealth += 10;

  } else if (equippedManual === "Sky Immortal Sutra") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 3 * realmNumber);
    character.qiPoints += Math.round(getEffectiveStat('intelligence') * 0.9);

  } else if (equippedTreasure === "Rustling Bamboo Sword") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 1.2 * realmNumber);

  } else if (equippedTreasure === "Cloud Drizzle Sword") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 1.3 * realmNumber);

  } else if (equippedTreasure === "Emerald Fang Sword") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 1.25 * realmNumber);

  } else if (equippedTreasure === "Tiger Roar Sword") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 1.7 * realmNumber);
    character.usedStam += 5;

  } else if (equippedTreasure === "Celestial Phoenix Blade") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 2.5 * realmNumber);
    character.qiPoints += Math.round(getEffectiveStat('intelligence') * 0.5);

  } else if (equippedTreasure === "Nine Heavens Mirror") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 2.5 * realmNumber);
    character.qiPoints += Math.round(getEffectiveStat('luck') * 0.5);

  } else if (equippedTreasure === "Void Suppressing Bell") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 2.4 * realmNumber);

  } else if (equippedTreasure === "Dragon Coiling Banner") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 1.8 * realmNumber);

  } else if (equippedTreasure === "Soul Shaking Gong") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 1.8 * realmNumber);
    character.qiPoints += Math.round(getEffectiveStat('luck') * 0.2);

  } else if (equippedTreasure === "Spirit Guard Talisman") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 1.8 * realmNumber);

  } else if (equippedTreasure === "Blazing Fire Banner") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 1.8 * realmNumber);
    character.qiPoints += Math.round(getEffectiveStat('strength') * 0.3);

  } else if (equippedTreasure === "Reflecting Mist Mirror") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 1.2 * realmNumber);

  } else if (equippedTreasure === "Stone Chime Bell") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 1.2 * realmNumber);

  } else if (equippedTreasure === "Amber Seal") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 1.2 * realmNumber);

  } else if (equippedTreasure === "Wood Spirit Drum") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 1.2 * realmNumber);
    character.qiPoints += Math.round(getEffectiveStat('strength') * 0.1);

  } else if (equippedTreasure === "Silk Binding Banner") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 1.2 * realmNumber);

  } else if (equippedTreasure === "Moonlight Reflecting Flag") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 1.2 * realmNumber);

  } else if (equippedTreasure === "Iron Whisper Talisman") {
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 1.2 * realmNumber);
    character.qiPoints += Math.round(getEffectiveStat('intelligence') * 0.1);

  } else {
    // No bonuses applied (default fallback)
    character.qiPoints += Math.round(getEffectiveStat('qiAffinity') * 1.0 * realmNumber);
  }

  // Ensure not over capacity
  if (character.qiPoints >= character.qiCapacity) {
    character.qiPoints = character.qiCapacity;
  }
  break;


    case 'Explore':
      const eRoll = Math.random() * 100;

      if (character.stage[1]) {
        if (eRoll >= 0) {
          //herb
          // triggerHerbEvent();
          triggerTreasureEvent();
        } else if ((eRoll >= 20) && (eRoll < 85)) {
          //battle


        } else if ((eRoll >= 30) && (eRoll < 35)) {
          //encounter
          
        } else if ((eRoll >= 20) && (eRoll < 25)) {
          //treasure
          triggerTreasureEvent();
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
    character.manuals ??= [];
    character.treasures ??= [];
    if (!Array.isArray(character.stage) || character.stage.length !== 12) {
    character.stage = Array(12).fill(false);

    }
    if (!character.lifeEvents || character.lifeEvents.length === 0) {
      const birth: LifeEvent = { id: Date.now(), title: 'Age 0: Birth', description: 'You were born.', date: character.createdAt };
      character.lifeEvents = [birth];
      saveCharacter();
    }
    
  });


    //event buttons
  //learn-cultivation
  // manual selection buttons
  function exitLearnCultivation() {
    document.getElementById( 'learn-cultivation' ).style.display = 'none';
  }

  function addBasicQiManual() {
    if (!character || !character.heir) return;

    const newManual = starterManuals[character.heir];
    if (!newManual) return;

    if (character.manuals.some(m => m.title === newManual.title)) return;

    character.manuals = [...character.manuals, newManual];

    character.lifeEvents.push({
      id: Date.now(),
      title: `Age 5: Inherited ${newManual.title}`,
      description: `You received your family's ${newManual.method} method: ${newManual.title}.`,
      date: new Date().toISOString()
    });

  saveCharacter();
  }

  function equipManual(manualTitle: string) {
    if (!character?.manuals) return;

    const manualToEquip = character.manuals.find(m => m.title === manualTitle);
    if (!manualToEquip) return;

    const meetsRequirements = Object.entries(manualToEquip.statRequirements).every(([stat, req]) => {
      return (character.stats[stat] ?? 0) >= req;
    });

    if (!meetsRequirements) {
      alert(`You do not meet the requirements to cultivate ${manualTitle}.`);
      return;
    }

    character.manuals = character.manuals.map(m => ({ ...m, equipped: m.title === manualTitle }));

    refreshAddedStats();

    character.lifeEvents.push({
      id: Date.now(),
      title: `Equipped ${manualTitle}`,
      description: `You have chosen to cultivate using the ${manualTitle} method.`,
      date: new Date().toISOString()
    });

    saveCharacter();
  }



  function equipTreasure(treasureId: number) {
    if (!character?.treasures) return;

    const treasureToEquip = character.treasures.find(t => t.id === treasureId);
    if (!treasureToEquip) return;

    const meetsRequirements = Object.entries(treasureToEquip.statRequirements).every(([stat, req]) => {
      return (character.stats[stat] ?? 0) >= req;
    });

    if (!meetsRequirements) {
      alert(`You do not meet the requirements to equip ${treasureToEquip.name}.`);
      return;
    }

    character.treasures = character.treasures.map(t => ({ ...t, equipped: t.id === treasureId }));

    refreshAddedStats();

    character.lifeEvents.push({
      id: Date.now(),
      title: `Equipped ${treasureToEquip.name}`,
      description: `You equipped the treasure, focusing its aura on your cultivation.`,
      date: new Date().toISOString()
    });

    saveCharacter();
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

  //treasure / manual function

  function weightedPickTreasure(pool: Treasure[]): Treasure {
    const totalWeight = pool.reduce((sum, t) => sum + t.weight, 0);
    let r = Math.random() * totalWeight;
    for (const t of pool) {
      r -= t.weight;
      if (r <= 0) return t;
    }
    return pool[pool.length - 1];
  }

  function weightedPickManual(pool: Manual[]): Manual {
    const totalWeight = pool.reduce((sum, m) => sum + m.weight, 0);
    let r = Math.random() * totalWeight;
    for (const m of pool) {
      r -= m.weight;
      if (r <= 0) return m;
    }
    return pool[pool.length - 1];
  }

  function triggerTreasureEvent() {
    const poolType = Math.random() < 0.7 ? 'treasure' : 'manual'; // 70% treasure, 30% manual

    if (poolType === 'treasure') {
      const treasure = weightedPickTreasure(treasurePools);
      activeTreasureWindows = [...activeTreasureWindows, { id: Date.now() + Math.random(), treasure, type: 'treasure' }];
    } else {
      const manual = weightedPickManual(manualPools);
      activeTreasureWindows = [...activeTreasureWindows, { id: Date.now() + Math.random(), treasure: manual, type: 'manual' }];
    }
  }

  function collectTreasure(winId: number) {
    if (!character) return;

    const win = activeTreasureWindows.find(w => w.id === winId);
    if (!win) return;

    if (win.type === 'treasure') {
      const treasure = win.treasure as Treasure;

      const alreadyOwned = character.treasures.some(t => t.id === treasure.id);
      if (!alreadyOwned) {
        character.treasures = [...character.treasures, treasure];

        character.lifeEvents.push({
          id: Date.now(),
          title: `Age ${character.age}: Acquired ${treasure.name}`,
          description: `You obtained the ${treasure.name}.`,
          date: new Date().toISOString()
        });
      }

    } else if (win.type === 'manual') {
      const manual = win.treasure as Manual;

      const alreadyOwned = character.manuals.some(m => m.title === manual.title);
      if (!alreadyOwned) {
        character.manuals = [...character.manuals, manual];

        character.lifeEvents.push({
          id: Date.now(),
          title: `Age ${character.age}: Acquired ${manual.title}`,
          description: `You learned the ${manual.title}.`,
          date: new Date().toISOString()
        });
      }
    }

    activeTreasureWindows = activeTreasureWindows.filter(w => w.id !== winId);

    saveCharacter();
  }



  function giveUpTreasure(windowId: number) {
    const window = activeTreasureWindows.find(w => w.id === windowId);
    if (!window) return;

    character.lifeEvents.push({
      id: Date.now(),
      title: `Age ${character.age}: Gave up ${window.type === 'treasure' ? (window.treasure as Treasure).name : (window.treasure as Manual).title}`,
      description: `You chose to give up the ${window.type === 'treasure' ? (window.treasure as Treasure).name : (window.treasure as Manual).title}.`,
      date: new Date().toISOString()
    });

    activeTreasureWindows = activeTreasureWindows.filter(w => w.id !== windowId);
    saveCharacter();
  }

  function refreshAddedStats() {
    if (!character) return;

    // Step 1: Reset all added stats
    character.addedStats = {};

    // Step 2: Apply equipped treasure bonuses
    const equippedTreasure = character.treasures.find(t => t.equipped);
    if (equippedTreasure) {
      for (const [stat, value] of Object.entries(equippedTreasure.stats)) {
        character.addedStats[stat] = (character.addedStats[stat] ?? 0) + value;
      }
    }

    // Step 3: Apply equipped manual bonuses (only if your manuals have passive boosts, optional)
    const equippedManual = character.manuals.find(m => m.equipped);
    if (equippedManual) {
      // Example: boost qiPoints if equipped
      // character.addedStats.qiPoints = (character.addedStats.qiPoints ?? 0) + 100;
    }

    // Step 4: (Optional) Apply other boosts like body/core/artifacts etc.
  }

  function getEffectiveStat(stat: string): number {
    if (!character) return 0;
    return (character.stats?.[stat] ?? 0) + (character.addedStats?.[stat] ?? 0);
  }

  $: realmNumber = character
  ? character.stage.findIndex(flag => flag === true) : 0;

  $: baseStatsOf = character
  ? {
      health: Math.round(getEffectiveStat('constitution') * 4 * realmNumber),
      stamina: Math.round(((getEffectiveStat('constitution') + getEffectiveStat('dexterity')) / 2) * realmNumber),
      dodge: ((((getEffectiveStat('dexterity') / 8) * realmNumber) / 2) / 1000).toFixed(2),
      pAttack: Math.round(getEffectiveStat('strength') * 2 * realmNumber),
      sAttack: Math.round((getEffectiveStat('qiAffinity') + getEffectiveStat('intelligence') / 2) * (character.qiPoints * 0.005)),
      pDef: Math.round(((getEffectiveStat('strength') + getEffectiveStat('constitution')) * 1.5) * realmNumber),
      sDef: Math.round(((getEffectiveStat('qiAffinity') + getEffectiveStat('intelligence')) * 1.5) * realmNumber),
      persuasion: ((((getEffectiveStat('charisma') / 4) * realmNumber) / 2) / 1000).toFixed(2),
    }
  : {
      health: 0,
      stamina: 0,
      dodge: 0,
      pAttack: 0,
      sAttack: 0,
      pDef: 0,
      sDef: 0,
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
      {#if equippedTreasure}
      <p>Treasure: {equippedTreasure}</p>
      {/if}

      <section class="stats">
          <h3>Attributes</h3>
          <ul>
            {#each Object.entries(character.stats) as [key, baseValue]}
              <li>
                <strong>
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </strong>
                <span>
                  {baseValue}
                  {#if character.addedStats?.[key] > 0}
                    <span style="color: green;"> (+{character.addedStats[key]})</span>
                  {/if}
                  {#if character.addedStats?.[key] < 0}
                    <span style="color: red;"> ({character.addedStats[key]})</span>
                  {/if}
                </span>
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

        <button popovertarget="treasures">Treasures</button>

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
        {#if character && !hasStarterManual}
          <button id="basic-qi-manual-button" onclick={addBasicQiManual}>
            Receive Basic Qi Manual
          </button>
        {/if}
        <p style="color: red;">
          If you do not select a manual you may not get another chance!
        </p>
        <button onclick={exitLearnCultivation}>Exit</button>
      </div>
    {/if}    
      <div popover id="manuals" style="height: 769px; overflow-y: scroll;">
      {#if character.manuals}
        {#each character.manuals as manual}
        <div style="margin: 1rem; padding: 1rem; background-color: #999; border-radius: 0.75rem;">
          <p>Manual: {manual.title}</p>
          <p>Method: {manual.methodInfo}</p>
          {#if manual.equipped}
            <p style="color: green;">Equipped</p>
          {:else}
            <p style="opacity: 0.5; color: red;">Acquired</p>
            <button onclick={() => equipManual(manual.title)}>
            Equip
            </button>
          {/if}
        </div>
        {/each}
      {:else}
        <p>No Manuals Acquired</p>
      {/if}
      <button popovertarget="manuals">Exit</button>
    </div>

    <div popover id="treasures" style="height: 769px; overflow-y: scroll;">
      {#if character?.treasures?.length > 0}
        {#each character.treasures as treasure}
          <div style="margin: 1rem; padding: 1rem; background-color: #999; border-radius: 0.75rem;">
            <h3>{treasure.name}</h3>
            <p>{treasure.description}</p>
            <p><strong>Grade:</strong> {treasure.grade}</p>
            <p><strong>Inheritance:</strong> {treasure.inheritanceOf}</p>
            
            <h4>Stats Boost:</h4>
            <ul>
              {#each Object.entries(treasure.stats) as [stat, value]}
                <li>{stat}: +{value}</li>
              {/each}
            </ul>

            <h4>Equip Requirements:</h4>
            <ul>
              {#each Object.entries(treasure.statRequirements) as [stat, req]}
                <li>{stat}: {character?.stats?.[stat] ?? 0} / {req}</li>
              {/each}
            </ul>

            {#if treasure.equipped}
              <p style="color: green;">Equipped</p>
            {:else}
              <p style="opacity: 0.5; color: red;">Acquired</p>
              <button onclick={() => equipTreasure(treasure.id)}>
                Equip
              </button>
            {/if}
          </div>
        {/each}
      {:else}
        <p>No Treasures Acquired</p>
      {/if}
  <button popovertarget="treasures">Exit</button>
</div>
  {/if}

  <!-- Herb Collection Windows -->
{#each activeHerbWindows as window (window.id)}
  <div class="herb-window">
    <h2>Age {character?.age}: {window.herb.name}</h2>
    <p>{window.herb.description}</p>
    <h3>Stat Requirements:</h3>
    <ul>
      {#each Object.entries(window.herb.statRequirements) as [stat, req]}
        <li>{stat}: {character?.stats?.[stat] ?? 0} / {req}</li>
      {/each}
    </ul>
    <button onclick={() => collectHerb(window.id)} disabled={!canCollectHerb(window.herb)}>Collect</button>
    <button onclick={() => giveUpHerb(window.id)}>Give Up</button>
  </div>
{/each}

<!-- Treasure or Manual Collection Windows -->
<!-- Treasure or Manual Collection Windows -->
{#each activeTreasureWindows as win (win.id)}
  <div class="treasure-window">
    {#if win.type === 'treasure'}
      <h2>{win.treasure.name}</h2>
      <p>{win.treasure.description}</p>
      <p><strong>Grade:</strong> {win.treasure.grade}</p>
      <p><strong>Inheritance:</strong> {win.treasure.inheritanceOf}</p>

      <h3>Stats:</h3>
      <ul>
        {#each Object.entries(win.treasure.stats) as [stat, value]}
          <li>{stat}: +{value}</li>
        {/each}
      </ul>

      <h3>Requirements:</h3>
      <ul>
        {#each Object.entries(win.treasure.statRequirements) as [stat, req]}
          <li>{stat}: {character?.stats?.[stat] ?? 0} / {req}</li>
        {/each}
      </ul>

    {:else if win.type === 'manual'}
      <h2>{win.treasure.title}</h2>
      <p>{win.treasure.methodInfo}</p>
      <p><strong>Method Type:</strong> {win.treasure.method}</p>

      <h3>Requirements:</h3>
      <ul>
        {#each Object.entries(win.treasure.statRequirements) as [stat, req]}
          <li>{stat}: {character?.stats?.[stat] ?? 0} / {req}</li>
        {/each}
      </ul>
    {/if}

    <button onclick={() => collectTreasure(win.id)}>Collect</button>
    <button onclick={() => giveUpTreasure(win.id)}>Give Up</button>
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
