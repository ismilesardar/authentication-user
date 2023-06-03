import axios from "axios";
import React from "react";
import { useState } from "react";
import {
  ErrorToast,
  IsEmail,
  IsEmpty,
  IsPassword,
  SuccessToast,
} from "../helper/FormHelper";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      if (IsEmpty(value["name"])) {
        ErrorToast("Name is Require");
        return false;
      }
      if (IsEmail(value["email"])) {
        ErrorToast("Valid Email Require!");
        return false;
      }
      if (IsPassword(value["password"])) {
        ErrorToast("Password must be 6 characters!");
        return false;
      }
      const { data } = await axios.post(
        `https://zany-gold-wildebeest-tie.cyclic.app/api/v1/register`,
        value
      );

      if (data?.error) {
        ErrorToast(data.error);
      } else {
        SuccessToast("Successful registration");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      ErrorToast("Registration failed. Try again!");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="card w-90 p-4">
              <div className="card-body">
                <h4>SIGN UP</h4>
                <hr />
                <input
                  value={value["name"]}
                  type="text"
                  className="form-control animated fadeInUp"
                  placeholder="name..."
                  onChange={(e) => setValue({ ...value, name: e.target.value })}
                  // defaultValue="ismailsardar540@gmail.com"
                />
                <br />
                <input
                  value={value["email"]}
                  type="email"
                  className="form-control animated fadeInUp"
                  placeholder="email"
                  onChange={(e) =>
                    setValue({ ...value, email: e.target.value })
                  }
                  // defaultValue="ismailsardar540@gmail.com"
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
                  onClick={handelSubmit}
                  className="btn w-100 animated fadeInUp float-end btn-primary"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
