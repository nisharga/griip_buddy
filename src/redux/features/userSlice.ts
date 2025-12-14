import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  name: string;
  phone_number: string;
  role: string;
  status: string;
  last_login_at: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set user after login
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    // Clear user on logout
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
