/* eslint-disable */
import React from 'react';
import styles from './App.module.scss';
import { Routes, Route } from 'react-router-dom';

import { useState, useEffect } from 'react';
import axios from 'axios';

//Component
import Detail from './components/Detail/Detail';
import Nav from './components/nav/Nav';
import ProductList from './components/product/ProductList';
import ProductWrite from './components/product/ProductWrite';
import ProductEdit from './components/product/ProductEdit';
import ProductManagementComponent from './components/ProductManagementComponent';
import { useSelector } from 'react-redux';
import Main from './components/product/Main';



// export const Context1 = React.createContext();


export default function App() {

  const product = useSelector((state) => state.products.product);


  return (
    <>

      <Nav />
      
      <div styles={styles.app}>
        <Routes>
          <Route path='/' element={ <Main />} />
          <Route path='/list' element={<ProductList/>} />
          <Route path='/write' element={<ProductWrite />} />
          
          <Route path='/test' element={<ProductManagementComponent />} />
          
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/edit" element={ <ProductEdit product={product} />} />
        </Routes>
      </div>

    </>
  );
}


