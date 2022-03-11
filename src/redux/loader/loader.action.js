import { LoaderActionTypes } from './loader.action.type';

export const setLoader = (isLoading) => ({
  type: LoaderActionTypes.SET_LOADER,
  payload: isLoading,
});
