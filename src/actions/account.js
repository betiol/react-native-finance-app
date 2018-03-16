import {
  FETCH_ACCOUNT_LOADING,
  FETCH_ACCOUNT_FULFILLED,
  FETCH_ACCOUNT_ERROR
} from "./types";
import Api from "@shared/Api";

export const requestAccounts = () => {
  return async dispatch => {
    dispatch({ type: FETCH_ACCOUNT_LOADING });
    try {
      let accounts = await Api.account();
      dispatch(accountRequestSuccess(dispatch, accounts));
    } catch (err) {
      dispatch(accountRequestError(err));
    }
  };
};

export const accountRequestSuccess = (dispatch, accounts) => {
  return dispatch => {
    dispatch({
      type: FETCH_ACCOUNT_FULFILLED,
      payload: accounts
    });
  };
};

export function accountRequestError(err) {
  return {
    type: FETCH_ACCOUNT_ERROR,
    payload: {
      err
    }
  };
}
