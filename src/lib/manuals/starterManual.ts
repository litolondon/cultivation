
export type Attack = {
  name: string;
  dmg: number;
  staminaCost: number;
  qiCost: number;
  chance: number;
  t: 'physical' | 'spiritual';
};


export type Manual = {
    title: string;
    equipped: boolean;
    description: string;
    methodStats: Record<string, number>;
    methodDescription: string;
    grade: string;
    statRequirements: Record<string, number>;
    attacks: Attack[];
    weight: number;
};

export type ManualPart = {
    title: string;
    description: string;
    methodStats: Record<string, number>;
    methodDescription: string;
}

export const humbleAttackPool: Attack[] = [
  // Low‑tier (dmg: 0.2–0.35, staminaCost: 1–3, qiCost: 0–0.1, chance: 0.75)
  { name: 'Earthen Palm Tap',         dmg: 0.20, staminaCost: 1, qiCost: 0.00, chance: 0.75, t: 'physical' },
  { name: 'Clay Soil Strike',         dmg: 0.25, staminaCost: 2, qiCost: 0.02, chance: 0.75, t: 'physical' },
  { name: 'Pebble Fist',               dmg: 0.30, staminaCost: 3, qiCost: 0.05, chance: 0.75, t: 'physical' },
  { name: 'Mossy Palm Swipe',          dmg: 0.22, staminaCost: 1, qiCost: 0.03, chance: 0.75, t: 'spiritual' },
  { name: 'Fieldhand Jab',             dmg: 0.28, staminaCost: 2, qiCost: 0.01, chance: 0.75, t: 'physical' },
  { name: 'Rustic Harvest Chop',       dmg: 0.35, staminaCost: 3, qiCost: 0.10, chance: 0.75, t: 'spiritual' },
  { name: 'Woodland Branch Slap',      dmg: 0.30, staminaCost: 2, qiCost: 0.04, chance: 0.75, t: 'physical' },
  { name: 'Stone Cairn Tap',           dmg: 0.20, staminaCost: 1, qiCost: 0.02, chance: 0.75, t: 'spiritual' },
  { name: 'Whetstone Strike',          dmg: 0.33, staminaCost: 3, qiCost: 0.08, chance: 0.75, t: 'spiritual' },
  { name: 'Barn Floor Palm',           dmg: 0.27, staminaCost: 2, qiCost: 0.06, chance: 0.75, t: 'physical' },

  // Medium‑tier (dmg: 0.5–0.75, staminaCost: 2–5, qiCost: 0.18–0.25, chance: 0.20)
  { name: 'Threshing Qi Wave',         dmg: 0.50, staminaCost: 2, qiCost: 0.18, chance: 0.20, t: 'spiritual' },
  { name: 'Fallow Qi Burst',           dmg: 0.55, staminaCost: 3, qiCost: 0.20, chance: 0.20, t: 'physical' },
  { name: 'Seedling Spirit Lance',     dmg: 0.60, staminaCost: 4, qiCost: 0.22, chance: 0.20, t: 'spiritual' },
  { name: 'Hearthland Qi Pulse',       dmg: 0.65, staminaCost: 5, qiCost: 0.25, chance: 0.20, t: 'physical' },
  { name: 'Harvest Moon Surge',        dmg: 0.70, staminaCost: 4, qiCost: 0.23, chance: 0.20, t: 'spiritual' },
  { name: 'Claybound Qi Rocket',       dmg: 0.75, staminaCost: 5, qiCost: 0.24, chance: 0.20, t: 'spiritual' },
  { name: 'Meadow Breeze Burst',       dmg: 0.60, staminaCost: 3, qiCost: 0.19, chance: 0.20, t: 'physical' },
  { name: 'Grain Echo Strike',         dmg: 0.55, staminaCost: 2, qiCost: 0.21, chance: 0.20, t: 'physical' },
  { name: 'Barnyard Qi Shot',          dmg: 0.70, staminaCost: 4, qiCost: 0.24, chance: 0.20, t: 'spiritual' },
  { name: 'Pestle & Mortar Blunt',     dmg: 0.65, staminaCost: 3, qiCost: 0.22, chance: 0.20, t: 'physical' },

  // High‑tier (dmg: 0.9–2.0, staminaCost: 5–10, qiCost: 0.28–0.38, chance: 0.05)
  { name: 'Iron Hoe Crush',            dmg: 0.90, staminaCost: 5, qiCost: 0.28, chance: 0.05, t: 'physical' },
  { name: 'Grand Hearthnova',          dmg: 1.20, staminaCost: 6, qiCost: 0.30, chance: 0.05, t: 'spiritual' },
  { name: 'Absolute Farmhand Fury',    dmg: 1.50, staminaCost: 7, qiCost: 0.32, chance: 0.05, t: 'physical' },
  { name: 'Cataclysmic Crop Strike',   dmg: 1.80, staminaCost: 8, qiCost: 0.35, chance: 0.05, t: 'spiritual' },
  { name: 'Earthshaker Palm',          dmg: 2.00, staminaCost: 10, qiCost: 0.38, chance: 0.05, t: 'spiritual' },
  { name: 'Titanic Grainhammer',       dmg: 1.70, staminaCost: 9, qiCost: 0.34, chance: 0.05, t: 'physical' },
  { name: 'Barnstormer Flare',         dmg: 1.30, staminaCost: 6, qiCost: 0.29, chance: 0.05, t: 'physical' },
  { name: 'Maelstrom Millet Blast',    dmg: 1.90, staminaCost: 8, qiCost: 0.36, chance: 0.05, t: 'spiritual' },
  { name: 'Quakeplot Catapult',        dmg: 1.40, staminaCost: 7, qiCost: 0.31, chance: 0.05, t: 'physical' },
  { name: 'Apotheosis Qi Gale',        dmg: 1.00, staminaCost: 5, qiCost: 0.28, chance: 0.05, t: 'spiritual' }
];

export const richAttackPool: Attack[] = [
  // Low-tier (dmg: 0.25–0.45, staminaCost: 1–5, qiCost: 0.05–0.15, chance: 0.75)
  { name: 'Pearl Seal Palm',        dmg: 0.25, staminaCost: 1,  qiCost: 0.05, chance: 0.75, t: 'spiritual' },
  { name: 'Jade Ribbon Jab',        dmg: 0.27, staminaCost: 2,  qiCost: 0.07, chance: 0.75, t: 'spiritual' },
  { name: 'Gold Ingot Smack',       dmg: 0.29, staminaCost: 3,  qiCost: 0.09, chance: 0.75, t: 'physical'  },
  { name: 'Silk Cord Whip',         dmg: 0.31, staminaCost: 4,  qiCost: 0.11, chance: 0.75, t: 'spiritual' },
  { name: 'Silver Chalice Chop',     dmg: 0.33, staminaCost: 5,  qiCost: 0.13, chance: 0.75, t: 'physical'  },
  { name: 'Crystal Goblet Tap',     dmg: 0.35, staminaCost: 1,  qiCost: 0.15, chance: 0.75, t: 'spiritual' },
  { name: 'Ivory Lotus Slap',       dmg: 0.37, staminaCost: 2,  qiCost: 0.06, chance: 0.75, t: 'spiritual' },
  { name: 'Marble Pillar Strike',   dmg: 0.39, staminaCost: 3,  qiCost: 0.08, chance: 0.75, t: 'physical'  },
  { name: 'Opal Thread Punch',      dmg: 0.41, staminaCost: 4,  qiCost: 0.10, chance: 0.75, t: 'spiritual' },
  { name: 'Bronze Vessel Knock',    dmg: 0.43, staminaCost: 5,  qiCost: 0.12, chance: 0.75, t: 'physical'  },

  // Medium-tier (dmg: 0.6–0.85, staminaCost: 3–7, qiCost: 0.22–0.28, chance: 0.20)
  { name: 'Imperial Jade Surge',    dmg: 0.60, staminaCost: 3,  qiCost: 0.22, chance: 0.20, t: 'spiritual' },
  { name: 'Lotus Silk Wave',        dmg: 0.63, staminaCost: 4,  qiCost: 0.23, chance: 0.20, t: 'spiritual' },
  { name: 'Ruby Heart Crash',       dmg: 0.66, staminaCost: 5,  qiCost: 0.24, chance: 0.20, t: 'physical'  },
  { name: 'Golden Pavilion Pulse',  dmg: 0.69, staminaCost: 6,  qiCost: 0.25, chance: 0.20, t: 'spiritual' },
  { name: 'Celestial Gem Blast',    dmg: 0.72, staminaCost: 7,  qiCost: 0.26, chance: 0.20, t: 'spiritual' },
  { name: 'Royal Scepter Ripple',   dmg: 0.75, staminaCost: 3,  qiCost: 0.27, chance: 0.20, t: 'spiritual' },
  { name: 'Diamond Gale Strike',    dmg: 0.78, staminaCost: 4,  qiCost: 0.28, chance: 0.20, t: 'physical'  },
  { name: 'Marbled Cloud Break',    dmg: 0.81, staminaCost: 5,  qiCost: 0.22, chance: 0.20, t: 'spiritual' },
  { name: 'Pearlescent Torrent',    dmg: 0.84, staminaCost: 6,  qiCost: 0.23, chance: 0.20, t: 'spiritual' },
  { name: 'Silken Veil Storm',      dmg: 0.85, staminaCost: 7,  qiCost: 0.24, chance: 0.20, t: 'spiritual' },

  // High-tier (dmg: 1.0–2.5, staminaCost: 6–12, qiCost: 0.30–0.40, chance: 0.05)
  { name: 'Dragon Crown Devastation', dmg: 1.00, staminaCost: 6,  qiCost: 0.30, chance: 0.05, t: 'physical'  },
  { name: 'Celestial Fortune Eruption', dmg: 1.30, staminaCost: 7,  qiCost: 0.32, chance: 0.05, t: 'spiritual' },
  { name: 'Emperor\'s Gilded Cataclysm', dmg: 1.60, staminaCost: 8,  qiCost: 0.34, chance: 0.05, t: 'physical'  },
  { name: 'Heavenly Opulence Blast', dmg: 1.90, staminaCost: 9,  qiCost: 0.36, chance: 0.05, t: 'spiritual' },
  { name: 'Sovereign Jewel Burst',   dmg: 2.20, staminaCost: 10, qiCost: 0.38, chance: 0.05, t: 'physical'  },
  { name: 'Royal Treasury Collapse', dmg: 2.50, staminaCost: 11, qiCost: 0.40, chance: 0.05, t: 'spiritual' },
  { name: 'Divine Pearl Cataclysm',  dmg: 1.10, staminaCost: 12, qiCost: 0.33, chance: 0.05, t: 'spiritual' },
  { name: 'Imperial Lotus Eruption', dmg: 1.40, staminaCost: 6,  qiCost: 0.35, chance: 0.05, t: 'spiritual' },
  { name: 'Celestial Pavilion Break', dmg: 1.70, staminaCost: 7,  qiCost: 0.37, chance: 0.05, t: 'physical'  },
  { name: 'Gilded World Rupture',    dmg: 2.00, staminaCost: 8,  qiCost: 0.39, chance: 0.05, t: 'spiritual' },
];

export const cultivationAttackPool: Attack[] = [
  // Low‑tier (dmg: 0.3–0.5, staminaCost: 2–6, qiCost: 0.08–0.2, chance: 0.75)
  { name: 'Starfeather Palm',           dmg: 0.30, staminaCost: 2,  qiCost: 0.08, chance: 0.75, t: 'physical'  },
  { name: 'Moonlit Fist Tap',           dmg: 0.35, staminaCost: 3,  qiCost: 0.10, chance: 0.75, t: 'physical'  },
  { name: 'Cloudbreak Strike',          dmg: 0.40, staminaCost: 4,  qiCost: 0.12, chance: 0.75, t: 'physical'  },
  { name: 'Spiritleaf Palm',            dmg: 0.32, staminaCost: 2,  qiCost: 0.09, chance: 0.75, t: 'spiritual' },
  { name: 'Embergrain Chop',            dmg: 0.45, staminaCost: 5,  qiCost: 0.15, chance: 0.75, t: 'physical'  },
  { name: 'Mistveil Jab',               dmg: 0.38, staminaCost: 4,  qiCost: 0.11, chance: 0.75, t: 'spiritual' },
  { name: 'Dewstone Palm',              dmg: 0.34, staminaCost: 3,  qiCost: 0.10, chance: 0.75, t: 'physical'  },
  { name: 'Lotus Ridge Swipe',          dmg: 0.42, staminaCost: 6,  qiCost: 0.18, chance: 0.75, t: 'spiritual' },
  { name: 'Verdant Strike',             dmg: 0.36, staminaCost: 3,  qiCost: 0.09, chance: 0.75, t: 'physical'  },
  { name: 'Sundrop Palm',               dmg: 0.50, staminaCost: 6,  qiCost: 0.20, chance: 0.75, t: 'spiritual' },

  // Medium‑tier (dmg: 0.7–0.9, staminaCost: 5–8, qiCost: 0.25–0.30, chance: 0.20)
  { name: 'Azure Lotus Burst',          dmg: 0.70, staminaCost: 5,  qiCost: 0.25, chance: 0.20, t: 'spiritual' },
  { name: 'Celestial Ridge Fist',       dmg: 0.75, staminaCost: 6,  qiCost: 0.27, chance: 0.20, t: 'physical'  },
  { name: 'Emberfall Wave',             dmg: 0.80, staminaCost: 7,  qiCost: 0.28, chance: 0.20, t: 'spiritual' },
  { name: 'Verdant Gale Strike',        dmg: 0.85, staminaCost: 8,  qiCost: 0.30, chance: 0.20, t: 'physical'  },
  { name: 'Moonshadow Pulse',           dmg: 0.78, staminaCost: 5,  qiCost: 0.26, chance: 0.20, t: 'spiritual' },
  { name: 'Spiritfall Charge',          dmg: 0.72, staminaCost: 6,  qiCost: 0.25, chance: 0.20, t: 'spiritual' },
  { name: 'Stonevine Clap',             dmg: 0.82, staminaCost: 7,  qiCost: 0.29, chance: 0.20, t: 'physical'  },
  { name: 'Eclipse Hammer',             dmg: 0.88, staminaCost: 8,  qiCost: 0.30, chance: 0.20, t: 'physical'  },
  { name: 'Lotuswind Surge',            dmg: 0.90, staminaCost: 7,  qiCost: 0.30, chance: 0.20, t: 'spiritual' },
  { name: 'Heavenfall Cascade',         dmg: 0.77, staminaCost: 6,  qiCost: 0.26, chance: 0.20, t: 'spiritual' },

  // High‑tier (dmg: 1.2–2.9, staminaCost: 8–14, qiCost: 0.35–0.48, chance: 0.05)
  { name: 'Primordial Lotus Eruption',  dmg: 1.20, staminaCost:  8, qiCost: 0.35, chance: 0.05, t: 'spiritual' },
  { name: 'Titan Earthshaker Slam',     dmg: 1.50, staminaCost:  9, qiCost: 0.38, chance: 0.05, t: 'physical'  },
  { name: 'Voidvine Cataclysm',         dmg: 1.80, staminaCost: 10, qiCost: 0.40, chance: 0.05, t: 'spiritual' },
  { name: 'Celestial Harvest Hammer',   dmg: 2.10, staminaCost: 11, qiCost: 0.42, chance: 0.05, t: 'physical'  },
  { name: 'Solaris World Collapse',     dmg: 2.40, staminaCost: 12, qiCost: 0.45, chance: 0.05, t: 'spiritual' },
  { name: 'Heaven’s Apex Crush',        dmg: 2.70, staminaCost: 13, qiCost: 0.47, chance: 0.05, t: 'physical'  },
  { name: 'Eternal Lotus Finale',       dmg: 2.90, staminaCost: 14, qiCost: 0.48, chance: 0.05, t: 'spiritual' },
  { name: 'Earthspirit Inferno',        dmg: 1.30, staminaCost:  8, qiCost: 0.36, chance: 0.05, t: 'spiritual' },
  { name: 'Stonebreaker’s Obliteration',dmg: 1.60, staminaCost:  9, qiCost: 0.39, chance: 0.05, t: 'physical'  },
  { name: 'Lotus Nova Cataclysm',       dmg: 2.20, staminaCost: 10, qiCost: 0.44, chance: 0.05, t: 'spiritual' }
];

export const humblePartPool: ManualPart[] = [
  // Constitution
  {
    title: 'Earthen Wall Stance',
    description: 'Brace like an ancient wall, holding fast against hardship.',
    methodStats: { constitution: 0.50 },
    methodDescription: 'Stone holds against all strain; Constitution × 0.50'
  },
  {
    title: 'Clay Core Fortification',
    description: 'Shape inner clay to form an unbreakable vessel of strength.',
    methodStats: { constitution: 0.68 },
    methodDescription: 'Clay vessels endure rebuke; Constitution × 0.68'
  },
  {
    title: 'Threshing Floor Foundation',
    description: 'Stand steady as grain on the beaten earth’s threshing floor.',
    methodStats: { constitution: 0.82 },
    methodDescription: 'Earth grounds my steadfast frame; Constitution × 0.82'
  },
  {
    title: 'Mountainside Pillar Breath',
    description: 'Inhale strength as if scaling a rocky cliff face.',
    methodStats: { constitution: 1.00 },
    methodDescription: 'Peaks grant unwavering backbone; Constitution × 1.00'
  },

  // Charisma
  {
    title: 'Village Speaker’s Benediction',
    description: 'Speak blessings like warm hearthlight, drawing hearts near.',
    methodStats: { charisma: 0.55 },
    methodDescription: 'Warm words cradle eager souls; Charisma × 0.55'
  },
  {
    title: 'Harvest Festival Oration',
    description: 'Address gathered revelers to kindle communal joy and unity.',
    methodStats: { charisma: 0.72 },
    methodDescription: 'Words spark shared celebration; Charisma × 0.72'
  },
  {
    title: 'Barnside Fellowship Call',
    description: 'Call neighbors to gather under lantern glow and laughter.',
    methodStats: { charisma: 0.88 },
    methodDescription: 'Laughter weaves bonds of kinship; Charisma × 0.88'
  },
  {
    title: 'Rustic Praise Chant',
    description: 'Chant gratitude to the land, inspiring goodwill in all.',
    methodStats: { charisma: 1.00 },
    methodDescription: 'Chants echo in grateful hearts; Charisma × 1.00'
  },

  // Intelligence
  {
    title: 'Farmer’s Almanac Meditation',
    description: 'Recite planting cycles in breath to foresee seasons ahead.',
    methodStats: { intelligence: 0.60 },
    methodDescription: 'Cycles reveal hidden patterns; Intelligence × 0.60'
  },
  {
    title: 'Cartographer’s Insight Chant',
    description: 'Trace field boundaries in mind to map unseen paths.',
    methodStats: { intelligence: 0.75 },
    methodDescription: 'Lines guide my knowing eye; Intelligence × 0.75'
  },
  {
    title: 'Stone Glyph Deciphering',
    description: 'Study ancient stones for runes that reveal deeper truths.',
    methodStats: { intelligence: 0.90 },
    methodDescription: 'Runes whisper cryptic meaning; Intelligence × 0.90'
  },
  {
    title: 'Moonlit Riddle Reflection',
    description: 'Ponder riddles under silver light to sharpen mental edge.',
    methodStats: { intelligence: 1.00 },
    methodDescription: 'Moonlight unveils hidden answers; Intelligence × 1.00'
  },

  // Dexterity
  {
    title: 'Scytheblade Footwork',
    description: 'Dance around stubble like wind among sharpened blades.',
    methodStats: { dexterity: 0.58 },
    methodDescription: 'Blades guide nimble steps; Dexterity × 0.58'
  },
  {
    title: 'Barn Roof Traverse',
    description: 'Move across rafters with quiet breath and light footfall.',
    methodStats: { dexterity: 0.74 },
    methodDescription: 'Roofboards whisper silent grace; Dexterity × 0.74'
  },
  {
    title: 'Basket Weave Finger Drill',
    description: 'Practice weaving baskets to refine fingertip precision.',
    methodStats: { dexterity: 0.88 },
    methodDescription: 'Fingers dance in intricate loops; Dexterity × 0.88'
  },
  {
    title: 'Threshing Floor Shuffle',
    description: 'Slide across grain like wind, honing swift agility.',
    methodStats: { dexterity: 1.00 },
    methodDescription: 'Grains shift beneath swift feet; Dexterity × 1.00'
  },

  // Strength
  {
    title: 'Hay Bale Lift',
    description: 'Hoist heavy bales in breath to prime raw muscle power.',
    methodStats: { strength: 0.65 },
    methodDescription: 'Bales yield to stout arms; Strength × 0.65'
  },
  {
    title: 'Millstone Push Practice',
    description: 'Push millstones steadily to build unwavering force.',
    methodStats: { strength: 0.80 },
    methodDescription: 'Stone burdens forge iron will; Strength × 0.80'
  },
  {
    title: 'Ox Taming Charge',
    description: 'Channel breath to guide powerful beasts with steady command.',
    methodStats: { strength: 0.92 },
    methodDescription: 'Beasts heed my steadfast roar; Strength × 0.92'
  },
  {
    title: 'Farmhand’s Brute Surge',
    description: 'Summon primal strength to break sod with bare hands.',
    methodStats: { strength: 1.00 },
    methodDescription: 'Hands cleave through fertile ground; Strength × 1.00'
  },

  // QiAffinity
  {
    title: 'Clay Vessel Qi Conduit',
    description: 'Channel earth’s essence through a molded clay conduit.',
    methodStats: { qiAffinity: 0.68 },
    methodDescription: 'Clay channels ancient energy; QiAffinity × 0.68'
  },
  {
    title: 'Moss Vein Qi Extraction',
    description: 'Draw vitality through mossy veins etched upon the land.',
    methodStats: { qiAffinity: 0.80 },
    methodDescription: 'Moss breathes life into qi; QiAffinity × 0.80'
  },
  {
    title: 'Emberflow Qi Ignite',
    description: 'Ignite ember‑warm currents of qi to stoke inner fire.',
    methodStats: { qiAffinity: 0.92 },
    methodDescription: 'Embers spark vibrant energy; QiAffinity × 0.92'
  },
  {
    title: 'Rootspring Qi Renewal',
    description: 'Tap springwater coursing beneath roots for pure qi.',
    methodStats: { qiAffinity: 1.00 },
    methodDescription: 'Waters renew my flowing qi; QiAffinity × 1.00'
  },

  // Luck
  {
    title: 'Lucky Grain Gathering Ritual',
    description: 'Whisper thanks to each grain, inviting fortune’s favor.',
    methodStats: { luck: 0.58 },
    methodDescription: 'Grains hum with hidden blessings; Luck × 0.58'
  },
  {
    title: 'Weather Vane Fortune Call',
    description: 'Spin vane in mind to catch shifting winds of luck.',
    methodStats: { luck: 0.76 },
    methodDescription: 'Winds swirl with chance’s whim; Luck × 0.76'
  },
  {
    title: 'Stone Toss Fate Divination',
    description: 'Toss stones in breath to glimpse turns of destiny.',
    methodStats: { luck: 0.92 },
    methodDescription: 'Stones whisper future’s pathways; Luck × 0.92'
  },
  {
    title: 'Clover Field Whisper',
    description: 'Breathe among four‑leaf clovers to harmonize with luck.',
    methodStats: { luck: 1.00 },
    methodDescription: 'Clovers channel serendipitous winds; Luck × 1.00'
  }
];

export const richPartPool: ManualPart[] = [
  // Constitution
  {
    title: 'Iron Wall Stance',
    description: 'Brace like an immovable fortress, absorbing incoming force effortlessly.',
    methodStats: { constitution: 0.80 },
    methodDescription: 'Fortress holds against all harm; Constitution × 0.80'
  },
  {
    title: 'Gritstone Endurance Chant',
    description: 'Channel the unyielding heart of bedrock to bolster your stamina.',
    methodStats: { constitution: 0.90 },
    methodDescription: 'Stones whisper relentless perseverance; Constitution × 0.90'
  },
  {
    title: 'Hearthbound Resilience Method',
    description: 'Draw strength from hearthfire memories to renew your vigor.',
    methodStats: { constitution: 1.00 },
    methodDescription: 'Hearth’s flame fuels stubborn endurance; Constitution × 1.00'
  },
  {
    title: 'Mountain Backbone Breath',
    description: 'Stand tall as peaks in breath practice to fortify your core.',
    methodStats: { constitution: 1.10 },
    methodDescription: 'Peaks steady my unwavering spine; Constitution × 1.10'
  },

  // Charisma
  {
    title: 'Silver Tongue Invocation',
    description: 'Weave golden words with each breath to charm every ear.',
    methodStats: { charisma: 0.82 },
    methodDescription: 'Words glimmer with persuasive grace; Charisma × 0.82'
  },
  {
    title: 'Radiant Presence Meditation',
    description: 'Radiate inner warmth in silent focus to draw others near.',
    methodStats: { charisma: 0.92 },
    methodDescription: 'Aura blooms in silent command; Charisma × 0.92'
  },
  {
    title: 'Golden Orator’s Oath',
    description: 'Pledge truth on gilded breath to earn trust and favor.',
    methodStats: { charisma: 1.02 },
    methodDescription: 'Oath gleams with heartfelt conviction; Charisma × 1.02'
  },
  {
    title: 'Celestial Beacon Ritual',
    description: 'Ignite an unseen beacon within to guide and inspire.',
    methodStats: { charisma: 1.12 },
    methodDescription: 'Beacon light draws eager hearts; Charisma × 1.12'
  },

  // Intelligence
  {
    title: 'Scholar’s Insight Sutra',
    description: 'Recite ancient equations in breath to sharpen mind’s eye.',
    methodStats: { intelligence: 0.85 },
    methodDescription: 'Equations bloom clarity in thought; Intelligence × 0.85'
  },
  {
    title: 'Moonlit Riddle Analysis',
    description: 'Probe lunar mysteries under gentle breath to expand understanding.',
    methodStats: { intelligence: 0.95 },
    methodDescription: 'Riddles yield secrets in silence; Intelligence × 0.95'
  },
  {
    title: 'Jade Script Divination',
    description: 'Decode glowing runes with focused breath to foresee patterns.',
    methodStats: { intelligence: 1.05 },
    methodDescription: 'Runes whisper logic’s hidden paths; Intelligence × 1.05'
  },
  {
    title: 'Celestial Map Contemplation',
    description: 'Trace star patterns in mind to align cosmic understanding.',
    methodStats: { intelligence: 1.15 },
    methodDescription: 'Stars chart the mind’s expansion; Intelligence × 1.15'
  },

  // Dexterity
  {
    title: 'Windstep Dance Technique',
    description: 'Weave through gusts in breathflow to refine nimble movement.',
    methodStats: { dexterity: 0.88 },
    methodDescription: 'Gusts guide my graceful footwork; Dexterity × 0.88'
  },
  {
    title: 'Silk Shadow Footwork',
    description: 'Slide like silk shadows in silent breath to evade danger.',
    methodStats: { dexterity: 0.98 },
    methodDescription: 'Shadows whisper unseen movement; Dexterity × 0.98'
  },
  {
    title: 'Lotus Petal Evade',
    description: 'Float on petals in breath rhythm to slip past threats.',
    methodStats: { dexterity: 1.08 },
    methodDescription: 'Petals buoy my agile stamina; Dexterity × 1.08'
  },
  {
    title: 'Thunderbolt Palm Flick',
    description: 'Snap fingers like lightning in explosive breath for quick strikes.',
    methodStats: { dexterity: 1.18 },
    methodDescription: 'Lightning flicks sharpen each strike; Dexterity × 1.18'
  },

  // Strength
  {
    title: 'Titan’s Grip Exercise',
    description: 'Clench imaginary boulders in breath to amplify raw power.',
    methodStats: { strength: 0.80 },
    methodDescription: 'Boulders yield to iron might; Strength × 0.80'
  },
  {
    title: 'Earthshaker Hammer Strike',
    description: 'Drive qi like a hammer through breath to crack the ground.',
    methodStats: { strength: 0.90 },
    methodDescription: 'Ground trembles beneath fierce blow; Strength × 0.90'
  },
  {
    title: 'Ironroot Charge Practice',
    description: 'Surge forward with rooted breath to bulldoze obstacles.',
    methodStats: { strength: 1.10 },
    methodDescription: 'Roots steel my charging force; Strength × 1.10'
  },
  {
    title: 'Bearheart Surge',
    description: 'Roar in breath to summon primal strength from deep within.',
    methodStats: { strength: 1.20 },
    methodDescription: 'Roar unlocks ancient power’s surge; Strength × 1.20'
  },

  // QiAffinity
  {
    title: 'Jade Ingot Breathing Rite',
    description: 'Channel refined energy through jade inlays, smoothing your qi flow.',
    methodStats: { qiAffinity: 1.00 },
    methodDescription: 'Jade inlays calm my essence; QiAffinity × 1.00'
  },
  {
    title: 'Diamond Thread Qi Weaving',
    description: 'Stitch together qi strands like diamond‑strong threads of fate.',
    methodStats: { qiAffinity: 1.10 },
    methodDescription: 'Diamond threads bind strong qi; QiAffinity × 1.10'
  },
  {
    title: 'Pearl Seal Energy Infusion',
    description: 'Press pearl‑branded seals along meridians to focus auspicious qi surges.',
    methodStats: { qiAffinity: 1.20 },
    methodDescription: 'Pearl’s seal binds cosmic qi; QiAffinity × 1.20'
  },
  {
    title: 'Mystic Lotus Alignment',
    description: 'Align your core to the lotus’s cosmic bloom through calm breath.',
    methodStats: { qiAffinity: 1.28 },
    methodDescription: 'Lotus core harmonizes my qi; QiAffinity × 1.28'
  },

  // Luck
  {
    title: 'Gilded Lotus Chant',
    description: 'Invoke the gilded lotus bloom, drawing prosperity’s essence into your breath.',
    methodStats: { luck: 0.85 },
    methodDescription: 'Lotus petals summon golden fate; Luck × 0.85'
  },
  {
    title: 'Fortune’s Whisper Ceremony',
    description: 'Whisper ancient blessings in breath to beckon unseen fortune.',
    methodStats: { luck: 0.95 },
    methodDescription: 'Blessings drift on silent wind; Luck × 0.95'
  },
  {
    title: 'Celestial Coin Flow',
    description: 'Visualize coins cascading like stars to attract cosmic abundance.',
    methodStats: { luck: 1.05 },
    methodDescription: 'Coins cascade in starlit path; Luck × 1.05'
  },
  {
    title: 'Stardust Fortune Invocation',
    description: 'Breathe in stardust light to weave chance into your destiny.',
    methodStats: { luck: 1.18 },
    methodDescription: 'Stardust weaves my destined luck; Luck × 1.18'
  }
];

export const cultivationPartPool: ManualPart[] = [
  // Constitution
  {
    title: 'Heavenly Mountain Pillar Stance',
    description: 'Stand firm as mountain peaks, unyielding to adversity.',
    methodStats: { constitution: 0.50 },
    methodDescription: 'Mountains withstand all crushing force; Constitution × 0.50'
  },
  {
    title: 'Celestial Root Fortification',
    description: 'Roots from the heavens anchor you with divine solidity.',
    methodStats: { constitution: 0.58 },
    methodDescription: 'Heaven’s roots bind steadfast veins; Constitution × 0.58'
  },
  {
    title: 'Skyforge Backbone Practice',
    description: 'Channel skyfire through backbone to temper unbreakable resolve.',
    methodStats: { constitution: 0.66 },
    methodDescription: 'Skyfire hardens my spine; Constitution × 0.66'
  },
  {
    title: 'Starlight Endurance Ritual',
    description: 'Bathe in starlight’s glow to extend the limits of endurance.',
    methodStats: { constitution: 0.74 },
    methodDescription: 'Stars infuse endless endurance; Constitution × 0.74'
  },
  {
    title: 'Ironspine Meditation',
    description: 'Meditate on ironspine to cultivate steely resilience within.',
    methodStats: { constitution: 0.82 },
    methodDescription: 'Iron spines defy all strain; Constitution × 0.82'
  },
  {
    title: 'Core of the Earth Chant',
    description: 'Hum earth’s chant to solidify your core strengths.',
    methodStats: { constitution: 1.00 },
    methodDescription: 'Earth’s core glows unwavering; Constitution × 1.00'
  },

  // Charisma
  {
    title: 'Dragonheart Benediction',
    description: 'Invoke the dragon’s heart to fill you with commanding presence.',
    methodStats: { charisma: 0.52 },
    methodDescription: 'Dragon’s roar sways all hearts; Charisma × 0.52'
  },
  {
    title: 'Phoenix Song Invocation',
    description: 'Sing phoenix fire to reignite passion and allure in others.',
    methodStats: { charisma: 0.60 },
    methodDescription: 'Phoenix song warms eager souls; Charisma × 0.60'
  },
  {
    title: 'Golden Aura Chant',
    description: 'Project a golden aura to draw admiration and trust.',
    methodStats: { charisma: 0.68 },
    methodDescription: 'Aura glimmers with radiant grace; Charisma × 0.68'
  },
  {
    title: 'Emperor’s Voice Meditation',
    description: 'Meditate upon imperial tones to command respect and loyalty.',
    methodStats: { charisma: 0.76 },
    methodDescription: 'Imperial tones bind loyal hearts; Charisma × 0.76'
  },
  {
    title: 'Radiant Presence Ode',
    description: 'Recite an ode of light to embody inspiring charisma.',
    methodStats: { charisma: 0.84 },
    methodDescription: 'Light dances upon eager gaze; Charisma × 0.84'
  },
  {
    title: 'Celestial Chorus Ritual',
    description: 'Chorus of stars sings through you, captivating every watcher.',
    methodStats: { charisma: 1.00 },
    methodDescription: 'Stars harmonize in my breath; Charisma × 1.00'
  },

  // Intelligence
  {
    title: 'Scripture of the Stars',
    description: 'Study celestial scriptures to expand the horizons of your mind.',
    methodStats: { intelligence: 0.54 },
    methodDescription: 'Stars reveal hidden knowledge’s path; Intelligence × 0.54'
  },
  {
    title: 'Lotus Mind Contemplation',
    description: 'Focus on lotus mind to clear and sharpen thought.',
    methodStats: { intelligence: 0.62 },
    methodDescription: 'Mind clears beneath lotus bloom; Intelligence × 0.62'
  },
  {
    title: 'Moon Gate Riddle Reflection',
    description: 'Ponder riddles under moonlight to twist and shape insight.',
    methodStats: { intelligence: 0.70 },
    methodDescription: 'Moon riddles unfold secret truths; Intelligence × 0.70'
  },
  {
    title: 'Sage’s Insight Sutra',
    description: 'Recite a sage’s sutra to unlock profound understanding.',
    methodStats: { intelligence: 0.78 },
    methodDescription: 'Sutra whispers ancient wisdom; Intelligence × 0.78'
  },
  {
    title: 'Runic Glyph Analysis',
    description: 'Analyze runic glyphs carved in stone for hidden patterns.',
    methodStats: { intelligence: 0.86 },
    methodDescription: 'Runes speak in silent logic; Intelligence × 0.86'
  },
  {
    title: 'Cosmic Tome Study',
    description: 'Absorb cosmic tomes to perceive the universe’s hidden laws.',
    methodStats: { intelligence: 1.00 },
    methodDescription: 'Pages breathe the void’s secrets; Intelligence × 1.00'
  },

  // Dexterity
  {
    title: 'Silk Serpent Footwork',
    description: 'Move like a silk serpent, swift and precise in motion.',
    methodStats: { dexterity: 0.56 },
    methodDescription: 'Serpent winds guide agile steps; Dexterity × 0.56'
  },
  {
    title: 'Windshadow Dance',
    description: 'Dance in wind’s shadow to become invisible and quick.',
    methodStats: { dexterity: 0.64 },
    methodDescription: 'Wind shadows cloak fleet feet; Dexterity × 0.64'
  },
  {
    title: 'Lotus Flutter Technique',
    description: 'Flutter like lotus petals, yielding swift and unpredictable movement.',
    methodStats: { dexterity: 0.72 },
    methodDescription: 'Petals drift beyond reach; Dexterity × 0.72'
  },
  {
    title: 'Bamboo Whisper Agility',
    description: 'Channel bamboo’s supple bend to slip through defenses.',
    methodStats: { dexterity: 0.80 },
    methodDescription: 'Bamboo bends with silent grace; Dexterity × 0.80'
  },
  {
    title: 'Featherstep Meditation',
    description: 'Meditate on feather steps to lighten each movement.',
    methodStats: { dexterity: 0.88 },
    methodDescription: 'Feathers cushion every footfall; Dexterity × 0.88'
  },
  {
    title: 'Ethereal Step Ritual',
    description: 'Perform ritual steps to walk with ghostlike agility.',
    methodStats: { dexterity: 1.00 },
    methodDescription: 'Ghost winds lift my step; Dexterity × 1.00'
  },

  // Strength
  {
    title: 'Titan Forge Hammer Strike',
    description: 'Strike as though wielding a titan’s hammer with each breath.',
    methodStats: { strength: 0.58 },
    methodDescription: 'Hammer blows crack mountain foundations; Strength × 0.58'
  },
  {
    title: 'Colossus Root Charge',
    description: 'Charge with the weight of ancient roots into any foe.',
    methodStats: { strength: 0.66 },
    methodDescription: 'Roots surge in my charge; Strength × 0.66'
  },
  {
    title: 'Earthquake Palm Practice',
    description: 'Palm strike shakes the earth, sending tremors through defenses.',
    methodStats: { strength: 0.74 },
    methodDescription: 'Earth quakes beneath each blow; Strength × 0.74'
  },
  {
    title: 'Ironwood Branch Bludgeon',
    description: 'Bludgeon with ironwood branch’s weight to crush obstacles.',
    methodStats: { strength: 0.82 },
    methodDescription: 'Branch crushes all resistance; Strength × 0.82'
  },
  {
    title: 'Thunder Fist Surge',
    description: 'Surge like thunder through fist strikes with explosive force.',
    methodStats: { strength: 0.90 },
    methodDescription: 'Thunder rumbles in my veins; Strength × 0.90'
  },
  {
    title: 'Primordial Bear Essence',
    description: 'Channel the primordial bear’s raw power to overwhelm.',
    methodStats: { strength: 1.00 },
    methodDescription: 'Bear’s roar awakens primal might; Strength × 1.00'
  },

  // QiAffinity
  {
    title: 'Primordial Qi Convergence',
    description: 'Unite primal qi streams from all directions into your core.',
    methodStats: { qiAffinity: 0.60 },
    methodDescription: 'Streams converge in my core; QiAffinity × 0.60'
  },
  {
    title: 'Starfire Breath Technique',
    description: 'Breathe starfire heat to ignite inner qi flames.',
    methodStats: { qiAffinity: 0.68 },
    methodDescription: 'Stars blaze my inner flame; QiAffinity × 0.68'
  },
  {
    title: 'Abyssal Flow Meditation',
    description: 'Tap abyssal flows beneath the world to deepen your qi.',
    methodStats: { qiAffinity: 0.76 },
    methodDescription: 'Abyss whispers ancient energy; QiAffinity × 0.76'
  },
  {
    title: 'Cosmic Tide Infusion',
    description: 'Infuse your qi with the ebb and flow of cosmic tides.',
    methodStats: { qiAffinity: 0.84 },
    methodDescription: 'Tides swell within my qi; QiAffinity × 0.84'
  },
  {
    title: 'Spirit Lake Harmony',
    description: 'Harmonize breath with spirit lake’s calm waters for qi depth.',
    methodStats: { qiAffinity: 0.92 },
    methodDescription: 'Waters echo pure serenity; QiAffinity × 0.92'
  },
  {
    title: 'Void Ripple Chant',
    description: 'Chant to ripple void energies through your qi pathways.',
    methodStats: { qiAffinity: 1.00 },
    methodDescription: 'Void ripples shape my qi; QiAffinity × 1.00'
  },

  // Luck
  {
    title: 'Fortune’s Ember Whisper',
    description: 'Whisper to embers of fate to kindle serendipity’s spark.',
    methodStats: { luck: 0.62 },
    methodDescription: 'Embers whisper hidden opportunities; Luck × 0.62'
  },
  {
    title: 'Serendipity Starfall Ritual',
    description: 'Invoke starfall blessings to scatter luck upon your path.',
    methodStats: { luck: 0.70 },
    methodDescription: 'Stars scatter chance like petals; Luck × 0.70'
  },
  {
    title: 'Moonlit Coin Toss',
    description: 'Toss coins under moonlight to invite fortune’s favor.',
    methodStats: { luck: 0.78 },
    methodDescription: 'Coins gleam with lunar luck; Luck × 0.78'
  },
  {
    title: 'Phoenix Feather Fate Call',
    description: 'Call upon phoenix feathers to guide destiny’s flow.',
    methodStats: { luck: 0.86 },
    methodDescription: 'Feathers guide my destined luck; Luck × 0.86'
  },
  {
    title: 'Stardust Fortune Weaving',
    description: 'Weave fortunes from stardust streams in breath meditation.',
    methodStats: { luck: 0.94 },
    methodDescription: 'Stardust shapes unfolding chance; Luck × 0.94'
  },
  {
    title: 'Sacred Clover Binding',
    description: 'Bind four‑leaf clovers to your breath for enduring fortune.',
    methodStats: { luck: 1.00 },
    methodDescription: 'Clovers root everlasting luck; Luck × 1.00'
  }
];


export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// --- Generate a set of three attacks: one of each chance tier ---
export function generateAttackSet(pool: Attack[]): Attack[] {
  const low  = pool.filter(a => a.chance === 0.75);
  const med  = pool.filter(a => a.chance === 0.20);
  const high = pool.filter(a => a.chance === 0.05);
  return [pickRandom(low), pickRandom(med), pickRandom(high)];
}

/**
 * Generate a starter Manual based solely on the part pools (titles integrated).
 * Heir must be 'humble', 'rich', or 'cultivation'.
 */
export function generateStarterManual(
  heir: 'humble' | 'rich' | 'cultivation'
): Manual {
  let parts: ManualPart[];
  let attacks: Attack[];

  if (heir === 'humble') {
    parts  = humblePartPool;
    attacks = generateAttackSet(humbleAttackPool);
  } else if (heir === 'rich') {
    parts  = richPartPool;
    attacks = generateAttackSet(richAttackPool);
  } else {
    parts  = cultivationPartPool;
    attacks = generateAttackSet(cultivationAttackPool);
  }

  const part = pickRandom(parts);

  return {
    title: part.title,
    equipped: true,
    description: part.description,
    methodStats: part.methodStats,
    methodDescription: part.methodDescription,
    grade: 'Mortal',
    statRequirements: part.methodStats,
    attacks,
    weight: 1
  };
}





// const humbleAttackPool = [
//     //(if physical stamina higher || if spiritual qi cost higher)<--(higher with damage)
//     //low (x10)
//     //dmg: 0.2-0.35, staminaCost: 0-3, qiCost: (0-0.1), chance: 0.75, t: 'lore accurate ( physical : spiritual )'
//     { name: 'Three Flowers Palm', dmg: 0.8, staminaCost: 1, qiCost: 0, chance: 0.75, t: 'physical' },
//     //med (x10)
//     //dmg: 0.5-0.75, staminaCost: 2-5, qiCost: (0.18-0.25), chance: 0.2, t: 'lore accurate ( physical : spiritual )'
//     { name: 'Three Flowers Blast', dmg: 1.4, staminaCost: 5, qiCost: 0.2, chance: 0.20, t: 'spiritual' },
//     //high (x10)
//     //dmg: 0.9-2.0, staminaCost: 5-10, qiCost: (0.28-0.38), chance: 0.05, t: 'lore accurate ( physical : spiritual )'
//     { name: 'Union of the Flower', dmg: 2.5, staminaCost: 0.3, qiCost: 0.4, chance: 0.05, t: 'spiritual' }
// ]

// const richAttackPool = [
//     //(if physical stamina higher || if spiritual qi cost higher)<--(higher with damage)
//     //low (x10)
//     //dmg: 0.25-0.45, staminaCost: 1-5, qiCost: (0.05-0.15), chance: 0.75, t: 'lore accurate ( physical : spiritual )'
//     { name: 'Three Flowers Palm', dmg: 0.8, staminaCost: 1, qiCost: 0, chance: 0.75, t: 'physical' },
//     //med (x10)
//     //dmg: 0.6-0.85, staminaCost: 3-7, qiCost: (0.22-0.28), chance: 0.2, t: 'lore accurate ( physical : spiritual )'
//     { name: 'Three Flowers Blast', dmg: 1.4, staminaCost: 5, qiCost: 0.2, chance: 0.20, t: 'spiritual' },
//     //high (x10)
//     //dmg: 1.0-2.5, staminaCost: 6-12, qiCost: (0.3-0.4), chance: 0.05, t: 'lore accurate ( physical : spiritual )'
//     { name: 'Union of the Flower', dmg: 2.5, staminaCost: 0.3, qiCost: 0.4, chance: 0.05, t: 'spiritual' }
// ]

// const cultivationAttackPool = [
//     //(if physical stamina higher || if spiritual qi cost higher)<--(higher with damage)
//     //low (x10)
//     //dmg: 0.3-0.5, staminaCost: 2-6, qiCost: (0.08-0.2), chance: 0.75, t: 'lore accurate ( physical : spiritual )'
//     { name: 'Three Flowers Palm', dmg: 0.8, staminaCost: 1, qiCost: 0, chance: 0.75, t: 'physical' },
//     //med (x10)
//     //dmg: 0.7-0.9, staminaCost: 5-8, qiCost: (0.25-0.30), chance: 0.2, t: 'lore accurate ( physical : spiritual )'
//     { name: 'Three Flowers Blast', dmg: 1.4, staminaCost: 5, qiCost: 0.2, chance: 0.20, t: 'spiritual' },
//     //high (x10)
//     //dmg: 1.2-2.9, staminaCost: 8-14, qiCost: (0.35-0.48), chance: 0.05, t: 'lore accurate ( physical : spiritual )'
//     { name: 'Union of the Flower', dmg: 2.5, staminaCost: 0.3, qiCost: 0.4, chance: 0.05, t: 'spiritual' }
// ]

// // each variable based on character.heir
// //methodStats {lore acurrate: 0.5-1.0}
// export const humblePartPool: ManualPart[] = [
//     {
//     title: 'lore accurate cultivation manual title',
//     description: 'lore accurate description',
//     methodStats: {constitution: 0.6},
//     methodDescription: //a lore acurrate 'chant' (9 words at most)[poem]
//     }, //(*20)
    
// ]

// // each variable based on character.heir
// //methodStats {lore acurrate: 0.8-1.28}
// export const richPartPool: ManualPart[] = [
//     {
//     title: 'lore accurate cultivation manual title',
//     description: 'lore accurate description',
//     methodStats: {constitution: 0.6},
//     methodDescription: //a lore acurrate 'chant' (9 words at most)[poem]
//     }, //(*28)
    
// ]

// // each variable based on character.heir
// //methodStats {lore acurrate: 1.2-2.0}
// export const cultivationPartPool: ManualPart[] = [
//     {
//     title: 'lore accurate cultivation manual title',
//     description: 'lore accurate description',
//     methodStats: {constitution: 0.6},
//     methodDescription: //a lore acurrate 'chant' (9 words at most)[poem]
//     }, {(42 entries total)},...
    
// ]

// return {
//     title: //fill in what is missing from manual type with a random ManualPart based on character.heir,
//     equipped: true,
//     description: //fill in what is missing from manual type with the ManualPart generated ^,
//     methodStats: //fill in what is missing from manual type with the ManualPart generated ^,
//     methodDescription: //fill in what is missing from manual type with the ManualPart generated ^,
//     grade: 'Mortal',
//     statRequirements://fill in what is missing from manual type with the ManualPart generated ^,
//     attacks: Attack[] //generate 3 attacks 1 of each chance based on character.heir
// }