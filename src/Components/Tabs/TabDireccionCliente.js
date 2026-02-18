import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const TabDireccionCliente = ({ direccion }) => {
  if (!direccion || direccion.length === 0) {
    return (
      <Typography variant="h6">
        No hay información de dirección disponible
      </Typography>
    );
  }

  const dir = direccion[0];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <strong>Tipo</strong>
            </TableCell>
            <TableCell>{dir.tipo}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>Calle</strong>
            </TableCell>
            <TableCell>{dir.calle}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>Número Exterior</strong>
            </TableCell>
            <TableCell>{dir.numero_ext}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>Número Interior</strong>
            </TableCell>
            <TableCell>{dir.numero_int}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>Colonia</strong>
            </TableCell>
            <TableCell>{dir.colonia}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>Código Postal</strong>
            </TableCell>
            <TableCell>{dir.codigo_postal}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>País</strong>
            </TableCell>
            <TableCell>{dir.pais?.nombre}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>Estado</strong>
            </TableCell>
            <TableCell>{dir.estado?.nombre}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>Municipio</strong>
            </TableCell>
            <TableCell>{dir.municipio?.nombre}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>Región</strong>
            </TableCell>
            <TableCell>{dir.estado?.region?.nombre}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TabDireccionCliente;
