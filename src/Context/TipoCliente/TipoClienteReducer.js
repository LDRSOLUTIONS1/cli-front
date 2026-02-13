import { GET_ALL_TIPO_CLIENTES, OBTENER_TIPO_CLIENTE } from "../../types";

const TipoClienteReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_TIPO_CLIENTES:
      return {
        ...state,
        tipoClientes: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case OBTENER_TIPO_CLIENTE:
      return {
        ...state,
        tipoCliente: action.payload,
        success: false,
        ErrorsApi: [],
      };
    default:
      return state;
  }
};

export default TipoClienteReducer;
