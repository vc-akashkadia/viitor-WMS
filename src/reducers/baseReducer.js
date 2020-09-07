import { actionTypes } from "../actions/actionTypes";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const initialstate = {
  facility: '',
  damageCodeList:[],
  facilityList:[],
  yardCraneList:[],
  blockList:[],
  
  yardCrane: '',
  yardOperation: {},
  yardJobOption: {},
  gateMoveOperation: {
    vehical: "",
    number: "",
    gatetype:""
  },
  groundContainer: {},
  gateMoveContainerList: [],
  yardContainerList: [],
  containerListForLocation: [],
};
const base = persistReducer(
  { storage, key: "base-wms", whitelist: ["facility","facilityList","yardCrane"] },(state = initialstate, action) => {
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

    case actionTypes.GATE_MOVE_OPERATION_OPTIONS: {
      return {
        ...state,
        gateMoveOperation: action.data,
      };
    }
    case actionTypes.GROUND_CONTAINER: {
      return {
        ...state,
        groundContainer: action.data,
      };
    }
    case actionTypes.GATE_MOVE_CONTAINER_LIST: {
      return {
        ...state,
        gateMoveContainerList: action.data,
      };
    }
    case actionTypes.YARD_CONTAINER_LIST: {
      return {
        ...state,
        yardContainerList: action.data,
      };
    }
    case actionTypes.CONTAINER_LIST_LOCATION: {
      return {
        ...state,
        containerListForLocation: action.data,
      };
    }
    case actionTypes.LOGOUT: {
      // TODO: Change this code. Actions in reducer aren't allowed.
      return initialstate;
    }
    default:
      return state;
  }
});

export default base;
