import { GET_ALL_MARCAS, OBTENER_MARCA } from "../../types";

const MarcasReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_MARCAS:
      return {
        ...state,
        marcas: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case OBTENER_MARCA:
      return {
        ...state,
        marca: action.payload,
        success: false,
        ErrorsApi: [],
      };
    default:
      return state;
  }
};

export default MarcasReducer;

