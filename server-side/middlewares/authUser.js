const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if(!authHeader) {
    const error = new Error();
    error.statusCode = 401;
    error.msg = "Not authorized";
    throw error;
  }
  const token = req.get("Authorization").split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_CODE);
    if(!decoded) {
      const error = new Error();
      error.statusCode = 401;
      error.msg = "Not authorized";
      throw error;
    }
    req.user = decoded;
    next();
  }catch (err) {
    next(err);
  }
}