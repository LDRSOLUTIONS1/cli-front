import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import React from "react";
import { dateFormatter } from "../../utils/dateFormatter";

const TabInformacionCliente = ({ cliente }) => {
  if (!cliente) return null;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <strong>Tipo de cliente</strong>
            </TableCell>
            <TableCell>{cliente.tipo_cliente?.nombre}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>Tipo de persona</strong>
            </TableCell>
            <TableCell>
              {cliente.tipo_persona === "1" ? "Física" : "Moral"}
            </TableCell>
          </TableRow>

          {cliente.tipo_persona === 1 && (
            <>
              <TableRow>
                <TableCell>
                  <strong>Nombre</strong>
                </TableCell>
                <TableCell>{cliente.nombre_fisica}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Apellido paterno</strong>
                </TableCell>
                <TableCell>{cliente.apellido_paterno}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Apellido materno</strong>
                </TableCell>
                <TableCell>{cliente.apellido_materno}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Fecha de nacimiento</strong>
                </TableCell>
                <TableCell>{cliente.fecha_nacimiento}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Curp</strong>
                </TableCell>
                <TableCell>{cliente.curp}</TableCell>
              </TableRow>
            </>
          )}

          {cliente.tipo_persona === 2 && (
            <>
              <TableRow>
                <TableCell>
                  <strong>Representante legal</strong>
                </TableCell>
                <TableCell>{cliente.representante_legal}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Domicilio fiscal</strong>
                </TableCell>
                <TableCell>{cliente.domicilio_fiscal}</TableCell>
              </TableRow>
            </>
          )}

          <TableRow>
            <TableCell>
              <strong>Correo electrónico</strong>
            </TableCell>
            <TableCell>{cliente.correo}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>Grupo</strong>
            </TableCell>
            <TableCell>{cliente.grupo?.nombre}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>Nombre comercial</strong>
            </TableCell>
            <TableCell>{cliente.nombre_comercial}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>Razón social</strong>
            </TableCell>
            <TableCell>{cliente.razon_social}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>RFC</strong>
            </TableCell>
            <TableCell>{cliente.rfc}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>REPUVE</strong>
            </TableCell>
            <TableCell>{cliente.repve}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>Plaza</strong>
            </TableCell>
            <TableCell>{cliente.plaza}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>Clasificación</strong>
            </TableCell>
            <TableCell>{cliente.clasificacion}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>Tipo de negocio</strong>
            </TableCell>
            <TableCell>{cliente.tipo_negocio}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>Matriz</strong>
            </TableCell>
            <TableCell>
              {cliente.matriz
                ? `${cliente.matriz.nombre_comercial ?? ""}${
                    cliente.matriz.razon_social
                      ? ` (${cliente.matriz.razon_social})`
                      : ""
                  }`
                : "Es matriz"}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>Teléfono</strong>
            </TableCell>
            <TableCell>{cliente.telefono}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>Teléfono alternativo</strong>
            </TableCell>
            <TableCell>{cliente.telefono_alt}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>Fecha de registro</strong>
            </TableCell>
            <TableCell>{dateFormatter(cliente.fecha_registro)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>Estatus</strong>
            </TableCell>
            <TableCell>{cliente.estatus}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TabInformacionCliente;
