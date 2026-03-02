import { GET_ALL_CONTACTOS, OBTENER_CONTACTO } from "../../types";

const ContactosReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_CONTACTOS:
      return {
        ...state,
        contactos: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case OBTENER_CONTACTO:
      return {
        ...state,
        contacto: action.payload,
        success: false,
        ErrorsApi: [],
      };
    default:
      return state;
  }
};

export default ContactosReducer;
