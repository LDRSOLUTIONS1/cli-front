import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";

const TabRegionalesCliente = ({ regionales = [] }) => {
  const theme = useTheme();

  if (!regionales || regionales.length === 0) {
    return <Typography variant="h6">No hay regionales registrados</Typography>;
  }

  const columns = [
    {
      field: "id",
      headerName: "ID REGIONAL",
      flex: 0.5,
    },
    {
      field: "nombre",
      headerName: "NOMBRE",
      flex: 1,
    },
    {
      field: "apellido_paterno",
      headerName: "APELLIDO PATERNO",
      flex: 1,
    },
    {
      field: "apellido_materno",
      headerName: "APELLIDO MATERNO",
      flex: 1,
    },
  ];

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h6" fontWeight={700}>
          Regionales Asociados
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Total: {regionales.length}
        </Typography>
      </Box>

      <DataGrid
        rows={regionales}
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

export default TabRegionalesCliente;
