import { Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import BuildIcon from "@mui/icons-material/Build";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const estadoConfig = {
  Activo: {
    label: "Activo",
    color: "success",
    icon: <CheckCircleIcon />,
  },
  Inactivo: {
    label: "Inactivo",
    color: "error",
    icon: <CancelIcon />,
  },
  Desarrollo: {
    label: "En desarrollo",
    color: "warning",
    icon: <BuildIcon />,
  },
  "Stand By": {
    label: "Stand By",
    color: "info",
    icon: <PauseCircleIcon />,
  },
};

export const EstatusCliente = ({ estado }) => {
  const config = estadoConfig[estado] || {
    label: "Desconocido",
    color: "default",
    icon: <HelpOutlineIcon />,
  };

  return (
    <Chip
      label={config.label}
      color={config.color}
      icon={config.icon}
      size="small"
      variant="outlined"
    />
  );
};
