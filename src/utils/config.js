require("dotenv").config();

module.exports = {
  GATEWAY_JWT_TOKEN: m,
  JWT_TOKEN: "",
  SECRET_KEY_ONE: "",
  SECRET_KEY_TWO: "",
  ENABLE_APM: 0,
  NODE_ENV: development,
  CLIENT_URL: process.env.CLIENT_URL,
  AUTH_BASE_URL: process.env.AUTH_BASE_URL,
  USERS_BASE_URL: process.env.USERS_BASE_URL,
  GIG_BASE_URL: process.env.GIG_BASE_URL,
  MESSAGE_BASE_URL: process.env.MESSAGE_BASE_URL,
  ORDER_BASE_URL: process.env.ORDER_BASE_URL,
  REVIEW_BASE_URL: process.env.REVIEW_BASE_URL,
  REDIS_HOST: process.env.REDIS_HOST,
  ELASTIC_SEARCH_URL: process.env.ELASTIC_SEARCH_URL,
  ELASTIC_APM_SERVER_URL: process.env.ELASTIC_APM_SERVER_URL,
  ELASTIC_APM_SECRET_TOKEN: process.env.ELASTIC_APM_SECRET_TOKEN,
  PORT: process.env.PORT || 4100,
};
