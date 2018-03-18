import {
  FETCH_ACCOUNT_LOADING,
  FETCH_ACCOUNT_FULFILLED,
  FETCH_ACCOUNT_ERROR,
  FETCH_TOTAL_VALUE_LOADING,
  FETCH_TOTAL_VALUE_FULFILLED
} from "@actions/types";

const initialState = {
  isFetching: false,
  account: [],
  totalValue: 0,
  error: null,
  loadingTotal: false
};

export const account = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNT_LOADING: {
      return { ...state, isFetching: true };
      break;
    }
    case FETCH_ACCOUNT_FULFILLED: {
      return { ...state, isFetching: false, accounts: action.payload };
      break;
    }
    case FETCH_ACCOUNT_ERROR: {
      return { ...state, isFetching: false, error: action.payload };
      break;
    }
    case FETCH_TOTAL_VALUE_LOADING: {
      return { ...state, loadingTotal: true };
      break;
    }
    case FETCH_TOTAL_VALUE_FULFILLED: {
      return { ...state, loadingTotal: false, totalValue: action.payload };
      break;
    }
  }
  return state;
};
