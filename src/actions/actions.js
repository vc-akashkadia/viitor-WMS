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

export const selectGateInOperationOption = (data) => ({
  type: actionTypes.GATE_IN_OPERATION_OPTIONS,
  data: data,
});
export const selectGroundContainer = (data) => ({
  type: actionTypes.GROUND_CONTAINER,
  data: data,
});
