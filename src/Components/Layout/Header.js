import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import GroupsIcon from "@mui/icons-material/Groups";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PublicIcon from "@mui/icons-material/Public";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import BadgeIcon from "@mui/icons-material/Badge";
import ApartmentIcon from "@mui/icons-material/Apartment";

import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { createTheme } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

import { Tooltip, Divider, Grid } from "@mui/material";
import AuthContext from "../../Context/Auth/AuthContext";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
});

const NAVIGATION = [
  { segment: "Inicio", title: "Inicio", icon: <DashboardIcon /> },

  { segment: "Marcas", title: "Marcas", icon: <StorefrontIcon /> },

  {
    segment: "",
    title: "Clientes",
    icon: <PeopleIcon />,

    children: [
      {
        segment: "Clientes",
        title: "Lista de Clientes",
        icon: <ContactPhoneIcon />,
      },
      {
        segment: "Tipo-clientes",
        title: "Tipo Clientes",
        icon: <CategoryIcon />,
      },

      { segment: "Grupos", title: "Grupos", icon: <GroupsIcon /> },

      { segment: "Regionales", title: "Regionales", icon: <PublicIcon /> },

      {
        segment: "Modelos",
        title: "Modelos",
        icon: <PrecisionManufacturingIcon />,
      },
    ],
  },
  {
    segment: "Contactos",
    title: "Lista de Contactos",
    icon: <ContactPhoneIcon />,
  },
  {
    segment: "Puestos",
    title: "Puestos",
    icon: <BadgeIcon />,
  },
  {
    segment: "Departamentos",
    title: "Departamentos",
    icon: <ApartmentIcon />,
  },
];
export default function Header({ children }) {
  const { cerrarSesion } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const router = React.useMemo(
    () => ({
      pathname: location.pathname,
      navigate: (path) => navigate(path),
    }),
    [location, navigate],
  );

  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={theme}>
      <DashboardLayout
        defaultSidebarCollapsed
        initialExpandedItems={[]}
        slots={{
          sidebarFooter: () => (
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Divider />
              <Tooltip title="Volver a la intranet">
                <KeyboardReturnIcon
                  onClick={() =>
                    window.location.replace(
                      "https://ldrhsys.ldrhumanresources.com/Cliente/interfaces/Inicio.php",
                    )
                  }
                />
              </Tooltip>
              <Tooltip title="Cerrar sesión">
                <LogoutIcon onClick={cerrarSesion} />
              </Tooltip>
            </Grid>
          ),
        }}
      >
        {children}
      </DashboardLayout>
    </AppProvider>
  );
}
