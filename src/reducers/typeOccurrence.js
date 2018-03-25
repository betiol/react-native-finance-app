import {
  FETCH_TYPES_OCCURRENCES_LOADING,
  FETCH_TYPES_OCCURRENCES_FULFILLED,
  FETCH_TYPES_OCCURRENCES_ERROR
} from "@actions/types";

const initialState = {
  isFetching: false,
  typeOccurrences: [],
  error: null
};

export const typeOccurrence = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TYPES_OCCURRENCES_LOADING: {
      return { ...state, isFetching: true };
      break;
    }
    case FETCH_TYPES_OCCURRENCES_FULFILLED: {
      return { ...state, isFetching: false, typeOccurrences: action.payload };
      break;
    }
    case FETCH_TYPES_OCCURRENCES_ERROR: {
      return { ...state, isFetching: false, error: action.payload };
      break;
    }
  }
  return state;
};
