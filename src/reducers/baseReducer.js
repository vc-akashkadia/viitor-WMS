import { actionTypes } from "../actions/actionTypes";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const initialstate = {
  facility: {},
  damageCodeList:[],
  facilityList:[],
  yardCraneList:[],
  blockList:[],
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
const base = persistReducer(
  { storage, key: "base-wms", whitelist: ["facility"] },(state = initialstate, action) => {
  switch (action.type) {
    case actionTypes.facilty: {
      return {
        ...state,
        facility: action.data,
      };
    }
    case actionTypes.damageCodeList: {
      return {
        ...state,
        damageCodeList: action.data,
      };
    }

    case actionTypes.facilityList: {
      return {
        ...state,
        facilityList: action.data,
      };
    }

    case actionTypes.yardCraneList: {
      return {
        ...state,
        yardCraneList: action.data,
      };
    }

    case actionTypes.yardCrane: {
      return {
        ...state,
        yardCrane: action.data,
      };
    }

    case actionTypes.blockList: {
      return {
        ...state,
        blockList: action.data,
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
});

export default base;
