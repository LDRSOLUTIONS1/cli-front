import React, { useContext, useState } from "react";
import { Box, Typography, Paper, useTheme, useMediaQuery } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { esES } from "@mui/x-data-grid/locales";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import ClientesContext from "../../Context/Clientes/ClientesContext";
import ModalDetalleCliente from "../Modals/ModalDetalleCliente";
import { EstatusCliente } from "../../utils/EstatusCliente";
import { useNavigate } from "react-router-dom";

export default function TableClientes({ rows = [] }) {
  const { cliente, GetCliente } = useContext(ClientesContext);
  const rolid = Number(localStorage.getItem("rolid"));

  const theme = useTheme();
  const navigate = useNavigate();
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
      field: "actions",
      type: "actions",
      headerName: "ACCIÓN",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      getActions: (params) => {
        const actions = [
          <GridActionsCellItem
            icon={<VisibilityIcon sx={{ color: "#42A5F5" }} />}
            label="Ver detalles"
            onClick={() => handleClickOpen(params.id)}
          />,
        ];
        if (rolid !== 2 && rolid !== 7) {
          actions.push(
            <GridActionsCellItem
              icon={<EditIcon sx={{ color: "#ed6c02" }} />}
              label="Editar"
              onClick={() => navigate(`/Edicion-clientes/${params.id}`)}
            />,
          );
        }
        return actions;
      },
    },
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
      field: "grupo",
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
      field: "clasificacion",
      headerName: "CLASIFICACIÓN",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "rfc",
      headerName: "RFC",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "telefono",
      headerName: "TELEFONO",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "estatus",
      headerName: "ESTATUS",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      type: "singleSelect",
      valueOptions: [
        { value: "Activo", label: "Activo" },
        { value: "Inactivo", label: "Inactivo" },
        { value: "Desarrollo", label: "En desarrollo" },
        { value: "Stand By", label: "Stand By" },
        { value: "No Aplica", label: "No aplica" },
      ],
      renderCell: (params) => <EstatusCliente estado={params.value} />,
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
          showToolbar
          autoHeight={isMobile}
          //checkboxSelection={!isMobile}
          heckboxSelection={false}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 20, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
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
                <Typography fontWeight={600}>Total: {rows.length}</Typography>
                {rolid !== 2 && rolid !== 7 && (
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate("/Alta-clientes")}
                    sx={{ borderRadius: 3 }}
                  >
                    Nuevo Cliente
                  </Button>
                )}
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
              borderBottom: "1px solid #e0e0e0",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },

            "& .MuiDataGrid-columnSeparator": {
              opacity: 0.3,
              cursor: "col-resize",
            },

            "& .MuiDataGrid-columnSeparator:hover": {
              opacity: 1,
              color: theme.palette.primary.main,
            },

            "& .MuiDataGrid-columnHeader:active .MuiDataGrid-columnSeparator": {
              color: theme.palette.primary.main,
              width: 2,
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor: theme.palette.action.hover,
              transition: "0.2s ease-in-out",
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
