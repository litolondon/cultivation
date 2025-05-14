# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.





battle plans
------------
 type humanBattler = {
   name: string;
   stats: Record<string, number>;
   createdAt: string;
   spiritstones: number;
   age: number;   
   stage: number;  // which stage
   qiPoints: number; 
   qiCapacity: number;
   usedStam: number;
   lostHealth: number;
   attack: Record<string, number, number, number, number></string>;
   encounterDescription: string;
 };
stats
stage 1

total of all stage one stats 40-60

constitution: 0-15,
 charisma: 0-15,
 intelligence: 0-15,
 dexterity: 0-15,
 strength: 0-15,
 qiAffinity: 0-15,
 luck: 0-15

 total of all stage one stats 60-115

 stage 2
constitution: 0,
 charisma: 0,
 intelligence: 0,
 dexterity: 0,
 strength: 0,
 qiAffinity: 0,
 luck: 0

 total of all stage one stats 90-150

 stage 3
constitution: 0,
 charisma: 0,
 intelligence: 0,
 dexterity: 0,
 strength: 0,
 qiAffinity: 0,
 luck: 0

 


 attack

 name, dmg, scost, qcost, chance

basic
 three flowers palm, 0.8, 0.05, 0, 0.75

 med
 three flowers blast, 1.4, 0.22, 0.2, 0.20

 high
 union of the flower, 2.5, 0.3, 0.4, 0.05

qiCapacity: stage 0 = 500-1200; stage 1 = 1200-3050; stage 2 = 3050-15000; stage 3 = 13000-35000   all stage qiPoints randomly from 65%-100% of capacity


socialize plans
---------------

Talk to people to get introduced to merchants, teachers, and sects.