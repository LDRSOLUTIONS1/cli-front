import React, { useReducer } from "react";
import RegimenesFiscalesContext from "./RegimenesFiscalesContext";
import RegimenesFiscalesReducer from "./RegimenesFiscalesReducer";
import MethodGet from "../../Config/Service";
import Swal from "sweetalert2";
import { GET_ALL_REGIMENES_FISCALES } from "../../types/Index";

const RegimenesFiscalesState = ({ children }) => {
  const initialState = {
    regimenesFiscales: [],
    regimenFiscal: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(RegimenesFiscalesReducer, initialState);

  const handleError = (error) => {
    if (!error.response) {
      Swal.fire("Error", "Error de conexión con el servidor", "error");
      return;
    }

    const { status, data } = error.response;

    if (status === 422 && data.errors) {
      const mensajes = Object.values(data.errors).flat().join("\n");
      Swal.fire("Error de validación", mensajes, "warning");
    } else if (data.message) {
      Swal.fire("Error", data.message, "error");
    } else {
      Swal.fire("Error", "Ocurrió un error inesperado", "error");
    }
  };

  const GetRegimenesFiscales = (tipoPersona = null) => {
    MethodGet(`/regimenes-fiscales/${tipoPersona}`)
      .then((res) => {
        dispatch({
          type: GET_ALL_REGIMENES_FISCALES,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  return (
    <RegimenesFiscalesContext.Provider
      value={{
        regimenesFiscales: state.regimenesFiscales,
        regimenFiscal: state.regimenFiscal,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetRegimenesFiscales,
      }}
    >
      {children}
    </RegimenesFiscalesContext.Provider>
  );
};

export default RegimenesFiscalesState;
