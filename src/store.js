import { configureStore } from '@reduxjs/toolkit'
import { productsSlice } from './slice/productsSlice'
import { salesSlice } from './slice/salesSlice'
import { userSlice } from './slice/UserSlice'

// let user = createSlice({
//   name: 'user',
//   initialState : 'kim'
// })

// let stock = createSlice({
//   name: 'stock',
//   initialState : [10, 11, 12]
// })

export default configureStore({
  reducer: { 
    // user : user.reducer,
    // stock : stock.reducer,
    products : productsSlice.reducer,
    users : userSlice.reducer,
    sales : salesSlice.reducer,
  },
}) 