import { GET_ALL_GRUPOS, OBTENER_GRUPO } from "../../types";

const GruposReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_GRUPOS:
      return {
        ...state,
        grupos: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case OBTENER_GRUPO:
      return {
        ...state,
        grupo: action.payload,
        success: false,
        ErrorsApi: [],
      };
    default:
      return state;
  }
};

export default GruposReducer;
