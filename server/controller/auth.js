import bcryptjs from "bcryptjs";
import USER from "../models/user.js";
import { errorHandler } from "../utils/error-handler.js";
import jwt from "jsonwebtoken";
const isSecure = process.env.production === "true" ? true : false;

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    // checking username and email should be unique
    const checkUsername = await USER.findOne({ username });
    if (checkUsername) {
      return next(errorHandler(400, "Username already exists"));
    }

    const checkEmail = await USER.findOne({ email });
    if (checkEmail) {
      return next(errorHandler(400, "Email already exists"));
    }

    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    const newUSER = new USER({
      username,
      email,
      password: hashedPassword,
    });

    await newUSER.save();

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await USER.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid Credientials"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: hashedPassword, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: isSecure ? "none" : "lax",
        secure: isSecure,
      })
      .json({
        message: "User logged in successfully",
        ...rest,
      });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const { name, email, photo } = req.body;

    const existingUser = await USER.findOne({ email });
    if (existingUser) {
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = existingUser._doc;

      res
        .cookie("access_token", token, {
          httpOnly: true,
          sameSite: isSecure ? "none" : "lax",
          secure: isSecure,
        })
        .json({
          message: "User logged in successfully",
          ...rest,
        });
    } else {
      const randomPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      // here i'm groing to explain the above line of code with example
      // Math.random() gives a random number between 0 and 1 eg: 0.123456789
      // toString(36) converts the number to string with base 36 eg: 0.123456789 => 0.4fzyo3, here 36 means 0-9 and a-z
      // slice(-8) gives the last 8 characters from the string eg: 0.4fzyo3 => fzyo3
      // so the above code gives a random string of length 8 eg : fzyo3

      const salt = bcryptjs.genSaltSync(10);
      const hashedPassword = bcryptjs.hashSync(randomPassword, salt);

      const username = email.split("@")[0];

      const newUser = new USER({
        username,
        email,
        password: hashedPassword,
        photo,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hpass, ...rest } = newUser._doc;

      res
        .cookie("access_token", token, {
          httpOnly: true,
          sameSite: isSecure ? "none" : "lax",
          secure: isSecure,
        })
        .json({
          message: "User logged in successfully",
          ...rest,
        });
    }
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token").json({
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
