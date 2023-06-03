import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loading from "./Loading";
import { getToken } from "../../helper/SessionHelper";
const axiosConfig = { headers: { token: getToken() } };

const AdminRoute = () => {
  // get Token
  const token = getToken();
  //state
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const adminCheck = async () => {
      const { data } = await axios.get(
        `https://zany-gold-wildebeest-tie.cyclic.app/api/v1/admin-check`,
        axiosConfig
      );
      console.log(data);
      data.ok ? setOk(true) : setOk(false);
    };
    if (token) adminCheck();
  }, [token]);

  return ok ? <Outlet /> : <Loading />;
};

export default AdminRoute;
