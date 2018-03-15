import {
  FETCH_DASHBOARD_LOADING,
  FETCH_DASHBOARD_FULFILLED,
  FETCH_DASHBOARD_ERROR
} from "@actions/types";

const initialState = {
  isFetching: false,
  vehicles: [],
  error: null
};

export const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DASHBOARD_LOADING: {
      return { ...state, isFetching: true };
      break;
    }
    case FETCH_DASHBOARD_FULFILLED: {
      return { ...state, isFetching: false, vehicles: action.payload };
      break;
    }
    case FETCH_DASHBOARD_ERROR: {
      return { ...state, isFetching: false, error: action.payload };
      break;
    }
  }
  return state;
};
