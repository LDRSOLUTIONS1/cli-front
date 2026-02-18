import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";

const TabContactosCliente = ({ contactos = [] }) => {
  const theme = useTheme();

  if (!contactos || contactos.length === 0) {
    return <Typography variant="h6">No hay contactos registrados</Typography>;
  }

  const contactosFormateados = contactos.map((c) => ({
    ...c,
    puesto_nombre: c.puesto?.nombre,
    departamento_nombre: c.puesto?.departamento?.nombre,
  }));

  const columns = [
    {
      field: "puesto_nombre",
      headerName: "PUESTO",
      flex: 0.5,
    },
    {
      field: "departamento_nombre",
      headerName: "DEPARTAMENTO",
      flex: 1,
    },
    {
      field: "nombre",
      headerName: "NOMBRE DE CONTACTO",
      flex: 1,
    },
    {
      field: "correo",
      headerName: "CORREO",
      flex: 1,
    },
    {
      field: "extension",
      headerName: "EXTENSION",
      flex: 1,
    },
    {
      field: "telefono",
      headerName: "TELÉFONO",
      flex: 1,
    },
    {
      field: "estatus",
      headerName: "ESTATUS",
      flex: 1,
    },
  ];

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h6" fontWeight={700}>
          Contactos Asociados
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Total: {contactos.length}
        </Typography>
      </Box>

      <DataGrid
        rows={contactosFormateados}
        columns={columns}
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
    </Box>
  );
};

export default TabContactosCliente;
