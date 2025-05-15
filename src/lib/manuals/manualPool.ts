import type { Attack } from "./StarterManual";
import type { Manual } from "./StarterManual";

export const earthManualPool: Manual[] =[

//const

{
    title: 'Earthwall Stance',
    equipped: false,
    description: 'Plant your feet like ancient pillars, impervious to all forces.',
    methodStats: { constitution: 1.50 },
    methodDescription: 'Pillars hold unbroken against storms; Constitution × 1.50',
    grade: 'Earth',
    statRequirements: { constitution: 1.50 },
    attacks: [
      { name: 'Pebble Strike',     dmg: 0.80, staminaCost: 6,  qiCost: 0.20, chance: 0.75, t: 'physical' },
      { name: 'Earthshatter Blow', dmg: 1.80, staminaCost: 12, qiCost: 0.40, chance: 0.20, t: 'physical' },
      { name: 'Cataclysmic Roar',  dmg: 3.00, staminaCost: 16, qiCost: 0.50, chance: 0.05, t: 'physical' }
    ],
    weight: 0.67
  },
  {
    title: 'Deep Root Form',
    equipped: false,
    description: 'Sink your spirit underground, drawing strength from molten core.',
    methodStats: { constitution: 1.55 },
    methodDescription: 'Roots drink molten power below; Constitution × 1.55',
    grade: 'Earth',
    statRequirements: { constitution: 1.55 },
    attacks: [
      { name: 'Gravel Jab',       dmg: 0.85, staminaCost: 7,  qiCost: 0.22, chance: 0.75, t: 'physical' },
      { name: 'Corequake Strike', dmg: 1.90, staminaCost: 13, qiCost: 0.42, chance: 0.20, t: 'physical' },
      { name: 'Mantle Burst',      dmg: 3.10, staminaCost: 18, qiCost: 0.52, chance: 0.05, t: 'physical' }
    ],
    weight: 0.65
  },
  {
    title: 'Ironcore Pillar',
    equipped: false,
    description: 'Forge your bones in inner heat, yielding indestructible will.',
    methodStats: { constitution: 1.60 },
    methodDescription: 'Bones glow with inner furnace; Constitution × 1.60',
    grade: 'Earth',
    statRequirements: { constitution: 1.60 },
    attacks: [
      { name: 'Stone Fist',       dmg: 0.90, staminaCost: 8,  qiCost: 0.25, chance: 0.75, t: 'physical' },
      { name: 'Molten Palm Wave', dmg: 2.20, staminaCost: 14, qiCost: 0.45, chance: 0.20, t: 'physical' },
      { name: 'Corehammer Cataclysm', dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.63
  },
  {
    title: 'Mountain Bastion Breathing',
    equipped: false,
    description: 'Inhale the unmovable calm of peaks, exhale unyielding force.',
    methodStats: { constitution: 1.65 },
    methodDescription: 'Peaks grant impervious calm; Constitution × 1.65',
    grade: 'Earth',
    statRequirements: { constitution: 1.65 },
    attacks: [
      { name: 'Boulder Smash',    dmg: 1.00, staminaCost: 9,  qiCost: 0.28, chance: 0.75, t: 'physical' },
      { name: 'Summit Crash',     dmg: 2.50, staminaCost: 14, qiCost: 0.48, chance: 0.20, t: 'physical' },
      { name: 'Apex Cataclysm',   dmg: 3.20, staminaCost: 17, qiCost: 0.52, chance: 0.05, t: 'physical' }
    ],
    weight: 0.61
  },
  {
    title: 'Stonewall Surge',
    equipped: false,
    description: 'Channel primal earth energy to surge forward like a rampart.',
    methodStats: { constitution: 1.70 },
    methodDescription: 'Rampart energy drives each surge; Constitution × 1.70',
    grade: 'Earth',
    statRequirements: { constitution: 1.70 },
    attacks: [
      { name: 'Fieldstone Jab',   dmg: 1.10, staminaCost: 9,  qiCost: 0.30, chance: 0.75, t: 'physical' },
      { name: 'Terraclaw Strike', dmg: 2.60, staminaCost: 15, qiCost: 0.50, chance: 0.20, t: 'physical' },
      { name: 'Earthbreaker Crash',dmg: 3.25, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.59
  },
  {
    title: 'Seismic Heartbeat',
    equipped: false,
    description: 'Feel the pulsing heartbeat of the planet strengthen your core.',
    methodStats: { constitution: 1.75 },
    methodDescription: 'Planet’s pulse fortifies my heart; Constitution × 1.75',
    grade: 'Earth',
    statRequirements: { constitution: 1.75 },
    attacks: [
      { name: 'Quake Palm Wave',  dmg: 1.15, staminaCost: 10, qiCost: 0.32, chance: 0.75, t: 'physical' },
      { name: 'Mantle Shatter',   dmg: 2.75, staminaCost: 16, qiCost: 0.52, chance: 0.20, t: 'physical' },
      { name: 'Cataclysmic Roar', dmg: 3.00, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.57
  },
  {
    title: 'Iron Spine Resonance',
    equipped: false,
    description: 'Resonate your spine with iron and stone for ultimate resilience.',
    methodStats: { constitution: 1.80 },
    methodDescription: 'Spine echoes indestructible steel; Constitution × 1.80',
    grade: 'Earth',
    statRequirements: { constitution: 1.80 },
    attacks: [
      { name: 'Stone Fist',       dmg: 1.20, staminaCost: 9,  qiCost: 0.32, chance: 0.75, t: 'physical' },
      { name: 'Molten Wall Strike',dmg: 2.90, staminaCost: 16, qiCost: 0.54, chance: 0.20, t: 'physical' },
      { name: 'Titan Core Smash',  dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.56
  },
  {
    title: 'Molten Core Embrace',
    equipped: false,
    description: 'Embrace molten core energy to condition your body in heat.',
    methodStats: { constitution: 1.90 },
    methodDescription: 'Core’s heat forges unbreakable flesh; Constitution × 1.90',
    grade: 'Earth',
    statRequirements: { constitution: 1.90 },
    attacks: [
      { name: 'Lava Burst Jab',   dmg: 1.25, staminaCost: 10, qiCost: 0.34, chance: 0.75, t: 'physical' },
      { name: 'Magma Palm Wave',  dmg: 2.85, staminaCost: 17, qiCost: 0.54, chance: 0.20, t: 'physical' },
      { name: 'Volcanic Cataclysm',dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.53
  },
  {
    title: 'Bedrock Bastion Breath',
    equipped: false,
    description: 'Draw breath from the heart of bedrock to become unshakable.',
    methodStats: { constitution: 2.00 },
    methodDescription: 'Bedrock grants unshakable calm; Constitution × 2.00',
    grade: 'Earth',
    statRequirements: { constitution: 2.00 },
    attacks: [
      { name: 'Basalt Smash',      dmg: 1.30, staminaCost: 10, qiCost: 0.36, chance: 0.75, t: 'physical' },
      { name: 'Quake Rift Strike',dmg: 2.95, staminaCost: 18, qiCost: 0.55, chance: 0.20, t: 'physical' },
      { name: 'Earthbreaker Ultimatum',dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.50
  },
  {
    title: 'Granitic Brace Form',
    equipped: false,
    description: 'Brace like living granite to repel all onslaughts.',
    methodStats: { constitution: 1.52 },
    methodDescription: 'Granite shields deflect each blow; Constitution × 1.52',
    grade: 'Earth',
    statRequirements: { constitution: 1.52 },
    attacks: [
      { name: 'Rock Shard Palm',    dmg: 0.82, staminaCost: 6,  qiCost: 0.20, chance: 0.75, t: 'physical' },
      { name: 'Boulder Crush',      dmg: 1.95, staminaCost: 13, qiCost: 0.42, chance: 0.20, t: 'physical' },
      { name: 'Cataclysmic Roar',   dmg: 3.15, staminaCost: 18, qiCost: 0.52, chance: 0.05, t: 'physical' }
    ],
    weight: 0.66
  },
  {
    title: 'Riftborn Bulwark',
    equipped: false,
    description: 'Form a shield of cracked earth to withstand brutal blows.',
    methodStats: { constitution: 1.58 },
    methodDescription: 'Cracked earth holds each assault; Constitution × 1.58',
    grade: 'Earth',
    statRequirements: { constitution: 1.58 },
    attacks: [
      { name: 'Faultline Fist',     dmg: 0.88, staminaCost: 7,  qiCost: 0.22, chance: 0.75, t: 'physical' },
      { name: 'Seismic Palm Wave',  dmg: 2.05, staminaCost: 14, qiCost: 0.44, chance: 0.20, t: 'physical' },
      { name: 'Mantle Burst',       dmg: 3.10, staminaCost: 18, qiCost: 0.52, chance: 0.05, t: 'physical' }
    ],
    weight: 0.63
  },
  {
    title: 'Quakeforged Embrace',
    equipped: false,
    description: 'Merge with seismic energy to shrug off incoming damage.',
    methodStats: { constitution: 1.62 },
    methodDescription: 'Seismic energy shields my form; Constitution × 1.62',
    grade: 'Earth',
    statRequirements: { constitution: 1.62 },
    attacks: [
      { name: 'Shockwave Jab',       dmg: 0.90, staminaCost: 8, qiCost: 0.25, chance: 0.75, t: 'physical' },
      { name: 'Tectonic Fissure',    dmg: 2.10, staminaCost: 15, qiCost: 0.46, chance: 0.20, t: 'physical' },
      { name: 'Crustbreak Cataclysm',dmg: 3.20, staminaCost: 17, qiCost: 0.52, chance: 0.05, t: 'physical' }
    ],
    weight: 0.62
  },
  {
    title: 'Oreheart Discipline',
    equipped: false,
    description: 'Refine your spirit with ore’s resilience to endure any trial.',
    methodStats: { constitution: 1.72 },
    methodDescription: 'Ore’s strength steels my core; Constitution × 1.72',
    grade: 'Earth',
    statRequirements: { constitution: 1.72 },
    attacks: [
      { name: 'Ore Palm Strike',     dmg: 0.95, staminaCost: 9, qiCost: 0.28, chance: 0.75, t: 'physical' },
      { name: 'Smelting Wave',       dmg: 2.30, staminaCost: 16, qiCost: 0.48, chance: 0.20, t: 'physical' },
      { name: 'Foundry Cataclysm',    dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.58
  },
  {
    title: 'Stoneforge Resolve',
    equipped: false,
    description: 'Channel blacksmith might to temper unbreakable resolve.',
    methodStats: { constitution: 1.82 },
    methodDescription: 'Forge wills with hammer’s strike; Constitution × 1.82',
    grade: 'Earth',
    statRequirements: { constitution: 1.82 },
    attacks: [
      { name: 'Forge Hammer Palm',   dmg: 1.00, staminaCost: 10, qiCost: 0.30, chance: 0.75, t: 'physical' },
      { name: 'Anvil Crush',         dmg: 2.50, staminaCost: 17, qiCost: 0.50, chance: 0.20, t: 'physical' },
      { name: 'Cataclysmic Quake',   dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.55
  },
  
  ///char

  {
    title: 'Village Speaker’s Benediction',
    equipped: false,
    description: 'Speak blessings like warm hearthlight, drawing hearts together.',
    methodStats: { charisma: 1.50 },
    methodDescription: 'Warm words cradle eager souls; Charisma × 1.50',
    grade: 'Earth',
    statRequirements: { charisma: 1.50 },
    attacks: [
      { name: 'Radiant Whisper',  dmg: 0.60, staminaCost: 5,  qiCost: 0.20, chance: 0.75, t: 'spiritual' },
      { name: 'Fellowship Surge', dmg: 1.20, staminaCost: 10, qiCost: 0.35, chance: 0.20, t: 'spiritual' },
      { name: 'Communal Echo',    dmg: 2.20, staminaCost: 14, qiCost: 0.45, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.67
  },
  {
    title: 'Harvest Festival Oration',
    equipped: false,
    description: 'Address gathered revelers to kindle communal joy and unity.',
    methodStats: { charisma: 1.60 },
    methodDescription: 'Joyful voice stirs shared laughter; Charisma × 1.60',
    grade: 'Earth',
    statRequirements: { charisma: 1.60 },
    attacks: [
      { name: 'Crescendo Chant',  dmg: 0.75, staminaCost: 6,  qiCost: 0.22, chance: 0.75, t: 'spiritual' },
      { name: 'Unity Wave',        dmg: 1.50, staminaCost: 12, qiCost: 0.40, chance: 0.20, t: 'spiritual' },
      { name: 'Revelry Burst',     dmg: 2.40, staminaCost: 16, qiCost: 0.52, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.63
  },
  {
    title: 'Barnside Fellowship Call',
    equipped: false,
    description: 'Call neighbors to gather under lantern glow and laughter.',
    methodStats: { charisma: 1.70 },
    methodDescription: 'Lantern light binds merry hearts; Charisma × 1.70',
    grade: 'Earth',
    statRequirements: { charisma: 1.70 },
    attacks: [
      { name: 'Lantern Flicker',   dmg: 0.80, staminaCost: 7,  qiCost: 0.25, chance: 0.75, t: 'spiritual' },
      { name: 'Gathering Surge',    dmg: 1.80, staminaCost: 13, qiCost: 0.42, chance: 0.20, t: 'spiritual' },
      { name: 'Mirthquake Call',    dmg: 2.80, staminaCost: 17, qiCost: 0.50, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.59
  },
  {
    title: 'Rustic Praise Chant',
    equipped: false,
    description: 'Chant gratitude to the land, inspiring goodwill in all.',
    methodStats: { charisma: 1.80 },
    methodDescription: 'Gratitude echoes through gathered souls; Charisma × 1.80',
    grade: 'Earth',
    statRequirements: { charisma: 1.80 },
    attacks: [
      { name: 'Echoing Hymn',      dmg: 0.85, staminaCost: 8,  qiCost: 0.28, chance: 0.75, t: 'spiritual' },
      { name: 'Blessing Wave',      dmg: 2.00, staminaCost: 14, qiCost: 0.44, chance: 0.20, t: 'spiritual' },
      { name: 'Hallowed Roar',      dmg: 3.00, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.56
  },
  {
    title: 'Hearth Circle Invocation',
    equipped: false,
    description: 'Summon the warmth of communal hearths to bind allies.',
    methodStats: { charisma: 1.90 },
    methodDescription: 'Hearth warmth kindles loyal bonds; Charisma × 1.90',
    grade: 'Earth',
    statRequirements: { charisma: 1.90 },
    attacks: [
      { name: 'Warmth Pulse',       dmg: 0.90, staminaCost: 9,  qiCost: 0.30, chance: 0.75, t: 'spiritual' },
      { name: 'Commune Surge',       dmg: 2.10, staminaCost: 15, qiCost: 0.46, chance: 0.20, t: 'spiritual' },
      { name: 'Hearthquake Chant',   dmg: 3.20, staminaCost: 17, qiCost: 0.52, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.53
  },
  {
    title: 'Ember Gala Procession',
    equipped: false,
    description: 'Lead a procession of embers, each step guiding fate’s path.',
    methodStats: { charisma: 2.00 },
    methodDescription: 'Embers dance along golden roads; Charisma × 2.00',
    grade: 'Earth',
    statRequirements: { charisma: 2.00 },
    attacks: [
      { name: 'Ember Step Jab',     dmg: 0.95, staminaCost: 9,  qiCost: 0.32, chance: 0.75, t: 'spiritual' },
      { name: 'Fatefire Wave',      dmg: 2.30, staminaCost: 16, qiCost: 0.48, chance: 0.20, t: 'spiritual' },
      { name: 'Grand Oratory Blast', dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.50
  },
  {
    title: 'Whispering Meadow Benediction',
    equipped: false,
    description: 'Soft words carry solace across windswept fields, uniting hearts.',
    methodStats: { charisma: 1.55 },
    methodDescription: 'Meadow breaths weave gentle bonds; Charisma × 1.55',
    grade: 'Earth',
    statRequirements: { charisma: 1.55 },
    attacks: [
      { name: 'Meadow Whisper',  dmg: 0.65, staminaCost: 6,  qiCost: 0.20, chance: 0.75, t: 'spiritual' },
      { name: 'Solace Wave',     dmg: 1.85, staminaCost: 12, qiCost: 0.42, chance: 0.20, t: 'spiritual' },
      { name: 'Harmony Bloom',   dmg: 3.10, staminaCost: 17, qiCost: 0.52, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.65
  },
  {
    title: 'Echoing Canyon Call',
    equipped: false,
    description: 'Project your voice into canyons, summoning awe and reverence.',
    methodStats: { charisma: 1.60 },
    methodDescription: 'Echoes command unwavering focus; Charisma × 1.60',
    grade: 'Earth',
    statRequirements: { charisma: 1.60 },
    attacks: [
      { name: 'Canyon Echo',     dmg: 0.70, staminaCost: 7,  qiCost: 0.22, chance: 0.75, t: 'spiritual' },
      { name: 'Reverent Surge',  dmg: 2.00, staminaCost: 13, qiCost: 0.45, chance: 0.20, t: 'spiritual' },
      { name: 'Crescendo Roar',  dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.62
  },
  {
    title: 'Lanternlight Homily',
    equipped: false,
    description: 'Share flickering tales under lantern glow to inspire hope.',
    methodStats: { charisma: 1.65 },
    methodDescription: 'Lantern tales kindle hopeful hearts; Charisma × 1.65',
    grade: 'Earth',
    statRequirements: { charisma: 1.65 },
    attacks: [
      { name: 'Flicker Chant',   dmg: 0.75, staminaCost: 8,  qiCost: 0.25, chance: 0.75, t: 'spiritual' },
      { name: 'Hopeful Wave',     dmg: 2.15, staminaCost: 14, qiCost: 0.48, chance: 0.20, t: 'spiritual' },
      { name: 'Beacon Resonance', dmg: 3.25, staminaCost: 17, qiCost: 0.52, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.61
  },
  {
    title: 'Gathering Harmony',
    equipped: false,
    description: 'Blend voices in shared chorus, forging unbreakable unity.',
    methodStats: { charisma: 1.70 },
    methodDescription: 'Chorus binds many as one; Charisma × 1.70',
    grade: 'Earth',
    statRequirements: { charisma: 1.70 },
    attacks: [
      { name: 'Chorus Whisper',  dmg: 0.80, staminaCost: 9,  qiCost: 0.28, chance: 0.75, t: 'spiritual' },
      { name: 'Unity Blast',      dmg: 2.30, staminaCost: 15, qiCost: 0.50, chance: 0.20, t: 'spiritual' },
      { name: 'Unison Cataclysm',dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.59
  },
  {
    title: 'Hearthbound Invocation',
    equipped: false,
    description: 'Summon the warmth of hearth to rally spirits and courage.',
    methodStats: { charisma: 1.75 },
    methodDescription: 'Hearth’s warmth rallies weary souls; Charisma × 1.75',
    grade: 'Earth',
    statRequirements: { charisma: 1.75 },
    attacks: [
      { name: 'Warm Pulse',      dmg: 0.85, staminaCost: 10, qiCost: 0.30, chance: 0.75, t: 'spiritual' },
      { name: 'Courage Wave',     dmg: 2.45, staminaCost: 16, qiCost: 0.52, chance: 0.20, t: 'spiritual' },
      { name: 'Emberstorm Roar', dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.57
  },
  {
    title: 'Festival Chorus Rite',
    equipped: false,
    description: 'Lead spirited songs at festival’s peak, energizing the crowd.',
    methodStats: { charisma: 1.80 },
    methodDescription: 'Songs ignite festival fervor; Charisma × 1.80',
    grade: 'Earth',
    statRequirements: { charisma: 1.80 },
    attacks: [
      { name: 'Fervor Chant',    dmg: 0.90, staminaCost: 10, qiCost: 0.32, chance: 0.75, t: 'spiritual' },
      { name: 'Revelry Blast',    dmg: 2.55, staminaCost: 17, qiCost: 0.54, chance: 0.20, t: 'spiritual' },
      { name: 'Carnival Cataclysm', dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.56
  },
  {
    title: 'Emberlight Benediction',
    equipped: false,
    description: 'Bless with emberlight promises, guiding fate’s ember path.',
    methodStats: { charisma: 1.85 },
    methodDescription: 'Emberlight promises shape destiny; Charisma × 1.85',
    grade: 'Earth',
    statRequirements: { charisma: 1.85 },
    attacks: [
      { name: 'Ember Blessing',  dmg: 0.95, staminaCost: 11, qiCost: 0.34, chance: 0.75, t: 'spiritual' },
      { name: 'Destiny Surge',    dmg: 2.65, staminaCost: 17, qiCost: 0.54, chance: 0.20, t: 'spiritual' },
      { name: 'Fateflame Cataclysm', dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.54
  },
  {
    title: 'Grand Oratory Finale',
    equipped: false,
    description: 'Deliver a final oration that echoes through valley and stone.',
    methodStats: { charisma: 1.90 },
    methodDescription: 'Oration echoes across realms; Charisma × 1.90',
    grade: 'Earth',
    statRequirements: { charisma: 1.90 },
    attacks: [
      { name: 'Echoing Speech',  dmg: 1.00, staminaCost: 12, qiCost: 0.36, chance: 0.75, t: 'spiritual' },
      { name: 'Resonance Wave',   dmg: 2.75, staminaCost: 18, qiCost: 0.55, chance: 0.20, t: 'spiritual' },
      { name: 'Orator’s Crescendo', dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.53
  },

  //intelligence manuals
  {
    title: 'Cavern Glyph Meditation',
    equipped: false,
    description: 'Decode ancient cavern glyphs by torchlight to unlock hidden truths.',
    methodStats: { intelligence: 1.50 },
    methodDescription: 'Glyphs whisper forgotten lore; Intelligence × 1.50',
    grade: 'Earth',
    statRequirements: { intelligence: 1.50 },
    attacks: [
      { name: 'Rune Flicker Jab',      dmg: 0.80, staminaCost: 6,  qiCost: 0.20, chance: 0.75, t: 'spiritual' },
      { name: 'Insight Cascade',        dmg: 1.80, staminaCost: 12, qiCost: 0.45, chance: 0.20, t: 'spiritual' },
      { name: 'Revelation Resonance',   dmg: 3.10, staminaCost: 17, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.67
  },
    {
    title: 'Moonlit Riddle Reflection',
    equipped: false,
    description: 'Ponder riddles under silver light to sharpen mental edge.',
    methodStats: { intelligence: 1.60 },
    methodDescription: 'Moonlight unveils hidden answers; Intelligence × 1.60',
    grade: 'Earth',
    statRequirements: { intelligence: 1.60 },
    attacks: [
      { name: 'Moonlit Riddle Jab',    dmg: 0.85, staminaCost: 7,  qiCost: 0.22, chance: 0.75, t: 'spiritual' },
      { name: 'Lunar Insight Wave',    dmg: 1.90, staminaCost: 13, qiCost: 0.46, chance: 0.20, t: 'spiritual' },
      { name: 'Celestial Riddle Unbound', dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.62
  },
  {
    title: 'Crystal Spire Contemplation',
    equipped: false,
    description: 'Focus breath atop crystal spire to reveal cosmic patterns.',
    methodStats: { intelligence: 1.70 },
    methodDescription: 'Spire breath reveals star maps; Intelligence × 1.70',
    grade: 'Earth',
    statRequirements: { intelligence: 1.70 },
    attacks: [
      { name: 'Crystal Pulse Strike',  dmg: 0.90, staminaCost: 8,  qiCost: 0.25, chance: 0.75, t: 'spiritual' },
      { name: 'Spire Reflection Surge',dmg: 2.00, staminaCost: 14, qiCost: 0.48, chance: 0.20, t: 'spiritual' },
      { name: 'Cosmic Pattern Eruption', dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.59
  },
  {
    title: 'Stonebound Logic Form',
    equipped: false,
    description: 'Employ unyielding stone logic to brace against confusion.',
    methodStats: { intelligence: 1.80 },
    methodDescription: 'Logic stands unbroken by doubt; Intelligence × 1.80',
    grade: 'Earth',
    statRequirements: { intelligence: 1.80 },
    attacks: [
      { name: 'Logical Stone Press',   dmg: 1.00, staminaCost: 9,  qiCost: 0.30, chance: 0.75, t: 'spiritual' },
      { name: 'Keystone Logic Blast',  dmg: 2.10, staminaCost: 15, qiCost: 0.50, chance: 0.20, t: 'spiritual' },
      { name: 'Philosophic Cataclysm', dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.56
  },
  {
    title: 'Earthbound Philosopher’s Chant',
    equipped: false,
    description: 'Chant philosophical truths drawn from earth’s primal wisdom.',
    methodStats: { intelligence: 1.90 },
    methodDescription: 'Primal truths flow like rivers; Intelligence × 1.90',
    grade: 'Earth',
    statRequirements: { intelligence: 1.90 },
    attacks: [
      { name: 'Philosopher’s Murmur',  dmg: 1.10, staminaCost: 10, qiCost: 0.32, chance: 0.75, t: 'spiritual' },
      { name: 'Earthly Wisdom Flow',   dmg: 2.30, staminaCost: 16, qiCost: 0.54, chance: 0.20, t: 'spiritual' },
      { name: 'Primal Truth Unleashed',dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.53
  },
  {
    title: 'Lithic Diagram Invocation',
    equipped: false,
    description: 'Sketch arcane diagrams on stone to map ancient currents.',
    methodStats: { intelligence: 1.55 },
    methodDescription: 'Diagrams guide hidden pathways; Intelligence × 1.55',
    grade: 'Earth',
    statRequirements: { intelligence: 1.55 },
    attacks: [
      { name: 'Diagram Whisper',        dmg: 0.75, staminaCost: 6,  qiCost: 0.18, chance: 0.75, t: 'spiritual' },
      { name: 'Geomantic Cascade',      dmg: 2.10, staminaCost: 13, qiCost: 0.46, chance: 0.20, t: 'spiritual' },
      { name: 'Runestorm Unleashed',    dmg: 3.05, staminaCost: 17, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.65
  },
  {
    title: 'Earthen Schema Analysis',
    equipped: false,
    description: 'Analyze earth’s formations to predict structural secrets.',
    methodStats: { intelligence: 1.65 },
    methodDescription: 'Formations speak hidden designs; Intelligence × 1.65',
    grade: 'Earth',
    statRequirements: { intelligence: 1.65 },
    attacks: [
      { name: 'Stone Pattern Jab',      dmg: 0.85, staminaCost: 7,  qiCost: 0.20, chance: 0.75, t: 'spiritual' },
      { name: 'Seismic Blueprint Beam',  dmg: 2.20, staminaCost: 14, qiCost: 0.48, chance: 0.20, t: 'spiritual' },
      { name: 'Architectonic Cataclysm',dmg: 3.15, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.61
  },
  {
    title: 'Runic Etch Synchronization',
    equipped: false,
    description: 'Etch runes in sync with breath to attune stone’s resonance.',
    methodStats: { intelligence: 1.75 },
    methodDescription: 'Runes hum in perfect harmony; Intelligence × 1.75',
    grade: 'Earth',
    statRequirements: { intelligence: 1.75 },
    attacks: [
      { name: 'Etch Whisper',          dmg: 0.95, staminaCost: 8,  qiCost: 0.22, chance: 0.75, t: 'spiritual' },
      { name: 'Resonant Wave Carve',   dmg: 2.30, staminaCost: 15, qiCost: 0.50, chance: 0.20, t: 'spiritual' },
      { name: 'Stonelit Eruption',     dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.57
  },
  {
    title: 'Fossilized Secret Unveiling',
    equipped: false,
    description: 'Unearth ancient fossils to extract forgotten earth magics.',
    methodStats: { intelligence: 1.85 },
    methodDescription: 'Fossils yield buried wisdom; Intelligence × 1.85',
    grade: 'Earth',
    statRequirements: { intelligence: 1.85 },
    attacks: [
      { name: 'Fossil Shard Flick',    dmg: 1.05, staminaCost: 9,  qiCost: 0.24, chance: 0.75, t: 'spiritual' },
      { name: 'Ancient Burst Flow',    dmg: 2.40, staminaCost: 16, qiCost: 0.52, chance: 0.20, t: 'spiritual' },
      { name: 'Paleolithic Cataclysm', dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.54
  },
  {
    title: 'Geomantic Equation Recital',
    equipped: false,
    description: 'Recite complex equations to harness earth’s constant flux.',
    methodStats: { intelligence: 1.95 },
    methodDescription: 'Equations bind elemental flow; Intelligence × 1.95',
    grade: 'Earth',
    statRequirements: { intelligence: 1.95 },
    attacks: [
      { name: 'Equation Murmur',       dmg: 1.15, staminaCost: 10, qiCost: 0.26, chance: 0.75, t: 'spiritual' },
      { name: 'Calculated Waveburst',  dmg: 2.50, staminaCost: 17, qiCost: 0.54, chance: 0.20, t: 'spiritual' },
      { name: 'Formula Cataclysm',     dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.51
  },

  // Additional Intelligence Manuals
  {
    title: 'Geode Analysis Ritual',
    equipped: false,
    description: 'Crack open mental geodes to study layered earth secrets.',
    methodStats: { intelligence: 1.52 },
    methodDescription: 'Geode reveals layered truths; Intelligence × 1.52',
    grade: 'Earth',
    statRequirements: { intelligence: 1.52 },
    attacks: [
      { name: 'Shard Flicker Jab',        dmg: 0.82, staminaCost: 6,  qiCost: 0.22, chance: 0.75, t: 'spiritual' },
      { name: 'Crystal Insight Wave',     dmg: 2.10, staminaCost: 13, qiCost: 0.46, chance: 0.20, t: 'spiritual' },
      { name: 'Geode Resonance Burst',    dmg: 3.05, staminaCost: 17, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.66
  },
  {
    title: 'Plate Tectonic Theory',
    equipped: false,
    description: 'Map shifting plates to predict earth’s hidden movements.',
    methodStats: { intelligence: 1.62 },
    methodDescription: 'Plates whisper shifting futures; Intelligence × 1.62',
    grade: 'Earth',
    statRequirements: { intelligence: 1.62 },
    attacks: [
      { name: 'Faultline Jab',            dmg: 0.88, staminaCost: 7,  qiCost: 0.24, chance: 0.75, t: 'spiritual' },
      { name: 'Seismic Blueprint Beam',    dmg: 1.95, staminaCost: 14, qiCost: 0.48, chance: 0.20, t: 'spiritual' },
      { name: 'Tectonic Cataclysm',       dmg: 3.15, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.62
  },
  {
    title: 'Crystal Lattice Schema',
    equipped: false,
    description: 'Survey intricate lattice to uncover crystalline energies.',
    methodStats: { intelligence: 1.72 },
    methodDescription: 'Lattice gleams with secret power; Intelligence × 1.72',
    grade: 'Earth',
    statRequirements: { intelligence: 1.72 },
    attacks: [
      { name: 'Lattice Pulse Strike',     dmg: 0.92, staminaCost: 7,  qiCost: 0.23, chance: 0.75, t: 'spiritual' },
      { name: 'Crystal Surge Wave',       dmg: 2.05, staminaCost: 15, qiCost: 0.49, chance: 0.20, t: 'spiritual' },
      { name: 'Lattice Cataclysmic Burst',dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.58
  },
  {
    title: 'Magmatic Flow Theory',
    equipped: false,
    description: 'Trace magma currents to understand raw elemental patterns.',
    methodStats: { intelligence: 1.82 },
    methodDescription: 'Magma flows write destinies; Intelligence × 1.82',
    grade: 'Earth',
    statRequirements: { intelligence: 1.82 },
    attacks: [
      { name: 'Magma Breath Jab',         dmg: 1.00, staminaCost: 8,  qiCost: 0.26, chance: 0.75, t: 'spiritual' },
      { name: 'Eruption Insight Wave',    dmg: 2.15, staminaCost: 16, qiCost: 0.51, chance: 0.20, t: 'spiritual' },
      { name: 'Volcanic Revelatory Cataclysm', dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.55
  },
  {
    title: 'Seismic Wave Calculus',
    equipped: false,
    description: 'Compute waveforms of earthquakes to harness vibrational power.',
    methodStats: { intelligence: 1.92 },
    methodDescription: 'Waves resonate my inner calculus; Intelligence × 1.92',
    grade: 'Earth',
    statRequirements: { intelligence: 1.92 },
    attacks: [
      { name: 'Waveform Jab',             dmg: 1.05, staminaCost: 8,  qiCost: 0.27, chance: 0.75, t: 'spiritual' },
      { name: 'Vibration Surge',           dmg: 2.30, staminaCost: 17, qiCost: 0.52, chance: 0.20, t: 'spiritual' },
      { name: 'Calculus Cataclysm',        dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.52
  },


  // Additional Intelligence Manuals
  {
    title: 'Geode Analysis Ritual',
    equipped: false,
    description: 'Crack open mental geodes to study layered earth secrets.',
    methodStats: { intelligence: 1.52 },
    methodDescription: 'Geode reveals layered truths; Intelligence × 1.52',
    grade: 'Earth',
    statRequirements: { intelligence: 1.52 },
    attacks: [
      { name: 'Shard Flicker Jab',        dmg: 0.82, staminaCost: 6,  qiCost: 0.22, chance: 0.75, t: 'spiritual' },
      { name: 'Crystal Insight Wave',     dmg: 1.85, staminaCost: 13, qiCost: 0.46, chance: 0.20, t: 'spiritual' },
      { name: 'Geode Resonance Burst',    dmg: 3.10, staminaCost: 17, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.66
  },
  {
    title: 'Plate Tectonic Theory',
    equipped: false,
    description: 'Map shifting plates to predict earth’s hidden movements.',
    methodStats: { intelligence: 1.62 },
    methodDescription: 'Plates whisper shifting futures; Intelligence × 1.62',
    grade: 'Earth',
    statRequirements: { intelligence: 1.62 },
    attacks: [
      { name: 'Faultline Jab',            dmg: 0.88, staminaCost: 7,  qiCost: 0.24, chance: 0.75, t: 'spiritual' },
      { name: 'Seismic Blueprint Beam',    dmg: 1.95, staminaCost: 14, qiCost: 0.48, chance: 0.20, t: 'spiritual' },
      { name: 'Tectonic Cataclysm',       dmg: 3.15, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.62
  },
  {
    title: 'Crystal Lattice Schema',
    equipped: false,
    description: 'Survey intricate lattice to uncover crystalline energies.',
    methodStats: { intelligence: 1.72 },
    methodDescription: 'Lattice gleams with secret power; Intelligence × 1.72',
    grade: 'Earth',
    statRequirements: { intelligence: 1.72 },
    attacks: [
      { name: 'Lattice Pulse Strike',     dmg: 0.92, staminaCost: 7,  qiCost: 0.23, chance: 0.75, t: 'spiritual' },
      { name: 'Crystal Surge Wave',       dmg: 2.05, staminaCost: 15, qiCost: 0.49, chance: 0.20, t: 'spiritual' },
      { name: 'Lattice Cataclysmic Burst',dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.58
  },
  {
    title: 'Magmatic Flow Theory',
    equipped: false,
    description: 'Trace magma currents to understand raw elemental patterns.',
    methodStats: { intelligence: 1.82 },
    methodDescription: 'Magma flows write destinies; Intelligence × 1.82',
    grade: 'Earth',
    statRequirements: { intelligence: 1.82 },
    attacks: [
      { name: 'Magma Breath Jab',         dmg: 1.00, staminaCost: 8,  qiCost: 0.26, chance: 0.75, t: 'spiritual' },
      { name: 'Eruption Insight Wave',    dmg: 2.15, staminaCost: 16, qiCost: 0.51, chance: 0.20, t: 'spiritual' },
      { name: 'Volcanic Revelatory Cataclysm', dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.55
  },
  {
    title: 'Seismic Wave Calculus',
    equipped: false,
    description: 'Compute waveforms of earthquakes to harness vibrational power.',
    methodStats: { intelligence: 1.92 },
    methodDescription: 'Waves resonate my inner calculus; Intelligence × 1.92',
    grade: 'Earth',
    statRequirements: { intelligence: 1.92 },
    attacks: [
      { name: 'Waveform Jab',             dmg: 1.05, staminaCost: 8,  qiCost: 0.27, chance: 0.75, t: 'spiritual' },
      { name: 'Vibration Surge',           dmg: 2.30, staminaCost: 17, qiCost: 0.52, chance: 0.20, t: 'spiritual' },
      { name: 'Calculus Cataclysm',        dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.52
  },

  //dexterity

    {
    title: 'Sandstep Flow',
    equipped: false,
    description: 'Move like drifting dunes, swift and silent across broken ground.',
    methodStats: { dexterity: 1.50 },
    methodDescription: 'Dunes cloak every fleet step; Dexterity × 1.50',
    grade: 'Earth',
    statRequirements: { dexterity: 1.50 },
    attacks: [
      { name: 'Dust Whisper',      dmg: 0.75, staminaCost: 5,  qiCost: 0.18, chance: 0.75, t: 'spiritual' },
      { name: 'Grainstorm Flick',  dmg: 1.90, staminaCost: 12, qiCost: 0.30, chance: 0.20, t: 'spiritual' },
      { name: 'Quicksand Twist',   dmg: 3.00, staminaCost: 16, qiCost: 0.40, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.67
  },
  {
    title: 'Stone Skipping Dance',
    equipped: false,
    description: 'Leap across fractured stones, each step rebounding like ripples.',
    methodStats: { dexterity: 1.55 },
    methodDescription: 'Ripples trace each graceful bound; Dexterity × 1.55',
    grade: 'Earth',
    statRequirements: { dexterity: 1.55 },
    attacks: [
      { name: 'Pebble Jab',        dmg: 0.85, staminaCost: 6,  qiCost: 0.20, chance: 0.75, t: 'spiritual' },
      { name: 'Shatter Step Strike',dmg: 2.10, staminaCost: 13, qiCost: 0.32, chance: 0.20, t: 'spiritual' },
      { name: 'Duststorm Finale',  dmg: 3.10, staminaCost: 17, qiCost: 0.45, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.65
  },
  {
    title: 'Basilisk Creep Technique',
    equipped: false,
    description: 'Slide unseen through cracks, as predators stalk silent prey.',
    methodStats: { dexterity: 1.60 },
    methodDescription: 'Shadows ripple beneath silent foot; Dexterity × 1.60',
    grade: 'Earth',
    statRequirements: { dexterity: 1.60 },
    attacks: [
      { name: 'Sand Flicker',      dmg: 0.90, staminaCost: 7,  qiCost: 0.22, chance: 0.75, t: 'spiritual' },
      { name: 'Quicksand Grasp',   dmg: 2.30, staminaCost: 14, qiCost: 0.34, chance: 0.20, t: 'spiritual' },
      { name: 'Eruption Backstab', dmg: 3.20, staminaCost: 18, qiCost: 0.50, chance: 0.05, t: 'physical' }
    ],
    weight: 0.63
  },
  {
    title: 'Grainfield Shuffle',
    equipped: false,
    description: 'Weave through tall stalks, each step a fleeting whisper.',
    methodStats: { dexterity: 1.65 },
    methodDescription: 'Stalks part at nimble stride; Dexterity × 1.65',
    grade: 'Earth',
    statRequirements: { dexterity: 1.65 },
    attacks: [
      { name: 'Field Whisper',    dmg: 0.80, staminaCost: 6,  qiCost: 0.20, chance: 0.75, t: 'spiritual' },
      { name: 'Harvest Dance Slash', dmg: 2.20, staminaCost: 12, qiCost: 0.32, chance: 0.20, t: 'physical' },
      { name: 'Leafstorm Twirl',  dmg: 3.10, staminaCost: 16, qiCost: 0.45, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.61
  },
  {
    title: 'Pebble Path Pirouette',
    equipped: false,
    description: 'Spin upon a path of pebbles, balancing grace with control.',
    methodStats: { dexterity: 1.70 },
    methodDescription: 'Pebbles guide each elegant spin; Dexterity × 1.70',
    grade: 'Earth',
    statRequirements: { dexterity: 1.70 },
    attacks: [
      { name: 'Pebble Spin Jab',  dmg: 0.95, staminaCost: 7,  qiCost: 0.25, chance: 0.75, t: 'physical' },
      { name: 'Cyclone Sliver Strike', dmg: 2.30, staminaCost: 14, qiCost: 0.48, chance: 0.20, t: 'spiritual' },
      { name: 'Whirling Gorge Crash', dmg: 3.20, staminaCost: 18, qiCost: 0.50, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.59
  },
  {
    title: 'Echoing Vault Technique',
    equipped: false,
    description: 'Launch yourself off cavern walls, echoing like vaulted passages.',
    methodStats: { dexterity: 1.75 },
    methodDescription: 'Vaults resonate each agile launch; Dexterity × 1.75',
    grade: 'Earth',
    statRequirements: { dexterity: 1.75 },
    attacks: [
      { name: 'Vault Strike Jab', dmg: 1.00, staminaCost: 8,  qiCost: 0.28, chance: 0.75, t: 'physical' },
      { name: 'Rebound Rush',      dmg: 2.50, staminaCost: 16, qiCost: 0.48, chance: 0.20, t: 'physical' },
      { name: 'Echo Cataclysm Smash',dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.57
  },
  {
    title: 'Terra Lattice Weave',
    equipped: false,
    description: 'Interlace footfalls with earthen lattices to confuse foes.',
    methodStats: { dexterity: 1.80 },
    methodDescription: 'Lattices blur every swift step; Dexterity × 1.80',
    grade: 'Earth',
    statRequirements: { dexterity: 1.80 },
    attacks: [
      { name: 'Lattice Jab',       dmg: 1.05, staminaCost: 9,  qiCost: 0.30, chance: 0.75, t: 'spiritual' },
      { name: 'Weaveburst Strike', dmg: 2.60, staminaCost: 17, qiCost: 0.50, chance: 0.20, t: 'physical' },
      { name: 'Patterned Cataclysm',dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.56
  },
  {
    title: 'Dustveil Sidestep',
    equipped: false,
    description: 'Veil yourself in kicked dust to slip past vigilant watchers.',
    methodStats: { dexterity: 1.85 },
    methodDescription: 'Dust curtains each silent evade; Dexterity × 1.85',
    grade: 'Earth',
    statRequirements: { dexterity: 1.85 },
    attacks: [
      { name: 'Dust Cloud Jab',    dmg: 1.10, staminaCost: 9,  qiCost: 0.32, chance: 0.75, t: 'spiritual' },
      { name: 'Silent Slip Strike',dmg: 2.70, staminaCost: 17, qiCost: 0.52, chance: 0.20, t: 'physical' },
      { name: 'Veilburst Finale',  dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.54
  },
  {
    title: 'Mudslide Slink',
    equipped: false,
    description: 'Glide across slick mud, leaving no trace of movement.',
    methodStats: { dexterity: 1.90 },
    methodDescription: 'Mud whispers beneath gliding form; Dexterity × 1.90',
    grade: 'Earth',
    statRequirements: { dexterity: 1.90 },
    attacks: [
      { name: 'Slick Jab',         dmg: 1.15, staminaCost: 10, qiCost: 0.34, chance: 0.75, t: 'physical' },
      { name: 'Slideburst Kick',   dmg: 2.80, staminaCost: 18, qiCost: 0.54, chance: 0.20, t: 'spiritual' },
      { name: 'Seismic Slink Smash',dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.53
  },
  {
    title: 'Canyon Wind Slide',
    equipped: false,
    description: 'Harness canyon drafts to carry you swiftly between rocks.',
    methodStats: { dexterity: 1.95 },
    methodDescription: 'Winds cradle each agile drift; Dexterity × 1.95',
    grade: 'Earth',
    statRequirements: { dexterity: 1.95 },
    attacks: [
      { name: 'Wind Slice Jab',    dmg: 1.20, staminaCost: 10, qiCost: 0.36, chance: 0.75, t: 'spiritual' },
      { name: 'Draftscar Wave',    dmg: 2.90, staminaCost: 18, qiCost: 0.55, chance: 0.20, t: 'spiritual' },
      { name: 'Gale Cataclysm Storm',dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.51
  },
  {
    title: 'Pebble Dancer Technique',
    equipped: false,
    description: 'Dance along pebbled paths, each step striking true and light.',
    methodStats: { dexterity: 2.00 },
    methodDescription: 'Pebbles guide precise leaps; Dexterity × 2.00',
    grade: 'Earth',
    statRequirements: { dexterity: 2.00 },
    attacks: [
      { name: 'Dancer Jab',          dmg: 1.20, staminaCost: 10, qiCost: 0.36, chance: 0.75, t: 'physical' },
      { name: 'Peelwing Sweep',      dmg: 2.50, staminaCost: 16, qiCost: 0.50, chance: 0.20, t: 'physical' },
      { name: 'Pebblestorm Frenzy',  dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.50
  },
  {
    title: 'Quicksilver Step',
    equipped: false,
    description: 'Step with liquid grace as swift as molten metal.',
    methodStats: { dexterity: 1.45 },
    methodDescription: 'Liquid grace flows in each step; Dexterity × 1.45',
    grade: 'Earth',
    statRequirements: { dexterity: 1.45 },
    attacks: [
      { name: 'Liquid Flick Jab',    dmg: 0.70, staminaCost: 5,  qiCost: 0.18, chance: 0.75, t: 'physical' },
      { name: 'Mercury Wave',        dmg: 1.40, staminaCost: 12, qiCost: 0.30, chance: 0.20, t: 'spiritual' },
      { name: 'Silversurge Slash',   dmg: 2.80, staminaCost: 16, qiCost: 0.48, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.69
  },
  {
    title: 'Earthbow Draw',
    equipped: false,
    description: 'Nock earthen arrows and draw in silence, releasing raw force.',
    methodStats: { dexterity: 1.85 },
    methodDescription: 'Arrows pierce with silent strength; Dexterity × 1.85',
    grade: 'Earth',
    statRequirements: { dexterity: 1.85 },
    attacks: [
      { name: 'Arrow Flick Jab',     dmg: 0.95, staminaCost: 9,  qiCost: 0.32, chance: 0.75, t: 'physical' },
      { name: 'Boulder Arrow Rain',  dmg: 2.20, staminaCost: 15, qiCost: 0.48, chance: 0.20, t: 'physical' },
      { name: 'Cataclysmic Rain',    dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.54
  },
  {
    title: 'Dustwind Cyclone',
    equipped: false,
    description: 'Spin amidst swirling dust to become an unstoppable cyclone.',
    methodStats: { dexterity: 1.78 },
    methodDescription: 'Dust whirls under each vortex; Dexterity × 1.78',
    grade: 'Earth',
    statRequirements: { dexterity: 1.78 },
    attacks: [
      { name: 'Cyclone Jab',         dmg: 1.10, staminaCost: 10, qiCost: 0.34, chance: 0.75, t: 'physical' },
      { name: 'Vortex Sweep',        dmg: 2.40, staminaCost: 17, qiCost: 0.52, chance: 0.20, t: 'spiritual' },
      { name: 'Storm of Pebbles',    dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.56
  },
  {
    title: 'Auric Leaf Sprint',
    equipped: false,
    description: 'Dash through gold-tinted leaves, each step a fleeting flash.',
    methodStats: { dexterity: 1.65 },
    methodDescription: 'Leaves shimmer with swift passage; Dexterity × 1.65',
    grade: 'Earth',
    statRequirements: { dexterity: 1.65 },
    attacks: [
      { name: 'Leaf Flash Jab',      dmg: 0.85, staminaCost: 7,  qiCost: 0.22, chance: 0.75, t: 'physical' },
      { name: 'Golden Gust Slash',   dmg: 2.00, staminaCost: 14, qiCost: 0.46, chance: 0.20, t: 'physical' },
      { name: 'Amber Torrent Spin',  dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.61
  },

  //strength

  {
    title: 'Titan’s Heart Breathing',
    equipped: false,
    description: 'Harness molten core power to fuel unstoppable fists.',
    methodStats: { strength: 1.50 },
    methodDescription: 'Core fire ignites mighty blows; Strength × 1.50',
    grade: 'Earth',
    statRequirements: { strength: 1.50 },
    attacks: [
      { name: 'Molten Punch',       dmg: 0.80, staminaCost: 6,  qiCost: 0.20, chance: 0.75, t: 'physical' },
      { name: 'Corefire Slam',       dmg: 1.60, staminaCost: 12, qiCost: 0.35, chance: 0.20, t: 'physical' },
      { name: 'Inferno Crush',       dmg: 3.00, staminaCost: 18, qiCost: 0.50, chance: 0.05, t: 'physical' }
    ],
    weight: 0.67
  },
  {
    title: 'Anvil Fist Method',
    equipped: false,
    description: 'Strike like a blacksmith’s hammer, forging destiny anew.',
    methodStats: { strength: 1.60 },
    methodDescription: 'Hammer blows reshape fate itself; Strength × 1.60',
    grade: 'Earth',
    statRequirements: { strength: 1.60 },
    attacks: [
      { name: 'Anvil Jab',           dmg: 0.90, staminaCost: 7,  qiCost: 0.22, chance: 0.75, t: 'physical' },
      { name: 'Forge Crash',         dmg: 1.80, staminaCost: 13, qiCost: 0.38, chance: 0.20, t: 'physical' },
      { name: 'Smith’s Cataclysm',   dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.63
  },
  {
    title: 'Stonecrusher Doctrine',
    equipped: false,
    description: 'Crush bedrock barriers with unparalleled brute force.',
    methodStats: { strength: 1.70 },
    methodDescription: 'Bedrock shatters at my will; Strength × 1.70',
    grade: 'Earth',
    statRequirements: { strength: 1.70 },
    attacks: [
      { name: 'Pebble Hammer',       dmg: 1.00, staminaCost: 8,  qiCost: 0.25, chance: 0.75, t: 'physical' },
      { name: 'Boulder Crasher',     dmg: 2.00, staminaCost: 14, qiCost: 0.40, chance: 0.20, t: 'physical' },
      { name: 'Quarry Cataclysm',    dmg: 3.30, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.59
  },
  {
    title: 'Giant’s Grip Technique',
    equipped: false,
    description: 'Seize enemies as if they were mere pebbles in your hand.',
    methodStats: { strength: 1.80 },
    methodDescription: 'Grip bends all under my hand; Strength × 1.80',
    grade: 'Earth',
    statRequirements: { strength: 1.80 },
    attacks: [
      { name: 'Grip Jab',            dmg: 1.10, staminaCost: 9,  qiCost: 0.28, chance: 0.75, t: 'physical' },
      { name: 'Titan Grip Slam',     dmg: 2.20, staminaCost: 15, qiCost: 0.45, chance: 0.20, t: 'physical' },
      { name: 'Worldbreaker Crush',  dmg: 3.40, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.56
  },
  {
    title: 'Mountainbreaker System',
    equipped: false,
    description: 'Channel peak energy to shatter all that stands before you.',
    methodStats: { strength: 1.90 },
    methodDescription: 'Peaks fuel devastating force; Strength × 1.90',
    grade: 'Earth',
    statRequirements: { strength: 1.90 },
    attacks: [
      { name: 'Peak Smash',          dmg: 1.20, staminaCost: 10, qiCost: 0.30, chance: 0.75, t: 'physical' },
      { name: 'Ridgefall Crash',     dmg: 2.40, staminaCost: 16, qiCost: 0.50, chance: 0.20, t: 'physical' },
      { name: 'Summit Cataclysm',    dmg: 3.50, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.53
  },
  {
    title: 'Basalt Wall Press',
    equipped: false,
    description: 'Apply unstoppable pressure like a wall of living basalt.',
    methodStats: { strength: 2.00 },
    methodDescription: 'Basalt fortress crushes all; Strength × 2.00',
    grade: 'Earth',
    statRequirements: { strength: 2.00 },
    attacks: [
      { name: 'Wall Jab',           dmg: 1.30, staminaCost: 10, qiCost: 0.32, chance: 0.75, t: 'physical' },
      { name: 'Pressing Crash',      dmg: 2.60, staminaCost: 17, qiCost: 0.52, chance: 0.20, t: 'physical' },
      { name: 'Obsidian Cataclysm',  dmg: 3.30, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.50
  },
  {
    title: 'Ironclad Smash Form',
    equipped: false,
    description: 'Smash forward with the unyielding force of molten iron.',
    methodStats: { strength: 2.10 },
    methodDescription: 'Iron melts under my assault; Strength × 2.10',
    grade: 'Earth',
    statRequirements: { strength: 2.10 },
    attacks: [
      { name: 'Iron Punch',         dmg: 1.40, staminaCost: 11, qiCost: 0.34, chance: 0.75, t: 'physical' },
      { name: 'Molten Wall Strike',  dmg: 2.80, staminaCost: 17, qiCost: 0.54, chance: 0.20, t: 'physical' },
      { name: 'Iron Cataclysm',      dmg: 3.40, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.48
  },
  {
    title: 'Corebreaker Technique',
    equipped: false,
    description: 'Strike the enemy’s core with unrelenting seismic force.',
    methodStats: { strength: 2.20 },
    methodDescription: 'Seismic strike crushes core; Strength × 2.20',
    grade: 'Earth',
    statRequirements: { strength: 2.20 },
    attacks: [
      { name: 'Seismic Jab',        dmg: 1.50, staminaCost: 12, qiCost: 0.36, chance: 0.75, t: 'physical' },
      { name: 'Fault Crush Wave',   dmg: 3.00, staminaCost: 18, qiCost: 0.55, chance: 0.20, t: 'physical' },
      { name: 'Epicenter Cataclysm',dmg: 3.50, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.45
  },
  {
    title: 'Earthmover Mastery',
    equipped: false,
    description: 'Move mountains with each swing of your hardened limbs.',
    methodStats: { strength: 2.30 },
    methodDescription: 'Mountains yield before my might; Strength × 2.30',
    grade: 'Earth',
    statRequirements: { strength: 2.30 },
    attacks: [
      { name: 'Mountain Swing',     dmg: 1.60, staminaCost: 12, qiCost: 0.38, chance: 0.75, t: 'physical' },
      { name: 'Earthmover Crash',    dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.20, t: 'physical' },
      { name: 'Titan’s Cataclysm',  dmg: 3.60, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.43
  },
  {
    title: 'Forgeheart Discipline',
    equipped: false,
    description: 'Temper your resolve in inner flames for peak durability.',
    methodStats: { strength: 2.40 },
    methodDescription: 'Flames forge unbreakable flesh; Strength × 2.40',
    grade: 'Earth',
    statRequirements: { strength: 2.40 },
    attacks: [
      { name: 'Forge Jab',          dmg: 1.70, staminaCost: 13, qiCost: 0.40, chance: 0.75, t: 'physical' },
      { name: 'Heartfire Slam',      dmg: 3.40, staminaCost: 18, qiCost: 0.55, chance: 0.20, t: 'physical' },
      { name: 'Flame Cataclysm',     dmg: 3.80, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.42
  },
  {
    title: 'Granite Mace Unleashing',
    equipped: false,
    description: 'Swing a mighty mace of granite to shatter defenses.',
    methodStats: { strength: 2.50 },
    methodDescription: 'Mace swings channel stone’s weight; Strength × 2.50',
    grade: 'Earth',
    statRequirements: { strength: 2.50 },
    attacks: [
      { name: 'Mace Jab',               dmg: 1.00, staminaCost: 10, qiCost: 0.30, chance: 0.75, t: 'physical' },
      { name: 'Mace Smash',             dmg: 2.50, staminaCost: 16, qiCost: 0.50, chance: 0.20, t: 'physical' },
      { name: 'Macequake Cataclysm',    dmg: 3.80, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.40
  },
  {
    title: 'Earthshaker Sunder',
    equipped: false,
    description: 'Sunder the earth beneath your foes with unbridled fury.',
    methodStats: { strength: 2.60 },
    methodDescription: 'Ground shakes with my anger; Strength × 2.60',
    grade: 'Earth',
    statRequirements: { strength: 2.60 },
    attacks: [
      { name: 'Sunder Jab',            dmg: 1.10, staminaCost: 11, qiCost: 0.32, chance: 0.75, t: 'physical' },
      { name: 'Sunder Slash',          dmg: 2.60, staminaCost: 17, qiCost: 0.52, chance: 0.20, t: 'physical' },
      { name: 'Sunder Cataclysm',      dmg: 3.90, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.38
  },
  {
    title: 'Boulderthrower Art',
    equipped: false,
    description: 'Hurl massive boulders with precision born of raw power.',
    methodStats: { strength: 2.70 },
    methodDescription: 'Boulders obey my will; Strength × 2.70',
    grade: 'Earth',
    statRequirements: { strength: 2.70 },
    attacks: [
      { name: 'Pebble Toss',           dmg: 0.90, staminaCost: 9,  qiCost: 0.28, chance: 0.75, t: 'physical' },
      { name: 'Boulder Hurl',          dmg: 2.70, staminaCost: 17, qiCost: 0.54, chance: 0.20, t: 'physical' },
      { name: 'Titanic Landslide',     dmg: 3.80, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.37
  },
  {
    title: 'Quarrymaster Onslaught',
    equipped: false,
    description: 'Unleash an onslaught worthy of the deepest quarries.',
    methodStats: { strength: 2.80 },
    methodDescription: 'Quarries bow to each strike; Strength × 2.80',
    grade: 'Earth',
    statRequirements: { strength: 2.80 },
    attacks: [
      { name: 'Stone Chip Strike',     dmg: 1.00, staminaCost: 10, qiCost: 0.30, chance: 0.75, t: 'physical' },
      { name: 'Quarry Slam',           dmg: 2.80, staminaCost: 18, qiCost: 0.55, chance: 0.20, t: 'physical' },
      { name: 'Oblivion Quake',        dmg: 4.00, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.36
  },
  {
    title: 'Worldcrusher Doctrine',
    equipped: false,
    description: 'Wield the might to crush worlds with a single blow.',
    methodStats: { strength: 2.90 },
    methodDescription: 'World bends under my might; Strength × 2.90',
    grade: 'Earth',
    statRequirements: { strength: 2.90 },
    attacks: [
      { name: 'Crushing Punch',        dmg: 1.20, staminaCost: 10, qiCost: 0.32, chance: 0.75, t: 'physical' },
      { name: 'Global Impact',         dmg: 3.00, staminaCost: 18, qiCost: 0.55, chance: 0.20, t: 'physical' },
      { name: 'Worldbreaker Cataclysm', dmg: 4.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.34
  },

  //qiAffinity
  {
    title: 'Lotus Qi Unification',
    equipped: false,
    description: 'Merge your breath with lotus qi, harmonizing life force.',
    methodStats: { qiAffinity: 1.50 },
    methodDescription: 'Lotus breath awakens inner stream; QiAffinity × 1.50',
    grade: 'Earth',
    statRequirements: { qiAffinity: 1.50 },
    attacks: [
      { name: 'Qi Seed Pulse',          dmg: 0.80, staminaCost: 6,  qiCost: 0.20, chance: 0.75, t: 'spiritual' },
      { name: 'Lotus Wave Eruption',    dmg: 2.00, staminaCost: 12, qiCost: 0.40, chance: 0.20, t: 'spiritual' },
      { name: 'Celestial Qi Cataclysm', dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.67
  },
  {
    title: 'Ember Qi Conduit',
    equipped: false,
    description: 'Channel ember qi through vessels, igniting inner power.',
    methodStats: { qiAffinity: 1.60 },
    methodDescription: 'Ember qi sparks molten strength; QiAffinity × 1.60',
    grade: 'Earth',
    statRequirements: { qiAffinity: 1.60 },
    attacks: [
      { name: 'Flame Whisper Jab',      dmg: 0.85, staminaCost: 7,  qiCost: 0.22, chance: 0.75, t: 'spiritual' },
      { name: 'Inferno Wave',           dmg: 2.10, staminaCost: 13, qiCost: 0.42, chance: 0.20, t: 'spiritual' },
      { name: 'Emberstorm Cataclysm',   dmg: 3.25, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.63
  },
  {
    title: 'Stone Qi Convergence',
    equipped: false,
    description: 'Focus stone qi at your core, grounding all fluctuations.',
    methodStats: { qiAffinity: 1.70 },
    methodDescription: 'Stone qi binds unstable tides; QiAffinity × 1.70',
    grade: 'Earth',
    statRequirements: { qiAffinity: 1.70 },
    attacks: [
      { name: 'Gravel Qi Jab',          dmg: 0.90, staminaCost: 8,  qiCost: 0.25, chance: 0.75, t: 'spiritual' },
      { name: 'Pebble Wave Slash',      dmg: 2.30, staminaCost: 14, qiCost: 0.48, chance: 0.20, t: 'spiritual' },
      { name: 'Cataclysmic Earth Qi',   dmg: 3.30, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.59
  },
  {
    title: 'Mountain Qi Circulation',
    equipped: false,
    description: 'Rotate mountain qi through limbs to unleash sweeping force.',
    methodStats: { qiAffinity: 1.80 },
    methodDescription: 'Peaks channel boundless qi; QiAffinity × 1.80',
    grade: 'Earth',
    statRequirements: { qiAffinity: 1.80 },
    attacks: [
      { name: 'Peak Stream Jab',        dmg: 1.00, staminaCost: 9,  qiCost: 0.28, chance: 0.75, t: 'spiritual' },
      { name: 'Ridgeline Qi Wave',      dmg: 2.50, staminaCost: 15, qiCost: 0.50, chance: 0.20, t: 'spiritual' },
      { name: 'Summit Qi Cataclysm',    dmg: 3.40, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.56
  },
  {
    title: 'Cavern Qi Harmonization',
    equipped: false,
    description: 'Echo cavern qi within your pulse, amplifying resonance.',
    methodStats: { qiAffinity: 1.90 },
    methodDescription: 'Cavern echoes strengthen flow; QiAffinity × 1.90',
    grade: 'Earth',
    statRequirements: { qiAffinity: 1.90 },
    attacks: [
      { name: 'Echo Qi Jab',           dmg: 1.10, staminaCost: 10, qiCost: 0.30, chance: 0.75, t: 'spiritual' },
      { name: 'Resonance Qi Wave',     dmg: 2.60, staminaCost: 16, qiCost: 0.52, chance: 0.20, t: 'spiritual' },
      { name: 'Cavern Cataclysm',      dmg: 3.50, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.53
  },
  {
    title: 'Rune Qi Infusion',
    equipped: false,
    description: 'Inscribe runes with qi ink, infusing glyphs with spirit power.',
    methodStats: { qiAffinity: 2.00 },
    methodDescription: 'Glyphs pulse with infused qi; QiAffinity × 2.00',
    grade: 'Earth',
    statRequirements: { qiAffinity: 2.00 },
    attacks: [
      { name: 'Rune Pulse Jab',        dmg: 1.20, staminaCost: 10, qiCost: 0.32, chance: 0.75, t: 'spiritual' },
      { name: 'Infusion Qi Burst',      dmg: 2.70, staminaCost: 17, qiCost: 0.54, chance: 0.20, t: 'spiritual' },
      { name: 'Glyph Cataclysm',        dmg: 3.60, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.50
  },
  {
    title: 'Crystal Qi Radiance',
    equipped: false,
    description: 'Channel crystal vibrations to project radiant qi beams.',
    methodStats: { qiAffinity: 2.10 },
    methodDescription: 'Crystals refract potent qi; QiAffinity × 2.10',
    grade: 'Earth',
    statRequirements: { qiAffinity: 2.10 },
    attacks: [
      { name: 'Crystal Beam Jab',       dmg: 1.30, staminaCost: 11, qiCost: 0.34, chance: 0.75, t: 'spiritual' },
      { name: 'Radiant Qi Wave',        dmg: 2.80, staminaCost: 17, qiCost: 0.54, chance: 0.20, t: 'spiritual' },
      { name: 'Prismatic Cataclysm',    dmg: 3.70, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.48
  },
  {
    title: 'Bedrock Qi Resonance',
    equipped: false,
    description: 'Resonate bedrock currents to amplify earth qi beneath.',
    methodStats: { qiAffinity: 2.20 },
    methodDescription: 'Bedrock hums with deep qi; QiAffinity × 2.20',
    grade: 'Earth',
    statRequirements: { qiAffinity: 2.20 },
    attacks: [
      { name: 'Resonant Jab',          dmg: 1.40, staminaCost: 12, qiCost: 0.36, chance: 0.75, t: 'spiritual' },
      { name: 'Groundwave Qi Burst',   dmg: 2.90, staminaCost: 18, qiCost: 0.55, chance: 0.20, t: 'spiritual' },
      { name: 'Earthquake Cataclysm',   dmg: 3.80, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.45
  },
  {
    title: 'Volcanic Qi Surge',
    equipped: false,
    description: 'Surge molten qi through veins to erupt in fiery display.',
    methodStats: { qiAffinity: 2.30 },
    methodDescription: 'Magma qi fuels blazing wrath; QiAffinity × 2.30',
    grade: 'Earth',
    statRequirements: { qiAffinity: 2.30 },
    attacks: [
      { name: 'Magma Pulse Jab',        dmg: 1.50, staminaCost: 13, qiCost: 0.36, chance: 0.75, t: 'spiritual' },
      { name: 'Lava Surge Wave',        dmg: 3.00, staminaCost: 18, qiCost: 0.55, chance: 0.20, t: 'spiritual' },
      { name: 'Volcanic Cataclysm',      dmg: 4.00, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.43
  },
  {
    title: 'Seismic Qi Oscillation',
    equipped: false,
    description: 'Oscillate earth currents to send tremors through qi flow.',
    methodStats: { qiAffinity: 2.40 },
    methodDescription: 'Oscillations shake inner core; QiAffinity × 2.40',
    grade: 'Earth',
    statRequirements: { qiAffinity: 2.40 },
    attacks: [
      { name: 'Tremor Jab',            dmg: 1.60, staminaCost: 14, qiCost: 0.38, chance: 0.75, t: 'spiritual' },
      { name: 'Quake Surge Wave',      dmg: 3.10, staminaCost: 18, qiCost: 0.55, chance: 0.20, t: 'spiritual' },
      { name: 'Seismic Cataclysm',      dmg: 4.10, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.42
  },
  {
    title: 'Geode Qi Resonance',
    equipped: false,
    description: 'Crack geodes to unleash prismatic qi vibrations.',
    methodStats: { qiAffinity: 2.50 },
    methodDescription: 'Geode shards amplify mystic qi; QiAffinity × 2.50',
    grade: 'Earth',
    statRequirements: { qiAffinity: 2.50 },
    attacks: [
      { name: 'Prism Jab',             dmg: 1.20, staminaCost: 10, qiCost: 0.32, chance: 0.75, t: 'spiritual' },
      { name: 'Shardstorm Wave',        dmg: 2.70, staminaCost: 18, qiCost: 0.55, chance: 0.20, t: 'spiritual' },
      { name: 'Geode Cataclysm',        dmg: 4.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.40
  },
  {
    title: 'Magmatic Qi Conflagration',
    equipped: false,
    description: 'Fuse magma currents with qi for explosive power.',
    methodStats: { qiAffinity: 2.60 },
    methodDescription: 'Magma qi burns fierce and bright; QiAffinity × 2.60',
    grade: 'Earth',
    statRequirements: { qiAffinity: 2.60 },
    attacks: [
      { name: 'Flare Jab',             dmg: 1.30, staminaCost: 11, qiCost: 0.34, chance: 0.75, t: 'spiritual' },
      { name: 'Infernal Wave',         dmg: 2.80, staminaCost: 18, qiCost: 0.55, chance: 0.20, t: 'spiritual' },
      { name: 'Conflagration Cataclysm',dmg: 4.30, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.38
  },
  {
    title: 'Terraflux Qi Overload',
    equipped: false,
    description: 'Overload earth qi channels to trigger massive tremors.',
    methodStats: { qiAffinity: 2.70 },
    methodDescription: 'Flux tides unleash mighty tremors; QiAffinity × 2.70',
    grade: 'Earth',
    statRequirements: { qiAffinity: 2.70 },
    attacks: [
      { name: 'Flux Jab',              dmg: 1.40, staminaCost: 12, qiCost: 0.36, chance: 0.75, t: 'spiritual' },
      { name: 'Tremor Wave',           dmg: 3.00, staminaCost: 18, qiCost: 0.55, chance: 0.20, t: 'spiritual' },
      { name: 'Overload Cataclysm',     dmg: 4.40, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.37
  },
  {
    title: 'Lithic Qi Mastery',
    equipped: false,
    description: 'Master the stone qi to shape and unmake landscapes.',
    methodStats: { qiAffinity: 2.80 },
    methodDescription: 'Stone qi bends earth itself; QiAffinity × 2.80',
    grade: 'Earth',
    statRequirements: { qiAffinity: 2.80 },
    attacks: [
      { name: 'Mastery Jab',           dmg: 1.50, staminaCost: 13, qiCost: 0.38, chance: 0.75, t: 'spiritual' },
      { name: 'Carve Qi Wave',         dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.20, t: 'spiritual' },
      { name: 'Mastery Cataclysm',      dmg: 4.50, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.36
  },
  {
    title: 'Obsidian Qi Cataclysm',
    equipped: false,
    description: 'Forge obsidian qi blades to rend and burn your foes.',
    methodStats: { qiAffinity: 2.90 },
    methodDescription: 'Obsidian qi sears through all; QiAffinity × 2.90',
    grade: 'Earth',
    statRequirements: { qiAffinity: 2.90 },
    attacks: [
      { name: 'Obsidian Slash',        dmg: 1.60, staminaCost: 14, qiCost: 0.40, chance: 0.75, t: 'spiritual' },
      { name: 'Ebon Wave',             dmg: 3.40, staminaCost: 18, qiCost: 0.55, chance: 0.20, t: 'spiritual' },
      { name: 'Obsidian Cataclysm',     dmg: 4.60, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.34
  },

  //luck
  {
    title: 'Fortune’s Whisper Codex',
    equipped: false,
    description: 'Listen to the silent murmur of fate and bend probability.',
    methodStats: { luck: 1.50 },
    methodDescription: 'Whispering winds guide destiny’s favor; Luck × 1.50',
    grade: 'Earth',
    statRequirements: { luck: 1.50 },
    attacks: [
      { name: 'Chance Glimmer Jab',     dmg: 0.75, staminaCost: 5,  qiCost: 0.20, chance: 0.75, t: 'spiritual' },
      { name: 'Fortune Wave',           dmg: 1.95, staminaCost: 12, qiCost: 0.40, chance: 0.20, t: 'spiritual' },
      { name: 'Destiny Cataclysm',      dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.67
  },
  {
    title: 'Luckblade Grimoire',
    equipped: false,
    description: 'Edge your blade with fortune to strike beyond chance.',
    methodStats: { luck: 1.70 },
    methodDescription: 'Blade dances on fickle fate; Luck × 1.70',
    grade: 'Earth',
    statRequirements: { luck: 1.70 },
    attacks: [
      { name: 'Glimmering Slash',       dmg: 0.85, staminaCost: 6,  qiCost: 0.22, chance: 0.75, t: 'physical' },
      { name: 'Fortune’s Edge Wave',    dmg: 2.10, staminaCost: 14, qiCost: 0.45, chance: 0.20, t: 'physical' },
      { name: 'Luckshatter Cataclysm',  dmg: 3.30, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'physical' }
    ],
    weight: 0.59
  },
  {
    title: 'Dicebound Ritual',
    equipped: false,
    description: 'Roll the unseen dice of fate to guide every movement.',
    methodStats: { luck: 1.85 },
    methodDescription: 'Hidden dice shape each strike; Luck × 1.85',
    grade: 'Earth',
    statRequirements: { luck: 1.85 },
    attacks: [
      { name: 'Dice Toss Jab',          dmg: 0.90, staminaCost: 7,  qiCost: 0.25, chance: 0.75, t: 'spiritual' },
      { name: 'Fateful Chain Wave',     dmg: 2.30, staminaCost: 15, qiCost: 0.50, chance: 0.20, t: 'spiritual' },
      { name: 'Fortunestorm Cataclysm', dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.54
  },
  {
    title: 'Serendipity Scroll',
    equipped: false,
    description: 'Unfold secret scrolls that weave fortunate chance.',
    methodStats: { luck: 2.00 },
    methodDescription: 'Serendipity guides each unfolding; Luck × 2.00',
    grade: 'Earth',
    statRequirements: { luck: 2.00 },
    attacks: [
      { name: 'Scroll Unroll Jab',     dmg: 0.95, staminaCost: 8,  qiCost: 0.28, chance: 0.75, t: 'spiritual' },
      { name: 'Destiny Scroll Wave',   dmg: 2.50, staminaCost: 16, qiCost: 0.52, chance: 0.20, t: 'spiritual' },
      { name: 'Serendipity Cataclysm', dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.50
  },
  {
    title: 'Chaos Weaving Codex',
    equipped: false,
    description: 'Weave chaotic threads of luck to reshape outcome streams.',
    methodStats: { luck: 2.20 },
    methodDescription: 'Chaos guides unseen threads; Luck × 2.20',
    grade: 'Earth',
    statRequirements: { luck: 2.20 },
    attacks: [
      { name: 'Chaos Flicker Jab',      dmg: 1.00, staminaCost: 9,  qiCost: 0.30, chance: 0.75, t: 'spiritual' },
      { name: 'Threadstorm Wave',       dmg: 2.70, staminaCost: 17, qiCost: 0.54, chance: 0.20, t: 'spiritual' },
      { name: 'Luckquake Cataclysm',    dmg: 3.20, staminaCost: 18, qiCost: 0.55, chance: 0.05, t: 'spiritual' }
    ],
    weight: 0.45
  }
]


// export const earthManualPool: Manual[] = [
// // //methodStats {lore acurrate: 1.5-2.0}
//     {
//     title: 'lore accurate cultivation manual title',
//     equipped: false,
//     description: 'lore accurate description',
//     methodStats: {attribute: range}//or more {attribute: range}, [Can be negative but only with effects that braek the limit i set, negative within the same range(rare cases)]
//     methodDescription: //a lore acurrate 'chant' (9 words at most)[poem]
//     grade: 'Earth'
//     statRequirements: {attribute: range}//or more {attribute: range} lore accurate
//     attacks: //attack information given above, but but the attack in here in the array(the higher the stat requirements the better the attack)
//     weight: //better stats get a lower weight lower stats higher weight
//     }, //(28 entries - 4 for each attribute)[constitution and strength can be sword based[sword attacks will have a higher damage output]
    
// ]

// const attacks: Attack[] = [

//     // (if physical ->stamina higher || if spiritual qi-> cost higher)<--(higher with damage)
//     //low 
//     //dmg: 0.6-1.0, staminaCost: 5-9, qiCost: (0.18-0.32), chance: 0.75, t: 'lore accurate ( physical : spiritual )'
//     { name: 'Three Flowers Palm', dmg: 0.8, staminaCost: 1, qiCost: 0, chance: 0.75, t: 'physical' },
//     //med 
//     //dmg: 0.9-2.9, staminaCost: 8-14, qiCost: (0.30-0.48), chance: 0.2, t: 'lore accurate ( physical : spiritual )'
//     { name: 'Three Flowers Blast', dmg: 1.4, staminaCost: 5, qiCost: 0.2, chance: 0.20, t: 'spiritual' },
//     //high 
//     //dmg: 2.2-3.2, staminaCost: 12-18, qiCost: (0.4-0.55), chance: 0.05, t: 'lore accurate ( physical : spiritual )'
//     { name: 'Union of the Flower', dmg: 2.5, staminaCost: 0.3, qiCost: 0.4, chance: 0.05, t: 'spiritual' }

// ]

// title: string;
// equipped: boolean;
// description: string;
// methodStats: Record<string, number>;
// methodDescription: string;
// grade: string;
// statRequirements: Record<string, number>;
// attacks: Attack[];
// weight: number;