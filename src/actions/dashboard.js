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
      let dashboard = await Api.dashboard();
      dispatch(dashboardRequestSuccess(dispatch, dashboard));
    } catch (err) {
      dispatch(dashboardRequestError(err));
    }
  };
};

export const dashboardRequestSuccess = (dispatch, dashboard) => {
  return dispatch => {
    dispatch({
      type: FETCH_DASHBOARD_FULFILLED,
      payload: dashboard
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
