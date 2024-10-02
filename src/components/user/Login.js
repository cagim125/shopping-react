import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setMember } from '../../slice/UserSlice';
import styles from './Login.module.scss';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', user.email);
      formData.append('password', user.password);

      const response = await axios({
        url: '/loginProc',
        method: 'POST',
        data: formData,
        withCredentials: true,
      });
      if (response.status === 200) {
        alert('로그인 성공! ');
        console.log('유저 이메일: ' + response.data.email);
        console.log('권한: ' + response.data.authorities);
        // Redux에 사용자 정보 저장
        dispatch(setMember(response.data));
        
        // 로컬 스토리지에 사용자 정보 저장
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/', { state: { userData: response.data } });
      }
    } catch (error) {
      console.log('로그인 에러: ', error);
    }
  };


  return (
    <>
      <div className={styles.Wrapper}>
        <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img style={{ width: '100px' }} src={`${process.env.PUBLIC_URL}/images/bootstrap.png`} alt='Login Page Logo' />
          <h3>로그인</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="email" placeholder="이메일" value={user.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="비밀번호" value={user.password} onChange={handleChange} />
          <button type="submit">로그인</button>
        </form>
        <Link style={{textDecoration: 'none', color: 'black'}} to="/join">
          회원가입
        </Link>
      </div>
    </>
  )
}
