import React, { useReducer } from "react";
import TipoClienteContext from "./TipoClienteContext";
import TipoClienteReducer from "./TipoClienteReducer";
import MethodGet from "../../Config/Service";
import Swal from "sweetalert2";
import { GET_ALL_TIPO_CLIENTES, OBTENER_TIPO_CLIENTE } from "../../types";

const TipoClienteState = ({ children }) => {
  const initialState = {
    tipoClientes: [],
    tipoCliente: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(TipoClienteReducer, initialState);

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

  const GetTipoClientes = () => {
    MethodGet("/tipos-clientes")
      .then((res) => {
        dispatch({
          type: GET_ALL_TIPO_CLIENTES,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const GetTipoCliente = (id) => {
    MethodGet(`/tipos-clientes/${id}`)
      .then((res) => {
        dispatch({
          type: OBTENER_TIPO_CLIENTE,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  return (
    <TipoClienteContext.Provider
      value={{
        tipoClientes: state.tipoClientes,
        tipoCliente: state.tipoCliente,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetTipoClientes,
        GetTipoCliente,
      }}
    >
      {children}
    </TipoClienteContext.Provider>
  );
};

export default TipoClienteState;



