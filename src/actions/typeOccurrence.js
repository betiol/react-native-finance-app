import {
  FETCH_TYPES_OCCURRENCES_LOADING,
  FETCH_TYPES_OCCURRENCES_FULFILLED,
  FETCH_TYPES_OCCURRENCES_ERROR
} from "./types";
import Api from "@shared/Api";

export const requestTypes = () => {
  return async dispatch => {
    dispatch({ type: FETCH_TYPES_OCCURRENCES_LOADING });
    try {
      let typeOccurrences = await Api.typeOccurrences();
      console.log(typeOccurrences);
      dispatch(typesRequestSuccess(dispatch, typeOccurrences));
    } catch (err) {
      dispatch(typesRequestError(err));
    }
  };
};

export const typesRequestSuccess = (dispatch, typeOccurrences) => {
  return dispatch => {
    dispatch({
      type: FETCH_TYPES_OCCURRENCES_FULFILLED,
      payload: typeOccurrences
    });
  };
};

export function typesRequestError(err) {
  return {
    type: FETCH_TYPES_OCCURRENCES_ERROR,
    payload: {
      err
    }
  };
}
