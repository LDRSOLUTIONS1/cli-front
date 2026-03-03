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
import AuthContext from "../../Context/Auth/AuthContext";
import { useContext, useEffect, useState } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import PublicIcon from "@mui/icons-material/Public";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import TipoClienteContext from "../../Context/TipoCliente/TipoClienteContext";

const Inicio = () => {
  const { tipoClientes, GetTipoClientes } = useContext(TipoClienteContext);
  const { usuario } = useContext(AuthContext);
  const [saludo, setSaludo] = useState("");

  useEffect(() => {
    GetTipoClientes();
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    setSaludo(
      hour < 12 ? "Buenos días" : hour < 18 ? "Buenas tardes" : "Buenas noches",
    );
  }, []);

  const iconMap = {
    "Clientes Internos": <GroupsIcon />,
    "Clientes Externos": <PublicIcon />,
    Gubernamental: <AccountBalanceIcon />,
    Distribuidores: <LocalShippingIcon />,
  };

  const gradientMap = {
    "Clientes Internos": "linear-gradient(135deg, #4F46E5, #6366F1)",
    "Clientes Externos": "linear-gradient(135deg, #F43F5E, #FB7185)",
    "Clientes Gubernamentales": "linear-gradient(135deg, #0EA5E9, #38BDF8)",
    Distribuidores: "linear-gradient(135deg, #9333EA, #A855F7)",
  };
  const nombreCompleto = [usuario?.user?.nombres, usuario?.user?.apellidos]
    .filter(Boolean)
    .join(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
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

  return (
    <Layout>
      <Box
        sx={{
          minHeight: "100vh",
          py: 10,
        }}
      >
        <Container maxWidth="lg">
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
              Selecciona el tipo de cliente para comenzar a gestionar la
              información.
            </Typography>
          </Box>

          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="center"
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {tipoClientes?.map((cliente) => (
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
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
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
                        boxShadow: "0 18px 40px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        height: 6,
                        width: "100%",
                        background:
                          gradientMap[cliente.nombre] ||
                          "linear-gradient(135deg, #6B7280, #9CA3AF)",
                      }}
                    />

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
                      <Box
                        sx={{
                          width: 70,
                          height: 70,
                          borderRadius: "18px",
                          background:
                            gradientMap[cliente.nombre] ||
                            "linear-gradient(135deg, #6B7280, #9CA3AF)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                        }}
                      >
                        {iconMap[cliente.nombre] || <GroupsIcon />}
                      </Box>

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
            ))}
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

export default Inicio;
