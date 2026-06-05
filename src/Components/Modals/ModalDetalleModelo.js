import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Stack,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { dateFormatter } from "../../utils/dateFormatter";
import { EstadoChip } from "../../utils/EstadoChip";

const ModalDetalleModelo = ({ open, handleClose, modelo }) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  if (!modelo) return null;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          py: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" fontWeight={700}>
            Detalle del Modelo
          </Typography>

          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          px: { xs: 1, sm: 3 },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            minHeight: 48,
            "& .MuiTab-root": {
              minHeight: 48,
              textTransform: "none",
              fontWeight: 600,
            },
          }}
        >
          <Tab label="Información" />
        </Tabs>
      </Box>

      <DialogContent sx={{ p: 4 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <strong>ID:</strong>
                </TableCell>
                <TableCell>{modelo.id}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <strong>Modelo:</strong>
                </TableCell>
                <TableCell>{modelo.nombre}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <strong>Fecha de registro:</strong>
                </TableCell>
                <TableCell>{dateFormatter(modelo.fecha_registro)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <strong>Estado:</strong>
                </TableCell>
                <TableCell>
                  <EstadoChip estado={modelo.estado} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetalleModelo;
