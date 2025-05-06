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
    createdAt: string;
    age: number;
    unallocatedPoints: number;
    lifeEvents: LifeEvent[];
    qiPoints: number;            // accumulated Qi for breakthroughs
    foundationReached: boolean;  // whether Foundation Establishment achieved
  };

  let character: Character | null = null;

  // Event pools
  const childhoodEvents: LifeEventDef[] = [
    { title: 'First Steps', description: 'You took your first steps.', pointsReward: 1, weight: 0.175, good: true },
    { title: 'Early Memory', description: 'You remember your first friend.', pointsReward: 1, weight: 0.175, good: true },
    { title: 'Play Time', description: 'You played games.', pointsReward: 1, weight: 0.175, good: true },
    { title: 'Lullaby', description: 'You sang a soothing lullaby.', pointsReward: 1, weight: 0.175, good: true },
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

  function saveCharacter() {
    if (character) localStorage.setItem('cultivationCharacter', JSON.stringify(character));
  }

  // Check and apply breakthrough when Qi threshold reached
  function tryBreakthrough() {
    if (!character) return;
    if (character.qiPoints >= 1000 && !character.foundationReached) {
      character.foundationReached = true;
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
    character.age += 1;
    const eventsThisYear: LifeEventDef[] = [];

    // Childhood
    if (character.age < 16) {
      eventsThisYear.push(weightedPick(childhoodEvents));
    }

    // Chronological
    chronologicalEvents.forEach(def => {
      if (def.ageTrigger === character.age) eventsThisYear.push(def);
    });

    // Adulthood
    if (character.age >= 16) {
      const isGood = Math.random() < 0.5;
      let pool = [...chanceEvents, ...injuryEvents, ...worldEvents];
      if (character.lifeEvents.some(e => e.title.includes('Learn Cultivation'))) pool.push(...sectEvents);
      pool = pool.filter(e => e.good === isGood);
      const nothing = [...chanceEvents, ...injuryEvents, ...worldEvents, ...sectEvents]
        .find(e => e.title === 'Nothing happens');
      const count = rand(1, 3);
      for (let i = 0; i < count; i++) {
        const pickPool = nothing ? pool.concat(nothing) : pool;
        const pick = weightedPick(pickPool);
        eventsThisYear.push(pick);
        if (pick.title === 'Nothing happens') break;
      }
    }

    // Apply events
    eventsThisYear.forEach(def => {
      character!.qiPoints += def.pointsReward;  // Qi accrual
      if (def.good) character!.unallocatedPoints += def.pointsReward; // only good give points
      character!.lifeEvents.push({
        id: Date.now() + Math.random(),
        title: `Age ${character!.age}: ${def.title}`,
        description: def.description,
        date: new Date().toISOString()
      });
    });

    saveCharacter();
    tryBreakthrough();
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
    character.qiPoints ??= 0;
    character.foundationReached ??= false;
    if (!character.lifeEvents || character.lifeEvents.length === 0) {
      const birth: LifeEvent = { id: Date.now(), title: 'Age 0: Birth', description: 'You were born.', date: character.createdAt };
      character.lifeEvents = [birth];
      saveCharacter();
    }
  });
</script>

<main>
  {#if character}
    <h1>🌿 Life for {character.name}</h1>
    <p>Age: {character.age}</p>
    <p>Unallocated Points: {character.unallocatedPoints}</p>

    <section class="stats">
      <h2>Stats</h2>
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
    </section>

    <section class="life-events">
      <h2>Life Events</h2>
      <ul>
        {#each character.lifeEvents as event (event.id)}
          <li>
            <strong>{event.title}</strong> - {new Date(event.date).toLocaleDateString()}
            <p>{event.description}</p>
          </li>
        {/each}
      </ul>
    </section>

    <section>
      <h2>Actions</h2>
      <div>
        <ul>
          <li>action 1</li>
          <li>action 2</li>
          <li>action 3</li>
        </ul>
      </div>
      <div class="actions-container">
      {#if character.age < 5}
      <button>Imagine</button>
      <button>Play</button>
      <button>Observe</button>
      {/if}
      </div>
    </section>

    <div class="controls">
      <button onclick={advanceYear}>Next Year</button>
      <button onclick={resetCharacter}>🔄 Reset Character</button>
    </div>
  {/if}
</main>
