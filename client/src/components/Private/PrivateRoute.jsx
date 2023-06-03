import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import Loading from './Loading';
import { getToken } from '../../helper/SessionHelper';

const PrivateRoute = () => {
    const token = getToken();
    const [ok, setOk] = useState(false);

    useEffect(() => {
      
        token ? setOk(true) : setOk(false);

    }, [token])
    

  return (
    ok ? <Outlet/> : <Loading />
  );
}

export default PrivateRoute