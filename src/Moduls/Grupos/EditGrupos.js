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
import GruposContext from "../../Context/Grupos/GruposContext";
import MethodGet from "../../Config/Service";
import { useState } from "react";

export default function EditGrupos({ open, handleClose, id }) {
  const { UpdateGrupos } = useContext(GruposContext);

  const [grupo, saveGrupo] = useState(null);
  useEffect(() => {
    let url = `/grupos/${id}`;
    MethodGet(url)
      .then((res) => {
        saveGrupo(res.data);
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
    UpdateGrupos(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Grupo</DialogTitle>
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
          {grupo && (
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  fullWidth
                  defaultValue={grupo.codigo}
                  label="Código del grupo"
                  {...register("codigo", {
                    maxLength: { value: 200, message: "Máximo 200 caracteres" },
                  })}
                  error={!!errors.codigo}
                  helperText={errors.codigo?.message}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  defaultValue={grupo.nombre}
                  label="Nombre del grupo"
                  {...register("nombre", {
                    required: "El nombre del grupo es obligatorio",
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
                  defaultValue={grupo.descripcion}
                  label="Descripción del grupo"
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
