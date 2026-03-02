import { GET_ALL_REGIMENES_FISCALES } from "../../types";

const RegimenesFiscalesReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_REGIMENES_FISCALES:
      return {
        ...state,
        regimenesFiscales: action.payload,
        success: false,
        ErrorsApi: [],
      };

    default:
      return state;
  }
};

export default RegimenesFiscalesReducer;
