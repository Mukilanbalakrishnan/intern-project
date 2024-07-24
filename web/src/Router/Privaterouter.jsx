import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const Privaterouter = () => {
  const user=true;
  return <div>{user ? <Outlet />:<Navigate to="/Login"/>}</div>;
}

export default Privaterouter