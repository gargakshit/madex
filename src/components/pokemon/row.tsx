import { TableCell, TableRow } from "@mui/material";

/**
 * Represents the properties of a pokemon row.
 *
 * @property id - The ID of the pokemon.
 * @property name - The name of the pokemon.
 * @property types - The types of the pokemon.
 * @property sprite - The URL of the pokemon's sprite image.
 */
export type PokemonRowProps = {
  id: number;
  name: string;
  types: string[];
  sprite: string;
};

/**
 * Represents a row in a pokemon table.
 */
export function PokemonRow(props: PokemonRowProps) {
  return (
    <TableRow>
      <TableCell>{props.id}</TableCell>
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.types.join(", ")}</TableCell>
    </TableRow>
  );
}
