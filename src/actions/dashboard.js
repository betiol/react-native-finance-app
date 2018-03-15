import {
  FETCH_DASHBOARD_LOADING,
  FETCH_DASHBOARD_FULFILLED,
  FETCH_DASHBOARD_ERROR
} from "./types";
import Api from "@shared/Api";

export const requestDashboard = () => {
  return async dispatch => {
    dispatch({ type: FETCH_DASHBOARD_LOADING });
    try {
      let account = await Api.account();
      dispatch(dashboardRequestSuccess(dispatch, account));
    } catch (err) {
      dispatch(dashboardRequestError(err));
    }
  };
};

export const dashboardRequestSuccess = (dispatch, account) => {
  return dispatch => {
    dispatch({
      type: FETCH_DASHBOARD_FULFILLED,
      payload: account
    });
  };
};

export function dashboardRequestError(err) {
  return {
    type: FETCH_DASHBOARD_ERROR,
    payload: {
      err
    }
  };
}
