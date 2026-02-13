import React from "react";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import NoResultados from "../Components/Layout/NoResultados";
import Inicio from "../Moduls/Inicio/Inicio";
import Clientes from "../Moduls/Clientes/Clientes";
import TipoCliente from "../Moduls/TipoCliente/TipoCliente";
import Grupos from "../Moduls/Grupos/Grupos";
import Regionales from "../Moduls/Regionales/Regionales";
import Contactos from "../Moduls/Contactos/Contactos";

const AdminRoutes = () => {
  return (
    <Switch>
      <Route exact path="/Inicio" component={Inicio} />
      <Route exact path="/clientes" component={Clientes} />
      <Route exact path="/tipo-clientes" component={TipoCliente} />
      <Route exact path="/grupos" component={Grupos} />
      <Route exact path="/regionales" component={Regionales} />
      <Route exact path="/contactos" component={Contactos} />
      <Route exact path="/no-resultados" component={NoResultados} />
      <Route component={NoResultados} />
    </Switch>
  );
};

export default AdminRoutes;
