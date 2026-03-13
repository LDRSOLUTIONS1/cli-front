import React, { useEffect, useContext } from "react";
import { Box, Typography, Paper, useTheme, useMediaQuery } from "@mui/material";
import { esES } from "@mui/x-data-grid/locales";
import { DataGrid } from "@mui/x-data-grid";
import Layout from "../Layout/Layout";
import TipoClienteContext from "../../Context/TipoCliente/TipoClienteContext";
import { useParams } from "react-router-dom";
import { EstadoChip } from "../../utils/EstadoChip";

const TipoClienteTable = () => {
  const { tipoCliente, GetTipoCliente } = useContext(TipoClienteContext);
  const { id } = useParams();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const clientes = tipoCliente?.clientes || [];

  useEffect(() => {
    GetTipoCliente(id);
  }, [id]);

  const rows = clientes.map((cliente) => ({
    ...cliente,
    grupo_nombre: cliente.grupo?.nombre || "—",
    region: cliente.direcciones?.[0]?.estado?.region?.nombre || "—",
    tipo_cliente: cliente?.tipo_cliente.nombre || "—",
  }));

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "tipo_cliente",
      headerName: "TIPO DE CLIENTE",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "grupo_nombre",
      headerName: "GRUPO",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "tipo_negocio",
      headerName: "TIPO DE NEGOCIO",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "tipo_persona",
      headerName: "TIPO DE PERSONA",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      type: "singleSelect",
      valueOptions: [
        { value: "1", label: "Persona Física" },
        { value: "2", label: "Persona Moral" },
      ],
    },
    {
      field: "nombre_comercial",
      headerName: "NOMBRE COMERCIAL",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "razon_social",
      headerName: "RAZÓN SOCIAL",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "region",
      headerName: "REGIÓN",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },

    {
      field: "plaza",
      headerName: "PLAZA",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "estado",
      headerName: "ESTADO",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      renderCell: (params) => <EstadoChip estado={params.value} />,
    },
  ];

  return (
    <Layout>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid #eaeaea",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          {tipoCliente?.nombre}
        </Typography>

        <Box
          sx={{
            width: "100%",
            height: isMobile ? 400 : 500,
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            showToolbar
            autoHeight={isMobile}
            checkboxSelection={!isMobile}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10, 20]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 7, page: 0 },
              },
              sorting: {
                sortModel: [{ field: "id", sort: "desc" }],
              },
            }}
            slots={{
              toolbar: () => (
                <Box
                  sx={{
                    p: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography fontWeight={600}>
                    Total: {clientes.length}
                  </Typography>
                </Box>
              ),
            }}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            sx={{
              border: "none",

              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.grey[100],
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: 0.5,
                borderBottom: `2px solid ${theme.palette.primary.main}`,
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: `2px solid ${theme.palette.primary.main}`,
              },

              "& .MuiDataGrid-cell": {
                borderBottom: "2px solid #1976D2",
              },

              "& .MuiDataGrid-columnSeparator": {
                display: "none",
              },

              "& .MuiDataGrid-row:hover": {
                backgroundColor: theme.palette.action.hover,
                transition: "0.2s ease-in-out",
              },
            }}
          />
        </Box>
      </Paper>
    </Layout>
  );
};

export default TipoClienteTable;
