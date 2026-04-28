import React, { useContext, useState } from "react";
import { Box, Typography, Paper, useTheme, useMediaQuery } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import ModalDetalleMarca from "../Modals/ModalDetalleMarca";
import MarcasContext from "../../Context/Marcas/MarcasContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { dateFormatter } from "../../utils/dateFormatter";
import EditMarcas from "../../Moduls/Marcas/EditMarcas";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import AddMarcas from "../../Moduls/Marcas/AddMarcas";
import { EstadoChip } from "../../utils/EstadoChip";

export default function TableMarcas({ rows = [] }) {
  const { marca, GetMarca, DeleteMarcas } = useContext(MarcasContext);
  const rolid = Number(localStorage.getItem("rolid"));

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openModal, setOpenModal] = useState(false);
  const handleClickOpen = async (id) => {
    await GetMarca(id);
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  const [modalUpdate, OpenModalUpdate] = useState(false);
  const [id_marca, saveIdMarca] = useState(null);
  const handleClickOpenEdit = (id) => {
    OpenModalUpdate(true);
    saveIdMarca(id);
  };
  const handleClickCloseEdit = () => {
    OpenModalUpdate(false);
    saveIdMarca(null);
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
              onClick={() => DeleteMarcas(params.id)}
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
      field: "nombre",
      headerName: "NOMBRE",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
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
          Listado de Marcas
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
            checkboxSelection={false}
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
                  {rolid !== 2 && (
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={handleClickOpenAdd}
                      sx={{ borderRadius: 3 }}
                    >
                      Nueva Marca
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
      <ModalDetalleMarca
        open={openModal}
        handleClose={handleClose}
        marca={marca}
      />

      {id_marca !== null && (
        <EditMarcas
          open={modalUpdate}
          handleClose={handleClickCloseEdit}
          id={id_marca}
        />
      )}

      <AddMarcas open={modalAdd} handleClose={handleClickCloseAdd} />
    </>
  );
}
