import React, { useState } from 'react'
import styles from './Nav.module.scss'
import { Link } from 'react-router-dom'
import data from './Nav.json'
import classNames from 'classnames'

export default function Nav() {

  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
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
            <li>로그인</li>
            <li>회원가입</li>
            <li>고객센터</li>
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

