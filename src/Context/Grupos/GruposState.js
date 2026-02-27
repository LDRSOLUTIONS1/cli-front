import React, { useReducer } from "react";
import GruposContext from "./GruposContext";
import GruposReducer from "./GruposReducer";
import MethodGet, {
  MethodDelete,
  MethodPost,
  MethodPut,
} from "../../Config/Service";
import Swal from "sweetalert2";
import {
  GET_ALL_GRUPOS,
  OBTENER_GRUPO,
  ADD_GRUPOS,
  UPDATE_GRUPOS,
  DELETE_GRUPOS,
} from "../../types";

const GruposState = ({ children }) => {
  const initialState = {
    grupos: [],
    grupo: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(GruposReducer, initialState);

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

  const CreateGrupos = (data) => {
    MethodPost("/grupos", data)
      .then((res) => {
        dispatch({ type: ADD_GRUPOS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Grupo agregado con éxito",
          icon: "success",
        });
        GetGrupos();
      })
      .catch(handleError);
  };

  const UpdateGrupos = (data) => {
    MethodPut(`/grupos/${data.id}`, data)
      .then((res) => {
        dispatch({ type: UPDATE_GRUPOS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Grupo actualizado con éxito",
          icon: "success",
        });
        GetGrupos();
      })
      .catch(handleError);
  };

  const DeleteGrupos = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El grupo seleccionado será eliminado",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, volver",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodDelete(`/grupos/${id}`)
          .then((res) => {
            dispatch({ type: DELETE_GRUPOS, payload: id });
            Swal.fire({
              title: "Eliminado",
              text: res.data.mensaje,
              icon: "success",
            });
            GetGrupos();
          })
          .catch(handleError);
      }
    });
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
        CreateGrupos,
        UpdateGrupos,
        DeleteGrupos,
      }}
    >
      {children}
    </GruposContext.Provider>
  );
};

export default GruposState;
