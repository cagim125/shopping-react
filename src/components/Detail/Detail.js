import axios from 'axios';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setProduct } from '../../slice/productsSlice';
import styles from './Detail.module.scss';
import Tab from './Tab';

export default function Detail() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const [tab, setTab] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);

  const product = useSelector((state) => state.products.product);
  const user = useSelector((state) => state.users.member);


  useEffect(() => {
    const getProduct = async () => {
      await axios.get(`/api/products/${id}`)
        .then(response => {
          console.log(response.data);
          dispatch(setProduct(response.data));
        })
    };

    getProduct();
  }, [dispatch, id]);

  const tabs = [
    { id: 0, label: '상세정보' },
    { id: 1, label: '리뷰' },
    { id: 2, label: 'Q&A' },
    { id: 3, label: '반품/교환정보' }
  ];


  const handleEditProduct = () => {
    navigate('/edit');
  }



  // console.log("Product Data:", product);
  // console.log("user : ", user);


  return (
    <>
      <div className={styles.container}>
        <div className={styles.product}>
          {
            <img src={product.imgUrl ? product.imgUrl : 'https://placehold.co/600x400'}
              alt={product.name}
              className={styles.productImage} />
          }
          <div className={styles.item}>
            <h1> 상품 이름 :  {product.name} </h1>
            <h2> 브랜드 :  {product.description} </h2>
            <h3> 가격 : {product.price} </h3>
            <h3> 남은 수량 : {product.stock}</h3>
            {user.authorities === "[ROLE_ADMIN]"
              &&
              <button
                className={styles.edit}
                onClick={() => handleEditProduct()}
              >수정하기</button>
            }

          </div>
        </div>
        <div className={styles.tab}>
          <ul>
            {tabs.map((tab) => (
              <li
                key={tab.id}
                onClick={() => { setSelectedTab(tab.id); setTab(tab.id) }}
                className={classNames({
                  [styles.selectedTab]: selectedTab === tab.id
                })}
              >
                {tab.label}

              </li>
            ))}
          </ul>
        </div>
        <Tab tab={tab} userId={user.userId} productId={product.id} />
      </div>
    </>
  )
}

