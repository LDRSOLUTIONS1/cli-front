import React, { useReducer } from "react";
import UsuariosContext from "./UsuariosContext";
import UsuariosReducer from "./UsuariosReducer";
import MethodGet, {
  MethodDelete,
  MethodPost,
  MethodPut,
} from "../../Config/Service";
import Swal from "sweetalert2";
import {
  GET_ALL_USERS,
  OBTENER_USUARIO,
  ADD_USUARIOS,
  UPDATE_USUARIOS,
  DELETE_USUARIOS,
  ASIGNAR_TIPO_CLIENTE,
} from "../../types/Index";

const UsuariosState = ({ children }) => {
  const initialState = {
    usuarios: [],
    usuario: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(UsuariosReducer, initialState);

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

  const GetUsuarios = () => {
    MethodGet("/usuarios")
      .then((res) => {
        dispatch({
          type: GET_ALL_USERS,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const GetUsuario = (id) => {
    MethodGet(`/usuarios/${id}`)
      .then((res) => {
        dispatch({
          type: OBTENER_USUARIO,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const CreateUsuarios = (data) => {
    MethodPost("/usuarios", data)
      .then((res) => {
        dispatch({ type: ADD_USUARIOS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Usuario agregado con éxito",
          icon: "success",
        });
        GetUsuarios();
      })
      .catch(handleError);
  };

  const UpdateUsuarios = (data) => {
    MethodPut(`/usuarios/${data.id}`, data)
      .then((res) => {
        dispatch({ type: UPDATE_USUARIOS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Usuario actualizado con éxito",
          icon: "success",
        });
        GetUsuarios();
      })
      .catch(handleError);
  };

  const DeleteUsuarios = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El usuario seleccionado será eliminado",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, volver",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodDelete(`/usuarios/${id}`)
          .then((res) => {
            dispatch({ type: DELETE_USUARIOS, payload: id });
            Swal.fire({
              title: "Eliminado",
              text: res.data.mensaje,
              icon: "success",
            });
            GetUsuarios();
          })
          .catch(handleError);
      }
    });
  };

  const AsignarTipoCliente = (data) => {
    MethodPost(`/users/${data.id}`, data)
      .then((res) => {
        dispatch({ type: ASIGNAR_TIPO_CLIENTE, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Tipo de cliente asignado con éxito",
          icon: "success",
        });
        GetUsuarios();
      })
      .catch(handleError);
  };

  return (
    <UsuariosContext.Provider
      value={{
        usuarios: state.usuarios,
        usuario: state.usuario,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetUsuarios,
        GetUsuario,
        CreateUsuarios,
        UpdateUsuarios,
        DeleteUsuarios,
        AsignarTipoCliente,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};

export default UsuariosState;
