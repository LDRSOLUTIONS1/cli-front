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
} from "../../types/Index";
import imageHeaders from "../../Config/ImageHeaders";

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

  const handleClickDownload = async () => {
    try {
      const response = await MethodGet(
        "/contactos/export/excel",
        {},
        {
          responseType: "blob",
        },
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "contactos.xlsx";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      handleError(error);
    }
  };

  const handleClickUpload = async () => {
    const { value: file } = await Swal.fire({
      title: "Importar contactos desde Excel",
      html: `
      <style>
        .swal2-html-container {
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
        }

        .swal2-file {
          margin-top: 10px;
        }
      </style>

      <label style="margin-top:10px; display:block; font-weight:500;">
        Solo archivos .xls o .xlsx
      </label>

      <input
        type="file"
        id="upload-contactos"
        accept=".xls,.xlsx"
        class="swal2-file"
      >
    `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Subir archivo",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      focusConfirm: false,

      preConfirm: () => {
        const selectedFile =
          document.getElementById("upload-contactos").files[0];

        if (!selectedFile) {
          Swal.showValidationMessage("Debes seleccionar un archivo");
          return false;
        }

        return selectedFile;
      },
    });

    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await MethodPost("/contactos/import/excel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { message, errores } = res.data;

      if (errores && errores.length > 0) {
        const listaErrores = errores.map((e) => `• ${e}`).join("<br>");
        Swal.fire({
          title: "Importación con advertencias",
          html: `<p>${message}</p><br><small style="color:#c0392b;">${listaErrores}</small>`,
          icon: "warning",
        });
      } else {
        Swal.fire({
          title: "Importación completada",
          text: message,
          icon: "success",
        });
      }

      GetContactos();
    } catch (error) {
      let message = "Ocurrió un error al importar el archivo";

      if (error.response?.data?.message) {
        message = error.response.data.message;
      }

      if (error.response?.data?.errors) {
        const errors = Object.values(error.response.data.errors)
          .flat()
          .join("\n");

        message = errors;
      }

      Swal.fire({
        title: "Error",
        text: message,
        icon: "error",
      });
    }
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
        handleClickDownload,
        handleClickUpload,
      }}
    >
      {children}
    </ContactosContext.Provider>
  );
};

export default ContactosState;
