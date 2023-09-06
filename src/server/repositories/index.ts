import { TypeRepository } from "@/server/repositories/type";
import { PokemonRepository } from "./pokemon";

export const pokemonRepository = PokemonRepository.instance;
export const typeRepository = TypeRepository.instance;
