import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { PrivateRouter } from "./PrivateRouter";
import AuthContext from "../Context/Auth/AuthContext";
import LoadingComponent from "../Components/Loading/LoadingComponent";
import AdminRoutes from "./AdminRoutes";
import SuperAdminRoutes from "./SuperAdminRoutes";
import InternoRoutes from "./InternoRoutes";
import ExternoRoutes from "./ExternoRoutes";
import GubernamentalRoutes from "./GubernamentalRoutes";
import DistribuidoresRoutes from "./DistribuidoresRoutes";

const AppRouter = () => {
  const { autenticado, usuarioAutenticado, cargando, loginExterno, errorAuth } =
    useContext(AuthContext);

  const location = window.location;
  const params = new URLSearchParams(location.search);
  const numcolaborador = params.get("numcolaborador");
  const [showLoader, setShowLoader] = React.useState(true);

  useEffect(() => {
    if (numcolaborador) {
      loginExterno(numcolaborador);
    } else {
      usuarioAutenticado();
    }
  }, []);

  useEffect(() => {
    if (!cargando) {
      setTimeout(() => setShowLoader(false), 800);
    }
  }, [cargando]);

  if (showLoader) {
    return <LoadingComponent loading={cargando} />;
  }

  if (!autenticado && errorAuth) {
    window.location.href = "https://ldrhsys.ldrhumanresources.com/";
    return null;
  }

  const rolid = localStorage.getItem("rolid");
  let PrivateComponent = null;

  if (rolid === "1" || rolid === "1") PrivateComponent = SuperAdminRoutes;
  if (rolid === "2" || rolid === "2") PrivateComponent = AdminRoutes;
  if (rolid === "3" || rolid === "3") PrivateComponent = InternoRoutes;
  if (rolid === "4" || rolid === "4") PrivateComponent = ExternoRoutes;
  if (rolid === "5" || rolid === "5") PrivateComponent = GubernamentalRoutes;
  if (rolid === "6" || rolid === "6") PrivateComponent = DistribuidoresRoutes;

  return (
    <Router>
      <Routes>
        {autenticado && PrivateComponent && (
          <Route path="/" element={<Navigate to="/Inicio" replace />} />
        )}

        {PrivateComponent && (
          <Route
            path="/*"
            element={
              <PrivateRouter
                component={PrivateComponent}
                isAuthenticated={autenticado}
              />
            }
          />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
