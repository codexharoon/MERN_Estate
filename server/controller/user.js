import bcryptjs from "bcryptjs";
import USER from "../models/user.js";

export const update = async (req, res, next) => {
  try {
    if (req.user.id != req.params.id) {
      return next(errorHandler(403, "You can update only your account!"));
    }

    if (req.body.password) {
      const salt = bcryptjs.genSaltSync(10);
      req.body.password = bcryptjs.hashSync(req.body.password, salt);
    }

    const updateUser = await USER.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          photo: req.body.photo,
        },
      },
      {
        new: true,
      }
    );

    const { password: hashpass, ...rest } = updateUser._doc;

    res.status(200).json({
      success: true,
      user: rest,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.id != req.params.id) {
      return next(errorHandler(403, "You can update only your account!"));
    }

    await USER.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await USER.findById(req.params.id);

    if (!user) {
      return res.json(errorHandler(404, "User not found!"));
    }

    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};
