<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  // Structure for life events awarding spendable points
  type LifeEventDef = {
    title: string;
    description: string;
    pointsReward: number;
    optional?: boolean;
    ageTrigger?: number; // for chronological events
    weight?: number;      // probability weight
    good?: boolean;       // classify as good or bad
  };

  type LifeEvent = {
    id: number;
    title: string;
    description: string;
    date: string;
  };

  // Character with unallocated points pool and breakthrough tracking
  type Character = {
    name: string;
    stats: Record<string, number>;
    statsOf: Record<string, number>;
    createdAt: string;
    age: number;
    lifespan: number;
    unallocatedPoints: number;
    lifeEvents: LifeEvent[];       
    stage: boolean[];  // which stage
    qi: {
      qiPoints: number,  
      usedQiPoints: number,  }   
  };


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

  const actionEvents5to14: LifeEventDef[] = [
    { title: 'Sense Qi', description: 'You let your imagination run wild.', pointsReward: 0, good: false },
    { title: 'Gather Qi', description: 'You played joyfully.', pointsReward: 0, good: true },
    { title: 'Explore', description: 'You studied your surroundings.', pointsReward: 0, good: false },
    { title: 'Socialize', description: 'You studied your surroundings.', pointsReward: 0, good: false },
    { title: 'Train the Sword', description: 'You studied your surroundings.', pointsReward: 0, good: false }

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
  function tryBreakthrough() {
    if (!character) return;
    if (character.qi.qiPoints >= 1000 && !character.stage) {
      const event: LifeEvent = {
        id: Date.now(),
        title: `Age ${character.age}: Foundation Establishment`,
        description: 'You have laid the foundation for your cultivation.',
        date: new Date().toISOString()
      };
      character.lifeEvents.push(event);
      saveCharacter();
    }
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
      character!.qi.qiPoints += def.pointsReward;
      if (def.good) character!.unallocatedPoints += def.pointsReward;
      character!.lifeEvents.push({
        id: Date.now() + Math.random(),
        title: `Age ${character!.age}: ${def.title}`,
        description: def.description,
        date: new Date().toISOString()
      });
    });
    saveCharacter();
    tryBreakthrough();
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
    character.unallocatedPoints ??= 0;
    character.qi.qiPoints ??= 0;
    if (!Array.isArray(character.stage) || character.stage.length !== 12) {
    character.stage = Array(12).fill(false);
    character.stage[1] = true;

    }
    if (!character.lifeEvents || character.lifeEvents.length === 0) {
      const birth: LifeEvent = { id: Date.now(), title: 'Age 0: Birth', description: 'You were born.', date: character.createdAt };
      character.lifeEvents = [birth];
      saveCharacter();
    }
  });

  $: realmNumber = character
  ? character.stage.findIndex(flag => flag === true)
  : 0;

  $: currentQi = character
  ? {
      c: Math.round(character.qi.qiPoints - character.qi.usedQiPoints)
    }
  : 0;

  $: baseStatsOf = character
  ? {
      health: Math.round(character.stats.constitution * 2 * realmNumber),
      stamina:
        Math.round(((character.stats.constitution + character.stats.dexterity) / 2) *  realmNumber),
      dodge:
      ((((character.stats.dexterity / 8) * realmNumber) / 2) / 1000).toFixed(3) + "%",
      attack: Math.round(character.stats.strength * 1.5 * realmNumber),
      qiAttack:
        Math.round((character.stats.qiAffinity / 2) * character.qi.qiPoints * 0.05),
      persuasion: ((((character.stats.charisma / 4) * realmNumber) / 2) / 1000).toFixed(3) + "%",
    }
  : {
      health: 0,
      stamina: 0,
      speed: 0,
      dodge: 0,
      vdodge: 0,
      attack: 0,
      qiAttack: 0
    };
</script>

<main>
  {#if character}
  <div class="character-info-container">
    <h1>🌿 Life of {character.name}</h1>
    <p>Age: {character.age}</p>
    <p>Realm: {realmNumber - 1}</p>
    <p>Lifespan: {character.stats.lifespan}</p>
    <p>Unallocated Points: {character.unallocatedPoints}</p>

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
      {#each Object.entries(baseStatsOf) as [key, value]}
      <li><strong style="flex:1;">
        {key.charAt(0).toUpperCase() + key.slice(1)}:
      </strong>
      <span>{value}</span></li>
      {/each}
      <li><strong>Qi:</strong>
      <span>{currentQi}/{character.qi.qiPoints}</span>
      </li>
      </ul>
    </section>
  </div>

    <section class="life-events">
      <h2>Life Events</h2>
      <ul>
        {#each groupedLifeEvents as item}
          <li>
            <strong>
              {item.event.title}{item.count > 1 ? ` ×${item.count}` : ''}
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
      </div>
    </section>
     <!-- Selected actions display -->
    <section class="selected-actions">
      <h2>Selected Actions</h2>
      <button type="button" onclick={clearSelectedActions} disabled={selectedActions.length === 0}>
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
    </div>
  {/if}
</main>

//menus

//qi-cultivation

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

  .actions-container > button{
    margin-right: 1rem;
    
  }

</style>