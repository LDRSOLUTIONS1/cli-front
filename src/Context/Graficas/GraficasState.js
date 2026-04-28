import React, { useReducer } from "react";
import GraficasContext from "./GraficasContext";
import GraficasReducer from "./GraficasReducer";
import MethodGet from "../../Config/Service";
import {
  GET_COUNT_TIPO_CLIENTES,
} from "../../types/Index";

const GraficasState = ({ children }) => {
  const initialState = {
    total_tipoClientes: [],
    ErrorsApi: [],
  };
  const [state, dispatch] = useReducer(GraficasReducer, initialState);

  const CountTipoClientes = () => {
    MethodGet("/clientesPorTipo")
      .then((res) => {
        dispatch({
          type: GET_COUNT_TIPO_CLIENTES,
          payload: res.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <GraficasContext.Provider
      value={{
        total_tipoClientes: state.total_tipoClientes,
        CountTipoClientes,
      }}
    >
      {children}
    </GraficasContext.Provider>
  );
};

export default GraficasState;
