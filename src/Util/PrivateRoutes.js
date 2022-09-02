import React, { useContext, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { GlobalContext } from '../context/Globalcontext';

function PrivateRoutes() {
  
  const { loginData } = useContext(GlobalContext);
  let auth = { 'token': loginData.id }

  useEffect(() => {
    console.log("window.location", loginData, Object.keys(loginData).length === 0, window.location.pathname)
    if (Object.keys(loginData).length === 0 && window.location.pathname !== 'login') {
      <Navigate to='/login' />
    }
  }, [window.location.pathname, loginData])


    return (
        auth.token ? <Outlet /> : <Navigate to='/login' />
  )
}

export default PrivateRoutes