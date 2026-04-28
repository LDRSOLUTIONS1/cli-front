import React from "react";
import { Routes, Route } from "react-router-dom";

import NoResultados from "../Components/Layout/NoResultados";
import Inicio from "../Moduls/Inicio/Inicio";
import TipoClienteTable from "../Components/Tables/TipoClienteTable";
import Clientes from "../Moduls/Clientes/Clientes";

const ConsultorRoutes = () => {
  return (
    <Routes>
      <Route path="/Inicio" element={<Inicio />} />
      <Route path="/Tipo-clientes/:id" element={<TipoClienteTable />} />
      <Route path="/Clientes" element={<Clientes />} />

      <Route path="/no-resultados" element={<NoResultados />} />
      <Route path="*" element={<NoResultados />} />
    </Routes>
  );
};

export default ConsultorRoutes;
