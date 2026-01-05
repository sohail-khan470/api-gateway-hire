const config = require("../utils/config");
const { UnauthorizedError } = require("../utils/errors");
const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  if (!req.session.jwt) {
    throw new UnauthorizedError("Token is not avalible please login again");
  }

  try {
    const jwt = req.session.jwt;
    const payload = req.session.jwt;
    const currentUser = await jwt.verify(req.session.jwt, config.JWT_TOKEN);
    req.currentUser = currentUser;
  } catch (error) {
    throw new UnauthorizedError("Token is not avalible please login");
  }
};
