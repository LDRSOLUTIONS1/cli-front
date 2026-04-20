import React, { useReducer } from "react";
import DepartamentosContext from "./DepartamentosContext";
import DepartamentosReducer from "./DepartamentosReducer";
import MethodGet, {
  MethodDelete,
  MethodPost,
  MethodPut,
} from "../../Config/Service";
import Swal from "sweetalert2";
import {
  GET_ALL_DEPARTAMENTOS,
  OBTENER_DEPARTAMENTO,
  ADD_DEPARTAMENTOS,
  UPDATE_DEPARTAMENTOS,
  DELETE_DEPARTAMENTOS,
} from "../../types/Index";

const DepartamentosState = ({ children }) => {
  const initialState = {
    departamentos: [],
    departamento: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(DepartamentosReducer, initialState);

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

  const GetDepartamentos = () => {
    MethodGet("/departamentos")
      .then((res) => {
        dispatch({
          type: GET_ALL_DEPARTAMENTOS,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const GetDepartamento = (id) => {
    MethodGet(`/departamentos/${id}`)
      .then((res) => {
        dispatch({
          type: OBTENER_DEPARTAMENTO,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const CreateDepartamentos = (data) => {
    MethodPost("/departamentos", data)
      .then((res) => {
        dispatch({ type: ADD_DEPARTAMENTOS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Departamento agregado con éxito",
          icon: "success",
        });
        GetDepartamentos();
      })
      .catch(handleError);
  };

  const UpdateDepartamentos = (data) => {
    MethodPut(`/departamentos/${data.id}`, data)
      .then((res) => {
        dispatch({ type: UPDATE_DEPARTAMENTOS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Departamento actualizado con éxito",
          icon: "success",
        });
        GetDepartamentos();
      })
      .catch(handleError);
  };

  const DeleteDepartamentos = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El departamento seleccionado será eliminado",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, volver",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodDelete(`/departamentos/${id}`)
          .then((res) => {
            dispatch({ type: DELETE_DEPARTAMENTOS, payload: id });
            Swal.fire({
              title: "Eliminado",
              text: res.data.mensaje,
              icon: "success",
            });
            GetDepartamentos();
          })
          .catch(handleError);
      }
    });
  };

  return (
    <DepartamentosContext.Provider
      value={{
        departamentos: state.departamentos,
        departamento: state.departamento,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetDepartamentos,
        GetDepartamento,
        CreateDepartamentos,
        UpdateDepartamentos,
        DeleteDepartamentos,
      }}
    >
      {children}
    </DepartamentosContext.Provider>
  );
};

export default DepartamentosState;
