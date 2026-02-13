import "./App.css";
import AuthState from "./Context/Auth/AuthState";
import ClientesState from "./Context/Clientes/ClientesState";
import GruposState from "./Context/Grupos/GruposState";
import TipoClienteState from "./Context/TipoCliente/TipoClienteState";
import AppRouter from "./Routes/AppRouter";

function AdminApp() {
  return (
    <AuthState>
      <ClientesState>
        <GruposState>
          <TipoClienteState>
            <AppRouter />
          </TipoClienteState>
        </GruposState>
      </ClientesState>
    </AuthState>
  );
}

export default AdminApp;
