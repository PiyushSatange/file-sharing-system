const jwt = require("jsonwebtoken");

const isTokenValid = (req, res, next) => {
  console.log("inside token valid middleware");
  const token = req.cookies.jwt;
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return res
          .status(400)
          .json({ success: false, msg: "session expired", error: err });
      } else {
        req.user = decoded;

        console.log("sending it to controller", req.user);
        next();
      }
    });
  } else {
    return res.status(404).json({ success: false, msg: "token not available" });
  }
};

module.exports = { isTokenValid };
