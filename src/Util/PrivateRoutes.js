import React, { useContext } from 'react'
import { GlobalContext } from '../context/Globalcontext';

function PrivateRoutes() {

    const { loginData } = useContext(GlobalContext);
  return (
    <div>

    </div>
  )
}

export default PrivateRoutes