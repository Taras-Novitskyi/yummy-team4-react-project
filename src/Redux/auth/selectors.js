export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectUser = state => state.auth.user;

export const selectIsRefreshing = state => state.auth.isRefreshing;

export const selectVerificationToken = state => state.auth.verificationToken;
export const selectToken = state => state.auth.token;