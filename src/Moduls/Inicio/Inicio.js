import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Container,
} from "@mui/material";
import Layout from "../../Components/Layout/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../Context/Auth/AuthContext";
import TipoClienteContext from "../../Context/TipoCliente/TipoClienteContext";
import GroupsIcon from "@mui/icons-material/Groups";
import PublicIcon from "@mui/icons-material/Public";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { getRolNombre, tienePermisoCard } from "../../utils/roles";
import GraficasContext from "../../Context/Graficas/GraficasContext";
import Graficas from "../../Components/Graficas/Graficas";

const CLIENTE_CONFIG = {
  1: {
    icon: <GroupsIcon />,
    gradient: "linear-gradient(135deg, #4F46E5, #6366F1)",
  },
  2: {
    icon: <PublicIcon />,
    gradient: "linear-gradient(135deg, #F43F5E, #FB7185)",
  },
  3: {
    icon: <AccountBalanceIcon />,
    gradient: "linear-gradient(135deg, #0EA5E9, #38BDF8)",
  },
  4: {
    icon: <LocalShippingIcon />,
    gradient: "linear-gradient(135deg, #9333EA, #A855F7)",
  },
};

const DEFAULT_CONFIG = {
  icon: <GroupsIcon />,
  gradient: "linear-gradient(135deg, #6B7280, #9CA3AF)",
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.8, 0.25, 1],
    },
  },
};

const getSaludo = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Buenos días";
  if (hour < 18) return "Buenas tardes";
  return "Buenas noches";
};

const getNombreCompleto = (usuario) =>
  [usuario?.user?.nombres, usuario?.user?.apellidos].filter(Boolean).join(" ");

const getClienteConfig = (id) => CLIENTE_CONFIG[id] || DEFAULT_CONFIG;

const Inicio = () => {
  const { tipoClientes, GetTipoClientes } = useContext(TipoClienteContext);
  const { usuario } = useContext(AuthContext);
  const rolid = Number(localStorage.getItem("rolid"));
  const { CountTipoClientes } = useContext(GraficasContext);
  const [saludo, setSaludo] = useState("");

  useEffect(() => {
    GetTipoClientes();
    CountTipoClientes();
    setSaludo(getSaludo());
  }, []);

  const nombreCompleto = getNombreCompleto(usuario);

  return (
    <Layout>
      <Box sx={{ minHeight: "100vh", py: 10 }}>
        <Container maxWidth="lg">
          {/* HEADER */}
          <Box textAlign="center" mb={6}>
            <Typography variant="h4" fontWeight="700">
              Hola, {saludo}, {nombreCompleto}.
              <br />
              Bienvenido a la Plataforma de Gestión de Clientes.
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{ color: "text.secondary", mt: 1 }}
            >
              Soy tipo de usuario {getRolNombre(rolid)}
            </Typography>
          </Box>

          {/* GRID */}
          <Grid
            container
            spacing={4}
            justifyContent="center"
            x
            alignItems="center"
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {tipoClientes
              .filter((cliente) => tienePermisoCard(rolid, cliente.id))
              .map((cliente) => {
                const { icon, gradient } = getClienteConfig(cliente.id);

                return (
                  <Grid
                    item
                    key={cliente.id}
                    display="flex"
                    justifyContent="center"
                    component={motion.div}
                    variants={cardVariants}
                  >
                    <Link
                      to={`/tipo-clientes/${cliente.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card
                        sx={{
                          width: 260,
                          height: 260,
                          borderRadius: 4,
                          background: "rgba(255,255,255,0.6)",
                          backdropFilter: "blur(16px)",
                          border: "1px solid rgba(255,255,255,0.4)",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                          display: "flex",
                          flexDirection: "column",
                          overflow: "hidden",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-8px)",
                            boxShadow: "0 18px 40px rgba(0,0,0,0.15)",
                          },
                        }}
                      >
                        {/* TOP BAR */}
                        <Box
                          sx={{
                            height: 6,
                            width: "100%",
                            background: gradient,
                          }}
                        />

                        {/* CONTENT */}
                        <CardContent
                          sx={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            justifyContent: "flex-start",
                            gap: 2,
                            pt: 5,
                          }}
                        >
                          {/* ICON */}
                          <Box
                            sx={{
                              width: 70,
                              height: 70,
                              borderRadius: "18px",
                              background: gradient,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                            }}
                          >
                            {icon}
                          </Box>

                          {/* TITLE */}
                          <Typography
                            variant="h6"
                            fontWeight="600"
                            sx={{
                              minHeight: 56,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {cliente.nombre}
                          </Typography>

                          {/* DESCRIPTION */}
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary", maxWidth: 220 }}
                          >
                            {cliente.descripcion}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                );
              })}
          </Grid>
          <Graficas />
        </Container>
      </Box>
    </Layout>
  );
};

export default Inicio;
