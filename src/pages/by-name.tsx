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
  const [name, setName] = useState("");
  const { data, refetch } = trpc.pokemon.getByName.useQuery(name, {
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [name]);

  return (
    <main className={styles.Main}>
      <form>
        <TextField
          label="Name (E.x. Bulbasaur)"
          variant="outlined"
          value={name}
          onChange={async (e) => {
            setName((e.target as any).value);
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
        <TableBody>{data && <PokemonRow {...data} />}</TableBody>
      </Table>
    </main>
  );
}
