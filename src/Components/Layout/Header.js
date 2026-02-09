import * as React from "react";
import {
  Box,
  SwipeableDrawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Logo from "../Layout/Img/LDR-blanco-Logo.png";
import CategoryIcon from "@mui/icons-material/Category";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import AuthContext from "../../Context/Auth/AuthContext";
import { useContext } from "react";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

export default function Header({ children }) {
  const baseUrl = process.env.REACT_APP_BACKEND_URL.replace(/\/api$/, "");
  const { usuario, cerrarSesion } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const user_type = localStorage.getItem("user_type");

  const Admin = [
    { name: "Inicio", value: "/Inicio", icon: <HomeIcon /> },
    { name: "Categorías", value: "/Categorías", icon: <CategoryIcon /> },
    { name: "Subcategorías", value: "/Subcategorías", icon: <LayersIcon /> },
    { name: "Segmentos", value: "/Segmentos", icon: <ViewModuleIcon /> },
    { name: "Modelos", value: "/Modelos", icon: <DirectionsCarIcon /> },
    {
      name: "Fichas técnicas en desarrollo",
      value: "/fichas-tecnicas-desarrollo",
      icon: <PendingActionsIcon />,
    },
    {
      name: "Fichas técnicas completadas",
      value: "/fichas-tecnicas-completadas",
      icon: <AssignmentTurnedInIcon />,
    },
    {
      name: "Fichas técnicas",
      value: "/Fichas-tecnicas",
      icon: <DescriptionIcon />,
    },
  ];

  const Viewer = [
    { name: "Inicio", value: "/Inicio", icon: <HomeIcon /> },
    {
      name: "Fichas técnicas completadas",
      value: "/fichas-tecnicas-completadas",
      icon: <AssignmentTurnedInIcon />,
    },
    {
      name: "Fichas técnicas",
      value: "/Fichas-tecnicas",
      icon: <DescriptionIcon />,
    },
  ];

  const Director = [
    { name: "Inicio", value: "/Inicio", icon: <HomeIcon /> },
    {
      name: "Fichas técnicas en desarrolo",
      value: "/fichas-tecnicas-desarrollo",
      icon: <PendingActionsIcon />,
    },
    {
      name: "Fichas técnicas completadas",
      value: "/fichas-tecnicas-completadas",
      icon: <AssignmentTurnedInIcon />,
    },
    {
      name: "Fichas técnicas",
      value: "/Fichas-tecnicas",
      icon: <DescriptionIcon />,
    },
  ];

  const Gerente = [
    { name: "Inicio", value: "/Inicio", icon: <HomeIcon /> },
    {
      name: "Fichas técnicas completadas",
      value: "/fichas-tecnicas-completadas",
      icon: <AssignmentTurnedInIcon />,
    },
    {
      name: "Fichas técnicas",
      value: "/Fichas-tecnicas",
      icon: <DescriptionIcon />,
    },
  ];

  const menuItems =
    user_type === "1"
      ? Admin
      : user_type === "2"
        ? Viewer
        : user_type === "3"
          ? Director
          : user_type === "4"
            ? Gerente
            : [];

  const manualUrl =
    user_type === "1"
      ? `${baseUrl}/storage/fichas/ManualesDeUsuario/FichasTécnicasManualdeUsuarioAdministrador.pdf`
      : user_type === "3"
        ? `${baseUrl}/storage/fichas/ManualesDeUsuario/FichasTécnicasManualdeUsuarioDirector.pdf`
        : user_type === "4"
          ? `${baseUrl}/storage/fichas/ManualesDeUsuario/FichasTécnicasManualdeUsuarioGerente.pdf`
          : `${baseUrl}/storage/fichas/ManualesDeUsuario/FichasTécnicasManualdeUsuarioGerente.pdf`;

  const inicial = usuario?.first_name
    ? usuario.first_name.charAt(0).toUpperCase()
    : "U";

  const list = () => (
    <Box
      sx={{
        width: 250,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 3,
          }}
        >
          <Avatar
            src={`https://ldrhsys.ldrhumanresources.com/Cliente/img/avatars/${usuario.url}.png`}
            sx={{
              width: 56,
              height: 56,
              bgcolor: "#041954",
            }}
          >
            {inicial}
          </Avatar>

          <Typography
            variant="subtitle1"
            sx={{ mt: 1, whiteSpace: "pre-line", textAlign: "center" }}
          >
            {`${usuario.first_name ?? ""} ${usuario.middle_name ?? ""}\n${
              usuario.last_name ?? ""
            } ${usuario.second_last_name ?? ""}`}
          </Typography>
        </Box>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton component={Link} to={item.value}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        <Divider />

        <ListItem disablePadding>
          <ListItemButton
            component="a"
            href={manualUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ListItemIcon>
              <PictureAsPdfIcon />
            </ListItemIcon>
            <ListItemText primary="Manual de usuario" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              window.location.href =
                "https://ldrhsys.ldrhumanresources.com/Cliente/interfaces/Inicio.php?resultado=ingreso";
            }}
          >
            <ListItemIcon>
              <KeyboardReturnIcon />
            </ListItemIcon>
            <ListItemText primary="Regresar" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              cerrarSesion();
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Cerrar sesión" sx={{ color: "#000000ff" }} />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ background: "#041954" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            edge="start"
            sx={{
              color: "white",
              transition: "0.2s",
              zIndex: 2,
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={Logo} alt="logo" style={{ width: 60, height: 60 }} />
          </Box>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
