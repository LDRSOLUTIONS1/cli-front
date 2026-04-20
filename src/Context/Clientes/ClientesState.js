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
} from "../../types/Index";

const ClientesState = ({ children }) => {
  const initialState = {
    clientes: [],
    cliente: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(ClientesReducer, initialState);

  const handleError = (error) => {
    if (error.response?.status === 422) {
      const errors = error.response.data.errors;

      const mensajes = Object.values(errors)
        .map((err) => err[0])
        .join("\n");

      Swal.fire({
        title: "Errores de validación",
        icon: "warning",
        text: mensajes,
      });

      return;
    }

    Swal.fire({
      title: "Error",
      icon: "error",
      text: "Ocurrió un error en el servidor",
    });
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

  const CreateClientes = async (data) => {
    try {
      const res = await MethodPost("/clientes", data);

      dispatch({ type: ADD_CLIENTES, payload: res.data });

      await Swal.fire({
        title: "Éxito",
        text: "Cliente agregado con éxito",
        icon: "success",
      });

      window.location.href = "/clientes";

      GetClientes();

      return res;
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const UpdateClientes = async (data) => {
    try {
      const res = await MethodPut(`/clientes/${data.id}`, data);

      dispatch({ type: UPDATE_CLIENTES, payload: res.data });

      await Swal.fire({
        title: "Éxito",
        text: "Cliente actualizado con éxito",
        icon: "success",
      });

      window.location.href = "/clientes";

      GetClientes();

      return res;
    } catch (error) {
      handleError(error);
      throw error;
    }
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
