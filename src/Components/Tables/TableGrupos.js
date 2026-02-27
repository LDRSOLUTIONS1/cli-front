import React, { useContext, useState } from "react";
import { Box, Typography, Paper, useTheme, useMediaQuery } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import ModalDetalleGrupo from "../Modals/ModalDetalleGrupo";
import GruposContext from "../../Context/Grupos/GruposContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { dateFormatter } from "../../utils/dateFormatter";
import { EstadoChip } from "../../utils/EstadoChip";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import AddGrupos from "../../Moduls/Grupos/AddGrupos";
import EditGrupos from "../../Moduls/Grupos/EditGrupos";

export default function TableGrupos({ rows = [] }) {
  const { grupo, GetGrupo, DeleteGrupos } = useContext(GruposContext);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openModal, setOpenModal] = useState(false);
  const handleClickOpen = async (id) => {
    await GetGrupo(id);
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  const [modalUpdate, OpenModalUpdate] = useState(false);
  const [id_grupo, saveIdGrupo] = useState(null);
  const handleClickOpenEdit = (id) => {
    OpenModalUpdate(true);
    saveIdGrupo(id);
  };
  const handleClickCloseEdit = () => {
    OpenModalUpdate(false);
    saveIdGrupo(null);
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
      field: "codigo",
      headerName: "CÓDIGO",
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
      field: "descripcion",
      headerName: "DESCRIPCIÓN",
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
      getActions: (params) => [
        <GridActionsCellItem
          icon={<VisibilityIcon sx={{ color: "#42A5F5" }} />}
          label="Ver detalles"
          onClick={() => handleClickOpen(params.id)}
        />,
        <GridActionsCellItem
          icon={<EditIcon sx={{ color: "#ed6c02" }} />}
          label="Editar"
          onClick={() => handleClickOpenEdit(params.id)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon sx={{ color: "#d32f2f" }} />}
          label="Eliminar"
          onClick={() => DeleteGrupos(params.id)}
        />,
      ],
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
          Listado de Grupos
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
                paginationModel: { pageSize: 6, page: 0 },
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
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleClickOpenAdd}
                    sx={{ borderRadius: 3 }}
                  >
                    Nuevo Grupo
                  </Button>
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
            }}
          />
        </Box>
      </Paper>
      <ModalDetalleGrupo
        modal={openModal}
        handleClose={handleClose}
        grupo={grupo}
      />

      {id_grupo !== null && (
        <EditGrupos
          open={modalUpdate}
          handleClose={handleClickCloseEdit}
          id={id_grupo}
        />
      )}

      <AddGrupos open={modalAdd} handleClose={handleClickCloseAdd} />
    </>
  );
}
