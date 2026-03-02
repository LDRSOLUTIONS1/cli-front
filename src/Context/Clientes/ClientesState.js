import React, { useReducer } from "react";
import ClientesContext from "./ClientesContext";
import ClientesReducer from "./ClientesReducer";
import MethodGet, {
  MethodDelete,
  MethodPost,
  MethodPut,
} from "../../Config/Service";
import Swal from "sweetalert2";
import {
  GET_ALL_CLIENTES,
  OBTENER_CLIENTE,
  ADD_CLIENTES,
  UPDATE_CLIENTES,
  DELETE_CLIENTES,
} from "../../types";

const ClientesState = ({ children }) => {
  const initialState = {
    clientes: [],
    cliente: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(ClientesReducer, initialState);

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

  const GetClientes = () => {
    MethodGet("/clientes")
      .then((res) => {
        dispatch({
          type: GET_ALL_CLIENTES,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const GetCliente = (id) => {
    MethodGet(`/clientes/${id}`)
      .then((res) => {
        dispatch({
          type: OBTENER_CLIENTE,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const CreateClientes = (data) => {
    MethodPost("/clientes", data)
      .then((res) => {
        dispatch({ type: ADD_CLIENTES, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Cliente agregado con éxito",
          icon: "success",
        });
        GetClientes();
      })
      .catch(handleError);
  };

  const UpdateClientes = (data) => {
    MethodPut(`/clientes/${data.id}`, data)
      .then((res) => {
        dispatch({ type: UPDATE_CLIENTES, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Cliente actualizado con éxito",
          icon: "success",
        });
        GetClientes();
      })
      .catch(handleError);
  };

  const DeleteClientes = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El cliente seleccionado será eliminado",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, volver",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodDelete(`/clientes/${id}`)
          .then((res) => {
            dispatch({ type: DELETE_CLIENTES, payload: id });
            Swal.fire({
              title: "Eliminado",
              text: res.data.mensaje,
              icon: "success",
            });
            GetClientes();
          })
          .catch(handleError);
      }
    });
  };

  return (
    <ClientesContext.Provider
      value={{
        clientes: state.clientes,
        cliente: state.cliente,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetClientes,
        GetCliente,
        CreateClientes,
        UpdateClientes,
        DeleteClientes,
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};

export default ClientesState;
