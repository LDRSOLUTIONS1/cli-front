import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import MarcasContext from "../../Context/Marcas/MarcasContext";
import MethodGet from "../../Config/Service";
import { useState } from "react";

export default function EditMarcas({ open, handleClose, id }) {
  const { UpdateMarcas } = useContext(MarcasContext);

  const [marca, saveMarca] = useState(null);
  useEffect(() => {
    let url = `/marcas/${id}`;
    MethodGet(url)
      .then((res) => {
        saveMarca(res.data);
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
    UpdateMarcas(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Marca</DialogTitle>
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
          {marca && (
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Nombre de la marca"
                  defaultValue={marca.nombre}
                  {...register("nombre", {
                    required: "El nombre de la marca es obligatorio",
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
                  label="Código de la marca"
                  defaultValue={marca.codigo}
                  {...register("codigo", {
                    maxLength: { value: 200, message: "Máximo 200 caracteres" },
                  })}
                  error={!!errors.codigo}
                  helperText={errors.codigo?.message}
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
