import { GET_COUNT_TIPO_CLIENTES } from "../../types/Index";

const GraficasReducer = (state, action) => {
  switch (action.type) {
    case GET_COUNT_TIPO_CLIENTES:
      return {
        ...state,
        total_tipoClientes: action.payload,
        ErrorsAPI: [],
      };
    default:
      return state;
  }
};

export default GraficasReducer;
