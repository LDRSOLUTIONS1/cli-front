import React from "react";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import NoResultados from "../Components/Layout/NoResultados";
import Inicio from "../Moduls/Inicio/Inicio";

const AdminRoutes = () => {
  return (
    <Switch>
      <Route exact path="/Inicio" component={Inicio} />

      <Route exact path="/no-resultados" component={NoResultados} />
      <Route component={NoResultados} />
    </Switch>
  );
};

export default AdminRoutes;
