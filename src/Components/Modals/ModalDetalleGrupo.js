import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  Chip,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { dateFormatter } from "../../utils/dateFormatter";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const ModalDetalleGrupo = ({ open, onClose, grupo }) => {
  if (!grupo) return null;

  const estadoConfig = {
    1: { label: "Inactivo", color: "error" },
    2: { label: "Activo", color: "success" },
  };

  const estado = estadoConfig[grupo.estado] || {
    label: "Desconocido",
    color: "default",
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: "#041954",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "white" }} variant="h6">
          Datos del registro
        </Typography>

        <IconButton onClick={onClose}>
          <CloseIcon sx={{ color: "white" }} />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid size={6}>
              <Item>ID:</Item>
            </Grid>
            <Grid size={6}>
              <Item>{grupo.id}</Item>
            </Grid>
            <Grid size={6}>
              <Item>Código:</Item>
            </Grid>
            <Grid size={6}>
              <Item>{grupo.codigo}</Item>
            </Grid>
            <Grid size={6}>
              <Item>Nombre:</Item>
            </Grid>
            <Grid size={6}>
              <Item>{grupo.nombre}</Item>
            </Grid>
            <Grid size={6}>
              <Item>Descripción:</Item>
            </Grid>
            <Grid size={6}>
              <Item>{grupo.descripcion}</Item>
            </Grid>
            <Grid size={6}>
              <Item>Fecha de registro:</Item>
            </Grid>
            <Grid size={6}>
              <Item>
                {grupo?.fecha_registro
                  ? dateFormatter(grupo.fecha_registro)
                  : "—"}
              </Item>
            </Grid>
            <Grid size={6}>
              <Item>Estado:</Item>
            </Grid>
            <Grid size={6}>
              <Item>
                <Chip
                  label={estado.label}
                  color={estado.color}
                  size="small"
                  icon={
                    estado.label === "Activo" ? (
                      <CheckCircleIcon />
                    ) : (
                      <CancelIcon />
                    )
                  }
                  variant="outlined"
                />
              </Item>
            </Grid>
          </Grid>
        </Box>

        <Typography variant="h6" gutterBottom>
          Clientes del grupo
        </Typography>

        <Table component={Paper} variant="outlined">
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Nombre Comercial</TableCell>
              <TableCell>Razón Social</TableCell>
              <TableCell>RFC</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Plaza</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grupo.clientes && grupo.clientes.length > 0 ? (
              grupo.clientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell>{cliente.nombre_comercial}</TableCell>
                  <TableCell>{cliente.razon_social}</TableCell>
                  <TableCell>{cliente.rfc}</TableCell>
                  <TableCell>{cliente.telefono}</TableCell>
                  <TableCell>{cliente.plaza}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No hay clientes registrados en este grupo
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetalleGrupo;
