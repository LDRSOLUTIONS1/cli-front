import { GET_ALL_PUESTOS, OBTENER_PUESTO } from "../../types/Index";

const PuestosReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_PUESTOS:
      return {
        ...state,
        puestos: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case OBTENER_PUESTO:
      return {
        ...state,
        puesto: action.payload,
        success: false,
        ErrorsApi: [],
      };
    default:
      return state;
  }
};

export default PuestosReducer;
