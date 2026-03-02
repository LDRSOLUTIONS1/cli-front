import React, { useReducer } from "react";
import ModelosContext from "./ModelosContext";
import ModelosReducer from "./ModelosReducer";
import MethodGet, {
  MethodDelete,
  MethodPost,
  MethodPut,
} from "../../Config/Service";
import Swal from "sweetalert2";
import {
  GET_ALL_MODELOS,
  OBTENER_MODELO,
  ADD_MODELOS,
  UPDATE_MODELOS,
  DELETE_MODELOS,
} from "../../types";

const ModelosState = ({ children }) => {
  const initialState = {
    modelos: [],
    modelo: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(ModelosReducer, initialState);

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

  const GetModelos = () => {
    MethodGet("/modelos")
      .then((res) => {
        dispatch({
          type: GET_ALL_MODELOS,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const GetModelo = (id) => {
    MethodGet(`/modelos/${id}`)
      .then((res) => {
        dispatch({
          type: OBTENER_MODELO,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const CreateModelos = (data) => {
    MethodPost("/modelos", data)
      .then((res) => {
        dispatch({ type: ADD_MODELOS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Modelo agregado con éxito",
          icon: "success",
        });
        GetModelos();
      })
      .catch(handleError);
  };

  const UpdateModelos = (data) => {
    MethodPut(`/modelos/${data.id}`, data)
      .then((res) => {
        dispatch({ type: UPDATE_MODELOS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Modelo actualizado con éxito",
          icon: "success",
        });
        GetModelos();
      })
      .catch(handleError);
  };

  const DeleteModelos = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El modelo seleccionado será eliminado",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, volver",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodDelete(`/modelos/${id}`)
          .then((res) => {
            dispatch({ type: DELETE_MODELOS, payload: id });
            Swal.fire({
              title: "Eliminado",
              text: res.data.mensaje,
              icon: "success",
            });
            GetModelos();
          })
          .catch(handleError);
      }
    });
  };

  return (
    <ModelosContext.Provider
      value={{
        modelos: state.modelos,
        modelo: state.modelo,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetModelos,
        GetModelo,
        CreateModelos,
        UpdateModelos,
        DeleteModelos,
      }}
    >
      {children}
    </ModelosContext.Provider>
  );
};

export default ModelosState;
