import React from 'react'
import styles from './ProductWrite.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';


import {
  addProduct,
  setName,
  setDescription,
  setPrice,
  setStock,
  setImgUrl
}
  from '../../slice/productsSlice';
import axios from 'axios';


function ProductWrite() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector((state) => state.products.name);
  const description = useSelector((state) => state.products.description);
  const price = useSelector((state) => state.products.price);
  const stock = useSelector((state) => state.products.stock);
  // const imgUrl = useSelector((state) => state.products.imgurl);

  // const imgRef = useRef(null);

  const handleAddProduct = () => {
    dispatch(addProduct())
    navigate('/list');
  }

  const handleImgUpload = async (event) => {
    const file = event.target.files[0];
    const name = encodeURIComponent(event.target.files[0].name);

    console.log(file);
    console.log(name);

    if (file) {

      let result = await axios.get('/api/products/presigned-url?filename=' + name)

      let 결과 = await axios.put(result.data, file)


      if (결과.status === 200) {
        dispatch(setImgUrl(결과.config.url.split("?")[0]));
      }
    }

  }

  return (
    <div className={styles.addContainer}>

      <h3>Add Product</h3>
      <div>
        <input type='file' onChange={handleImgUpload} accept='image/*' />
      </div>
      <div>
        <input type="text" placeholder="Name" value={name} onChange={(e) => dispatch(setName(e.target.value))} />
      </div>
      <div>
        <input type="text" placeholder="Description" value={description} onChange={(e) => dispatch(setDescription(e.target.value))} />
      </div>
      <div>
        <input type="text" placeholder="Price" value={price} onChange={(e) => dispatch(setPrice(e.target.value))} />
      </div>
      <div>
        <input type="number" placeholder="Stock" value={stock} onChange={(e) => dispatch(setStock(e.target.value))} />
      </div>
      <div>
        <button className={styles.addBtn} onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
  )
}

export default ProductWrite