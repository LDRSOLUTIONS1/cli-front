import React, { useReducer } from "react";
import RegionalesContext from "./RegionalesContext";
import RegionalesReducer from "./RegionalesReducer";
import MethodGet, {
  MethodDelete,
  MethodPost,
  MethodPut,
} from "../../Config/Service";
import Swal from "sweetalert2";
import {
  GET_ALL_REGIONALES,
  OBTENER_REGIONAL,
  ADD_REGIONALES,
  UPDATE_REGIONALES,
  DELETE_REGIONALES,
} from "../../types";

const RegionalesState = ({ children }) => {
  const initialState = {
    regionales: [],
    regional: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(RegionalesReducer, initialState);

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

  const GetRegionales = () => {
    MethodGet("/regionales")
      .then((res) => {
        dispatch({
          type: GET_ALL_REGIONALES,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const GetRegional = (id) => {
    MethodGet(`/regionales/${id}`)
      .then((res) => {
        dispatch({
          type: OBTENER_REGIONAL,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const CreateRegionales = (data) => {
    MethodPost("/regionales", data)
      .then((res) => {
        dispatch({ type: ADD_REGIONALES, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Regional agregado con éxito",
          icon: "success",
        });
        GetRegionales();
      })
      .catch(handleError);
  };

  const UpdateRegionales = (data) => {
    MethodPut(`/regionales/${data.id}`, data)
      .then((res) => {
        dispatch({ type: UPDATE_REGIONALES, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Regional actualizado con éxito",
          icon: "success",
        });
        GetRegionales();
      })
      .catch(handleError);
  };

  const DeleteRegionales = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El regional seleccionado será eliminado",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, volver",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodDelete(`/regionales/${id}`)
          .then((res) => {
            dispatch({ type: DELETE_REGIONALES, payload: id });
            Swal.fire({
              title: "Eliminado",
              text: res.data.mensaje,
              icon: "success",
            });
            GetRegionales();
          })
          .catch(handleError);
      }
    });
  };

  return (
    <RegionalesContext.Provider
      value={{
        regionales: state.regionales,
        regional: state.regional,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetRegionales,
        GetRegional,
        CreateRegionales,
        UpdateRegionales,
        DeleteRegionales,
      }}
    >
      {children}
    </RegionalesContext.Provider>
  );
};

export default RegionalesState;
