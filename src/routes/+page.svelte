<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let characterCreated = false;
  let savedCharacter = null;
  let createdParam = "";
  let name = "";
  let capacity;
  let background;

  const namePrefixes = [
    "Li",      // plum
    "Wang",    // king
    "Zhang",   // open bow
    "Liu",     // willow
    "Chen",    // dawn
    "Yang",    // poplar
    "Huang",   // yellow
    "Zhao",    // shine
    "Wu",      // martial
    "Zhou",    // continent
    "Xu",      // allow
    "Sun",     // grandson
    "Ma",      // horse
    "Zhu",     // pearl
    "Hu",      // tiger
    "Guo",     // country
    "He",      // river
    "Gao",     // tall
    "Lin",     // forest
    "Luo",     // net
    "Zheng",   // upright
    "Liang",   // good
    "Xie",     // thank
    "Song",    // pine
    "Tang",    // hall
    "Han",     // vast
    "Feng",    // phoenix
    "Yu",      // jade
    "Dong",    // east
    "Xiao",    // small
    "Cheng",   // succeed
    "Su",      // plain
    "Pan",     // plate
    "Du",      // alone
    "Ye",      // leaf
    "Bai",     // white
    "Tan",     // deep pool
    "Ren",     // benevolence
    "Peng",    // roc
    "Mo",      // ink
    "An",      // peace
    "Dai",     // belt
    "Kang",    // healthy
    "Duan",    // segment
    "Ding",    // stable
    "Qin",     // zither
    "Zou",     // run
    "Yan",     // swallow
    "Gu",      // drum
    "Jin",     // gold
    "Pu",      // plain
    "Jia",     // armor
    "Rao",     // disturb
    "Qi",      // odd/strange
    "Tao",     // peach
    "Qiu",     // hill
    "Nan",     // south
    "Yuan",    // origin
    "Shen",    // spirit
    "Kong",    // empty
    "Mao",     // catkin
    "Lan",     // orchid
    "Cui",     // emerald
    "Xiong",   // bear
    "Pei",     // match
    "Bao",     // cherish
    "Yao",     // call
    "Xue",     // snow
    "Zeng",    // increase
    "Shi",     // scholar/stone
    "Jiang",   // river
    "Nie",     // pinch
    "Liao",    // gourd
    "Yin",     // hidden
    "Lu",      // dew
    "Hua",     // flower
    "Rui",     // auspicious
    "Zhong",   // loyal
    "You",     // again
    "Ruan",    // soft
    "Min",     // quick
    "Fan",     // reverse
    "Guo",     // pass through
    "Liu",     // flow
    "Meng"     // dream

  ];

  const nameSuffixes = [
    "Xian",        // Immortal  
    "Sheng",       // Saint  
    "ShengRen",    // Sage  
    "ShiFu",       // Master  
    "Ling",        // Spirit  
    "Gui",         // Ghost  
    "Mo",          // Demon  
    "Long",        // Dragon  
    "FengHuang",   // Phoenix  
    "Hu",          // Tiger  
    "She",         // Serpent  
    "Ying",        // Eagle or Shadow  
    "Dao",         // Blade  
    "Jian",        // Sword  
    "Zhang",       // Palm  
    "Feng",        // Peak / Wind  
    "Gu",          // Valley  
    "Shan",        // Mountain  
    "Hai",         // Ocean  
    "Yun",         // Cloud  
    "Yu",          // Rain  
    "Lei",         // Thunder  
    "Dian",        // Lightning  
    "Shi",         // Stone  
    "Lian",        // Lotus  
    "Yue",         // Moon  
    "Ri",          // Sun  
    "Xing",        // Star  
    "Hun",         // Soul  
    "Ding",        // Zenith  
    "Xu",          // Abyss  
    "Jing",        // Realm / Crystal  
    "Ting",        // Tribunal  
    "Tian",        // Heaven  
    "Kong",        // Void  
    "Huan",        // Mirage  
    "Yong",        // Eternity  
    "WuXian",      // Infinity  
    "HunDun",      // Chaos  
    "ZhiXu",       // Order  
    "HeXie",       // Harmony  
    "Yi",          // Justice  
    "Nu",          // Wrath  
    "JiNu",        // Fury  
    "ShengYin",    // Sound  
    "JingYin",     // Silence  
    "Huo",         // Flame  
    "Bing",        // Frost / Ice  
    "BaoFeng",     // Storm  
    "Wu",          // Mist  
    "HeiAn",       // Darkness  
    "Guang",       // Light / Radiance  
    "Yan",         // Ember  
    "Hui",         // Ash  
    "Tong",        // Bronze / Copper  
    "Tie",         // Iron  
    "Gang",        // Steel  
    "Jin",         // Gold  
    "Yin",         // Silver  
    "HeiYanShi",   // Obsidian  
    "ShuiJing",    // Crystal / Quartz  
    "Zhu",         // Pearl  
    "Yu",          // Jade  
    "LanJing",     // Sapphire  
    "ZhuBao",      // Ruby  
    "FeiCui",      // Emerald  
    "LuoBoLi",     // Opal  
    "HuanXi",      // Twilight  
    "ChenXi",      // Dawn  
    "HuangHun",    // Dusk  
    "TianYa",      // Horizon  
    "HuiYing",     // Echo  
    "QingWen",     // Whisper  
    "DaoLu",       // Path  
    "Dao",         // Way  
    "Pai",         // Sect  
    "BuMen",       // Tribe  
    "ChaoDai"      // Dynasty  
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
    luck: 0,
    lifespan: 0
  };

  let addedStats = {
    constitution: 0,
    charisma: 0,
    intelligence: 0,
    dexterity: 0,
    strength: 0,
    qiAffinity: 0,
    luck: 0,
    lifespan: 0
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
        luck: rand(0, 10),
        lifespan: rand(16, 60)
      };
      total = Object.values(generated).reduce((acc, v) => acc + v, 0);
    } while (total < 20 || total > 35);

    capacity = rand(250, 1000);
    console.log(capacity);

    const randStatus = rand(1, 10);
    console.log(randStatus);

    if (randStatus >= 9) {
        background = 'Cultivation';
      } else if  ((randStatus >= 6.5) && (randStatus < 9)) {
        background = 'Rich';
      } else {
        background = 'Humble'
      }

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
      unallocatedPoints: pointsRemaining,  // save remaining points
      stage: Array(12).fill(false),
      qiCapacity: capacity,
      heir: background
    };

    character.stage[1] = true;
    character.qiCapacity = capacity;
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

        <div class="stat-row"><span>Background: {background}</span></div>
        {#each Object.entries(baseStats) as [key, value]}
          <div class="stat-row">
            <span style="flex:1;">
              {key.charAt(0).toUpperCase() + key.slice(1)}: {value + addedStats[key]}
            </span>
            <button type="button" onclick={() => decreaseStat(key)} disabled={addedStats[key] === 0}>−1</button>
            <button type="button" onclick={() => increaseStat(key)} disabled={pointsRemaining === 0}>+1</button>
          </div>
        {/each}
        <div class="stat-row"><span>Qi Capacity: {capacity}</span></div>

        <p>Points remaining: {pointsRemaining}</p>

        <button class="randomize" type="button" onclick={randomizeStats}>Randomize</button>
        <button class="create" type="button" onclick={createCharacter}>Create Character</button>
      </form>
    </div>
  {/if}
</main>

<footer></footer>
