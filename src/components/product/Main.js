import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import styles from './Main.module.scss'
import axios from 'axios';

export default function Main() {

  const [products, setProducts] = useState([]);
  const [nikes, setNikes] = useState([]);

  const randomProducts = async () => {
    try {
      const response = await axios.get('/api/products/sale');
      console.log(response);
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const nikeProducts = async () => {
    try {
      const response = await axios.get('/api/products/nike');
      console.log(response.data);
      setNikes(response.data);
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    randomProducts();
    nikeProducts();
  }, [])


  return (
    <div className={styles.grid_container}>
      <div className={styles.main}>
        <div className={styles.item}>
          <h4><span>아무개님</span>을 위한 오늘의 행사</h4>
          <p>오늘행사 전체보기</p>
        </div>
        <div className={styles.product}>
          {
            products.map((product) => (
              <Link to={`/detail/${product.id}`} key={product.id}>
                <div className={styles.sale} >
                  <img style={{ width: '150px', height: '130px', borderRadius:'12px' }}
                    src={product.imgUrl ? product.imgUrl : 'https://placehold.co/150x130'}
                    alt='product img' />
                  <div>
                    <h4>{product.name}</h4>
                    <p>{product.price.toLocaleString('ko-KR')}원</p>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
      </div>

      <div className={styles.sidebar}>
        <div className={styles.title}>
          <h4>Nike</h4>
          <p>Nike 상품 전체 보기</p>
        </div>

        <div className={styles.nike}>
          {
            nikes.map((nike) => (
              <Link to={`/detail/${nike.id}`} key={nike.id}>
                <div className={styles.nikeItem} >
                  <img
                    src={nike.imgUrl ? nike.imgUrl : 'https://placehold.co/200x150'}
                    alt='nike item' />

                  <div className={styles.nikeContent}>
                    <h4>{nike.name}</h4>
                    <p>{nike.price.toLocaleString('ko-KR')}원</p>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
      </div>


    </div>

  )
}
