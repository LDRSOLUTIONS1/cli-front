import {
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../Types/Index";

export default (state, action) => {
  switch (action.type) {
    case OBTENER_USUARIO:
      return {
        ...state,
        autenticado: true,
        usuario: action.payload,
        cargando: false,
      };
    case LOGIN_EXITOSO:
      return {
        ...state,
        autenticado: true,
        cargando: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        autenticado: false,
        token: null,
        cargando: false,
        errorAuth: "No está autenticado",
      };
    case CERRAR_SESION:
      return {
        ...state,
        token: null,
        usuario: null,
        autenticado: false,
        cargando: false,
      };
    default:
      return state;
  }
};
