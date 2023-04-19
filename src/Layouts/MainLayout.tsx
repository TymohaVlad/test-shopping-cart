import React from 'react';
import { Outlet } from 'react-router-dom';
import Menu from '../components/menu/Menu';

export default function MainLayout() {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  );
}
