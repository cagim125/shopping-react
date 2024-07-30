/* eslint-disable */
import React, { useEffect, useState } from 'react';
import styles from './ProductManagementComponent.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setPage, setPageGroup, setSize } from '../slice/productsSlice';

function ProductManagementComponent() {

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const page = useSelector((state) => state.products.page);
  const size = useSelector((state) => state.products.size);
  const totalPages = useSelector((state) => state.products.totalPages);
  const pageGroup = useSelector((state) => state.products.pageGroup);
  const pagesPerGroup = 5;

  const user = useSelector((state) => { return state.user})
  const stock = useSelector((state) => {return state.stock})
  console.log(user)
  console.log(stock)



  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, page, size])


  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleSizeChange = (e) => {
    dispatch(setSize(parseInt(e.target.value), 10));
    
  };

  const handlePreviousGroup = () =>{
    if (pageGroup > 0) dispatch(setPageGroup(pageGroup -1));
  };

  const handleNextGroup = () => {
    if ((pageGroup + 1) * pagesPerGroup < totalPages ) dispatch(setPageGroup(pageGroup + 1));
    
  };

  const startPage = pageGroup * pagesPerGroup;
  const endPage = Math.min(startPage + pagesPerGroup, totalPages);


  return (
    <div className={styles.product}>

        <h3>Products List</h3>

        <select onChange={handleSizeChange} value={size}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        {products.map(product => (
          <div className={styles.listbox} key={product.id}>
            <h4>
              <Link to={`/detail/${product.id}`}>{product.name}</Link>
              <span> -  가격 :  {product.price} </span>
            </h4>
          </div>
        ))}
        <div className={styles.pagination}>
        <button
          onClick={() => handlePreviousGroup()}
          disabled={ pageGroup === 0}
        >
          이전

        </button>
        {Array.from({ length : endPage - startPage }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(startPage + index)}
            disabled={startPage + index === page}
          >
          {startPage + index + 1}
          </button>
        ))}
        <button
          onClick={() => handleNextGroup()}
          disabled={ endPage >= totalPages}
        >
          다음

        </button>
        </div>
        
      </div>
   
  )
}

export default ProductManagementComponent