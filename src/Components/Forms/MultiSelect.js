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
  getOptionLabel,
  rules = {},
  errors,
}) {
  const getLabel = (item) => {
    if (getOptionLabel) return getOptionLabel(item);
    return item[optionLabel];
  };

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
                .map((item) => getLabel(item))
                .join(", "),
          }}
          error={!!errors?.[name]}
          helperText={errors?.[name]?.message}
        >
          {options.map((item) => (
            <MenuItem key={item[optionValue]} value={item[optionValue]}>
              <Checkbox checked={field.value?.includes(item[optionValue])} />
              <ListItemText primary={getLabel(item)} />
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}
