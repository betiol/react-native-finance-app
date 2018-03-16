import {
  REQUEST_OCURRENCES_LOADING,
  REQUEST_OCCURRENCES_SUCCESS,
  REQUEST_OCCURRENCES_ERROR,
  FETCH_OCCURRENCES_LOADING
} from "./types";
import Api from "@shared/Api";

export const requestOccurrence = occurrence => {
  let {
    date,
    amount,
    accountId,
    categoryId,
    description,
    typeId,
    status
  } = occurrence;
  return async dispatch => {
    dispatch({ type: REQUEST_OCURRENCES_LOADING });
    try {
      let occurrences = await Api.occurrences(
        date,
        amount,
        accountId,
        categoryId,
        description,
        typeId,
        status
      );
      dispatch(occurrenceRequestSuccess(dispatch, occurrences));
    } catch (err) {
      dispatch(occurrenceRequestError(err));
    }
  };
};

export const fetchOccurrences = () => {
  return async dispatch => {
    dispatch({ type: FETCH_OCCURRENCES_LOADING });
    try {
      let occurrences = await Api.fetchOccurrences();
      dispatch(occurrenceRequestSuccess(dispatch, occurrences));
    } catch (err) {
      dispatch(occurrenceRequestError(err));
    }
  };
};

export const occurrenceRequestSuccess = (dispatch, occurrences) => {
  return dispatch => {
    dispatch({
      type: REQUEST_OCCURRENCES_SUCCESS,
      payload: occurrences
    });
  };
};

export function occurrenceRequestError(err) {
  return {
    type: REQUEST_OCCURRENCES_ERROR,
    payload: {
      err
    }
  };
}
