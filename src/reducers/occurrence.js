import {
  REQUEST_OCCURRENCE_INCOME_LOADING,
  REQUEST_OCCURRENCE_EXPENSE_LOADING,
  REQUEST_OCCURRENCES_FULFILLED,
  REQUEST_OCCURRENCES_ERROR,
  FETCH_OCCURRENCES_LOADING,
  DELETE_OCCURRENCE_SUCCESS,
  DELETE_OCCURRENCE
} from "@actions/types";

const initialState = {
  loading: false,
  occurrences: [],
  error: null
};

export const occurrence = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_OCCURRENCE_INCOME_LOADING: {
      return { ...state, loading: true };
      break;
    }
    case REQUEST_OCCURRENCE_EXPENSE_LOADING: {
      return { ...state, loading: true };
      break;
    }
    case FETCH_OCCURRENCES_LOADING: {
      return { ...state, loading: true };
      break;
    }
    case REQUEST_OCCURRENCES_FULFILLED: {
      return { ...state, loading: false, occurrences: action.payload };
      break;
    }
    case REQUEST_OCCURRENCES_ERROR: {
      return { ...state, loading: false, error: action.payload };
      break;
    }
    case DELETE_OCCURRENCE: {
      return { ...state, deleteLoading: true };
      break;
    }
    case DELETE_OCCURRENCE_SUCCESS: {
      return { ...state, deleteLoading: false, error: "Excluido com sucesso!" };
      break;
    }
  }
  return state;
};
