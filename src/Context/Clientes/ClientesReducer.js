import { GET_ALL_CLIENTES } from "../../types";

const ClientesReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_CLIENTES:
      return {
        ...state,
        clientes: action.payload,
        success: false,
        ErrorsApi: [],
      };
    default:
      return state;
  }
};

export default ClientesReducer;
