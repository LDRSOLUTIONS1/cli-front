import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Grid, MenuItem } from "@mui/material";
import UsuariosContext from "../../Context/Usuarios/UsuariosContext";

export default function AddUsuarios({ open, handleClose }) {
  const { CreateUsuarios } = useContext(UsuariosContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data, e) => {
    CreateUsuarios(data);
    handleClose();
  };

  const roles = [
    { id: 1, nombre: "Super Admin" },
    { id: 2, nombre: "Admin" },
    { id: 3, nombre: "Interno" },
    { id: 4, nombre: "Externo" },
    { id: 5, nombre: "Gubernamental" },
    { id: 6, nombre: "Distribuidor" },
  ];

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Nuevo Usuario</DialogTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        onKeyDown={(e) => {
          if (e.code === "Enter" || e.code === "NumpadEnter") {
            e.preventDefault();
          }
        }}
      >
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                type="number"
                fullWidth
                label="Num. Colaborador"
                {...register("numcolaborador", {
                  required: "El Num. Colaborador es obligatorio",
                  minLength: { value: 3, message: "Mínimo 3 caracteres" },
                  maxLength: { value: 10, message: "Máximo 10 caracteres" },
                })}
                error={!!errors.numcolaborador}
                helperText={errors.numcolaborador?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Nombre"
                {...register("nombres", {
                  required: "El nombre es obligatorio",
                  minLength: { value: 1, message: "Mínimo 1 caracteres" },
                  maxLength: { value: 200, message: "Máximo 200 caracteres" },
                })}
                error={!!errors.nombre}
                helperText={errors.nombre?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Apellidos"
                {...register("apellidos", {
                  required: "El apellido es obligatorio",
                  minLength: { value: 1, message: "Mínimo 1 caracteres" },
                  maxLength: { value: 200, message: "Máximo 200 caracteres" },
                })}
                error={!!errors.apellidos}
                helperText={errors.apellidos?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                type="number"
                fullWidth
                label="Telefono"
                {...register("telefono", {
                  minLength: { value: 10, message: "Mínimo 10 caracteres" },
                  maxLength: { value: 10, message: "Máximo 10 caracteres" },
                })}
                error={!!errors.telefono}
                helperText={errors.telefono?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                type="email"
                fullWidth
                label="Correo"
                {...register("email_user", {
                  required: "El correo es obligatorio",
                  minLength: { value: 1, message: "Mínimo 1 caracteres" },
                  maxLength: { value: 200, message: "Máximo 200 caracteres" },
                })}
                error={!!errors.email_user}
                helperText={errors.email_user?.message}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                select
                fullWidth
                label="Selecciona un rol"
                {...register("rolid", {
                  required: "Debes seleccionar un rol",
                })}
                error={!!errors.rolid}
                helperText={errors.rolid?.message}
              >
                <MenuItem value="">
                  <em>-- Selecciona un rol --</em>
                </MenuItem>
                {roles.map((rol) => (
                  <MenuItem key={rol.id} value={rol.id}>
                    {rol.nombre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: "red",
              color: "white",
              "&:hover": { backgroundColor: "darkred" },
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            sx={{
              backgroundColor: "#1565c0",
              color: "white",
              "&:hover": { backgroundColor: "#0d47a1" },
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
