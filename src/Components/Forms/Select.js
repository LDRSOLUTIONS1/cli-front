import React from "react";
import { TextField, MenuItem } from "@mui/material";

export default function SelectField({
  name,
  label,
  register,
  rules,
  errors,
  options,
  getOptionLabel,
  optionValue = "id",
  defaultOption = "Selecciona una opción",
}) {
  return (
    <TextField
      select
      fullWidth
      label={label}
      defaultValue=""
      {...register(name, rules)}
      error={!!errors?.[name]}
      helperText={errors?.[name]?.message}
    >
      <MenuItem value="">
        <em>{defaultOption}</em>
      </MenuItem>

      {options.map((item) => (
        <MenuItem key={item[optionValue]} value={item[optionValue]}>
          {getOptionLabel ? getOptionLabel(item) : item.nombre}
        </MenuItem>
      ))}
    </TextField>
  );
}
