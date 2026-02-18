import React from "react";
import { Box, Typography, Paper, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";

const TabSucursalesCliente = ({ sucursales = [] }) => {
  const theme = useTheme();

  if (!sucursales || sucursales.length === 0) {
    return <Typography variant="h6">No hay sucursales registradas</Typography>;
  }

  const columns = [
    {
      field: "nombre_comercial",
      headerName: "NOMBRE COMERCIAL",
      flex: 1,
    },
    {
      field: "razon_social",
      headerName: "RAZÓN SOCIAL",
      flex: 1,
    },
    {
      field: "plaza",
      headerName: "PLAZA",
      flex: 1,
    },
    {
      field: "telefono",
      headerName: "TELÉFONO",
      flex: 1,
    },
  ];

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h6" fontWeight={700}>
          Sucursales Asociadas
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Total: {sucursales.length}
        </Typography>
      </Box>

      <DataGrid
        rows={sucursales}
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

export default TabSucursalesCliente;
