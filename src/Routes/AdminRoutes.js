import React from "react";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import NoResultados from "../Components/Layout/NoResultados";
import Inicio from "../Moduls/Inicio/Inicio";
import Clientes from "../Moduls/Clientes/Clientes";
import TipoCliente from "../Moduls/TipoCliente/TipoCliente";
import Grupos from "../Moduls/Grupos/Grupos";

const AdminRoutes = () => {
  return (
    <Switch>
      <Route exact path="/Inicio" component={Inicio} />
      <Route exact path="/Clientes" component={Clientes} />
      <Route exact path="/Tipo-clientes" component={TipoCliente} />
      <Route exact path="/Grupos" component={Grupos} />
      <Route exact path="/no-resultados" component={NoResultados} />
      <Route component={NoResultados} />
    </Switch>
  );
};

export default AdminRoutes;
