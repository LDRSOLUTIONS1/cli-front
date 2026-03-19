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
import ContactosContext from "../../Context/Contactos/ContactosContext";

export default function AddContactos({ open, handleClose, puestos, clientes }) {
  const { CreateContactos } = useContext(ContactosContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data, e) => {
    CreateContactos(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Nuevo Contacto</DialogTitle>
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
                select
                fullWidth
                label="Selecciona un cliente"
                {...register("distribuidor_id", {
                  required: "Debes seleccionar un cliente",
                })}
                error={!!errors.distribuidor_id}
                helperText={errors.distribuidor_id?.message}
              >
                <MenuItem value="">
                  <em>-- Selecciona un cliente --</em>
                </MenuItem>
                {clientes.map((cliente) => (
                  <MenuItem key={cliente.id} value={cliente.id}>
                    {cliente.nombre_comercial || cliente.razon_social}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={12}>
              <TextField
                select
                fullWidth
                label="Selecciona un puesto"
                {...register("puesto_id", {
                  required: "Debes seleccionar un puesto",
                })}
                error={!!errors.puesto_id}
                helperText={errors.puesto_id?.message}
              >
                <MenuItem value="">
                  <em>-- Selecciona un puesto --</em>
                </MenuItem>
                {puestos.map((puesto) => (
                  <MenuItem key={puesto.id} value={puesto.id}>
                    {puesto.nombre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Nombre del contacto"
                {...register("nombre", {
                  required: "El nombre del contacto es obligatorio",
                  minLength: { value: 1, message: "Mínimo 1 caracteres" },
                  maxLength: { value: 200, message: "Máximo 200 caracteres" },
                })}
                error={!!errors.nombre}
                helperText={errors.nombre?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                type="email"
                fullWidth
                label="Correo del contacto"
                {...register("correo", {
                  maxLength: { value: 200, message: "Máximo 200 caracteres" },
                })}
                error={!!errors.correo}
                helperText={errors.correo?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Extensión del contacto"
                {...register("extension", {
                  maxLength: { value: 20, message: "Máximo 20 caracteres" },
                })}
                error={!!errors.extension}
                helperText={errors.extension?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                type="number"
                fullWidth
                label="Telefono del contacto"
                {...register("telefono", {
                  maxLength: { value: 10, message: "Máximo 10 caracteres" },
                })}
                error={!!errors.telefono}
                helperText={errors.telefono?.message}
              />
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
