// import React, { useCallback, useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import styles from './Register.module.scss';
// import { useNavigate } from 'react-router-dom';

export default function Register() {

  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const users = useSelector((state) => state.users.users);


  const [user, setUser] = useState({
    userName: '',
    userEmail: '',
    password: '',
  });

  const handleChange = (e) => {
    console.log(e.target);
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/join', user);
      alert('회원가입 완료');
      window.location.href = '/';
    } catch (error) {
      console.log('회원가입 에러: ' + error);
    }
  };



  return (
    <div className={styles.wrapper}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h3>회원가입</h3>
        <input type="text" id="userName" value={user.userName} placeholder="아이디" onChange={handleChange} />
        <input type="text" id="password" value={user.password} placeholder="비밀번호" onChange={handleChange} />
        <input type="text" id="userEmail" value={user.userEmail} placeholder="이메일" onChange={handleChange} />
        <button type="submit">회원가입</button>
      </form>
    </div>
  )
}
