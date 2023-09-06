import { PokemonRow } from "@/components/pokemon/row";
import type { PokemonRowProps } from "@/components/pokemon/row";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

/**
 * Represents the props required for rendering the pokemon table.
 *
 * @property pokemons - An array of pokemons.
 */
export type PokemonTableProps = {
  pokemons: PokemonRowProps[];
  count: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  page: number;
};

export default function PokemonTable(props: PokemonTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Types</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.pokemons.map((pokemon) => (
            <PokemonRow key={pokemon.id} {...pokemon} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[props.pageSize]}
              colSpan={3}
              count={props.count}
              rowsPerPage={props.pageSize}
              page={props.page}
              onPageChange={(_, page) => props.onPageChange(page)}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
