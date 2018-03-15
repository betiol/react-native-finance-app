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
      let vehicles = await Api.live();
      dispatch(dashboardRequestSuccess(dispatch, vehicles));
    } catch (err) {
      dispatch(dashboardRequestError(err));
    }
  };
};

export const dashboardRequestSuccess = (dispatch, vehicles) => {
  return dispatch => {
    dispatch({
      type: FETCH_DASHBOARD_FULFILLED,
      payload: vehicles
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
