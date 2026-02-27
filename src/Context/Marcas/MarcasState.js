import React, { useReducer } from "react";
import MarcasContext from "./MarcasContext";
import MarcasReducer from "./MarcasReducer";
import MethodGet, {
  MethodDelete,
  MethodPost,
  MethodPut,
} from "../../Config/Service";
import Swal from "sweetalert2";
import {
  GET_ALL_MARCAS,
  OBTENER_MARCA,
  ADD_MARCAS,
  UPDATE_MARCAS,
  DELETE_MARCAS,
} from "../../types";

const MarcasState = ({ children }) => {
  const initialState = {
    marcas: [],
    marca: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(MarcasReducer, initialState);

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

  const GetMarcas = () => {
    MethodGet("/marcas")
      .then((res) => {
        dispatch({
          type: GET_ALL_MARCAS,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const GetMarca = (id) => {
    MethodGet(`/marcas/${id}`)
      .then((res) => {
        dispatch({
          type: OBTENER_MARCA,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const CreateMarcas = (data) => {
    MethodPost("/marcas", data)
      .then((res) => {
        dispatch({ type: ADD_MARCAS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Marca agregada con éxito",
          icon: "success",
        });
        GetMarcas();
      })
      .catch(handleError);
  };

  const UpdateMarcas = (data) => {
    MethodPut(`/marcas/${data.id}`, data)
      .then((res) => {
        dispatch({ type: UPDATE_MARCAS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Marca actualizada con éxito",
          icon: "success",
        });
        GetMarcas();
      })
      .catch(handleError);
  };

  const DeleteMarcas = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "La marca seleccionada será eliminada",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, volver",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodDelete(`/marcas/${id}`)
          .then((res) => {
            dispatch({ type: DELETE_MARCAS, payload: id });
            Swal.fire({
              title: "Eliminado",
              text: res.data.mensaje,
              icon: "success",
            });
            GetMarcas();
          })
          .catch(handleError);
      }
    });
  };

  return (
    <MarcasContext.Provider
      value={{
        marcas: state.marcas,
        marca: state.marca,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetMarcas,
        GetMarca,
        CreateMarcas,
        UpdateMarcas,
        DeleteMarcas,
      }}
    >
      {children}
    </MarcasContext.Provider>
  );
};

export default MarcasState;
