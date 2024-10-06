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
    clearMember: (state) => {
      state.member = null;
    },
  }
});



export const { setUsers, setMember, clearMember } = userSlice.actions;