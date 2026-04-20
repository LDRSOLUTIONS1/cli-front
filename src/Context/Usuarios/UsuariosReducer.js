import { GET_ALL_USERS, OBTENER_USUARIO } from "../../types/Index";

const UsuariosReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        usuarios: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case OBTENER_USUARIO:
      return {
        ...state,
        usuario: action.payload,
        success: false,
        ErrorsApi: [],
      };
    default:
      return state;
  }
};

export default UsuariosReducer;
