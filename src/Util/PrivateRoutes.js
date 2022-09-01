import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { GlobalContext } from '../context/Globalcontext';

function PrivateRoutes() {

    const { loginData } = useContext(GlobalContext);
    let auth = { 'token': loginData.id }

    return (
        auth.token ? <Outlet /> : <Navigate to='/login' />
  )
}

export default PrivateRoutes