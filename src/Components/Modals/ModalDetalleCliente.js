import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Box,
  Stack,
  useTheme,
  Tabs,
  Tab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import TabInformacionCliente from "../Tabs/TabInformacionCliente";
import TabDireccionCliente from "../Tabs/TabDireccionCliente";
import TabDireccionFiscalCliente from "../Tabs/TabDireccionFiscalCliente";
import TabContactosCliente from "../Tabs/TabContactosCliente";
import TabModelosCliente from "../Tabs/TabModelosCliente";
import TabRegionalesCliente from "../Tabs/TabRegionalesCliente";
import TabSucursalesCliente from "../Tabs/TabSucursalesCliente";

const ModalDetalleCliente = ({ modal, handleClose, cliente }) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  if (!cliente) return null;

  const direccion = cliente.direcciones || {};
  const direccionFiscal = cliente.direcciones_fiscales || {};
  const contactos = cliente.contactos || [];
  const modelos = cliente.modelos || [];
  const regionales = cliente.regionales || [];
  const sucursales = cliente.sucursales || [];
  const conteoSucursales = sucursales.length;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog
      open={modal}
      onClose={handleClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: "#fff",
          py: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" fontWeight={700}>
            Detalle del cliente
          </Typography>

          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          px: { xs: 1, sm: 3 },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            minHeight: 48,
            "& .MuiTab-root": {
              minHeight: 48,
              textTransform: "none",
              fontWeight: 600,
            },
          }}
        >
          <Tab label="Información" />
          <Tab label="Dirección" />
          <Tab label="Dirección Fiscal" />
          <Tab label="Contactos" />
          <Tab label="Modelos" />
          <Tab label="Regionales" />
          {conteoSucursales > 0 && <Tab label="Sucursales" />}
        </Tabs>
      </Box>

      <DialogContent sx={{ p: 4 }}>
        {value === 0 && <TabInformacionCliente cliente={cliente} />}
        {value === 1 && <TabDireccionCliente direccion={direccion} />}
        {value === 2 && (
          <TabDireccionFiscalCliente direccionFiscal={direccionFiscal} />
        )}
        {value === 3 && <TabContactosCliente contactos={contactos} />}
        {value === 4 && <TabModelosCliente modelos={modelos} />}
        {value === 5 && <TabRegionalesCliente regionales={regionales} />}
        {value === 6 && conteoSucursales > 0 && (
          <TabSucursalesCliente sucursales={sucursales} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetalleCliente;
