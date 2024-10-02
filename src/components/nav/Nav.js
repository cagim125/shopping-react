import axios from 'axios'
import classNames from 'classnames'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import data from './Nav.json'
import styles from './Nav.module.scss'

export default function Nav() {

  const [activeIndex, setActiveIndex] = useState(0);
  const user = useSelector((state) => state.users.member);

  const handleClick = (index) => {
    setActiveIndex(index);
  }
  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      alert('로그아웃 성공');
      localStorage.removeItem('user');
      window.location.href = '/';
    } catch (error) {
      console.error('로그아웃 에러 : ', error);
    }
  }

  return (
    <>
      <nav className={styles.container}>
        <div className={styles.navigation}>
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/images/myriad.png`}
              // public\images\shopify.png
              alt="프로필 이미지"
            />
          </Link>
          <div style={{ width: '100px' }}></div>
          <ul>
            {user && user.displayName ? (
              <>
                <li><h4>{user.displayName}</h4></li>
                <li><Link className={styles.link} to="/mypage">마이페이지</Link></li>
                <li> <p style={{cursor:'pointer'}} className={styles.link} onClick={handleLogout}>로그아웃</p></li>
                <li>고객센터</li>
              </>
            ) : (
              <>
                <li><Link className={styles.link} to="/login">로그인</Link></li>
                <li><Link className={styles.link} to="/join">회원가입</Link></li>
                <li>고객센터</li>
              </>
            )}
          </ul>
        </div>

        <div className={styles.container_category}>
          {
            data.category.map((category) => (
              <div className={styles.category} key={category.id}>
                <div className={styles.image}>
                  <Link to={category.path}  >
                    <img src={category.image} alt='categoey Img' />
                  </Link>
                </div>
                <h4>{category.content}</h4>
              </div>
            ))
          }
        </div>

        <div className={styles.container_list}>
          <ul>
            {data.navigation.map((nav, index) => (
              <li key={nav.id}
                className={classNames({
                  [styles.active]: activeIndex === index
                })}
                onClick={() => handleClick(index)}
              >
                <Link className={styles.link}
                  to={nav.path}>{nav.content}</Link>
              </li>
            ))}
          </ul>
        </div>



      </nav>



    </>
  )
}

