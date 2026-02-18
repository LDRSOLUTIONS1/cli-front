import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import ClientesContext from "../../Context/Clientes/ClientesContext";
import ModalDetalleCliente from "../Modals/ModalDetalleCliente";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function TableClientes({ rows = [] }) {
  const { cliente, GetCliente } = useContext(ClientesContext);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openModal, setOpenModal] = useState(false);
  const handleClickOpen = async (id) => {
    await GetCliente(id);
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

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
      field: "grupo",
      headerName: "GRUPO",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "tipo_negocio",
      headerName: "TIPO DE NEGOCIO",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "nombre_comercial",
      headerName: "NOMBRE COMERCIAL",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "razon_social",
      headerName: "RAZÓN SOCIAL",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "region",
      headerName: "REGIÓN",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "plaza",
      headerName: "PLAZA",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "estado",
      headerName: "ESTADO",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      renderCell: (params) => {
        const estadoConfig = {
          1: { label: "Inactivo", color: "error" },
          2: { label: "Activo", color: "success" },
        };

        const config = estadoConfig[params.value] || {
          label: "Desconocido",
          color: "default",
        };

        return (
          <Chip
            label={config.label}
            color={config.color}
            size="small"
            icon={
              config.label === "Activo" ? <CheckCircleIcon /> : <CancelIcon />
            }
            variant="outlined"
          />
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "ACCIÓN",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<VisibilityIcon sx={{ color: "#041954" }} />}
          label="Ver detalles"
          onClick={() => handleClickOpen(params.id)}
        />,
      ],
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid #eaeaea",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Listado de Clientes
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
                }}
              >
                <Typography fontWeight={600}>Total: {rows.length}</Typography>
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
              borderBottom: "2px solid #f0f0f0",
            },

            "& .MuiDataGrid-columnSeparator": {
              display: "none",
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor: theme.palette.action.hover,
              transition: "0.2s ease-in-out",
            },

            "& .MuiDataGrid-row:nth-of-type(even)": {
              backgroundColor: "#fafafa",
            },
          }}
        />
      </Box>
      <ModalDetalleCliente
        modal={openModal}
        handleClose={handleClose}
        cliente={cliente}
      />
    </Paper>
  );
}
