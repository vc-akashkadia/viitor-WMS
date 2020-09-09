import { actionTypes } from "./actionTypes";

export const selectFacility = (data) => ({
  type: actionTypes.FACILITY_SELECTED,
  data: data,
});
export const DamageCodeList = (data) => ({
  type: actionTypes.DAMAGE_CODE_LIST,
  data: data,
});

export const FacilityList = (data) => ({
  type: actionTypes.FACILITY_LIST,
  data: data,
});

export const yardCraneList = (data) => ({
  type: actionTypes.YARD_CRANE_LIST,
  data: data,
});

export const blockList = (data) => ({
  type: actionTypes.BLOCK_LIST,
  data: data,
});

export const selectYardCrane = (data) => ({
  type: actionTypes.YARD_CRANE,
  data: data,
});
export const selectYardOperation = (data) => ({
  type: actionTypes.YARD_OPERATIONS,
  data: data,
});
export const selectYardJobOption = (data) => ({
  type: actionTypes.YARD_JOB_OPTIONS,
  data: data,
});

export const selectGateMoveOperationOption = (data) => ({
  type: actionTypes.GATE_MOVE_OPERATION_OPTIONS,
  data: data,
});
export const selectGroundContainer = (data) => ({
  type: actionTypes.GROUND_CONTAINER,
  data: data,
});
export const GateMoveContainerList = (data) => ({
  type: actionTypes.GATE_MOVE_CONTAINER_LIST,
  data: data,
});
export const YardContainerList = (data) => ({
  type: actionTypes.YARD_CONTAINER_LIST,
  data: data,
});

export const ContainerListForLocation = (data) => ({
  type: actionTypes.CONTAINER_LIST_LOCATION,
  data: data,
});

export const GetLocationSlipDetail = (data) => ({
  type: actionTypes.GET_LOCATION_SLIP,
  data: data,
});


export const EIRPrintDetail = (data) => ({
  type: actionTypes.GET_EIR_PRINT,
  data: data,
});
