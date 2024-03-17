const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("auth-token");

  // console.log("Token:", token);

  // CHECK IF Existence of TOKEN
  if (!token) {
    return res.status(401).json({
      errors: [
        {
          msg: "No token found",
        },
      ],
    });
  }

  try {
    const user = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user.email;
    next();
  } catch (error) {
    return res.status(400).json({
      errors: [
        {
          msg: error,
        },
      ],
    });
  }
};
