import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
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
      color: "#4F46E5",
      bgIcon: "rgba(79, 70, 229, 0.12)",
      gradient: "linear-gradient(135deg, #4F46E5, #6366F1)",
      link: "/tipo-clientes",
    },
    {
      title: "Clientes Externos",
      subtitle: "Administra los clientes externos.",
      icon: <PublicIcon />,
      color: "#F43F5E",
      bgIcon: "rgba(244, 63, 94, 0.12)",
      gradient: "linear-gradient(135deg, #F43F5E, #FB7185)",
      link: "/tipo-clientes",
    },
    {
      title: "Clientes Gubernamentales",
      subtitle: "Control de clientes del sector público.",
      icon: <AccountBalanceIcon />,
      color: "#0EA5E9",
      bgIcon: "rgba(14, 165, 233, 0.12)",
      gradient: "linear-gradient(135deg, #0EA5E9, #38BDF8)",
      link: "/tipo-clientes",
    },
    {
      title: "Clientes Distribuidores",
      subtitle: "Gestión de clientes distribuidores.",
      icon: <LocalShippingIcon />,
      color: "#9333EA",
      bgIcon: "rgba(147, 51, 234, 0.12)",
      gradient: "linear-gradient(135deg, #9333EA, #A855F7)",
      link: "/tipo-clientes",
    },
  ];

  const nombreCompleto = usuario
    ? [usuario.user.nombres, usuario.user.apellidos].filter(Boolean).join(" ")
    : "";

  const baseCardStyles = {
    width: "100%",
    height: 300,
    borderRadius: 4,
    p: 1,
    cursor: "pointer",
    backdropFilter: "blur(12px) saturate(160%)",
    background: "rgba(255,255,255,0.35)",
    border: "1px solid rgba(255,255,255,0.3)",
    boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.35s ease",
  };

  const motionVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.06, y: -6 },
  };

  return (
    <Layout>
      <Box
        sx={{
          minHeight: "100vh",
          px: 2,
          py: 4,
          background: "linear-gradient(145deg, #eef2f3, #dfe9f3)",

        }}
      >
        <Typography
          align="center"
          fontWeight="bold"
          variant="subtitle1"
          sx={{
            mb: 5,
            color: "#2c3e50",
            fontFamily: "monospace",
          }}
        >
          Hola {saludo}, {nombreCompleto}. <br />
          Bienvenido(a) a la Plataforma de Clientes.
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {cardsData.map((card, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
              display="flex"
              justifyContent="center"
            >
              <Link to={card.link} style={{ textDecoration: "none" }}>
                <Card
                  component={motion.div}
                  variants={motionVariant}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  transition={{ duration: 0.25 }}
                  sx={{
                    ...baseCardStyles,
                    "&:hover": {
                      background: card.gradient,
                      border: "1px solid rgba(255,255,255,0.6)",
                      boxShadow: "0 12px 28px rgba(0,0,0,0.22)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: 2,

                      "& svg": {
                        fontSize: 40,
                        color: card.color,
                        transition: "all 0.35s ease",
                      },

                      "&:hover .iconContainer": {
                        background: "rgba(255,255,255,0.2)",
                        transform: "scale(1.1)",
                      },

                      "&:hover svg": {
                        color: "white",
                      },
                      ".title": {
                        fontWeight: "bold",
                        color: "#1f2937",
                        transition: "all 0.35s ease",
                      },
                      ".subtitle": {
                        color: "#4b5563",
                        transition: "all 0.35s ease",
                      },

                      "&:hover .title, &:hover .subtitle": {
                        color: "white",
                        textShadow: "0 0 4px rgba(0,0,0,0.25)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: card.bgIcon,
                        transition: "all 0.35s ease",
                      }}
                      className="iconContainer"
                    >
                      {card.icon}
                    </Box>

                    <Typography variant="h6" className="title">
                      {card.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      className="subtitle"
                      sx={{ maxWidth: 240 }}
                    >
                      {card.subtitle}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Inicio;
