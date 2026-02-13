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
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (cliente) {
      setOpen(true);
    }
  }, [cliente]);

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      minWidth: 100,
    },
    {
      field: "tipo_persona",
      headerName: "TIPO PERSONA",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (params.value === 1 ? "Física" : "Moral"),
    },
    {
      field: "nombre_completo",
      headerName: "NOMBRE / RAZÓN SOCIAL",
      flex: 1,
      minWidth: 150,
      valueGetter: (value, row) => {
        if (row.tipo_persona === 1) {
          return `${row.nombre_fisica || ""} ${row.apellido_paterno || ""} ${row.apellido_materno || ""}`.trim();
        }
        return row.razon_social || "";
      },
    },
    {
      field: "rfc",
      headerName: "RFC",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "telefono",
      headerName: "TELÉFONO",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "correo",
      headerName: "CORREO",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "estado",
      headerName: "ESTADO",
      flex: 0.5,
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
      minWidth: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<VisibilityIcon sx={{ color: "#041954" }} />}
          label="Ver detalles"
          onClick={() => GetCliente(params.id)}
        />,
      ],
    },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 3,
        overflow: "hidden",
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
            toolbar: GridToolbar,
          }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f7fa",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f1f5ff",
            },
          }}
        />
      </Box>
      <ModalDetalleCliente
        open={open}
        onClose={handleClose}
        cliente={cliente}
      />
    </Paper>
  );
}
