import React, { useContext, useState, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
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
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import LogoutIcon from "@mui/icons-material/Logout";

import Logo from "../Layout/Img/LDR-blanco-Logo.png";
import AuthContext from "../../Context/Auth/AuthContext";

const navigation = [
  { label: "Inicio", path: "/", icon: <HomeIcon fontSize="small" /> },
  {
    label: "Clientes",
    path: "/Clientes",
    icon: <PeopleIcon fontSize="small" />,
  },
  {
    label: "Tipo Clientes",
    path: "/Tipo-clientes",
    icon: <GroupIcon fontSize="small" />,
  },
  {
    label: "Grupos",
    path: "/Grupos",
    icon: <ApartmentIcon fontSize="small" />,
  },
  {
    label: "LDR Intranet",
    external:
      "https://ldrhsys.ldrhumanresources.com/Cliente/interfaces/Inicio.php",
    icon: <BusinessIcon fontSize="small" />,
  },
  {
    label: "Cerrar Sesión",
    action: "logout",
    icon: <LogoutIcon fontSize="small" />,
  },
];

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { cerrarSesion } = useContext(AuthContext);
  const history = useHistory();

  const handleCloseMenu = () => setAnchorElNav(null);

  const handleItemClick = useCallback(
    (item) => {
      handleCloseMenu();

      if (item.action === "logout") {
        cerrarSesion();
        return;
      }

      if (item.external) {
        window.location.href = item.external;
        return;
      }

      if (item.path) {
        history.push(item.path);
      }
    },
    [cerrarSesion, history],
  );

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
          {/* Logo */}
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
            {navigation.map((item) => (
              <Button
                key={item.label}
                onClick={() => handleItemClick(item)}
                startIcon={item.icon}
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  fontSize: "0.85rem",
                  fontWeight: 400,
                  px: 1.5,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                {item.label}
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
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {navigation.map((item) => (
                <MenuItem
                  key={item.label}
                  onClick={() => handleItemClick(item)}
                  sx={{ fontSize: "0.85rem" }}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.label}
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
