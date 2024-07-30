import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setName, setDescription, setPrice, setStock } from '../../slice/productsSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProductEdit({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useSelector((state) => state.products.name);
  const description = useSelector((state) => state.products.description);
  const price = useSelector((state) => state.products.price);
  const stock = useSelector((state) => state.products.stock);

  const handleEditProduct = async () => { 
    const response = await axios.put(`/api/products/${product.id}`, {
      name,
      description,
      price,
      stock
    })
    console.log('Edit result : ' + response);
    if(response) {
      navigate(`/detail/${product.id}`)
    }
  }

  useEffect(() => {
    if(product) {
      dispatch(setName(product.name));
      dispatch(setDescription(product.description));
      dispatch(setPrice(product.price));
      dispatch(setStock(product.stock));
    }
    
  }, [dispatch, product])

  return (
    <div >
    <h3>Edit Product</h3>
    <div>
      <input type="text" value={name}  onChange={(e) => dispatch(setName(e.target.value))} />
    </div>
    <div>
      <input type="text" value={description}  onChange={(e) => dispatch(setDescription(e.target.value))} />
    </div>
    <div>
      <input type="text" value={price}  onChange={(e) => dispatch(setPrice(e.target.value))} />
    </div>
    <div>
      <input type="number" value={stock} onChange={(e) => dispatch(setStock(e.target.value))} />
    </div>
    <button  onClick={handleEditProduct}>Edit Product</button>
  </div>
  )
}

export default ProductEdit