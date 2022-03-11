import { LoaderActionTypes } from './loader.action.type';

const INITIAL_STATE = {
  isLoading: false,
};

const loaderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LoaderActionTypes.SET_LOADER:
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

export default loaderReducer;
