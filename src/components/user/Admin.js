import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Admin.module.scss";

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // 가격을 원화로 포맷하는 함수
  const formatPriceToKRW = (price) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(price);
  };

  useEffect(() => {
    const getOrder = async () => {
      await axios.get(`/api/sales/order`)
        .then(response => {
          console.log("Mypage : ", response);
          setOrders(response.data);

        })
        .catch(error => {
          console.log(error);
          alert("로그인 해주새요.");
          navigate("/login");

        })
    };
    getOrder();
  }, [navigate])



  const totalPrice = orders.reduce((acc, order) => acc + (order.price * order.count), 0);


  return (
    <div className={styles.wrap}>
      {orders &&
        orders.map((order, index) => (
          <ul key={index} className={styles.item}>
              <li>
                <h5>{index + 1}</h5>
                <h3>{order.itemName}</h3>
                <p><strong>{formatPriceToKRW(order.price * order.count) }</strong></p>
                <p>수량 : {order.count}</p>
              </li>
          </ul>
        ))
      }
      <div style={{ padding: '10px', textAlign: 'right' }}>
        <strong>총 금액 : {formatPriceToKRW(totalPrice)}</strong>
      </div>

    </div>
  );
}
