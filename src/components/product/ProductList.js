/* eslint-disable */
import styles from './ProductList.module.scss';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, searchProducts, setSearchValue, setPage, setPageGroup, setSize } from '../../slice/productsSlice';
// import axios from 'axios';

export default function ProductList() {

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const page = useSelector((state) => state.products.page);
  const size = useSelector((state) => state.products.size);
  const totalPages = useSelector((state) => state.products.totalPages);
  const pageGroup = useSelector((state) => state.products.pageGroup);
  const searchValue = useSelector((state) => state.products.searchValue);

  const pagesPerGroup = 5;



  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, page, size])


  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleSizeChange = (e) => {
    dispatch(setSize(parseInt(e.target.value), 10));

  };

  const handlePreviousGroup = () => {
    if (pageGroup > 0) dispatch(setPageGroup(pageGroup - 1));
  };

  const handleNextGroup = () => {
    if ((pageGroup + 1) * pagesPerGroup < totalPages) dispatch(setPageGroup(pageGroup + 1));

  };

  const startPage = pageGroup * size;
  const endPage = Math.min(startPage + size, totalPages);

  const handleSearchChange = (e) => {
    dispatch(setSearchValue(e.target.value));
  }

  const handleSearch = async () => {
    console.log("search Value : ", searchValue);
    dispatch(searchProducts());
    dispatch(setSearchValue(''));
    dispatch(setPage(0));
  }

  return (
    <div className={styles.product} >
      <div className={styles.search}>
        <input name='searchText' value={searchValue} onChange={handleSearchChange} style={{ display: 'inline' }} />
        <button onClick={handleSearch}>검색</button>
      </div>


      <div className={styles.custom_select} >
        <select onChange={handleSizeChange} value={size}>
          <option value={6}>6개만 보여줄까?</option>
          <option value={12}>12개만 보여줄까?</option>
          <option value={18}>18개만 보여줄까?</option>
          <option value={24}>24개만 보여줄까?</option>
        </select>
      </div>
      <h3>Products List</h3>
      <div className={styles.listbox_container} >
        {products.map(product => (
          <div className={styles.listbox} key={product.id}>
            <Link to={`/detail/${product.id}`}>
              <div>
                {
                  <img src={product.imgUrl ? product.imgUrl : 'https://placehold.co/600x400'}
                    className={styles.img} alt='img' />
                }
              </div>
              <div className={styles.content}>
                <h4>{product.name}</h4>
                <p>{" 가격 :  " + product.price} </p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={handlePreviousGroup}
          disabled={pageGroup === 0}
          className={styles.pageBtn}
        >
          <i class="fi fi-rr-angle-left"></i>
        </button>
        {Array.from({ length: endPage - startPage }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(startPage + index)}
            disabled={startPage + index === page}
            className={styles.pageBtn}
          >
            {startPage + index + 1}
          </button>
        ))}
        <button
          onClick={handleNextGroup}
          disabled={endPage >= totalPages}
          className={styles.pageBtn}
        >
          <i class="fi fi-rr-angle-right"></i>
        </button>
      </div>
    </div>

  )
}

