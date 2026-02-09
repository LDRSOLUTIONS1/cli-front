import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  LinearProgress,
  CircularProgress,
  Paper,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function LinearProgressWithLabel({ value }) {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress
        variant="determinate"
        value={value}
        aria-label="Progreso de carga"
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: "#E3F2FD",
          overflow: "hidden",
          "& .MuiLinearProgress-bar": {
            borderRadius: 5,
            background:
              value < 100
                ? "linear-gradient(90deg, #1976D2, #42A5F5, #041954)"
                : "linear-gradient(90deg, #041954, #041954)",
            transition: "all .6s ease",
          },
        }}
      />

      <Typography
        variant="body2"
        sx={{
          mt: 1,
          fontWeight: 600,
          textAlign: "center",
          color: value < 100 ? "text.secondary" : "success.main",
        }}
      >
        {Math.round(value)}%
      </Typography>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function LoadingComponent({ loading }) {
  const [progress, setProgress] = React.useState(0);
  const [showSuccess, setShowSuccess] = React.useState(false);

  React.useEffect(() => {
    if (!loading) return;

    const timer = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 6, 90));
    }, 250);

    return () => clearInterval(timer);
  }, [loading]);

  React.useEffect(() => {
    if (!loading) {
      setProgress(100);

      const successTimer = setTimeout(() => {
        setShowSuccess(true);
      }, 300);

      return () => clearTimeout(successTimer);
    }
  }, [loading]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #E3F2FD, #041954)",
      }}
    >
      <Paper
        sx={{
          p: 4,
          width: 320,
          textAlign: "center",
          borderRadius: 4,
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,.85)",
        }}
      >
        {!showSuccess ? (
          <CircularProgress
            size={72}
            variant="determinate"
            value={progress}
            sx={{
              mb: 2,
              color: "#041954",
              filter: "drop-shadow(0 0 8px rgba(25,118,210,.4))",
            }}
          />
        ) : (
          <CheckCircleIcon
            sx={{
              fontSize: 72,
              color: "#041954",
              mb: 2,
              animation: "pop .4s ease",
            }}
          />
        )}

        <Typography
          sx={{
            mb: 2,
            fontWeight: 600,
            color: showSuccess ? "#041954" : "text.primary",
          }}
        >
          {showSuccess ? "¡Todo listo!" : "Cargando información…"}
        </Typography>

        <LinearProgressWithLabel value={progress} />
      </Paper>
    </Box>
  );
}
