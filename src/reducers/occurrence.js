import {
  REQUEST_OCCURRENCE_LOADING,
  REQUEST_OCCURRENCES_FULFILLED,
  REQUEST_OCCURRENCES_ERROR,
  FETCH_OCCURRENCES_LOADING
} from "@actions/types";

const initialState = {
  isFetching: false,
  occurrences: [],
  error: null
};

export const occurrence = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_OCCURRENCE_LOADING: {
      return { ...state, isFetching: true };
      break;
    }
    case FETCH_OCCURRENCES_LOADING: {
      return { ...state, isFetching: true };
      break;
    }
    case REQUEST_OCCURRENCES_FULFILLED: {
      return { ...state, isFetching: false, occurrences: action.payload };
      break;
    }
    case REQUEST_OCCURRENCES_ERROR: {
      return { ...state, isFetching: false, error: action.payload };
      break;
    }
  }
  return state;
};
