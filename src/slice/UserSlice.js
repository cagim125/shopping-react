import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    user: {},
    displayName: '',
    password: '',
    email: '',
    name: ''
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setDisplayName: (state, action) => {
      state.displayName = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    }
  }
});

export const { setUsers, setUser, setDisplayName, 
                setPassword, setEmail, setName } = userSlice.actions;