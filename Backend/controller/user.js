import user from '../model/user'
import mongoose from 'mongoose';

import bcrypt, { compareSync } from "bcrypt"
import jwt from 'jsonwebtoken';



export const userSignup = async (req, res) => {
try{
  const newdata = new user({

    first_name: req.body.first_name,
    last_name: req.body.last_name,
    address:{
    add_Line1: req.body.add_Line1,
    add_Line2: req.body.add_Line2,
    state: req.body.state,
    city: req.body.city,
    },
    phone: req.body.phone,
    email: req.body.email,

    password: bcrypt.hashSync(req.body.password, 8)

  })


  const result = await newdata.save();
  if (result) {
    let payload = {};
    payload._id = result._id;

    jwt.sign(
      payload,
      "SECRET_KEY",
      {
        expiresIn: "24h",
      },
      (err, token) => {
        res.send({
          token: token,
          status: true,
          statusCode: 200,
          message: "Registerd Successfully",
          result: result,
        });
      }
    );
  }
} catch (error) {
  throw error;
}
}


//login api
export const Login = async (req, res) => {
  const { email, password } = req.body;
  const result = await user.findOne({ email });
  if (!result) {
    res.send({
      status: false,
      message: "email not valid"
    })
  }

  const isValid = bcrypt.compareSync(password, result.password);
  if (isValid) {

    if (isValid) {
      let payload = {};
      payload._id = result._id;

      jwt.sign(
        payload,
        "SECRET_KEY",
        {
          expiresIn: "24h",
        },
        (err, token) => {
          res.send({
            Token: token,
            status: true,
            statusCode: 200,
            message: "Success Login",
            result: result,
          });
        }
      );
    } else {
      res.send({
        status: false,
        statusCode: 400,
        message: "Incorrect password",
      });
    }
    res.send({
      status: true,
      message: "login succesful ",
      data: result
    })
  }
  else {
    res.send({
      status: false,
      message: "password incorrect"
    });
  }
}

/*-----------------User Update------------------*/
export const updateUser = async (req, res) => {
  try {
    let data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address:{
        add_Line1: req.body.add_Line1,
        add_Line2: req.body.add_Line2,
        city: req.body.city,
        state: req.body.state,
      },
      phone: req.body.phone,
    };
    console.log(req.body.add_Line1)

    const result = await user.findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(req.body._id) },
      { $set: data },
      { new:true }
    );

    if (!result) {
      res.send({
        status: false,
        statusCode: 400,
        message: `Updation Failed!!
Something went wrong`,
        result: result,
      });
    } else {
      res.send({
        status: true,
        statusCode: 200,
        message: "Successfully Updated",
        result: result,
      });
    }
  } catch (e) {
    throw e;
  }
};
