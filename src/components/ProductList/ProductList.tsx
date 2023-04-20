import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import { addItem } from '../../store/shopping-cart/shoppingCartSlice';
import { FC, useState, useEffect } from 'react';
import ApiClient from '../ApiClient';
import { ShoppingCartItem } from '../../store/shopping-cart/shoppingCartSlice';
import { NavLink } from 'react-router-dom';

import './ProductList.css';

const ProductList: FC = () => {
  const [products, setProducts] = useState<ShoppingCartItem[]>([]);
  const [error, setError] = useState('');
  const apiClient = new ApiClient();
  const dispatch = useAppDispatch();
  useEffect(() => {
    apiClient
      .fetch('/products')
      .then((response) => response.json())
      .then((products) => setProducts(products))
      .catch((error) => setError(error.message));
  }, []);
  if (error) {
    return <span className='error__text'>Error: {error}</span>;
  }

  return (
    <article className='product__card'>
      {products.map((product) => {
        return (
          <div key={product.id} className='card__content'>
            <img className='product__image' src={product.image} alt='' />
            <h3 className='product__title'>{product.title}</h3>
            <p className='product__price'>{product.price} $</p>
            <button className='add__btn' onClick={() => dispatch(addItem(product))}>
              Add to Cart
            </button>
            <br />
            <NavLink className='description__btn' to={`/description/${product.id}`}>
              Description product
            </NavLink>
          </div>
        );
      })}
    </article>
  );
};

export default ProductList;
