/**
 * Date: 03/06/2023
 * Subject: Auth project
 * Auth: Ismile Satdar
**/

//require package
const jwt =require("jsonwebtoken");
const Users = require("../model/user");

//Token verify middleware
exports.isSigning = async (req,res,next) => {
    try {
        const decoded = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        );
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json(error);
    }
}

//Role verify
exports.isAdmin = async (req,res,next) => {
    try {
        const user = await Users.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).json("Unauthorized");
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
    }
}