import React from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ErrorToast, IsEmail, IsPassword, SuccessToast } from "../helper/FormHelper";
import axios from "axios";
import { useState } from "react";
import { setToken, setUser } from "../helper/SessionHelper";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handelLogin = async (e) => {
    e.preventDefault();
    try {
      if (IsEmail(value["email"])) {
       return ErrorToast("Valid Email Require!");
      } else if (IsPassword(value["password"])) {
        return ErrorToast("Password must be 6 characters!");
      }
      const { data } = await axios.post(
        "https://zany-gold-wildebeest-tie.cyclic.app/api/v1/login",
        value
      );

      // console.log(data);

      if (data?.error) {
        ErrorToast(data.error);
      } else {
        setUser(data["user"]);
        setToken(data["Token"]);
        SuccessToast("Login Success...");
        navigate(
          location.state ||
            `/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`
        );
      }
    } catch (error) {
      console.log(error);
      ErrorToast("Login failed. Try again...");
    }
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="card w-90 p-4">
              <div className="card-body">
                <h4>SIGN IN</h4>
                <hr />
                <input
                  value={value["email"]}
                  type="email"
                  className="form-control animated fadeInUp"
                  placeholder="email"
                  onChange={(e) =>
                    setValue({ ...value, email: e.target.value })
                  }
                />
                <br />
                <input
                  value={value["password"]}
                  type="password"
                  className="form-control animated fadeInUp"
                  placeholder="password"
                  onChange={(e) =>
                    setValue({ ...value, password: e.target.value })
                  }
                />
                <br />
                <button
                  onClick={handelLogin}
                  className="btn w-100 animated fadeInUp float-end btn-primary"
                >
                  Next
                </button>
                <hr />
                <div className="text-center mt-3">
                  <span>
                    <Link
                      className="text-center ms-3 h6 animated fadeInUp"
                      to="/register"
                    >
                      Registration
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
