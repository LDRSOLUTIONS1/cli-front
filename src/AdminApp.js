import "./App.css";
import AuthState from "./Context/Auth/AuthState";
import ClientesState from "./Context/Clientes/ClientesState";
import GruposState from "./Context/Grupos/GruposState";
import MarcasState from "./Context/Marcas/MarcasState";
import RegionalesState from "./Context/Regionales/RegionalesState";
import TipoClienteState from "./Context/TipoCliente/TipoClienteState";
import PuestosState from "./Context/Puestos/PuestosState";
import DepartamentosState from "./Context/Departamentos/DepartamentosState";
import AppRouter from "./Routes/AppRouter";

function AdminApp() {
  return (
    <AuthState>
      <ClientesState>
        <GruposState>
          <TipoClienteState>
            <MarcasState>
              <RegionalesState>
                <PuestosState>
                  <DepartamentosState>
                    <AppRouter />
                  </DepartamentosState>
                </PuestosState>
              </RegionalesState>
            </MarcasState>
          </TipoClienteState>
        </GruposState>
      </ClientesState>
    </AuthState>
  );
}

export default AdminApp;
