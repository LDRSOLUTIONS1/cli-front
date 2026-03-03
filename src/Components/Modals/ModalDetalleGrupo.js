import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  Chip,
  IconButton,
  Box,
  Divider,
  Paper,
  Stack,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { DataGrid } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import { dateFormatter } from "../../utils/dateFormatter";

const ModalDetalleGrupo = ({ modal, handleClose, grupo }) => {
  const theme = useTheme();
  if (!grupo) return null;

  const estadoConfig = {
    1: { label: "Inactivo", color: "error" },
    2: { label: "Activo", color: "success" },
  };

  const estado = estadoConfig[grupo.estado] || {
    label: "Desconocido",
    color: "default",
  };

  const InfoItem = ({ label, value }) => (
    <Box>
      <Typography
        variant="caption"
        sx={{ color: "text.secondary", fontWeight: 500 }}
      >
        {label}
      </Typography>

      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        {value || "—"}
      </Typography>
    </Box>
  );

  const columnsClientes = [
    { field: "nombre_comercial", headerName: "NOMBRE COMERCIAL", flex: 1 },
    { field: "razon_social", headerName: "RAZÓN SOCIAL", flex: 1 },
    { field: "rfc", headerName: "RFC", flex: 1 },
    { field: "telefono", headerName: "TELÉFONO", flex: 1 },
    { field: "plaza", headerName: "PLAZA", flex: 1 },
  ];

  return (
    <Dialog
      open={modal}
      onClose={handleClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          py: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Detalle del Grupo
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Código: {grupo.codigo}
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} alignItems="center">
            <Chip
              label={estado.label}
              color={estado.color}
              size="small"
              icon={
                estado.label === "Activo" ? <CheckCircleIcon /> : <CancelIcon />
              }
            />

            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ p: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            mb: 4,
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <InfoItem label="ID" value={grupo.id} />
            </Grid>

            <Grid item xs={12} md={4}>
              <InfoItem label="Nombre" value={grupo.nombre} />
            </Grid>

            <Grid item xs={12}>
              <InfoItem label="Descripción" value={grupo.descripcion} />
            </Grid>

            <Grid item xs={12} md={4}>
              <InfoItem
                label="Fecha de Registro"
                value={
                  grupo.fecha_registro
                    ? dateFormatter(grupo.fecha_registro)
                    : "—"
                }
              />
            </Grid>
          </Grid>
        </Paper>

        <Box mb={2}>
          <Typography variant="h6" fontWeight={700}>
            Clientes Asociados
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Total: {grupo.clientes?.length || 0}
          </Typography>
        </Box>

        <DataGrid
          rows={grupo.clientes || []}
          columns={columnsClientes}
          getRowId={(row) => row.id}
          autoHeight
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.grey[100],
              fontWeight: 600,
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetalleGrupo;
