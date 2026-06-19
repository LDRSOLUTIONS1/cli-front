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
import TabDocumentosCliente from "../Tabs/TabDocumentosCliente";

const ModalDetalleCliente = ({ modal, handleClose, cliente }) => {
  const rolid = Number(localStorage.getItem("rolid"));
  const theme = useTheme();
  const [value, setValue] = useState(0);

  if (!cliente) return null;

  const direccion = cliente.direcciones || {};
  const direccionFiscal = cliente.direcciones_fiscales || {};
  const contactos = cliente.contactos || [];
  const modelos = cliente.modelos || [];
  const regionales = cliente.regionales || [];
  const sucursales = cliente.sucursales || [];

  const tipoCliente = Number(cliente.tipo_cliente_id);
  const tieneContactos = tipoCliente !== 3;

  const handleChange = (_, newValue) => setValue(newValue);

  const tabsConfig = [
    {
      label: "Información",
      component: <TabInformacionCliente cliente={cliente} />,
      visible: true,
    },
    {
      label: "Dirección",
      component: <TabDireccionCliente direccion={direccion} />,
      visible: true,
    },
    {
      label: "Dirección Fiscal",
      component: (
        <TabDireccionFiscalCliente direccionFiscal={direccionFiscal} />
      ),
      visible: rolid !== 7,
    },
    {
      label: "Contactos",
      component: <TabContactosCliente contactos={contactos} />,
      visible: rolid !== 7 && tieneContactos,
    },
    {
      label: "Modelos",
      component: <TabModelosCliente modelos={modelos} />,
      visible: rolid !== 7 && tieneContactos,
    },
    {
      label: "Regionales",
      component: <TabRegionalesCliente regionales={regionales} />,
      visible: rolid !== 7 && tieneContactos,
    },
    {
      label: "Sucursales",
      component: <TabSucursalesCliente sucursales={sucursales} />,
      visible: rolid !== 7 && sucursales.length > 0,
    },
    {
      label: "Documentos",
      component: <TabDocumentosCliente cliente={cliente} />,
      visible: tipoCliente === 3,
    },
  ];

  const visibleTabs = tabsConfig.filter((tab) => tab.visible);

  return (
    <Dialog open={modal} onClose={handleClose} maxWidth="xl" fullWidth>
      <DialogTitle
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          py: 2,
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" fontWeight={700}>
            Detalle del cliente
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <Box sx={{ borderBottom: 1, borderColor: "divider", px: 3 }}>
        <Tabs value={value} onChange={handleChange} variant="scrollable">
          {visibleTabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
      </Box>

      <DialogContent sx={{ p: 4 }}>
        {visibleTabs[value]?.component}
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetalleCliente;
