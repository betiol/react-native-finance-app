import {
  FETCH_ACCOUNT_LOADING,
  FETCH_ACCOUNT_FULFILLED,
  FETCH_ACCOUNT_ERROR
} from "@actions/types";

const initialState = {
  isFetching: false,
  account: [],
  error: null
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
  }
  return state;
};
