const { User } = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (password.length < 6) {
    return res
      .status(400)
      .json({ success: false, msg: "Password must be more than 6 characters" });
  }

  try {
    const hash = await bcryptjs.hash(password, 10);
    await User.create({
      firstName,
      lastName,
      email,
      password: hash,
    }).then((user) => {
      const token = jwt.sign(
        { id: user._id, email, firstName, lastName, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: 100,
        }
      );
      res.cookie("jwt", token, {
        httpOnly: true,
      });
      return res
        .status(201)
        .json({ success: true, msg: "User created successfully", user });
    });
  } catch (error) {
    if (error.code === 11000) {
      // 🔹 MongoDB duplicate email error
      return res
        .status(409)
        .json({ success: false, msg: "Email already exists" });
    }
    return res.status(500).json({
      success: false,
      msg: "Something went wrong",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, msg: "email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ success: false, msg: "password is required" });
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ success: false, msg: "User not found" });
  } else {
    const result = await bcryptjs.compare(password, user.password);
    if (result == true) {
      const token = jwt.sign(
        {
          id: user._id,
          email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 1000,
        }
      );
      res.cookie("jwt", token, {
        httpOnly: true,
      });
      return res
        .status(200)
        .json({ success: true, msg: "Login successful", user });
    } else {
      return res
        .status(401)
        .json({ success: false, msg: "incorrect username or password" });
    }
  }
};

const logout = async (req, res) => {
  if (!req.cookies.jwt) {
    return res
      .status(404)
      .json({ success: false, msg: "No active session found" });
  }

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "Lax", // Use Lax if frontend & backend are on different domains
  });
  res.status(200).json({ success: true, msg: "Logged out successfully" });
};

const isTokenValid = (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return res
          .status(400)
          .json({ success: false, msg: "session expired", error: err });
      } else {
        return res
          .status(200)
          .json({ success: true, msg: "valid token found", data: decoded });
      }
    });
  } else {
    return res.status(404).json({ success: false, msg: "token not available" });
  }
};

const giveAdminAccess = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ msg: "id is required" });
  }
  try {
    await User.findById(id).then((user) => {
      if (!user) {
        return res.status(400).json({ msg: "User not exist with the give id" });
      } else {
        if (user.role !== "admin") {
          user.role = "admin";
          user
            .save()
            .then(() => {
              return res
                .status(200)
                .json({ msg: "User set to admin successfuly", user: user });
            })
            .catch((err) => {
              return res.status(400).json({
                msg: "Problem while updating the role",
                error: err.message,
              });
            });
        } else {
          return res.status(400).json({ msg: "User is already an admin" });
        }
      }
    });
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "something went wong", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.body;
  await User.deleteOne({ _id: id })
    .then((user) => {
      return res
        .status(200)
        .json({ msg: "User deleted successfuly", user: user });
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ msg: "something went wrong", error: err.message });
    });
};

module.exports = {
  register,
  login,
  giveAdminAccess,
  deleteUser,
  isTokenValid,
  logout,
};
