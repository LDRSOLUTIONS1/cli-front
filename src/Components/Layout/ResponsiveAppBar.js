import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Drawer,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Divider,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PeopleIcon from "@mui/icons-material/People";
import GroupIcon from "@mui/icons-material/Group";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import Logo from "../Layout/Img/LDR-blanco-Logo.png";
import AuthContext from "../../Context/Auth/AuthContext";

const drawerWidth = 240;
const collapsedWidth = 72;

const MENU_ITEMS = [
  { label: "Inicio", type: "internal", path: "/", icon: HomeIcon },
  { label: "Marcas", type: "internal", path: "/Marcas", icon: LocalOfferIcon },
  { label: "Clientes", type: "internal", path: "/Clientes", icon: PeopleIcon },
  {
    label: "Tipo Clientes",
    type: "internal",
    path: "/Tipo-clientes",
    icon: GroupIcon,
  },
  { label: "Grupos", type: "internal", path: "/Grupos", icon: ApartmentIcon },
  {
    label: "Regionales",
    type: "internal",
    path: "/Regionales",
    icon: ApartmentIcon,
  },
  { label: "Modelos", type: "internal", path: "/Modelos", icon: BusinessIcon },
  {
    label: "Contactos",
    type: "internal",
    path: "/Contactos",
    icon: BusinessIcon,
  },
  { label: "Puestos", type: "internal", path: "/Puestos", icon: BusinessIcon },
  {
    label: "Departamentos",
    type: "internal",
    path: "/Departamentos",
    icon: BusinessIcon,
  },
  {
    label: "LDR Intranet",
    type: "external",
    url: "https://ldrhsys.ldrhumanresources.com/Cliente/interfaces/Inicio.php",
    icon: BusinessIcon,
  },
  {
    label: "Cerrar Sesión",
    type: "action",
    action: "logout",
    icon: LogoutIcon,
  },
];

export default function ResponsiveAppBar() {
  const { cerrarSesion } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(true);

  const handleNavigation = (item) => {
    if (isMobile) setOpen(false);

    if (item.type === "internal") history.push(item.path);
    if (item.type === "external") window.open(item.url, "_blank");
    if (item.type === "action" && item.action === "logout") cerrarSesion();
  };

  const DrawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Toggle button desktop */}
      {!isMobile && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>
      )}

      <Divider />

      <List sx={{ flexGrow: 1 }}>
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <ListItem key={item.label} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => handleNavigation(item)}
                selected={isActive}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  "&.Mui-selected": {
                    backgroundColor: "rgba(4,25,84,0.12)",
                    borderRight: "4px solid #041954",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : "auto",
                    justifyContent: "center",
                    color: isActive ? "#041954" : "inherit",
                  }}
                >
                  <Icon />
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                  sx={{
                    opacity: open ? 1 : 0,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {/* APPBAR */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#041954",
          transition: theme.transitions.create(["margin", "width"]),
          ...(open &&
            !isMobile && {
              width: `calc(100% - ${open ? drawerWidth : collapsedWidth}px)`,
              ml: `${open ? drawerWidth : collapsedWidth}px`,
            }),
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {isMobile && (
            <IconButton color="inherit" onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}

          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <img src={Logo} alt="Logo" style={{ height: 42 }} />
          </Box>
        </Toolbar>
      </AppBar>

      {/* DRAWER */}
      {isMobile ? (
        <SwipeableDrawer
          anchor="left"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        >
          {DrawerContent}
        </SwipeableDrawer>
      ) : (
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            width: open ? drawerWidth : collapsedWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: open ? drawerWidth : collapsedWidth,
              transition: theme.transitions.create("width"),
              overflowX: "hidden",
            },
          }}
        >
          {DrawerContent}
        </Drawer>
      )}
    </>
  );
}
