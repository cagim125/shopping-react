import React from 'react'
// import styles from './Tab.module.scss'

export default function Tab({tab}) {
  return [ <div>상세내용</div>, <div>리뷰내용1</div>, <div>Q&A내용2</div>, <div>반품/교환정보</div> ][tab]
    
}

