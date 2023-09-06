import { PokemonRow } from "@/components/pokemon/row";
import { trpc } from "@/utils/trpc";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

import styles from "../styles/Common.module.css";

export default function ByName() {
  const [names, setNames] = useState("");
  const { data, refetch } = trpc.pokemon.getByNames.useQuery(
    names.split(",").map((name) => name.trim()),
    {
      enabled: false,
    },
  );

  useEffect(() => {
    refetch();
  }, [names]);

  return (
    <main className={styles.Main}>
      <form>
        <TextField
          label="Names, comma separated (E.x. Bulbasaur, Charizard)"
          variant="outlined"
          value={names}
          onChange={async (e) => {
            setNames((e.target as any).value);
          }}
        />
      </form>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Types</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((pokemon) => <PokemonRow {...pokemon} />)}
        </TableBody>
      </Table>
    </main>
  );
}
