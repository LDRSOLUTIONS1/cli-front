import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Grid, MenuItem } from "@mui/material";
import PuestosContext from "../../Context/Puestos/PuestosContext";
import MethodGet from "../../Config/Service";
import { useState } from "react";

export default function EditPuestos({ open, handleClose, id, departamentos }) {
  const { UpdatePuestos } = useContext(PuestosContext);
  const [puesto, savePuestos] = useState(null);

  useEffect(() => {
    let url = `/puestos/${id}`;
    MethodGet(url)
      .then((res) => {
        savePuestos(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data, e) => {
    data.id = id;
    UpdatePuestos(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Puesto</DialogTitle>
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
          {puesto && (
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  select
                  fullWidth
                  label="Selecciona un departamento"
                  defaultValue={puesto.departamento_id}
                  {...register("departamento_id", {
                    required: "Debes seleccionar un departamento",
                  })}
                  error={!!errors.departamento_id}
                  helperText={errors.departamento_id?.message}
                >
                  <MenuItem value="">
                    <em>-- Selecciona un departamento --</em>
                  </MenuItem>
                  {departamentos.map((departamento) => (
                    <MenuItem key={departamento.id} value={departamento.id}>
                      {departamento.nombre}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Nombre del puesto"
                  defaultValue={puesto.nombre}
                  {...register("nombre", {
                    required: "El nombre de puesto es obligatorio",
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
                  label="Descripcion"
                  defaultValue={puesto.descripcion}
                  {...register("descripcion", {
                    maxLength: { value: 200, message: "Máximo 200 caracteres" },
                  })}
                  error={!!errors.descripcion}
                  helperText={errors.descripcion?.message}
                />
              </Grid>
            </Grid>
          )}
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
            Actualizar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
