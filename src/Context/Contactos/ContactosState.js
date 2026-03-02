import React, { useReducer } from "react";
import ContactosContext from "./ContactosContext";
import ContactosReducer from "./ContactosReducer";
import MethodGet, {
  MethodDelete,
  MethodPost,
  MethodPut,
} from "../../Config/Service";
import Swal from "sweetalert2";
import {
  GET_ALL_CONTACTOS,
  OBTENER_CONTACTO,
  ADD_CONTACTOS,
  UPDATE_CONTACTOS,
  DELETE_CONTACTOS,
} from "../../types";

const ContactosState = ({ children }) => {
  const initialState = {
    contactos: [],
    contacto: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(ContactosReducer, initialState);

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

  const GetContactos = () => {
    MethodGet("/contactos")
      .then((res) => {
        dispatch({
          type: GET_ALL_CONTACTOS,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const GetContacto = (id) => {
    MethodGet(`/contactos/${id}`)
      .then((res) => {
        dispatch({
          type: OBTENER_CONTACTO,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const CreateContactos = (data) => {
    MethodPost("/contactos", data)
      .then((res) => {
        dispatch({ type: ADD_CONTACTOS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Contacto agregado con éxito",
          icon: "success",
        });
        GetContactos();
      })
      .catch(handleError);
  };

  const UpdateContactos = (data) => {
    MethodPut(`/contactos/${data.id}`, data)
      .then((res) => {
        dispatch({ type: UPDATE_CONTACTOS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Contacto actualizado con éxito",
          icon: "success",
        });
        GetContactos();
      })
      .catch(handleError);
  };

  const DeleteContactos = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El contacto seleccionado será eliminado",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, volver",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodDelete(`/contactos/${id}`)
          .then((res) => {
            dispatch({ type: DELETE_CONTACTOS, payload: id });
            Swal.fire({
              title: "Eliminado",
              text: res.data.mensaje,
              icon: "success",
            });
            GetContactos();
          })
          .catch(handleError);
      }
    });
  };

  return (
    <ContactosContext.Provider
      value={{
        contactos: state.contactos,
        contacto: state.contacto,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetContactos,
        GetContacto,
        CreateContactos,
        UpdateContactos,
        DeleteContactos,
      }}
    >
      {children}
    </ContactosContext.Provider>
  );
};

export default ContactosState;
