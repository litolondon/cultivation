<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { capitalize } from '$lib/helpers/capitalize';
  import type { HumanBattler, BattleEncounter } from '$lib/battle';
  import { generateHumanBattler } from '$lib/battle';
  import type { Manual, Attack, ManualPart } from '$lib/manuals/starterManual';
  import { humbleAttackPool, richAttackPool, cultivationAttackPool, humblePartPool, richPartPool, cultivationPartPool, generateStarterManual, pickRandom, generateAttackSet } from '$lib/manuals/starterManual';
  import { earthManualPool } from '$lib/manuals/manualPool';
  
  
 

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
    stage: number;  // which stage
    qiPoints: number;  
    qiCapacity: number;
    usedStam: number;
    lostHealth: number;
    manuals: Manual[]
    treasures: Treasure[];
    body: Body;
    core: Core;
  };

 
  let activeHerbWindows: { id: number, herb: ExploreHerbEventDef }[] = [];
  let activeTreasureWindows: { id: number; treasure: Treasure | Manual; type: 'treasure' | 'manual' }[] = [];
  let activeBattleWindows: BattleEncounter[] = [];
  $: hasStarterManual = character?.manuals?.some(m => m.grade === 'Mortal') ?? false;
  
  let startBackgroundMusic = false;

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
      if (map.has(ev.description)) {
        map.get(ev.description)!.count += 1;
      } else {
        map.set(ev.description, { event: ev, count: 1 });
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
  const manualPools = [...earthManualPool];

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

    const roll = (Math.random() * 100) + luck;
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

    if (cap <= qi) {
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

    character.lifeEvents.unshift(result);
    
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

    const roll = (Math.random() * 100) + luck;
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

    if (cap <= qi) {
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

    character.lifeEvents.unshift(result);
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

    const roll = (Math.random() * 100) + luck;
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

    if (cap <= qi) {
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

    character.lifeEvents.unshift(result);
    if (isBreak) {
      character.stage[3] = false;
      character.stage[4] = true;
      isBreak = false;
    }

    saveCharacter();
  }
  $: equippedManualUsage = character?.manuals
    ? character.manuals.find(m => m.equipped) ?? null
    : 'No Manual Equipped';

  $: equippedManual = character?.manuals
    ? character.manuals.find(m => m.equipped)?.title ?? 'None'
    : 'No Manual Equipped';
  $: equippedTreasure = character?.treasures
    ? character.treasures.find(t => t.equipped)?.name ?? 'None'
    : 'No Treasure Equipped';

  function handleTrainMeridians() {
    // 1. Find the equipped manual
    const manual: Manual | undefined =
      character.manuals.find(m => m.equipped);
    if (!manual) {
      console.warn('No manual equipped – cannot gather Qi');
      return;
    }

    // 2. Pull your affinity stat (adjust this line if you store it elsewhere)
    const qiAffinity = character.stats['qiAffinity'] ?? 0;

    // 3. Sum up (statValue * multiplier) for each entry in methodStats

    const roll = (Math.random() * 100) + luck;
    let result = '';
    
    let totalGain = 0;
    for (const [statName, multiplier] of Object.entries(manual.methodStats)) {
      const statValue = character.stats[statName] ?? 0;
      totalGain += (statValue * multiplier) * 2;
    }
    // 4. Add half your qiAffinity
    totalGain += qiAffinity / 2;
    totalGain *= realmNumber;

    if (roll >= 97) {
      totalGain *= 2.5
      result = 'You had an ephiphany during training. Your meridians glow with a radiance. Bonus: x2.5';
    } else if (roll >= 90) {
      result = 'The enviroment is bursting with qi. Bonus: x2';
      totalGain *= 2.0
    }else if (roll >= 75){
      result = 'The words of the chant call to you. You seem to be beginning to understand something.  Bonus: x1.6';
      totalGain *= 1.65
    }else if (roll >= 65){
      result = 'Your trained hard. Bonus: x1.3';
      totalGain *= 1.3
    } else {
      result = 'You trained your meridians. Chanting... ' + manual.methodDescription;
      totalGain = totalGain;
    }

    totalGain = Math.round(totalGain);

    character.lifeEvents.unshift({
            id: Date.now(),
            title: `Age ${character.age}: Mysterious Encounter`,
            description: ` ${result} + ${totalGain} Qi Capacity`,
            date: new Date().toISOString()
          });

    // 5. Increment Qi and persist
    character.qiCapacity = Math.round((character.qiCapacity ?? 0) + totalGain);
    saveCharacter();

    

    console.log(`Gathered ${totalGain} Qi (incl. affinity bonus)`);
  }


  function handleGatherQi() {
    // 1. Find the equipped manual
    const manual: Manual | undefined =
      character.manuals.find(m => m.equipped);
    if (!manual) {
      console.warn('No manual equipped – cannot gather Qi');
      return;
    }

    // 2. Pull your affinity stat (adjust this line if you store it elsewhere)
    const qiAffinity = character.stats['qiAffinity'] ?? 0;

    // 3. Sum up (statValue * multiplier) for each entry in methodStats

    const roll = (Math.random() * 100) + luck;
    let result = '';
    
    let totalGain = 0;
    for (const [statName, multiplier] of Object.entries(manual.methodStats)) {
      const statValue = character.stats[statName] ?? 0;
      totalGain += statValue * multiplier;
    }
    // 4. Add half your qiAffinity
    totalGain += qiAffinity / 2;
    totalGain *= realmNumber;

    if (roll >= 95) {
      totalGain *= 2.5
      result = 'You had an ephiphany during meditation. You feel the qi swirling around. Bonus: x2.5';
    } else if (roll >= 75) {
      result = 'The enviroment is bursting with qi. Bonus: x2';
      totalGain *= 2.0
    }else if (roll >= 65){
      result = 'The words of the chant call to you. You seem to be beginning to understand something.  Bonus: x1.6';
      totalGain *= 1.65
    }else if (roll >= 45){
      result = 'The local sage led a group cultivation. Bonus: x1.3';
      totalGain *= 1.3
    } else {
      result = 'You meditated. Chanting... ' + manual.methodDescription;
      totalGain = totalGain;
    }

    totalGain = Math.round(totalGain);

    character.lifeEvents.unshift({
            id: Date.now(),
            title: `Age ${character.age}: Mysterious Encounter`,
            description: ` ${result} + ${totalGain} Qi`,
            date: new Date().toISOString()
          });
    

    // 5. Increment Qi and persist
    character.qiPoints = Math.round((character.qiPoints ?? 0) + totalGain);
    saveCharacter();

    console.log(`Gathered ${totalGain} Qi (incl. affinity bonus)`);
  }


  // Allocate unallocated points to stats
  function allocatePoint(key: keyof Character['stats']) {
    if (!character || character.unallocatedPoints <= 0) return;
    character.stats[key] += 1;
    character.unallocatedPoints -= 1;
    saveCharacter();
  }

  function performAction(def: LifeEventDef) {
  if (!character) return;

  const roll = (Math.random() * 100) - luck;

  switch (def.title) {
    case 'Imagine':
      if (roll < 10) {
        character.stats.luck += 1;
      } else if (roll < 40) {
        character.stats.qiAffinity += 2;
      } else {
        character.stats.intelligence += 1;
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
      if (roll < 1) {
        character.stats.luck += 2; 
      } else if (roll < 31) {
        character.stats.charisma += 2;
      } else {
        character.stats.intelligence += 1;
      }
      break;
    case 'Train Meridians':
      handleTrainMeridians();

      break;
      
   case 'Gather Qi':
    handleGatherQi();

    // Ensure not over capacity
    if (character.qiPoints >= character.qiCapacity) {
      character.qiPoints = character.qiCapacity;
    }
  break;


    case 'Explore':
      const eRoll = (Math.random() * 100) + luck;

      if ((character.stage[1]) || (character.stage[2]) || (character.stage[3]) || (character.stage[4])) {
        if (eRoll >= 99) {
          //encounter
          character.lifeEvents.unshift({
            id: Date.now(),
            title: `Age ${character.age}: Mysterious Encounter`,
            description: 'You met a mysterious figure during your exploration. They left behind cryptic advice that lingers in your mind.',
            date: new Date().toISOString()
          });
          character.stats.intelligence += 2;
          character.stats.luck += 2;
          character.qiPoints += Math.floor(character.qiCapacity / 10);
        } else if ((eRoll >= 89) && (eRoll < 99)) {
          //treasure
          triggerTreasureEvent();
        } else if ((eRoll >= 64) && (eRoll < 89)) {
          //herb
          triggerHerbEvent();
        } else if ((eRoll >= 39) && (eRoll < 64)) {
          //battle

          triggerBattleEvent();

          character.lifeEvents.unshift({
            id: Date.now(),
            title: `Age ${character.age}: Battle Encounter`,
            description: 'You encountered a fierce beast in the wilds. You fought bravely and earned valuable experience.',
            date: new Date().toISOString()
          });
        } else {
          //nothing
          character.lifeEvents.unshift({
            id: Date.now(),
            title: `Age ${character.age}: Explore`,
            description: 'You went exploring and found nothing.',
            date: new Date().toISOString()
          });
        }
      } 
      break;
  }

  character.lifeEvents.unshift({
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
    console.log(character.manuals[0])

    
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
      character!.lifeEvents.unshift({
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
    character.heir ??= 'Humble';
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

  function addBasicQiManual(): void {
    const heirType = character.heir as 'humble' | 'rich' | 'cultivation';
    console.log('[addBasicQiManual] heirType:', heirType);

    if (!character) return;

    // Pass the heir union directly, not its toString()
    const newManual = generateStarterManual(character.heir);
    if (!newManual) return;

    // Avoid duplicates
    if (character.manuals.some(m => m.title === newManual.title)) return;

    // Add to character manuals
    character.manuals = [...character.manuals, newManual];

    // Log the inheritance event
    character.lifeEvents.unshift({
      id: Date.now(),
      title: `Age 5: Inherited ${newManual.title}`,
      // use methodDescription (or whatever property describes the method)
      description: `You received your family's ${newManual.methodDescription} method: ${newManual.title}.`,
      date: new Date().toISOString(),
    });

    // Persist your change
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

    character.lifeEvents.unshift({
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

    character.lifeEvents.unshift({
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
    character.lifeEvents.unshift({
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

    character.lifeEvents.unshift({
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

        character.lifeEvents.unshift({
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

        character.lifeEvents.unshift({
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

    character.lifeEvents.unshift({
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

  function getEnemyEffectiveStat(enemy: HumanBattler, stat: string): number {
    return enemy.stats?.[stat] ?? 0;
  }

  function calculateBattlerStats(battler: HumanBattler): {
    health: number;
    stamina: number;
    dodge: string;
    pAttack: number;
    sAttack: number;
    pDef: number;
    sDef: number;
    persuasion: string;
    chance: number;
  } {
    let realmMultiplier = battler.stage;
    if (realmMultiplier === 0) {
      realmMultiplier = 1;
    }

    return {
      health: Math.round((battler.stats.constitution * 2) + 1) * ((realmNumber) + (battler.stats.strength * 2)),
      stamina: Math.round((((battler.stats.constitution ?? 0) + (battler.stats.dexterity ?? 0)) / 2) * realmMultiplier),
      dodge: ((((battler.stats.dexterity ?? 0) / 8) * realmMultiplier) / 2 / 1000).toFixed(2),
      pAttack: Math.round((battler.stats.strength ?? 0) * 2 * realmMultiplier),
      sAttack: Math.round(((battler.stats.qiAffinity ?? 0) + ((battler.stats.intelligence ?? 0) / 2)) * (battler.qiPoints * 0.005)),
      pDef: Math.round((((battler.stats.strength ?? 0) + (battler.stats.constitution ?? 0)) * 1.5) * realmMultiplier),
      sDef: Math.round((((battler.stats.qiAffinity ?? 0) + (battler.stats.intelligence ?? 0)) * 1.5) * realmMultiplier),
      persuasion: ((((battler.stats.charisma ?? 0) / 4) * realmMultiplier) / 2 / 1000).toFixed(2),
      chance: Math.round(battler.stats.luck) / 2
    };
  }


  $: realmNumber = character
  ? character.stage.findIndex(flag => flag === true): 0;

   $: shownRealmNumber = character
  ? character.stage.findIndex(flag => flag === true) - 1: 0;

  $: baseStatsOf = character
  ? {
      health: Math.round((getEffectiveStat('constitution') * 2) + 1) * ((realmNumber) + (getEffectiveStat('strength') * 2)),
      stamina: Math.round(((getEffectiveStat('constitution') + getEffectiveStat('dexterity')) / 2) * realmNumber),
      dodge: ((((getEffectiveStat('dexterity') / 8) * realmNumber) / 2) / 1000).toFixed(2),
      pAttack: Math.round(getEffectiveStat('strength') * 2 * realmNumber),
      sAttack: Math.round((getEffectiveStat('qiAffinity') + getEffectiveStat('intelligence') / 2) + (character.qiPoints * 0.005) * realmNumber),
      pDef: Math.round(((getEffectiveStat('strength') + getEffectiveStat('constitution')) * 1.5) * realmNumber),
      sDef: Math.round(((getEffectiveStat('qiAffinity') + (getEffectiveStat('intelligence') / 4) + (getEffectiveStat('constitution') / 4)) + (character.qiPoints * 0.005)) * (realmNumber / 2)),
      persuasion: ((((getEffectiveStat('charisma') / 4) * realmNumber) / 2) / 1000).toFixed(2) 
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


    $: luck = character
    ? Math.round((getEffectiveStat('luck')) / 2)
    : 0

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

    function triggerBattleEvent() {
      if (!character) return;

      if (character.stage[1]) {
        const enemy = generateHumanBattler(0);
        const encounterId = Date.now() + Math.random();

        const battleStats = calculateBattlerStats(enemy);
        enemy.curStam = battleStats.stamina;
        enemy.curHealth = battleStats.health;


        activeBattleWindows = [
          ...activeBattleWindows,
          {
            id: encounterId,
            enemy,
            stats: battleStats,
            prize: enemy.spiritstones // or any logic you have
          }
        ];
      } else if (character.stage[2]) {
        const enemy = generateHumanBattler(1);
        const encounterId = Date.now() + Math.random();

        const battleStats = calculateBattlerStats(enemy);
        enemy.curStam = battleStats.stamina;
        enemy.curHealth = battleStats.health;


        activeBattleWindows = [
          ...activeBattleWindows,
          {
            id: encounterId,
            enemy,
            stats: battleStats,
            prize: enemy.spiritstones // or any logic you have
          }
        ];
      } else if (character.stage[3]) {
        const enemy = generateHumanBattler(2);
        const encounterId = Date.now() + Math.random();

        const battleStats = calculateBattlerStats(enemy);
        enemy.curStam = battleStats.stamina;
        enemy.curHealth = battleStats.health;


        activeBattleWindows = [
          ...activeBattleWindows,
          {
            id: encounterId,
            enemy,
            stats: battleStats,
            prize: enemy.spiritstones // or any logic you have
          }
        ];
      } else if (character.stage[4]) {
        const enemy = generateHumanBattler(3);
        const encounterId = Date.now() + Math.random();

        const battleStats = calculateBattlerStats(enemy);
        enemy.curStam = battleStats.stamina;
        enemy.curHealth = battleStats.health;


        activeBattleWindows = [
          ...activeBattleWindows,
          {
            id: encounterId,
            enemy,
            stats: battleStats,
            prize: enemy.spiritstones // or any logic you have
          }
        ];
      }
    }

    function resolveBattle(encounterId: number, result: 'Won' | 'Lost') {
    const encounter = activeBattleWindows.find(w => w.id === encounterId);
    if (!encounter || !character) return;

    if (result === 'Won') {
      character.spiritstones += encounter.enemy.spiritstones;
    }

    character.lifeEvents.unshift({
      id: encounter.id,
      title: `Age ${character.age}: Battle Encounter - ${result}`,
      description: `You encountered ${encounter.enemy.name} in battle and ${result.toLowerCase()}.`,
      date: new Date().toISOString(),
    });

    // Remove the battle window
    activeBattleWindows = activeBattleWindows.filter(w => w.id !== encounterId);

    saveCharacter();
  }

</script>

<main>

  {#if character}
    <div class="character-info-container">
      <div class="character-name">
        <div><h1>🌿 Life of {character.name}</h1></div>
        <div><p>Age: {character.age}</p></div>
        <div><p>Realm: {shownRealmNumber}</p></div>
        <div>
          {#if character.body}
            <p>Body: {character.body.grade}</p>
            <p>{character.body.description}</p>
          {/if}
        </div>
        <div>
          {#if character.core}
            <p>Core: {character.core.grade}</p>
            <p>{character.core.description}</p>
          {/if}
        </div>
        <div><p>Lifespan: {character.stats.lifespan}</p></div>
        <div>
          {#if character.age >= 5}
            <p>Manual: {equippedManual}</p>
          {/if}
        </div>
        <div>
        {#if character.age >= 5}
        <p>Treasure: {equippedTreasure}</p>
        {/if}
        </div>
        <div><strong><p>Spiritstones: </strong><span style="color: blue; margin-left: 0.25rem">♦ </span>{character.spiritstones}</div>
        <div><p>Atrribute Points: {character.unallocatedPoints}</p></div>
        
      </div>

      <section class="stats">
        <div>
            <h3 style="text-decoration: underline; margin-bottom: 0.25rem;">Attributes</h3>
            <ul style="list-style: none;">
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
                  {#if character.unallocatedPoints >= 0}
                    <button type="button" onclick={() => allocatePoint(key)}>
                      +1
                    </button>
                  {/if}
                </li>
              {/each}
            </ul>
          </div>
          
          <div>
            <h3 style="text-decoration: underline; margin-bottom: 0.25rem;">Stats</h3>
            <ul style="list-style: none;">
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
              <li>
                <strong>Chance:</strong>
                <span>{luck}%</span>
              </li>
            </ul>
          </div>
        </section>
    </div>


    <section class="life-events">
      <h2>Life Events</h2>
      <ul style="list-style: none;">
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
        <h2>Actions </h2>
        <p>Choose up to three</p>
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
        <div class="selected-actions-container">
          {#each selectedActions as act}
            <ul>
              <li>{act.title}</li>
            </ul>
          {/each}
        </div>
        <button
          type="button"
          onclick={clearSelectedActions}
          disabled={selectedActions.length === 0}
        >
          Clear
        </button>
      </section>
    </div>

    <div class="controls">
      {#if character.stats.lifespan > 0}
        <button onclick={advanceYear}>Next Year</button>
      {/if}
      {#if character.age >= 5}
        <button popovertarget="manuals">Manuals</button>
        <button popovertarget="treasures">Treasures</button>
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
    
    <div class="restart">
      <button onclick={resetCharacter}>🔄 Reset Character</button>
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
          <h3>{manual.title}</h3>
          <p>{manual.description}</p>
          <p>Grade: <strong>{manual.grade}</strong></p>
          <div>
            <p>Method: {manual.methodDescription}</p>
            <ul style="padding-left: 0; list-style: none;">
              {#each Object.entries(manual.methodStats) as [stat, req]}
                  <li>{capitalize(stat)} * {req}</li>
              {/each}
            </ul>
          </div>
          <div>
            <h3>Requirements:</h3>
            <ul style="padding-left: 0; list-style: none;">
              {#each Object.entries(manual.statRequirements) as [stat, req]}
                {#if (character?.addedStats?.[stat] >= req)}
                <li style="text-align: left;">{capitalize(stat)}: {character?.addedStats?.[stat] ?? 0} / {req} <span style="color: green;">✓</span></li>
                {:else}
                <li style="text-align: left;">{capitalize(stat)}: {character?.addedStats?.[stat] ?? 0} / {req} <span style="color: red;">ⓧ</span></li>
                {/if}
              {/each}
            </ul>
            <button popovertarget="attacks-{manual.description}" style="float: right;">Attacks</button>
          </div>
          <div popover id="attacks-{manual.description}" style="background-color: #999;">
            <h3>{manual.title}</h3>
            <div style="padding: 0.5rem; margin: 1rem; background-color: whitesmoke; border-radius: 0.75rem">
              {#each manual.attacks as attack}
              <div style="padding: 0.5rem; margin: 1rem; background-color: #999; border-radius: 0.75rem">
              <strong><p>{capitalize(attack.name)}</p></strong> 
              <p>Damage: {attack.dmg}</p>
              <strong><p>Cost</p></strong>
              <p>Stamina: {attack.staminaCost}</p>
              <p>Qi: {Math.round(attack.qiCost * 100)}%</p>
              <p>Type: {capitalize(attack.t)}</p>
            </div>
              {/each}
            </div>
          </div>
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
                {#if (character?.addedStats?.[stat] >= req)}
                <li style="text-align: left;">{capitalize(stat)}: {character?.addedStats?.[stat] ?? 0} / {req} <span style="color: green;">✓</span></li>
                {:else}
                <li style="text-align: left;">{capitalize(stat)}: {character?.addedStats?.[stat] ?? 0} / {req} <span style="color: red;">ⓧ</span></li>
                {/if}
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

      {#if (activeBattleWindows.length > 0)}
        <audio id="btl-music-1" autoplay loop>
          <source src="/music/bloodcry-clemens-ruh.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      {/if}

      {#if activeBattleWindows.length === 0}
          {#if character.stage[1]}
            <audio id="bg-music-1" autoplay loop>
              <source src="/music/whispers-of-the-forest-stocktune.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          {/if}
          {#if character.stage[2]}
          <audio id="bg-music-2"autoplay loop>
            <source src="/music/whispers-of-the-ancient-pines-stocktune.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          {/if}
          {#if character.stage[3]}
          <audio id="bg-music-2"autoplay loop>
            <source src="/music/whispers-of-the-yangtze-stocktune.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          {/if}
      {/if}

            <!-- Herb Collection Windows -->
    {#each activeHerbWindows as window (window.id)}
      <div class="herb-window">
        <div class="herb-info">
          <h2>Age {character?.age}: {window.herb.name}</h2>
          <p>{window.herb.description}</p>
        </div>
        <div class="herb-req">
          <h3>Stat Requirements:</h3>
          <ul>
            {#each Object.entries(window.herb.statRequirements) as [stat, req]}
              {#if (character?.addedStats?.[stat] >= req)}
              <li style="text-align: left;">{capitalize(stat)}: {character?.addedStats?.[stat] ?? 0} / {req} <span style="color: green;">✓</span></li>
              {:else}
              <li style="text-align: left;">{capitalize(stat)}: {character?.addedStats?.[stat] ?? 0} / {req} <span style="color: red;">ⓧ</span></li>
              {/if}
            {/each}
          </ul>
        </div>
        
        <button onclick={() => collectHerb(window.id)} disabled={!canCollectHerb(window.herb)}>Collect</button>
        <button onclick={() => giveUpHerb(window.id)}>Give Up</button>
      </div>
    {/each}
    

  {/if}

  

  <!-- Treasure or Manual Collection Windows -->
  <!-- Treasure or Manual Collection Windows -->
  {#each activeTreasureWindows as win (win.id)}
    <div class="herb-window">
      {#if win.type === 'treasure'}
        <h2>{win.treasure.name}</h2>
        <div class="herb-info">
          <p>{win.treasure.description}</p>
          <p><strong>Grade:</strong> {win.treasure.grade}</p>
          <p><strong>Inheritance:</strong> {win.treasure.inheritanceOf}</p>
        </div>
       <div class="herb-req">
          <h3>Stats:</h3>
          <ul>
            {#each Object.entries(win.treasure.stats) as [stat, value]}
              <li>{stat}: +{value}</li>
            {/each}
          </ul>
       </div>
        <div class="herb-req">
          <h3>Requirements:</h3>
          <ul>
            {#each Object.entries(win.treasure.statRequirements) as [stat, req]}
              {#if (character?.addedStats?.[stat] >= req)}
              <li style="text-align: left;">{capitalize(stat)}: {character?.addedStats?.[stat] ?? 0} / {req} <span style="color: green;">✓</span></li>
              {:else}
              <li style="text-align: left;">{capitalize(stat)}: {character?.addedStats?.[stat] ?? 0} / {req} <span style="color: red;">ⓧ</span></li>
              {/if}
            {/each}
          </ul>
        </div>

        

      {:else if win.type === 'manual'}
        <h2>{win.treasure.title}</h2>
        <div class="herb-info">
          <p>{win.treasure.methodInfo}</p>
          <p><strong>Method Type:</strong> {win.treasure.method}</p>
        </div>
        
        <div class="herb-req">
          <h3>Requirements:</h3>
          <ul>
            {#each Object.entries(win.treasure.statRequirements) as [stat, req]}
              {#if (character?.addedStats?.[stat] >= req)}
              <li style="text-align: left;">{capitalize(stat)}: {character?.addedStats?.[stat] ?? 0} / {req} <span style="color: green;">✓</span></li>
              {:else}
              <li style="text-align: left;">{capitalize(stat)}: {character?.addedStats?.[stat] ?? 0} / {req} <span style="color: red;">ⓧ</span></li>
              {/if}
            {/each}
          </ul>
        </div>
        
      {/if}

      <button onclick={() => collectTreasure(win.id)}>Collect</button>
      <button onclick={() => giveUpTreasure(win.id)}>Give Up</button>
    </div>
  {/each}

<!-- battle windows -->
 <div class="active-battles-container"  id="active-battles-container">
    {#each activeBattleWindows as window (window.id)}
      <div class="battle-window">
        <h2 style="background-color: lightyellow; color: black;">{window.enemy.encounterDescription}</h2>
        <div class="grid">

          <!-- Enemy Info -->
          <div class="battle-enemy-info-container" style="grid-area: e;">
            <h3>{window.enemy.name}</h3>
            <div>
              <p><strong>Realm:</strong>  {window.enemy.stage}</p>
              <p><strong>Qi:</strong> {window.enemy.qiPoints} / {window.enemy.qiCapacity}</p>
              <p><strong>Age:</strong>{window.enemy.age}</p>
            </div>
            

            <h3>Stats</h3>
            <ul>
              <li><strong>Health:</strong> {window.enemy.curHealth}/{window.stats.health}</li>
              <li><strong>Qi:</strong> {Math.round(window.enemy.qiPoints)}/{Math.round(window.enemy.qiCapacity)}</li>
              <li><strong>Stamina:</strong> {window.enemy.curStam}/{window.stats.stamina}</li>
              <li><strong>Physical Attack:</strong> {window.stats.pAttack}</li>
              <li><strong>Spiritual Attack:</strong> {window.stats.sAttack}</li>
              <li><strong>Physical Defense:</strong> {window.stats.pDef}</li>
              <li><strong>Spiritual Defense:</strong> {window.stats.sDef}</li>
              <li><strong>Dodge:</strong> {window.stats.dodge}%</li>
              <li><strong>Persuasion:</strong> {window.stats.persuasion}%</li>
              <li><strong>Chance:</strong> {window.stats.chance}%</li>
            </ul>

            <h3>Attacks:</h3>
            <ul>
              {#each window.enemy.attack as attack}
                <li>{attack.name}</li>
              {/each}
            </ul>

            <button popovertarget={"battle-enemy-more-info-" + window.id}>More Info</button>
          </div>

          <!-- Character Info -->
          <div class="battle-enemy-info-container" style="grid-area: c;">
            <h3>{character.name}</h3>
            <div>
              <p>Realm: {shownRealmNumber}</p>
              <p>Qi: {Math.round(character.qiPoints)} / {Math.round(character.qiCapacity)}</p>
              <p>Age: {character.age}</p>
            </div>
            

            <h3>Stats</h3>
            <ul>
              <li><strong>Health:</strong> {currHealth.c}/{baseStatsOf.health}</li>
              <li><strong>Qi:</strong> {Math.round(character.qiPoints)}/{Math.round(character.qiCapacity)}</li>
              <li><strong>Stamina:</strong> {currStam.c}/{baseStatsOf.stamina}</li>
              <li><strong>Physical Attack:</strong> {baseStatsOf.pAttack}</li>
              <li><strong>Spiritual Attack:</strong> {baseStatsOf.sAttack}</li>
              <li><strong>Physical Defense:</strong> {baseStatsOf.pDef}</li>
              <li><strong>Spiritual Defense:</strong> {baseStatsOf.sDef}</li>
              <li><strong>Dodge:</strong> {baseStatsOf.dodge}%</li>
              <li><strong>Persuasion:</strong> {baseStatsOf.persuasion}%</li>
              <li><strong>Chance:</strong> {luck}%</li>
            </ul>

            <h3>Attacks:</h3>
            <ul>
              {#each equippedManualUsage.attacks as attack}
                <li>{attack.name}</li>
              {/each}
            </ul>

            <button popovertarget="character-more-info-battle">More Info</button>
          </div>
        </div>

        <!-- Battle Action Buttons -->
        <div style="grid-area: f;">
          <button onclick={() => resolveBattle(window.id, 'Won')}>Win</button>
          <button onclick={() => resolveBattle(window.id, 'Lost')}>Lose</button>
        </div>

        <!-- Popover More Info -->
        <div popover id={"battle-enemy-more-info-" + window.id} style="background-color: lightyellow; right: 0; ">
          <h3>Attributes:</h3>
          <ul>
            {#each Object.entries(window.enemy.stats) as [stat, value]}
              <li>{capitalize(stat)}: {value}</li>
            {/each}
          </ul>
          <h3>Attacks:</h3>
          {#each window.enemy.attack as attack}
            <div>
              <h4>{attack.name}</h4>
              <ul>
                <li>Damage: {Math.round(attack.dmg * 100)}%</li>
                <li>Stamina Cost: {Math.round(attack.staminaCost)}</li>
                <li>Qi Cost: {Math.round(attack.qiCost * 100)}%</li>
              </ul>
            </div>
          {/each}
        </div>
        <div popover id="character-more-info-battle" style="background-color: lightyellow;">
          <h3>Attributes:</h3>
          <ul>
            {#each Object.entries(window.enemy.stats) as [stat, value]}
              <li>{capitalize(stat)}: {value}</li>
            {/each}
          </ul>
          <h3>Attacks:</h3>
          {#each equippedManualUsage.attacks as attack}
            <div>
              <h4>{attack.name}</h4>
              <ul>
                <li>Damage: {Math.round(attack.dmg * 100)}%</li>
                <li>Stamina Cost: {Math.round(attack.staminaCost * 100)}%</li>
                <li>Qi Cost: {Math.round(attack.qiCost * 100)}%</li>
                <li>Chance: {Math.round(attack.chance * 100)}%</li>
              </ul>
            </div>
          {/each}
        </div>
      </div>
    {/each}


  </div>

  


</main>

<!-- panels for events -->

<!-- button ui panels -->

<style>
  /* Serene Dawn: #FFE4B5, #FFF8E7, #CCAF89 */
  main {
    margin: 0.75rem;
    background-color: #333;
    color: black;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* min-height: 568px;
    max-height: 896px; */
    justify-content: center;
    gap: 2rem;
  }

  * {
    margin: 0px;
    padding: 0px;
  }

  .life-events {
    border-radius: 0.75rem;
    background-color: whitesmoke;
    padding: 1rem;
    margin: 1rem;
    overflow-y: scroll;
  }
  .life-events > h2 {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: top;
    margin-bottom: 1rem;
    padding-bottom: .5rem;
    border-bottom: #999 solid 0.25rem;
  }

  .life-events > ul {
    display: flex;
    flex-direction: column;
    align-items: left;
    height: 100%;
    justify-content: top;
  }

  .life-events > ul > li {
    margin-bottom: 1rem;
    background-color: #3A9D52;
  }

  .character-name {
    display: flex;
    flex-direction: column;
  }
  .character-name > div {
    display: flex;
    align-items: center;
    margin: 0px;
    padding: 0px;
  }

  .character-info-container {
    width: 100%;
    border-radius: 0.75rem;
    background-color: whitesmoke;
    padding: 1rem;
    margin: 1rem;
  }
  .main-action-container {
    border-radius: 0.75rem;
    background-color: whitesmoke;
    padding: 1rem;
    margin: 1rem;
    width: 100%;
  }

  .selected-actions {
    display: flex;
    flex-direction: column;
    justify-self: left;
    width: 100%;
  }

  .selected-actions-container > ul {
    list-style: inside decimal;
  }

  .selected-actions-container > ul > li  {
    background-color: #999;
    height: 2rem;
    font-size: x-large;
    font-weight:bolder;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
  }

  .selected-actions > button {
    height: 3rem;
  }

  .actions-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.25rem;
    
  }

  .actions > p {
    color: #999;
  }

  .actions-container > button {
    flex-grow: 1;
    width: 100%;
    height: 4rem;
  }

  .controls  {
    width: 100%;
    margin: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.25rem
  }
  
  .controls > button {
    height: 4rem;
  }
  .restart {
    width: 100%;
    margin: 1rem;
  }
  .restart > button {
    height: 6rem;
    width: 100%;
  }

  /* event panels
  .event-panels-container > div {
    display: none;
  } */

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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  background: white;
  padding: 2rem;
  padding-top: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 500;
}

.herb-window > button {
  height: 3rem;
}

.herb-info {
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: stretch;
  margin-bottom: 0.5rem;
}

.herb-req {
  display: flex;
  flex-direction: row;
}

.herb-req > ul {
  list-style: none;
  display: flex;
   flex-direction: column;
  justify-content: center;
  align-items: center;
}

.treasure-window {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  background: white;
  padding: 2rem;
  padding-top: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 750;
}



.stats {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  gap: 0.75rem;
}

.stats > div{
  display: flex;
  flex-direction: column;
  border: #222 solid 1px;
  padding: 0.5rem;
}

.stats > div > ul {
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 100%;
  justify-content: space-evenly;
}


.battle-window {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  background: white;
  padding-top: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 750;
}

.battle-enemy-info-container {
  display: flex;
  flex-direction: column;
  background-color: #999;
  padding: 1rem;
}

.battle-enemy-info-container > h3{
  margin-bottom: 0.25;
  border-bottom: black solid 0.25rem;
}

.battle-enemy-info-container > div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  border-bottom: black solid 0.25rem;
}

.battle-enemy-info-container > ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  list-style: none;
}

.battle-enemy-info-container > ul > li{
  border-bottom: black 2px solid;
}

.battle-enemy-info-container > div > p {
  margin-right: 0.5rem;
}


.grid{
  display: grid;
  grid-template-areas: 
  'c . e'
  'c . e'
  'c . e'
  'c . e'
  'c . e'
  'c . e'
  'f f f'
  ;
}
</style>

