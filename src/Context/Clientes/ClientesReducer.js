import { GET_ALL_CLIENTES, OBTENER_CLIENTE } from "../../types/Index";

const ClientesReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_CLIENTES:
      return {
        ...state,
        clientes: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case OBTENER_CLIENTE:
      return {
        ...state,
        cliente: action.payload,
        success: false,
        ErrorsApi: [],
      };
    default:
      return state;
  }
};

export default ClientesReducer;
