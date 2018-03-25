import {
  REQUEST_OCCURRENCE_INCOME_LOADING,
  REQUEST_OCCURRENCE_EXPENSE_LOADING,
  REQUEST_OCCURRENCES_FULFILLED,
  REQUEST_OCCURRENCES_ERROR,
  FETCH_OCCURRENCES_LOADING,
  REQUEST_OCCURRENCE_TRANSFERENCE_LOADING,
  DELETE_OCCURRENCE_SUCCESS,
  DELETE_OCCURRENCE
} from "./types";
import Api from "@shared/Api";

export const requestIncomeOccurrence = occurrence => {
  return async dispatch => {
    dispatch({ type: REQUEST_OCCURRENCE_INCOME_LOADING });
    try {
      let occurrences = await Api.occurrences(occurrence);
      dispatch(occurrenceRequestSuccess(dispatch, occurrences));
    } catch (err) {
      dispatch(occurrenceRequestError(err));
    }
  };
};

export const requestTransferOccurrence = occurrence => {
  console.log(occurrence);
  return async dispatch => {
    dispatch({ type: REQUEST_OCCURRENCE_TRANSFERENCE_LOADING });
    try {
      let occurrences = await Api.transference(occurrence);
      dispatch(occurrenceRequestSuccess(dispatch, occurrences));
    } catch (err) {
      dispatch(occurrenceRequestError(err));
    }
  };
};

export const deleteOccurrence = id => {
  return async dispatch => {
    dispatch({ type: DELETE_OCCURRENCE });
    try {
      let x = await Api.deleteOccurrence(id);
      dispatch(deleteOccurrenceSuccess(dispatch));
    } catch (err) {
      dispatch(occurrenceRequestError(err));
    }
  };
};

export const requestExpenseOccurrence = occurrence => {
  return async dispatch => {
    dispatch({ type: REQUEST_OCCURRENCE_EXPENSE_LOADING });
    try {
      let occurrences = await Api.occurrences(occurrence);
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
      type: REQUEST_OCCURRENCES_FULFILLED,
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

export function deleteOccurrenceSuccess() {
  return {
    type: DELETE_OCCURRENCE_SUCCESS
  };
}
