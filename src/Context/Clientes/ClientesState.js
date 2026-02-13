import React, { useReducer } from "react";
import ClientesContext from "./ClientesContext";
import ClientesReducer from "./ClientesReducer";
import MethodGet from "../../Config/Service";
import Swal from "sweetalert2";
import { GET_ALL_CLIENTES } from "../../types";

const ClientesState = ({ children }) => {
  const initialState = {
    clientes: [],
    cliente: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(ClientesReducer, initialState);

  const handleError = (error) => {
    const data = error.response?.data;

    if (data?.errors) {
      const mensajes = Object.values(data.errors).flat().join("\n");
      Swal.fire({
        title: "Error de validación",
        icon: "warning",
        text: mensajes,
      });
    } else if (data?.mensaje) {
      Swal.fire({
        title: data.error || "Error",
        icon: "error",
        text: data.mensaje,
      });
    } else {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Ocurrió un error inesperado",
      });
    }
  };

  const GetClientes = () => {
    MethodGet("/clientes")
      .then((res) => {
        dispatch({
          type: GET_ALL_CLIENTES,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  return (
    <ClientesContext.Provider
      value={{
        clientes: state.clientes,
        cliente: state.cliente,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetClientes,
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};

export default ClientesState;
