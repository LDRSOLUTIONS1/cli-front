import React, { useContext, useMemo } from "react";
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
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { Tooltip, Divider, Grid } from "@mui/material";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { createTheme } from "@mui/material/styles";
import AuthContext from "../../Context/Auth/AuthContext";
import LogoDinamico from "./LogoDinamico";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
});

const MODULOS = [
  {
    id: 1,
    segment: "Inicio",
    title: "Inicio",
    icon: <DashboardIcon />,
  },
  {
    id: 2,
    segment: "Marcas",
    title: "Marcas",
    icon: <StorefrontIcon />,
  },
  {
    id: 3,
    title: "Clientes",
    icon: <PeopleIcon />,
    children: [
      {
        id: 31,
        segment: "Clientes",
        title: "Lista de Clientes",
        icon: <ContactPhoneIcon />,
      },
      {
        id: 32,
        segment: "Tipo-clientes",
        title: "Tipo Clientes",
        icon: <CategoryIcon />,
      },
      {
        id: 33,
        segment: "Grupos",
        title: "Grupos",
        icon: <GroupsIcon />,
      },
      {
        id: 34,
        segment: "Regionales",
        title: "Regionales",
        icon: <PublicIcon />,
      },
      {
        id: 35,
        segment: "Modelos",
        title: "Modelos",
        icon: <PrecisionManufacturingIcon />,
      },
    ],
  },
  {
    id: 4,
    segment: "Contactos",
    title: "Lista de Contactos",
    icon: <ContactPhoneIcon />,
  },
  {
    id: 5,
    segment: "Puestos",
    title: "Puestos",
    icon: <BadgeIcon />,
  },
  {
    id: 6,
    segment: "Departamentos",
    title: "Departamentos",
    icon: <ApartmentIcon />,
  },
  {
    id: 7,
    segment: "Usuarios",
    title: "Usuarios",
    icon: <GroupsIcon />,
  },
];

const PERMISOS_POR_ROL = {
  1: [1, 2, 3, 31, 32, 33, 34, 35, 4, 5, 6, 7], // SUPER ADMIN
  2: [1, 2, 3, 31, 32, 33, 34, 35, 4, 5, 6], // ADMIN
  3: [1], // INTERNO
  4: [2], // EXTERNO
  5: [1, 3, 31, 35, 4, 5, 6], // GUBERNAMENTAL
  6: [1, 3, 31, 33, 34, 35, 4, 5, 6], // DISTRIBUIDOR
};

const construirMenu = (rolid) => {
  const permisos = PERMISOS_POR_ROL[rolid] || [];

  return MODULOS.filter((modulo) => permisos.includes(modulo.id))
    .map((modulo) => {
      if (!modulo.children) return modulo;

      const childrenFiltrados = modulo.children.filter((child) =>
        permisos.includes(child.id),
      );

      if (childrenFiltrados.length === 0) return null;

      return {
        ...modulo,
        children: childrenFiltrados,
      };
    })
    .filter(Boolean);
};

export default function Header({ children }) {
  const { cerrarSesion } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const router = useMemo(
    () => ({
      pathname: location.pathname,
      navigate: (path) => navigate(path),
    }),
    [location.pathname, navigate],
  );

  const rolid = Number(localStorage.getItem("rolid"));

  const menuItems = useMemo(() => {
    return construirMenu(rolid);
  }, [rolid]);

  return (
    <AppProvider
      navigation={menuItems}
      router={router}
      theme={theme}
      branding={{
        logo: <LogoDinamico />,
        title: "",
      }}
    >
      <DashboardLayout
        defaultSidebarCollapsed
        initialExpandedItems={[]}
        slots={{
          sidebarFooter: () => (
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Divider />
              <Tooltip title="Volver a la intranet">
                <KeyboardReturnIcon
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    window.location.replace(
                      "https://ldrhsys.ldrhumanresources.com/Cliente/interfaces/Inicio.php",
                    )
                  }
                />
              </Tooltip>

              <Tooltip title="Cerrar sesión">
                <LogoutIcon
                  style={{ cursor: "pointer" }}
                  onClick={cerrarSesion}
                />
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
