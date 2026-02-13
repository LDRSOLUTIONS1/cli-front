import * as React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import GroupIcon from "@mui/icons-material/Group";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PublicIcon from "@mui/icons-material/Public";
import ContactsIcon from "@mui/icons-material/Contacts";
import BusinessIcon from "@mui/icons-material/Business";
import LogoutIcon from "@mui/icons-material/Logout";

import Logo from "../Layout/Img/LDR-blanco-Logo.png";

const pages = [
  {
    label: "Clientes",
    path: "/clientes",
    icon: <PeopleIcon fontSize="small" />,
  },
  {
    label: "Tipo Clientes",
    path: "/tipo-clientes",
    icon: <GroupIcon fontSize="small" />,
  },
  {
    label: "Grupos",
    path: "/grupos",
    icon: <ApartmentIcon fontSize="small" />,
  },
  {
    label: "Regionales",
    path: "/regionales",
    icon: <PublicIcon fontSize="small" />,
  },
  {
    label: "Contactos",
    path: "/contactos",
    icon: <ContactsIcon fontSize="small" />,
  },
  {
    label: "LDR Intranet",
    path: "/intranet",
    icon: <BusinessIcon fontSize="small" />,
  },
  {
    label: "Cerrar Sesión",
    path: "/cerrar-sesion",
    icon: <LogoutIcon fontSize="small" />,
  },
];

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#041954" }}>
      <Toolbar sx={{ minHeight: 60 }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 1200,
            mx: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", ml: 4 }}>
            <img src={Logo} alt="Logo" style={{ height: 42 }} />
          </Box>

          {/* MENÚ DESKTOP */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              ml: 8,
              gap: 1,
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.label}
                component={Link}
                to={page.path}
                startIcon={page.icon}
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  fontSize: "0.80rem",
                  fontWeight: 400,
                  padding: "6px 10px",
                  "&:hover": {
                    backgroundColor: "rgba(8, 6, 6, 0.12)",
                  },
                }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {/* MENÚ MOBILE */}
          <Box sx={{ display: { xs: "flex", md: "none" }, ml: "auto" }}>
            <IconButton
              color="inherit"
              size="small"
              onClick={(e) => setAnchorElNav(e.currentTarget)}
            >
              <MenuIcon fontSize="small" />
            </IconButton>

            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  component={Link}
                  to={page.path}
                  onClick={() => setAnchorElNav(null)}
                  sx={{ fontSize: "0.85rem" }}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>{page.icon}</ListItemIcon>
                  <ListItemText
                    primary={page.label}
                    primaryTypographyProps={{ fontSize: "0.85rem" }}
                  />
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
