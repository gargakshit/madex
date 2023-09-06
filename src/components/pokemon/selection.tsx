import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

/**
 * Represents the props required for the PokemonTypeSelection component.
 */
type PokemonTypeSelectionProps = {
  selectedType: string | undefined;
  selectType: (type: string | undefined) => void;
  allTypes: { name: string; value: string | null }[];
};

export default function PokemonTypeSelection(props: PokemonTypeSelectionProps) {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-type-label">Type</InputLabel>
      <Select
        labelId="select-type-label"
        id="select-type-select"
        value={props.selectedType}
        label="Age"
        onChange={(e) => props.selectType(e.target.value)}
      >
        {props.allTypes.map((type) => (
          <MenuItem value={type.value ?? undefined} key={type.name}>
            {type.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
