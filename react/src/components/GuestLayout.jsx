import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
 
function GuestLayout() {

    const {token} = useStateContext();
    if(token){
        return <Navigate to="/working-directory"/>
    }

  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default GuestLayout