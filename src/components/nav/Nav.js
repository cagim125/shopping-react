import React ,{ useState } from 'react'
import styles from './Nav.module.scss'
import { Link } from 'react-router-dom'
import data from './Nav.json'
import classNames from 'classnames'

export default function Nav() {

  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index);
  }

  return (
    <>
      <div className={styles.container}>
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
          <li>마이페이지</li>
          <li>고객센터</li>
        </ul>
      </div>

      <nav className={styles.container}>
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
        
      </nav>

    </>
  )
}

