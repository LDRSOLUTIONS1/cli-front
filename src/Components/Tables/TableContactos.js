import React, { useContext, useState, useEffect } from "react";
import { Box, Typography, Paper, useTheme, useMediaQuery } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import PuestosContext from "../../Context/Puestos/PuestosContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { dateFormatter } from "../../utils/dateFormatter";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { EstadoChip } from "../../utils/EstadoChip";
import ContactosContext from "../../Context/Contactos/ContactosContext";
import ClientesContext from "../../Context/Clientes/ClientesContext";
import AddContactos from "../../Moduls/Contactos/AddContactos";
import EditContactos from "../../Moduls/Contactos/EditContactos";
import ModalDetalleContacto from "../Modals/ModalDetalleContacto";

export default function TableContactos({ rows = [] }) {
  const rolid = Number(localStorage.getItem("rolid"));
  const { puestos, GetPuestos } = useContext(PuestosContext);
  const { clientes, GetClientes } = useContext(ClientesContext);
  const { contacto, GetContacto, DeleteContactos } =
    useContext(ContactosContext);

  useEffect(() => {
    GetPuestos();
    GetClientes();
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openModal, setOpenModal] = useState(false);
  const handleClickOpen = async (id) => {
    await GetContacto(id);
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  const [modalUpdate, OpenModalUpdate] = useState(false);
  const [id_contacto, saveIdContacto] = useState(null);
  const handleClickOpenEdit = (id) => {
    OpenModalUpdate(true);
    saveIdContacto(id);
  };
  const handleClickCloseEdit = () => {
    OpenModalUpdate(false);
    saveIdContacto(null);
  };

  const [modalAdd, setOpenModalAdd] = useState(false);
  const handleClickOpenAdd = () => {
    setOpenModalAdd(true);
  };

  const handleClickCloseAdd = () => {
    setOpenModalAdd(false);
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
      field: "distribuidor",
      headerName: "CLIENTE",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "puesto",
      headerName: "PUESTO",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "nombre",
      headerName: "NOMBRE",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "correo",
      headerName: "CORREO",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "telefono",
      headerName: "TELÉFONO",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "fecha_registro",
      headerName: "FECHA REGISTRO",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      renderCell: (params) => dateFormatter(params.value),
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
        if (rolid !== 2) {
          actions.push(
            <GridActionsCellItem
              icon={<EditIcon sx={{ color: "#ed6c02" }} />}
              label="Editar"
              onClick={() => handleClickOpenEdit(params.id)}
            />,
            <GridActionsCellItem
              icon={<DeleteIcon sx={{ color: "#d32f2f" }} />}
              label="Eliminar"
              onClick={() => DeleteContactos(params.id)}
            />,
          );
        }
        return actions;
      },
    },
  ];

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid #eaeaea",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Listado de Contactos
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
                paginationModel: { pageSize: 5, page: 0 },
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
                  {rolid !== 2 && (
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={handleClickOpenAdd}
                      sx={{ borderRadius: 3 }}
                    >
                      Nuevo Contacto
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

              "& .MuiDataGrid-columnHeader:active .MuiDataGrid-columnSeparator":
                {
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
      </Paper>
      <ModalDetalleContacto
        open={openModal}
        handleClose={handleClose}
        contacto={contacto}
      />

      {id_contacto !== null && (
        <EditContactos
          open={modalUpdate}
          handleClose={handleClickCloseEdit}
          id={id_contacto}
          puestos={puestos}
          clientes={clientes}
        />
      )}

      <AddContactos
        open={modalAdd}
        handleClose={handleClickCloseAdd}
        puestos={puestos}
        clientes={clientes}
      />
    </>
  );
}
