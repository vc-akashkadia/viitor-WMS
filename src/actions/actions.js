import { actionTypes } from "./actionTypes";

export const selectFacility = (data) => ({
  type: actionTypes.facilty,
  data: data,
});
export const DamageCodeList = (data) => ({
  type: actionTypes.damageCodeList,
  data: data,
});

export const FacilityList = (data) => ({
  type: actionTypes.facilityList,
  data: data,
});

export const yardCraneList = (data) => ({
  type: actionTypes.yardCraneList,
  data: data,
});

export const blockList = (data) => ({
  type: actionTypes.blockList,
  data: data,
});

export const selectYardCrane = (data) => ({
  type: actionTypes.yardCrane,
  data: data,
});
export const selectYardOperation = (data) => ({
  type: actionTypes.yardOperation,
  data: data,
});
export const selectYardJobOption = (data) => ({
  type: actionTypes.yardJobOption,
  data: data,
});

export const selectGateInOperationOption = (data) => ({
  type: actionTypes.gateInOperationOpations,
  data: data,
});
export const selectGroundContainer = (data) => ({
  type: actionTypes.groundContainer,
  data: data,
});
