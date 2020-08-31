import { actionTypes } from "./actionTypes";

export const selectFacility = (data) => ({
  type: actionTypes.facilty,
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
