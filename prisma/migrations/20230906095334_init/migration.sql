-- CreateTable
CREATE TABLE "Pokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "sprite" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Type" (
    "name" TEXT NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    PRIMARY KEY ("name", "pokemonId"),
    CONSTRAINT "Type_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
