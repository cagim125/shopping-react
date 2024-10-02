/* eslint-disable */
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';


//Component
import { useDispatch, useSelector } from 'react-redux';
import Detail from './components/Detail/Detail';
import Nav from './components/nav/Nav';
import Main from './components/product/Main';
import ProductEdit from './components/product/ProductEdit';
import ProductList from './components/product/ProductList';
import ProductWrite from './components/product/ProductWrite';
import ProductManagementComponent from './components/ProductManagementComponent';
import Admin from './components/user/Admin';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { setMember } from './slice/UserSlice';



// export const Context1 = React.createContext();


export default function App() {
  const dispatch = useDispatch();

  const product = useSelector((state) => state.products.product);

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 로드
    const user = localStorage.getItem('user');

    if (user) {
      dispatch(setMember(JSON.parse(user)));
    }

  }, [])

  return (
    <>

      <div styles={styles.app}>
        <Nav />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path="/mypage" element={ <Admin /> } />
          <Route path='/list' element={<ProductList />} />
          <Route path='/write' element={<ProductWrite />} />

          <Route path='/test' element={<ProductManagementComponent />} />

          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/edit" element={<ProductEdit product={product} />} />

          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Register />} />
        </Routes>
      </div>

    </>
  );
}


