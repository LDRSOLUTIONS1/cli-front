import { GET_ALL_REGIONALES, OBTENER_REGIONAL } from "../../types";

const RegionalesReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_REGIONALES:
      return {
        ...state,
        regionales: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case OBTENER_REGIONAL:
      return {
        ...state,
        regional: action.payload,
        success: false,
        ErrorsApi: [],
      };
    default:
      return state;
  }
};

export default RegionalesReducer;

