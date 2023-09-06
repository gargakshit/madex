import fs from "node:fs/promises";
import path from "node:path";

import { PrismaClient } from "@prisma/client";

const filePath = new URL(import.meta.url);
const pokedexPath = path.join(path.dirname(filePath.pathname), "pokedex.json");

const pokedex = JSON.parse((await fs.readFile(pokedexPath)).toString());
console.log(`Loaded ${pokedex.length} pokemons!`);

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

const count = await prisma.pokemon.count();
if (count !== 0) {
  console.warn("The db is not empty, skipping seeding...");
  await prisma.$disconnect();
  process.exit(0);
}

const added = new Set();

await Promise.all(
  pokedex.map(async (pokemon) => {
    if (added.has(pokemon.name)) {
      // Duplicate...
      return;
    }

    added.add(pokemon.name);
    const { id } = await prisma.pokemon.create({
      data: {
        name: pokemon.name,
        sprite: pokemon.sprite,
      },
    });

    await Promise.all(
      pokemon.types.map((typ) =>
        prisma.type.create({ data: { name: typ, pokemonId: id } }),
      ),
    );
  }),
);

await prisma.$disconnect();
