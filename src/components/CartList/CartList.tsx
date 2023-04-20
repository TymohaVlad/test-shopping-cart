import React from 'react';
import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import {
  shoppingCartSelector,
  removeItem,
  addItem,
  updateItemQuantity,
} from '../../store/shopping-cart/shoppingCartSlice';
import { useDispatch } from 'react-redux';
import './CartList.css';

const CartList: FunctionComponent = () => {
  const { items } = useSelector(shoppingCartSelector).shoppingCart;
  const dispatch = useDispatch();

  const handleIncrement = (id: number) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      dispatch(addItem({ ...item, quantity: item.quantity + 1 }));
    }
  };

  const handleDecrement = (id: number) => {
    const item = items.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      dispatch(updateItemQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(id));
    }
  };

  const total = items.reduce((accumulator, item) => {
    return accumulator + item.quantity * item.price;
  }, 0);

  return (
    <article className='cart__list'>
      <div className='header__cartList'>
        <h2>Cart</h2>
        <h3>
          Products in cart -{' '}
          <strong>{items.reduce((total, item) => total + item.quantity, 0)}</strong>{' '}
        </h3>
        <h3>
          Total cost - <strong>${total.toFixed(2)}</strong>
        </h3>
      </div>
      {items.map((item) => (
        <div className='product__info' key={item.id}>
          <div className='product__image'>
            <img src={item.image} alt='' />
          </div>
          <div className='product__title'>
            <h4>Product name:</h4>
            {item.title}
          </div>
          <div className='product__price'>
            <h4>Price:</h4>${item.price}
          </div>
          <div className='product__quantity'>
            <h4>Quantity:</h4>
            <button className='quantity__button' onClick={() => handleDecrement(item.id)}>
              -
            </button>
            {item.quantity}
            <button className='quantity__button' onClick={() => handleIncrement(item.id)}>
              +
            </button>
          </div>
          <button className='remove__btn' onClick={() => dispatch(removeItem(item.id))}>
            Remove
          </button>
        </div>
      ))}
    </article>
  );
};

export default CartList;
