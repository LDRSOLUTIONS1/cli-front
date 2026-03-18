import React from "react";
import { Routes, Route } from "react-router-dom";

import NoResultados from "../Components/Layout/NoResultados";
import Inicio from "../Moduls/Inicio/Inicio";
import Clientes from "../Moduls/Clientes/Clientes";
import FormClientes from "../Moduls/Clientes/FormClientes";
import TipoCliente from "../Moduls/TipoCliente/TipoCliente";
import Grupos from "../Moduls/Grupos/Grupos";
import Marcas from "../Moduls/Marcas/Marcas";
import Regionales from "../Moduls/Regionales/Regionales";
import Modelos from "../Moduls/Modelos/Modelos";
import Contactos from "../Moduls/Contactos/Contactos";
import Puestos from "../Moduls/Puestos/Puestos";
import Departamentos from "../Moduls/Departamentos/Departamentos";
import TipoClienteTable from "../Components/Tables/TipoClienteTable";
import Usuarios from "../Moduls/Usuarios/Usuarios";

const SuperAdminRoutes = () => {
  return (
    <Routes>
      <Route path="/Inicio" element={<Inicio />} />
      <Route path="/Marcas" element={<Marcas />} />
      <Route path="/Clientes" element={<Clientes />} />
      <Route path="/Alta-clientes" element={<FormClientes />} />
      <Route path="/Edicion-clientes/:id" element={<FormClientes />} />
      <Route path="/Tipo-clientes" element={<TipoCliente />} />
      <Route path="/Tipo-clientes/:id" element={<TipoClienteTable />} />
      <Route path="/Grupos" element={<Grupos />} />
      <Route path="/Regionales" element={<Regionales />} />
      <Route path="/Modelos" element={<Modelos />} />
      <Route path="/Contactos" element={<Contactos />} />
      <Route path="/Puestos" element={<Puestos />} />
      <Route path="/Departamentos" element={<Departamentos />} />
      <Route path="/Usuarios" element={<Usuarios />} />

      <Route path="/no-resultados" element={<NoResultados />} />
      <Route path="*" element={<NoResultados />} />
    </Routes>
  );
};

export default SuperAdminRoutes;
