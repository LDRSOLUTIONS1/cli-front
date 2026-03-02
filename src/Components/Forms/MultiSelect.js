import React from "react";
import { Controller } from "react-hook-form";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";

export default function MultiSelect({
  name,
  control,
  label,
  options,
  optionLabel = "nombre",
  optionValue = "id",
  rules = {},
  errors,
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          select
          fullWidth
          label={label}
          SelectProps={{
            multiple: true,
            renderValue: (selected) =>
              options
                .filter((item) => selected.includes(item[optionValue]))
                .map((item) => item[optionLabel])
                .join(", "),
          }}
          error={!!errors?.[name]}
          helperText={errors?.[name]?.message}
        >
          {options.map((item) => (
            <MenuItem key={item[optionValue]} value={item[optionValue]}>
              <Checkbox checked={field.value?.includes(item[optionValue])} />
              <ListItemText primary={item[optionLabel]} />
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}
