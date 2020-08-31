import { actionTypes } from "../actions/actionTypes";
const initialstate = {
  facility: {},
  yardCrane: {},
  yardOperation: {},
  yardJobOption: {},
  gateInOperation: {
    vehical: "",
    number: "",
    tyep:""
  },
  groundContainer: {},
};
const base = (state = initialstate, action) => {
  switch (action.type) {
    case actionTypes.facilty: {
      return {
        ...state,
        facility: action.data,
      };
    }
    case actionTypes.yardCrane: {
      return {
        ...state,
        yardCrane: action.data,
      };
    }
    case actionTypes.yardOperation: {
      return {
        ...state,
        yardOperation: action.data,
      };
    }
    case actionTypes.yardJobOption: {
      return {
        ...state,
        yardJobOption: action.data,
      };
    }

    case actionTypes.gateInOperationOpations: {
      return {
        ...state,
        gateInOperation: action.data,
      };
    }
    case actionTypes.groundContainer: {
      return {
        ...state,
        groundContainer: action.data,
      };
    }
    default:
      return state;
  }
};

export default base;
