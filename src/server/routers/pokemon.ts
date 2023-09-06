import { pokemonRepository, typeRepository } from "@/server/repositories";
import { procedure, router } from "@/server/trpc";
import { z } from "zod";

/**
 * Converts the pokemon types from an object to an array of strings.
 *
 * @param pokemon The pokemon object returned from the pokemonRepository.getByName method.
 * @returns The modified pokemon object with types as an array of strings, or null if the pokemon object is falsy.
 */
function flattenPokemonTypes<
  T extends NonNullable<
    Awaited<ReturnType<typeof pokemonRepository.getByName>>
  >,
>(pokemon: T): Omit<T, "types"> & { types: string[] } {
  const { types, ...rest } = pokemon;
  return {
    ...rest,
    types: pokemon.types.map((t) => t.name),
  };
}

/**
 * Represents a router that handles various Pokemon-related requests.
 *
 * @property getByName Retrieves pokemon information by name.
 * @property getByNames Retrieves pokemon information by names.
 * @property getByType Retrieves pokemon information by type.
 * @property getAllTypes Retrieves all available pokemon types.
 */
export const pokemonRouter = router({
  getByName: procedure.input(z.string()).query(async (opts) => {
    const pokemon = await pokemonRepository.getByName(opts.input);
    if (pokemon === null) return null;

    return flattenPokemonTypes(pokemon);
  }),

  getByNames: procedure
    .input(z.array(z.string()))
    .query(async (opts) =>
      (await pokemonRepository.getByNames(opts.input)).map(flattenPokemonTypes),
    ),

  getByType: procedure
    .input(z.object({ type: z.nullable(z.string()), page: z.number() }))
    .query(async (opts) => {
      const pokemons = (
        await pokemonRepository.getByType(opts.input.type, opts.input.page)
      ).map(flattenPokemonTypes);
      const pageSize = pokemonRepository.pageSize;
      const count = await pokemonRepository.countByType(opts.input.type);

      return { pokemons, pageSize, count };
    }),

  getAllTypes: procedure.query(async () => await typeRepository.getAll()),
});
