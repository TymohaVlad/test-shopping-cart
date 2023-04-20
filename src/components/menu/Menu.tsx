import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosBasket } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { shoppingCartSelector } from '../../store/shopping-cart/shoppingCartSlice';

import './Menu.css';
export default function Menu() {
  const selector = useSelector(shoppingCartSelector);

  return (
    <nav className='navigation__menu'>
      <div className='logo'>
        <NavLink className='Logo' to='/'>
          <h2>SHOP</h2>
        </NavLink>
      </div>
      <div className='navigation__links'>
        <NavLink className='page__link' to='/'>
          Home
        </NavLink>
        <NavLink className='page__link' to='/cart-list'>
          <div className='widget__cart'>
            <p className='count-items__cart'>{selector.shoppingCart.items.map(it=>it.quantity).reduce( (a, b)=>a+b, 0)}</p>
            <IoIosBasket className='cart__icon' />
          </div>
        </NavLink>
      </div>
    </nav>
  );
}
