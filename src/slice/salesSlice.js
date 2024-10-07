import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const salesSlice = createSlice({
  name: 'sales',
  initialState: {
    sales: {}
  },
  reducers: {
    setSales: (state, action) => {
      state.sales = action.payload;
  }
}
})

export const { setSales } = salesSlice.actions;

export const addSales = () => async (_,getState) => {
  const { sales } = getState().sales;
  console.log(sales);

  const response = await axios.post("/api/sales/add", sales, {
    headers: {
      'Content-Type' : 'application/json'
    }
  })
  alert(response.data);
}


