<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let characterCreated = false;
  let savedCharacter = null;
  let createdParam = "";
  let name = "";

  const namePrefixes = [
    "Azure", "Crimson", "Silent", "Heavenly", "Shadow", "Silver", "Golden",
    "Radiant", "Void", "Ethereal", "Burning", "Frost", "Storm", "Iron", "Divine"
  ];

  const nameSuffixes = [
    "Blade", "Lotus", "Fang", "Whisper", "Tiger", "Phoenix", "Serpent",
    "Monk", "Shadow", "Cloud", "Dragon", "Flame", "Spirit", "Soul", "Demon"
  ];

  function randomizeName() {
    const prefix = namePrefixes[Math.floor(Math.random() * namePrefixes.length)];
    const suffix = nameSuffixes[Math.floor(Math.random() * nameSuffixes.length)];
    name = `${prefix} ${suffix}`;
  }

  let baseStats = {
    constitution: 0,
    charisma: 0,
    intelligence: 0,
    dexterity: 0,
    strength: 0,
    qiAffinity: 0,
    luck: 0
  };

  let addedStats = {
    constitution: 0,
    charisma: 0,
    intelligence: 0,
    dexterity: 0,
    strength: 0,
    qiAffinity: 0,
    luck: 0
  };

  let pointsRemaining = 5;

  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomizeStats() {
    let total = 0;
    let generated;
    do {
      generated = {
        constitution: rand(1, 5),
        charisma: rand(1, 5),
        intelligence: rand(1, 5),
        dexterity: rand(1, 5),
        strength: rand(1, 5),
        qiAffinity: rand(1, 5),
        luck: rand(0, 10)
      };
      total = Object.values(generated).reduce((acc, v) => acc + v, 0);
    } while (total < 20 || total > 30);

    baseStats = generated;
    pointsRemaining = 5;
    addedStats = Object.keys(addedStats).reduce((acc, key) => ({ ...acc, [key]: 0 }), {});
  }

  function increaseStat(key) {
    if (pointsRemaining > 0) {
      addedStats = { ...addedStats, [key]: addedStats[key] + 1 };
      pointsRemaining -= 1;
    }
  }

  function decreaseStat(key) {
    if (addedStats[key] > 0) {
      addedStats = { ...addedStats, [key]: addedStats[key] - 1 };
      pointsRemaining += 1;
    }
  }

  function createCharacter() {
    if (!name.trim()) {
      alert("Please enter a name.");
      return;
    }
    const finalStats = Object.fromEntries(
      Object.entries(baseStats).map(([key, val]) => [key, val + addedStats[key]])
    );

    const character = {
      name,
      stats: finalStats,
      createdAt: new Date().toISOString(),
      unallocatedPoints: pointsRemaining  // save remaining points
    };
    localStorage.setItem("cultivationCharacter", JSON.stringify(character));
    alert("Character created and saved!");
    goto("/life");("/life");
  }

  function enterLife() {
    goto("/life");
  }

  onMount(() => {
    randomizeName();
    randomizeStats();
    const stored = localStorage.getItem("cultivationCharacter");
    if (stored) {
      savedCharacter = JSON.parse(stored);
      characterCreated = true;
    }
  });
</script>

<header>
  <h1>Cultivation</h1>
</header>

<main>
  {#if characterCreated && savedCharacter}
    <h2>{savedCharacter.name}</h2>
    <ul>
      {#each Object.entries(savedCharacter.stats) as [key, value]}
        <li><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}</li>
      {/each}
    </ul>
    <p><em>Created at: {new Date(savedCharacter.createdAt).toLocaleString()}</em></p>
    <button onclick={enterLife}>🌍 Enter World</button>
  {:else}
    <div>
      <h2>Character Creation</h2>
      <form>
        <label for="name">Name:</label>
        <div style="display: flex; gap: 0.5rem;">
          <input id="name" bind:value={name} type="text" />
          <button type="button" onclick={randomizeName}>🎲</button>
        </div>

        {#each Object.entries(baseStats) as [key, value]}
          <div class="stat-row">
            <span style="flex:1;">
              {key.charAt(0).toUpperCase() + key.slice(1)}: {value + addedStats[key]}
            </span>
            <button type="button" onclick={() => decreaseStat(key)} disabled={addedStats[key] === 0}>−1</button>
            <button type="button" onclick={() => increaseStat(key)} disabled={pointsRemaining === 0}>+1</button>
          </div>
        {/each}

        <p>Points remaining: {pointsRemaining}</p>

        <button class="randomize" type="button" onclick={randomizeStats}>Randomize</button>
        <button class="create" type="button" onclick={createCharacter}>Create Character</button>
      </form>
    </div>
  {/if}
</main>

<footer></footer>
