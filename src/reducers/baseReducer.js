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
  { storage, key: "base-wms", whitelist: ["facility","facilityList"] },(state = initialstate, action) => {
  switch (action.type) {
    case actionTypes.FACILITY_SELECTED: {
      return {
        ...state,
        facility: action.data,
      };
    }
    case actionTypes.DAMAGE_CODE_LIST: {
      return {
        ...state,
        damageCodeList: action.data,
      };
    }

    case actionTypes.FACILITY_LIST: {
      return {
        ...state,
        facilityList: action.data,
      };
    }

    case actionTypes.YARD_CRANE_LIST: {
      return {
        ...state,
        yardCraneList: action.data,
      };
    }

    case actionTypes.YARD_CRANE: {
      return {
        ...state,
        yardCrane: action.data,
      };
    }

    case actionTypes.BLOCK_LIST: {
      return {
        ...state,
        blockList: action.data,
      };
    }

    case actionTypes.YARD_OPERATIONS: {
      return {
        ...state,
        yardOperation: action.data,
      };
    }

    case actionTypes.YARD_JOB_OPTIONS: {
      return {
        ...state,
        yardJobOption: action.data,
      };
    }

    case actionTypes.GATE_IN_OPERATION_OPTIONS: {
      return {
        ...state,
        gateInOperation: action.data,
      };
    }
    case actionTypes.GROUND_CONTAINER: {
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
