import { GET_ALL_DEPARTAMENTOS, OBTENER_DEPARTAMENTO } from "../../types";

const DepartamentosReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_DEPARTAMENTOS:
      return {
        ...state,
        departamentos: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case OBTENER_DEPARTAMENTO:
      return {
        ...state,
        departamento: action.payload,
        success: false,
        ErrorsApi: [],
      };
    default:
      return state;
  }
};

export default DepartamentosReducer;

