import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: string ; 
}

const initialState: UserState = {
  user: "Invited",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState["user"]>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;