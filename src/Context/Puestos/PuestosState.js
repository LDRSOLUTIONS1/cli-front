import React, { useReducer } from "react";
import PuestosContext from "./PuestosContext";
import PuestosReducer from "./PuestosReducer";
import MethodGet, {
  MethodDelete,
  MethodPost,
  MethodPut,
} from "../../Config/Service";
import Swal from "sweetalert2";
import {
  GET_ALL_PUESTOS,
  OBTENER_PUESTO,
  ADD_PUESTOS,
  UPDATE_PUESTOS,
  DELETE_PUESTOS,
} from "../../types";

const PuestosState = ({ children }) => {
  const initialState = {
    puestos: [],
    puesto: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(PuestosReducer, initialState);

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

  const GetPuestos = () => {
    MethodGet("/puestos")
      .then((res) => {
        dispatch({
          type: GET_ALL_PUESTOS,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const GetPuesto = (id) => {
    MethodGet(`/puestos/${id}`)
      .then((res) => {
        dispatch({
          type: OBTENER_PUESTO,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const CreatePuestos = (data) => {
    MethodPost("/puestos", data)
      .then((res) => {
        dispatch({ type: ADD_PUESTOS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Puesto agregado con éxito",
          icon: "success",
        });
        GetPuestos();
      })
      .catch(handleError);
  };

  const UpdatePuestos = (data) => {
    MethodPut(`/puestos/${data.id}`, data)
      .then((res) => {
        dispatch({ type: UPDATE_PUESTOS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Puesto actualizado con éxito",
          icon: "success",
        });
        GetPuestos();
      })
      .catch(handleError);
  };

  const DeletePuestos = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El puesto seleccionado será eliminado",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, volver",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodDelete(`/puestos/${id}`)
          .then((res) => {
            dispatch({ type: DELETE_PUESTOS, payload: id });
            Swal.fire({
              title: "Eliminado",
              text: res.data.mensaje,
              icon: "success",
            });
            GetPuestos();
          })
          .catch(handleError);
      }
    });
  };

  return (
    <PuestosContext.Provider
      value={{
        puestos: state.puestos,
        puesto: state.puesto,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetPuestos,
        GetPuesto,
        CreatePuestos,
        UpdatePuestos,
        DeletePuestos,
      }}
    >
      {children}
    </PuestosContext.Provider>
  );
};

export default PuestosState;
