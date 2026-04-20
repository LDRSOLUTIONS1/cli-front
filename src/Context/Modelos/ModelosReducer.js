import { GET_ALL_MODELOS, OBTENER_MODELO } from "../../types/Index";

const ModelosReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_MODELOS:
      return {
        ...state,
        modelos: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case OBTENER_MODELO:
      return {
        ...state,
        modelo: action.payload,
        success: false,
        ErrorsApi: [],
      };
    default:
      return state;
  }
};

export default ModelosReducer;
