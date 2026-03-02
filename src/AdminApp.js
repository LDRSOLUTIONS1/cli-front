import "./App.css";
import AuthState from "./Context/Auth/AuthState";
import ClientesState from "./Context/Clientes/ClientesState";
import GruposState from "./Context/Grupos/GruposState";
import MarcasState from "./Context/Marcas/MarcasState";
import RegionalesState from "./Context/Regionales/RegionalesState";
import TipoClienteState from "./Context/TipoCliente/TipoClienteState";
import ModelosState from "./Context/Modelos/ModelosState";
import ContactosState from "./Context/Contactos/ContactosState";
import PuestosState from "./Context/Puestos/PuestosState";
import DepartamentosState from "./Context/Departamentos/DepartamentosState";
import RegimenesFiscalesState from "./Context/RegimenesFiscales/RegimenesFiscalesState";
import AppRouter from "./Routes/AppRouter";

function AdminApp() {
  return (
    <AuthState>
      <MarcasState>
        <ClientesState>
          <TipoClienteState>
            <GruposState>
              <RegionalesState>
                <ModelosState>
                  <ContactosState>
                    <PuestosState>
                      <DepartamentosState>
                        <RegimenesFiscalesState>
                          <AppRouter />
                        </RegimenesFiscalesState>
                      </DepartamentosState>
                    </PuestosState>
                  </ContactosState>
                </ModelosState>
              </RegionalesState>
            </GruposState>
          </TipoClienteState>
        </ClientesState>
      </MarcasState>
    </AuthState>
  );
}

export default AdminApp;
