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

const Inicio = () => {
  const { usuario } = useContext(AuthContext);
  const [saludo, setSaludo] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    setSaludo(
      hour < 12 ? "Buenos días" : hour < 18 ? "Buenas tardes" : "Buenas noches",
    );
  }, []);

  const cardsData = [
    {
      title: "Clientes Internos",
      subtitle: "Gestiona los clientes internos de la organización.",
      icon: <GroupsIcon />,
      gradient: "linear-gradient(135deg, #4F46E5, #6366F1)",
      link: "/tipo-clientes",
    },
    {
      title: "Clientes Externos",
      subtitle: "Administra los clientes externos.",
      icon: <PublicIcon />,
      gradient: "linear-gradient(135deg, #F43F5E, #FB7185)",
      link: "/tipo-clientes",
    },
    {
      title: "Clientes Gubernamentales",
      subtitle: "Control de clientes del sector público.",
      icon: <AccountBalanceIcon />,
      gradient: "linear-gradient(135deg, #0EA5E9, #38BDF8)",
      link: "/tipo-clientes",
    },
    {
      title: "Clientes Distribuidores",
      subtitle: "Gestión de clientes distribuidores.",
      icon: <LocalShippingIcon />,
      gradient: "linear-gradient(135deg, #9333EA, #A855F7)",
      link: "/tipo-clientes",
    },
  ];

  const nombreCompleto = usuario
    ? [usuario.user.nombres, usuario.user.apellidos].filter(Boolean).join(" ")
    : "";

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
          background:
            "radial-gradient(circle at top left, #e0e7ff, #f8fafc 60%)",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h4"
              fontWeight="700"
              sx={{
                background: "linear-gradient(90deg, #041954)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {saludo}, {nombreCompleto}
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{ color: "text.secondary", mt: 1 }}
            >
              Bienvenido a la Plataforma de Gestión de Clientes
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
            {cardsData.map((card, index) => (
              <Grid
                item
                key={index}
                display="flex"
                justifyContent="center"
                component={motion.div}
                variants={cardVariants}
              >
                <Link to={card.link} style={{ textDecoration: "none" }}>
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
                        background: card.gradient,
                      }}
                    />

                    <CardContent
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 70,
                          height: 70,
                          borderRadius: "18px",
                          background: card.gradient,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                        }}
                      >
                        {card.icon}
                      </Box>

                      <Typography variant="h6" fontWeight="600">
                        {card.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", maxWidth: 220 }}
                      >
                        {card.subtitle}
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
