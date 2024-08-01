import React, { useState } from 'react'
import styles from './Login.module.scss'

export default function Login() {

  const [id, setID] = useState('');
  const [pw, setPw] = useState('');

  const handleId = (e) => {
    console.log(e.target.value);
    setID(e.target.value);
  }
  const handlePw = (e) => {
    console.log(e.target.value);
    setPw(e.target.value);
  } 

  const handleLogin = () => {
    console.log('로그인 버튼 누름');
    console.log('ID :', id);
    console.log('PW :', pw);
  }

  return (
    <div className={styles.Wrapper}>
      <div style={{marginBottom:'12px'}}>
        <img style={{width:'100px'}} src={`${process.env.PUBLIC_URL}/images/bootstrap.png`} alt='Login Page Logo'/>
      </div>
      <div>
        <input placeholder='아이디' onChange={(e) => handleId(e)}/>
      </div>
      <div>
        <input placeholder='비밀번호' type='password' onChange={(e) => handlePw(e)} />
      </div>
      <button onClick={handleLogin}>로그인</button>
    </div>
  )
}
