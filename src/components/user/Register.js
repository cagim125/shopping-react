// import React, { useCallback, useEffect } from 'react'
import styles from './Register.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {setDisplayName, setPassword, setEmail, setName } from '../../slice/UserSlice'
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

export default function Register() {

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const users = useSelector((state) => state.users.users);
  const displayName = useSelector((state) => state.users.displayName);
  const password = useSelector((state) => state.users.password);
  const email = useSelector((state) => state.users.email);
  const name = useSelector((state) => state.users.name);

  const handleRegister = async () => {

    try {
      const response = await axios.post('/api/users/register',
        { displayName, password, email, name }
      );
      console.log('user Registered:', response.data);
      if (response.data != null) {
        alert('회원가입 완료 되었습니다');
        window.location.reload();
      }
      // fetchUsers();
    } catch (err) {
      console.log(err);
    }
  }

  // 모든 사용자 불러오기
  // const fetchUsers = useCallback( async () => {
  //   try {
  //     const response = await axios.get('/api/users');
  //     console.log(response.data);
  //     dispatch(setUsers(response.data));
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchUsers();
  // },[fetchUsers])

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2>User Management</h2>
        <h3>Register User</h3>
        <input type='text' placeholder='아이디' onChange={(e) => dispatch(setDisplayName(e.target.value))} />
        <input type='password' placeholder='비밀번호' onChange={(e) => dispatch(setPassword(e.target.value))} />
        <input type='email' placeholder='이메일' onChange={(e) => dispatch(setEmail(e.target.value))} />
        <input type='text' placeholder='이름' onChange={(e) => dispatch(setName(e.target.value))} />
        <button onClick={handleRegister}>가입하기</button>
      </div>

      {/* <div className={styles.allUsers}>
        <h3>All Users</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.displayName} - {user.email}</li>
          ))}
        </ul>
        <button onClick={fetchUsers}>Fetch Users</button>
      </div> */}
    </div>
  )
}
