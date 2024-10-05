import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from "./Tab.module.scss";

export default function Tab({ tab, userId, productId }) {

  console.log(productId);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState();

  const handleReview = async () => {
    try {

      const response = await axios.get(`/api/comment?productId=` + productId);

      console.log(response.data);
      setReviews(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    console.log(e.target.value);
    setReview(e.target.value);
  }

  const handleAddReview = async () => {
    try {
      const response = await axios.post("/api/comment/add", {
        userId : userId,
        productId: productId,
        review : review
      });

    } catch (error) {
      console.log("리뷰 등록 에러", error);
      alert("리뷰를 이미 등록하셨습니다.");
    }
  }

  useEffect(() => {
    handleReview();
  }, [])

  console.log(reviews);

  return [
    <div>상세내용</div>,
    <div>
      <div className={styles.review}>
        <input type='text' placeholder='리뷰 등록' onChange={(e) => handleChange(e)} />
        <button onClick={handleAddReview}>등록</button>
      </div>
      {
        reviews.map(review => (
          <div className={styles.wrap} key={review.id}>
            <h5>{review.user.userName}</h5>
            <h4>{review.content} </h4>
          </div>
        ))
      }
    </div>,
    <div>Q&A내용2</div>,
    <div>반품/교환정보</div>][tab]

}

