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
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { createTheme } from "@mui/material/styles";
import AuthContext from "../../Context/Auth/AuthContext";
import LogoDinamico from "./LogoDinamico";
import { tienePermisoMenu } from "../../utils/roles";
import MenuBookIcon from "@mui/icons-material/MenuBook";

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

const construirMenu = (rolid) => {
  return MODULOS.map((modulo) => {
    if (!tienePermisoMenu(rolid, modulo.id)) return null;
    if (!modulo.children) return modulo;

    const childrenFiltrados = modulo.children.filter((child) =>
      tienePermisoMenu(rolid, child.id),
    );

    if (childrenFiltrados.length === 0) return null;

    return {
      ...modulo,
      children: childrenFiltrados,
    };
  }).filter(Boolean);
};

export default function Header({ children }) {
  const { cerrarSesion } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const router = useMemo(
    () => ({
      pathname: location.pathname,

      navigate: (path) => {
        if (path === "/volver-intranet") {
          window.location.href =
            "https://ldrhsys.ldrhumanresources.com/Cliente/interfaces/Inicio.php";
          return;
        }

        if (path === "/cerrar-sesion") {
          cerrarSesion();
          return;
        }

        if (path === "/manual-usuario") {
          window.open("https://tu-link-del-manual.com", "_blank"); 
          return;
        }

        navigate(path);
      },
    }),
    [location.pathname, navigate, cerrarSesion],
  );

  const rolid = Number(localStorage.getItem("rolid"));

  const menuItems = useMemo(() => {
    const baseMenu = construirMenu(rolid);

    return [
      ...baseMenu,
      { kind: "divider" },

      {
        segment: "volver-intranet",
        title: "Volver a la intranet",
        icon: <KeyboardReturnIcon />,
      },
      {
        segment: "manual-usuario",
        title: "Manual de usuario",
        icon: <MenuBookIcon />,
      },

      {
        segment: "cerrar-sesion",
        title: "Cerrar sesión",
        icon: <LogoutIcon />,
      },
    ];
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
      <DashboardLayout defaultSidebarCollapsed initialExpandedItems={[]}>
        {children}
      </DashboardLayout>
    </AppProvider>
  );
}
