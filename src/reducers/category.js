import {
  FETCH_CATEGORIES_LOADING,
  FETCH_CATEGORIES_FULFILLED,
  FETCH_CATEGORIES_ERROR
} from "@actions/types";

const initialState = {
  isFetching: false,
  categories: [],
  error: null
};

export const category = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_LOADING: {
      return { ...state, isFetching: true };
      break;
    }
    case FETCH_CATEGORIES_FULFILLED: {
      return { ...state, isFetching: false, categories: action.payload };
      break;
    }
    case FETCH_CATEGORIES_ERROR: {
      return { ...state, isFetching: false, error: action.payload };
      break;
    }
  }
  return state;
};
