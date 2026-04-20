import React, { useReducer } from "react";
import TipoClienteContext from "./TipoClienteContext";
import TipoClienteReducer from "./TipoClienteReducer";
import MethodGet, {
  MethodDelete,
  MethodPost,
  MethodPut,
} from "../../Config/Service";
import Swal from "sweetalert2";
import {
  GET_ALL_TIPO_CLIENTES,
  OBTENER_TIPO_CLIENTE,
  ADD_TIPO_CLIENTES,
  UPDATE_TIPO_CLIENTES,
  DELETE_TIPO_CLIENTES,
} from "../../types/Index";

const TipoClienteState = ({ children }) => {
  const initialState = {
    tipoClientes: [],
    tipoCliente: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(TipoClienteReducer, initialState);

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

  const CreateTipoClientes = (data) => {
    MethodPost("/tipos-clientes", data)
      .then((res) => {
        dispatch({ type: ADD_TIPO_CLIENTES, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Tipo de cliente agregado con éxito",
          icon: "success",
        });
        GetTipoClientes();
      })
      .catch(handleError);
  };

  const UpdateTipoClientes = (data) => {
    MethodPut(`/tipos-clientes/${data.id}`, data)
      .then((res) => {
        dispatch({ type: UPDATE_TIPO_CLIENTES, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Tipo de cliente actualizado con éxito",
          icon: "success",
        });
        GetTipoClientes();
      })
      .catch(handleError);
  };

  const DeleteTipoClientes = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El tipo de cliente seleccionado será eliminado",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, volver",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodDelete(`/tipos-clientes/${id}`)
          .then((res) => {
            dispatch({ type: DELETE_TIPO_CLIENTES, payload: id });
            Swal.fire({
              title: "Eliminado",
              text: res.data.mensaje,
              icon: "success",
            });
            GetTipoClientes();
          })
          .catch(handleError);
      }
    });
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
        CreateTipoClientes,
        UpdateTipoClientes,
        DeleteTipoClientes,
      }}
    >
      {children}
    </TipoClienteContext.Provider>
  );
};

export default TipoClienteState;
