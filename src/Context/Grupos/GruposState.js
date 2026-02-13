import React, { useReducer } from "react";
import GruposContext from "./GruposContext";
import GruposReducer from "./GruposReducer";
import MethodGet from "../../Config/Service";
import Swal from "sweetalert2";
import { GET_ALL_GRUPOS, OBTENER_GRUPO } from "../../types";

const GruposState = ({ children }) => {
  const initialState = {
    grupos: [],
    grupo: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(GruposReducer, initialState);

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

  const GetGrupos = () => {
    MethodGet("/grupos")
      .then((res) => {
        dispatch({
          type: GET_ALL_GRUPOS,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const GetGrupo = (id) => {
    MethodGet(`/grupos/${id}`)
      .then((res) => {
        dispatch({
          type: OBTENER_GRUPO,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  return (
    <GruposContext.Provider
      value={{
        grupos: state.grupos,
        grupo: state.grupo,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetGrupos,
        GetGrupo,
      }}
    >
      {children}
    </GruposContext.Provider>
  );
};

export default GruposState;
