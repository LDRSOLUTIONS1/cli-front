import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Grid, MenuItem } from "@mui/material";
import UsuariosContext from "../../Context/Usuarios/UsuariosContext";
import TipoClienteContext from "../../Context/TipoCliente/TipoClienteContext";

export default function AsignarTipoCliente({ open, handleClose, id }) {
  const { AsignarTipoCliente } = useContext(UsuariosContext);
  const { tipoClientes, GetTipoClientes } = useContext(TipoClienteContext);

  useEffect(() => {
    GetTipoClientes();
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data, e) => {
    data.id = id;
    AsignarTipoCliente(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Asignar el tipo de cliente que podrá visualizar</DialogTitle>
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
                label="Selecciona el tipo de cliente"
                {...register("tipo_cliente_id", {
                  required: "Debes seleccionar un tipo de cliente",
                })}
                error={!!errors.tipo_cliente_id}
                helperText={errors.tipo_cliente_id?.message}
              >
                <MenuItem value="">
                  <em>-- Selecciona un tipo de cliente --</em>
                </MenuItem>
                {tipoClientes.map((tipoCliente) => (
                  <MenuItem key={tipoCliente.id} value={tipoCliente.id}>
                    {tipoCliente.nombre}
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
