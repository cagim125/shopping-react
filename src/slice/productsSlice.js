import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: {},
    page: 0,
    size: 6,
    totalPages: 1,
    pageGroup: 0,
    name: '',
    description: '',
    price: '',
    stock: '',
    imgUrl: '',
    searchValue: ''
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.content;
      state.totalPages = action.payload.totalPages;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSize: (state, action) => {
      state.size = action.payload;
      state.page = 0;
    },
    setPageGroup: (state, action) => {
      state.pageGroup = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },

    setName: (state, action) => {
      state.name = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setStock: (state, action) => {
      state.stock = action.payload;
    },
    setImgUrl: (state, action) => {
      state.imgUrl = action.payload;
    },
  }

});

export const { setProducts, setProduct, setPage, setSize, setPageGroup,  
               setName, setDescription, setPrice, setStock, setImgUrl, 
               setSearchValue
              } = productsSlice.actions;

//제품 리스트 
export const fetchProducts = () => async (dispatch, getState) => {
  const { page, size } = getState().products;
  try{
    const response = await axios.get('/api/products', {
      params : {
        page,
        size
      }
    });
    dispatch(setProducts(response.data));
  } catch (error) {
    console.log("Error fetching products : ", error);
  }
}

// 제품 검색
export const searchProducts = () => async (dispatch, getState) => {
  const { page, size, searchValue } = getState().products;
  try{
    const response = await axios.post('/api/products/search', null, { 
      params: { 
        page,
        size,
        searchValue }
    });
    console.log(response.data);
    dispatch(setProducts(response.data));
  } catch (err) {
    console.log(err);
  }
}

// 제품 추가
export  const addProduct = () => async ( _ , getState) => {
    const { name, description, price, stock, imgUrl } = getState().products;
    try {
      const newProduct = { name, description, price, stock: parseInt(stock), imgUrl };
      const response = await axios.post('/api/products', newProduct);
      if (response.status === 201) {
        console.log('Product added', response.data);
        alert('추가되었습니다.');
      } else {
        console.error('Failed to add product:', response);
      }
        
    } catch (error) {
      console.error('Error adding product:', error);
    }
  }



