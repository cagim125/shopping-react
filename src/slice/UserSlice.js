import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    member: {},

  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setMember: (state, action) => {
      state.member = { ...state.member, ...action.payload};
    },
  }
});

export const { setUsers, setMember } = userSlice.actions;