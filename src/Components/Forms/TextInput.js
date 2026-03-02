import React from "react";
import { TextField } from "@mui/material";

export default function TextInput({
  name,
  label,
  register,
  rules,
  errors,
  type = "text",
  ...rest
}) {
  return (
    <TextField
      fullWidth
      type={type}
      label={label}
      {...register(name, rules)}
      error={!!errors?.[name]}
      helperText={errors?.[name]?.message}
      {...rest}
    />
  );
}
