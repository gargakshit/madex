import prisma from "@/server/prisma";

/**
 * Repository class for handling pokemon data.
 */
export class PokemonRepository {
  static instance = new PokemonRepository();
  pageSize = 10;

  private constructor() {}

  /**
   * Retrieves a pokemon by its name.
   *
   * @param name - The name of the pokemon.
   * @returns - A Promise that resolves to an object containing the Pokemon's information.
   */
  async getByName(name: string) {
    return prisma.pokemon.findUnique({
      where: { name },
      select: {
        id: true,
        name: true,
        sprite: true,
        types: { select: { name: true } },
      },
    });
  }

  /**
   * Retrieves the list of pokemon by their names.
   *
   * @param names - An array of pokemon names to search for.
   * @returns - A promise that resolves to an array of pokemon objects that match the given names.
   */
  async getByNames(names: string[]) {
    return prisma.pokemon.findMany({
      where: { name: { in: names } },
      select: {
        id: true,
        name: true,
        sprite: true,
        types: { select: { name: true } },
      },
    });
  }

  /**
   * Retrieves a list of pokemon by type.
   * Uses LIMIT-OFFSET pagination for now.
   *
   * @param type - The type of the Pokémon. Set to null to retrieve all Pokémon.
   * @param [page=0] - The page number to retrieve. Defaults to 0.
   * @returns - A promise that resolves to an array of Pokémon objects matching the specified type.
   */
  async getByType(type: string | null, page: number = 0) {
    return prisma.pokemon.findMany({
      skip: page * this.pageSize,
      take: this.pageSize,
      where: type === null ? {} : { types: { some: { name: type } } },
      select: {
        id: true,
        name: true,
        sprite: true,
        types: { select: { name: true } },
      },
      orderBy: { id: "asc" },
    });
  }

  /**
   * Retrieves a count of pokemon by type.
   *
   * @param type - The type of the Pokémon. Set to null to retrieve all Pokémon.
   * @returns - A promise that resolves to the number of pokemons for that type.
   */
  async countByType(type: string | null) {
    return prisma.pokemon.count({
      where: type === null ? {} : { types: { some: { name: type } } },
    });
  }
}
