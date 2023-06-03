/**
 * Date: 03/06/2023
 * Subject: Auth project
 * Auth: Ismile Satdar
**/

//package Required
const jwt = require("jsonwebtoken");
const Users = require("../model/user");
const { hashPassword, comparePassword } = require("../helper/helper");
//module scaffolded
const authCont = {};
//register Controller
authCont.register = async (req, res) => {
  try {
    // 1. destructure name, email, password from req.body
    const { name, email, password } = req.body;
    // 2. all fields require validation
    if (!name.trim()) {
      return res.status(404).json({ error: "Name is Required!" });
    }
    if (!email.trim()) {
      return res.status(404).json({ error: "E-mail is Required!" });
    }
    if (!password.trim() || password.length < 6) {
      return res
        .status(404)
        .json({ error: "Password must be at least 6 characters long!" });
    }
    // 3. check if email is taken
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(404).json({ error: "E-mail is already taken!" });
    }
    // 4. hash password
    const passwordHash = await hashPassword(password);
    // 5. register customer
    const newCustomer = await new Users({
      name,
      email,
      password: passwordHash,
    }).save();
    
    // 7. send response
    res.status(201).json({
        User: {
        name: newCustomer.name,
        email: newCustomer.email,
        role: newCustomer.role,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//login controller
authCont.login = async (req, res) => {
  try {
    // 1. destructure name, email, password from req.body
    const { email, password } = req.body;
    // 2. all fields require validation
    if (!email.trim()) {
      return res.status(404).json({ error: "E-mail is Required!" });
    }
    if (!password.trim() || password.length < 6) {
      return res
        .status(404)
        .json({ error: "Password must be at least 6 characters long!" });
    }
    // 3. check if email is taken
    const existingUser = await Users.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ error: "Customer not found!" });
    }
    // 4. compare password
    const match = await comparePassword(password, existingUser.password);
    if (!match) {
      return res.status(404).json({ error: "Rona password!" });
    }
    // 5. create signed jwt
    const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });
    // 7. send response
    res.status(200).json({
      user: {
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
      Token: token,
    });
  } catch (error) {
    console.log(error);
  }
};

//module exports
module.exports = authCont;
