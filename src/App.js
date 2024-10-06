/* eslint-disable */

import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';

import { useDispatch } from 'react-redux';
import { setMember } from './slice/UserSlice';
// import axios from 'axios';


//Component
import { useSelector } from 'react-redux';
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



// export const Context1 = React.createContext();


export default function App() {

  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.product);

  useEffect(() => {
    const storeUser = localStorage.getItem("user");

    dispatch(setMember(storeUser));

  }, [])

  
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");

  //   if (storedUser) {
  //     // localStorage에 저장된 유저 정보를 Redux 상태로 복원
  //     dispatch(setMember(JSON.parse(storedUser)));

  //     // 서버 세션 유효성 확인
  //     axios.get("/api/users/checkSession")
  //       .then(response => {
  //         if (!response.data.isAuthenticated) {
  //           // 세션이 유효하지 않으면 로그인 페이지로 이동
  //           localStorage.removeItem("user");
  //           navigate("/login");
  //         }
  //       })
  //       .catch(() => {
  //         // 에러 발생 시 로그인 페이지로 이동
  //         localStorage.removeItem("user");
  //         navigate("/login");
  //       });
  //   } else {
  //     // localStorage에 유저 정보가 없으면 로그인 페이지로 이동
  //     navigate("/login");
  //   }
  // }, [dispatch, navigate]);

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


