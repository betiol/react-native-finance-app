import {
  FETCH_CATEGORIES_LOADING,
  FETCH_CATEGORIES_FULFILLED,
  FETCH_CATEGORIES_ERROR
} from "./types";
import Api from "@shared/Api";

export const requestCategories = () => {
  return async dispatch => {
    dispatch({ type: FETCH_CATEGORIES_LOADING });
    try {
      let categories = await Api.categories();
      dispatch(categoriesRequestSuccess(dispatch, categories));
    } catch (err) {
      dispatch(categoriesRequestError(err));
    }
  };
};

export const categoriesRequestSuccess = (dispatch, categories) => {
  return dispatch => {
    dispatch({
      type: FETCH_CATEGORIES_FULFILLED,
      payload: categories
    });
  };
};

export function categoriesRequestError(err) {
  return {
    type: FETCH_CATEGORIES_ERROR,
    payload: {
      err
    }
  };
}
