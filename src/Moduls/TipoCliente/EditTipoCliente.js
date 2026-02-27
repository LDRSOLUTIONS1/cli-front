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
import TipoClienteContext from "../../Context/TipoCliente/TipoClienteContext";
import MethodGet from "../../Config/Service";
import { useState } from "react";

export default function EditTipoCliente({ open, handleClose, id }) {
  const { UpdateTipoClientes } = useContext(TipoClienteContext);

  const [tipoCliente, saveTipoCliente] = useState(null);
  useEffect(() => {
    let url = `/tipos-clientes/${id}`;
    MethodGet(url)
      .then((res) => {
        saveTipoCliente(res.data);
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
    UpdateTipoClientes(data);
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
          {tipoCliente && (
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  fullWidth
                  defaultValue={tipoCliente.nombre}
                  label="Nombre del tipo de cliente"
                  {...register("nombre", {
                    required: "El nombre del tipo de cliente es obligatorio",
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
                  defaultValue={tipoCliente.descripcion}
                  label="Descripción del tipo de cliente"
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
