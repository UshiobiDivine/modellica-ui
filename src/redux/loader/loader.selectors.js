import { createSelector } from 'reselect';

const selectIsLoading = (state) => state.loading;

// const selectCart = state => state.cart; //input selector

export const selectLoading = createSelector(
  [selectIsLoading],
  (loading) => loading.isLoading,
);
// export const selectEmailForVerification = createSelector([selectUser], (user)=> user.emailForVerification);
// export const selectCodeFromEmail = createSelector([selectUser], (user)=> user.codeFromEmail);
