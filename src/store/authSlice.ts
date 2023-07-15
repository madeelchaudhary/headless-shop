import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  authenticated: "authenticated" | "unauthenticated" | "loading";
  user: {
    id: string;
    email: string;
    accessToken: string;
    fullName: string;
  } | null;
}

const initialState: AuthState = {
  user: null,
  authenticated: "loading",
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuth(state, action: PayloadAction<NonNullable<AuthState["user"]>>) {
      const { email, accessToken, fullName, id } = action.payload;
      state.user = { email, accessToken, fullName, id };
      state.authenticated = "authenticated";
    },
    emptyAuth(state, action) {
      state.user = null;
      state.authenticated = "unauthenticated";
    },
    notAuthenticated(state, action) {
      state.authenticated = "unauthenticated";
    },
  },
});

export const { addAuth, emptyAuth } = userSlice.actions;

export default userSlice.reducer;
