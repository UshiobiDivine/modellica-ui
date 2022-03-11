import { createSelector } from 'react-select';

const selectUser = (state) => state.user;

// const selectCart = state => state.cart; //input selector

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser,
);
// export const selectEmailForVerification = createSelector([selectUser], (user)=> user.emailForVerification);
// export const selectCodeFromEmail = createSelector([selectUser], (user)=> user.codeFromEmail);
