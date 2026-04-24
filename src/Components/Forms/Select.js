import React from "react";
import { Controller } from "react-hook-form";
import { TextField, Autocomplete } from "@mui/material";

export default function SelectField({
  name,
  label,
  control,
  rules = {},
  errors,
  options = [],
  disabled = false,
  optionValue = "id",
  getOptionLabel,
  defaultOption = "Selecciona una opción",
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={rules}
      render={({ field }) => {
        const selectedOption =
          options.find(
            (item) => String(item[optionValue]) === String(field.value),
          ) || null;

        return (
          <Autocomplete
            options={options}
            disabled={disabled}
            value={selectedOption}
            onChange={(_, newValue) => {
              field.onChange(newValue ? newValue[optionValue] : "");
            }}
            isOptionEqualToValue={(option, value) =>
              String(option[optionValue]) === String(value[optionValue])
            }
            getOptionLabel={(option) =>
              getOptionLabel ? getOptionLabel(option) : option?.nombre || ""
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                fullWidth
                error={!!errors?.[name]}
                helperText={errors?.[name]?.message || defaultOption}
              />
            )}
          />
        );
      }}
    />
  );
}
