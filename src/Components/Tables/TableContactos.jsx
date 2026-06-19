import React, { useContext, useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  Avatar,
  Chip,
  IconButton,
  Button,
  InputAdornment,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import PuestosContext from "../../Context/Puestos/PuestosContext";
import ContactosContext from "../../Context/Contactos/ContactosContext";
import ClientesContext from "../../Context/Clientes/ClientesContext";
import AddContactos from "../../Moduls/Contactos/AddContactos";
import EditContactos from "../../Moduls/Contactos/EditContactos";
import ModalDetalleContacto from "../Modals/ModalDetalleContacto";
import { dateFormatter } from "../../utils/dateFormatter";

function getInitials(nombre) {
  if (!nombre || typeof nombre !== "string") return "?";
  return nombre
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

const AVATAR_PALETTE = [
  { bg: "#E6F1FB", color: "#0C447C" },
  { bg: "#FAEEDA", color: "#633806" },
  { bg: "#FBEAF0", color: "#72243E" },
  { bg: "#E1F5EE", color: "#085041" },
  { bg: "#EEEDFE", color: "#3C3489" },
];

function avatarColors(id) {
  return AVATAR_PALETTE[id % AVATAR_PALETTE.length];
}

function ContactoAvatar({ nombre, id }) {
  const { bg, color } = avatarColors(id);
  return (
    <Avatar
      sx={{
        width: 32,
        height: 32,
        bgcolor: bg,
        color,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {getInitials(nombre)}
    </Avatar>
  );
}

function EstadoChipMejorado({ estado }) {
  const activo = estado === 2;
  return (
    <Chip
      label={activo ? "Activo" : "Inactivo"}
      size="small"
      sx={{
        bgcolor: activo ? "#EAF3DE" : "#F1EFE8",
        color: activo ? "#3B6D11" : "#5F5E5A",
        fontWeight: 500,
        fontSize: "0.72rem",
        height: 22,
        "& .MuiChip-label": { px: 1.2 },
      }}
      icon={
        <Box
          component="span"
          sx={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            bgcolor: activo ? "#639922" : "#888780",
            ml: "6px !important",
            flexShrink: 0,
          }}
        />
      }
    />
  );
}

function ClienteTag({ label }) {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-block",
        bgcolor: "grey.100",
        border: "0.5px solid",
        borderColor: "divider",
        borderRadius: 1.5,
        px: 1,
        py: 0.25,
        fontSize: "0.75rem",
        color: "text.secondary",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </Box>
  );
}

function CustomToolbar({ totalRows, search, onSearch, onAdd, canEdit }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 1.5,
        py: 1,
        gap: 1.5,
        flexWrap: "wrap",
        borderBottom: "0.5px solid",
        borderColor: "divider",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            bgcolor: "grey.100",
            border: "0.5px solid",
            borderColor: "divider",
            borderRadius: 1.5,
            px: 1.25,
            py: 0.5,
            fontSize: "0.8rem",
            color: "text.secondary",
          }}
        >
          Total:{" "}
          <strong style={{ color: "inherit", fontWeight: 600 }}>
            {totalRows}
          </strong>
        </Box>

        <TextField
          size="small"
          placeholder="Buscar contacto…"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 16, color: "text.disabled" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              fontSize: "0.8rem",
              height: 32,
              borderRadius: 2,
            },
            width: 200,
          }}
        />
      </Box>

      {canEdit && (
        <Button
          variant="contained"
          startIcon={<AddIcon sx={{ fontSize: 16 }} />}
          onClick={onAdd}
          disableElevation
          sx={{ borderRadius: 2, fontSize: "0.8rem", height: 32 }}
        >
          Nuevo contacto
        </Button>
      )}
    </Box>
  );
}

function ConfirmDeleteDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, fontSize: "1rem" }}>
        Eliminar contacto
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontSize: "0.875rem" }}>
          ¿Estás seguro de que deseas eliminar este contacto? Esta acción no se
          puede deshacer.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} size="small" sx={{ borderRadius: 2 }}>
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          size="small"
          disableElevation
          sx={{ borderRadius: 2 }}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function TableContactos({ rows = [] }) {
  const rolid = Number(localStorage.getItem("rolid"));
  const canEdit = rolid !== 2;

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

  const [search, setSearch] = useState("");
  const filteredRows = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.nombre?.toLowerCase().includes(q) ||
        r.correo?.toLowerCase().includes(q) ||
        r.distribuidor?.toLowerCase().includes(q),
    );
  }, [rows, search]);

  const [openModal, setOpenModal] = useState(false);
  const handleClickOpen = async (id) => {
    await GetContacto(id);
    setOpenModal(true);
  };

  const [modalUpdate, setModalUpdate] = useState(false);
  const [id_contacto, setIdContacto] = useState(null);
  const handleClickOpenEdit = (id) => {
    setIdContacto(id);
    setModalUpdate(true);
  };
  const handleClickCloseEdit = () => {
    setModalUpdate(false);
    setIdContacto(null);
  };

  const [modalAdd, setModalAdd] = useState(false);

  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });
  const handleDeleteClick = (id) => setDeleteDialog({ open: true, id });
  const handleDeleteConfirm = () => {
    DeleteContactos(deleteDialog.id);
    setDeleteDialog({ open: false, id: null });
  };

  const columns = useMemo(
    () => [
      {
        field: "actions",
        type: "actions",
        headerName: "ACCIONES",
        width: 100,
        align: "center",
        headerAlign: "center",
        sortable: false,
        filterable: false,
        getActions: (params) => {
          const actions = [
            <Tooltip title="Ver detalles" key="ver">
              <IconButton
                size="small"
                onClick={() => handleClickOpen(params.id)}
              >
                <VisibilityIcon sx={{ fontSize: 18, color: "#185FA5" }} />
              </IconButton>
            </Tooltip>,
          ];
          if (canEdit) {
            actions.push(
              <Tooltip title="Editar" key="edit">
                <IconButton
                  size="small"
                  onClick={() => handleClickOpenEdit(params.id)}
                >
                  <EditIcon sx={{ fontSize: 18, color: "#BA7517" }} />
                </IconButton>
              </Tooltip>,
              <Tooltip title="Eliminar" key="del">
                <IconButton
                  size="small"
                  onClick={() => handleDeleteClick(params.id)}
                >
                  <DeleteIcon sx={{ fontSize: 18, color: "#A32D2D" }} />
                </IconButton>
              </Tooltip>,
            );
          }
          return actions;
        },
      },
      {
        field: "nombre",
        headerName: "NOMBRE",
        flex: 1.2,
        minWidth: 170,
        renderCell: (params) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, py: 0.5 }}>
            <ContactoAvatar nombre={params.value} id={params.row.id} />
            <Box>
              <Typography
                sx={{ fontSize: "0.82rem", fontWeight: 500, lineHeight: 1.3 }}
              >
                {params.value}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  color: "text.disabled",
                  lineHeight: 1.2,
                }}
              >
                #{params.row.id}
              </Typography>
            </Box>
          </Box>
        ),
      },
      {
        field: "distribuidor",
        headerName: "CLIENTE",
        flex: 1,
        minWidth: 140,
        renderCell: (params) => <ClienteTag label={params.value} />,
      },
      {
        field: "puesto",
        headerName: "PUESTO",
        flex: 1,
        minWidth: 140,
        renderCell: (params) => (
          <Typography sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
            {params.value}
          </Typography>
        ),
      },
      {
        field: "correo",
        headerName: "CORREO",
        flex: 1.2,
        minWidth: 170,
        renderCell: (params) => (
          <Typography
            component="a"
            href={`mailto:${params.value}`}
            sx={{
              fontSize: "0.8rem",
              color: "#185FA5",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {params.value}
          </Typography>
        ),
      },
      {
        field: "telefono",
        headerName: "TELÉFONO",
        flex: 0.8,
        minWidth: 130,
        renderCell: (params) => (
          <Typography sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
            {params.value}
          </Typography>
        ),
      },
      {
        field: "fecha_registro",
        headerName: "REGISTRO",
        flex: 0.8,
        minWidth: 120,
        renderCell: (params) => (
          <Typography sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
            {dateFormatter(params.value)}
          </Typography>
        ),
      },
      {
        field: "estado",
        headerName: "ESTADO",
        width: 110,
        align: "center",
        headerAlign: "center",
        type: "singleSelect",
        valueOptions: [
          { value: 1, label: "Inactivo" },
          { value: 2, label: "Activo" },
        ],
        renderCell: (params) => <EstadoChipMejorado estado={params.value} />,
      },
    ],
    [canEdit],
  );

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "0.5px solid",
          borderColor: "divider",
          overflow: "hidden",
        }}
      >
        <CustomToolbar
          totalRows={filteredRows.length}
          search={search}
          onSearch={setSearch}
          onAdd={() => setModalAdd(true)}
          canEdit={canEdit}
        />

        <Box sx={{ width: "100%", height: isMobile ? 400 : 520 }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            disableRowSelectionOnClick
            checkboxSelection={false}
            pageSizeOptions={[10, 25, 50, 100]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
              sorting: { sortModel: [{ field: "id", sort: "desc" }] },
            }}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            getRowHeight={() => 52}
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "grey.50",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: 0.4,
                borderBottom: `1.5px solid ${theme.palette.primary.main}`,
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: 600,
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: `1.5px solid ${theme.palette.primary.main}`,
                fontSize: "0.8rem",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "0.5px solid",
                borderColor: "divider",
                display: "flex",
                alignItems: "center",
              },
              "& .MuiDataGrid-row:hover": {
                bgcolor: "grey.50",
                transition: "background 0.15s",
              },
              "& .MuiDataGrid-columnSeparator": { opacity: 0.3 },
              "& .MuiDataGrid-columnSeparator:hover": {
                opacity: 1,
                color: theme.palette.primary.main,
              },
            }}
          />
        </Box>
      </Paper>

      <ModalDetalleContacto
        open={openModal}
        handleClose={() => setOpenModal(false)}
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
        handleClose={() => setModalAdd(false)}
        puestos={puestos}
        clientes={clientes}
      />

      <ConfirmDeleteDialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, id: null })}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
