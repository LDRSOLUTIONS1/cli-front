import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";

const TabModelosCliente = ({ modelos = [] }) => {
  const theme = useTheme();

  if (!modelos || modelos.length === 0) {
    return <Typography variant="h6">No hay modelos registrados</Typography>;
  }

  const columns = [
    {
      field: "idlineaproducto",
      headerName: "ID LÍNEA DE PRODUCTO",
      flex: 0.7,
    },
    {
      field: "cve_linea_producto",
      headerName: "CVE LÍNEA DE PRODUCTO",
      flex: 1,
    },
    {
      field: "descripcion",
      headerName: "DESCRIPCIÓN",
      flex: 1.5,
    },
  ];

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h6" fontWeight={700}>
          Modelos Asociados
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Total: {modelos.length}
        </Typography>
      </Box>

      <DataGrid
        rows={modelos}
        columns={columns}
        getRowId={(row) => row.idlineaproducto}
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

export default TabModelosCliente;
