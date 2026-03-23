import React from "react";
import { Routes, Route } from "react-router-dom";

import NoResultados from "../Components/Layout/NoResultados";
import Inicio from "../Moduls/Inicio/Inicio";
import Clientes from "../Moduls/Clientes/Clientes";
import FormClientes from "../Moduls/Clientes/FormClientes";
import TipoClienteTable from "../Components/Tables/TipoClienteTable";

const GubernamentalRoutes = () => {
  return (
    <Routes>
      <Route path="/Inicio" element={<Inicio />} />
      <Route path="/Clientes" element={<Clientes />} />
      <Route path="/Alta-clientes" element={<FormClientes />} />
      <Route path="/Edicion-clientes/:id" element={<FormClientes />} />
      <Route path="/Tipo-clientes/:id" element={<TipoClienteTable />} />

      <Route path="/no-resultados" element={<NoResultados />} />
      <Route path="*" element={<NoResultados />} />
    </Routes>
  );
};

export default GubernamentalRoutes;
