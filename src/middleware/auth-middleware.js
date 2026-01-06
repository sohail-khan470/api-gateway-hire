const config = require("../utils/config");
const { UnauthorizedError, BadRequestError } = require("../utils/errors");
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
  next();
};

const verifyGatewayRequest = (req, res, next) => {
  if (!req.headers.gatewayToken) {
    throw new UnauthorizedError(
      "Invalid request Request not comming from api gateway"
    );
  }
};

const checkAuthentication = (req, res, next) => {
  if (!req.currentUser) {
    throw new BadRequestError("User not Authorized,gateway");
  }
  next();
};
