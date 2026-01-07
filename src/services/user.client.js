const { createAxiosClient } = require("../http/createAxiosClient");
const config = require("../utils/config");

// services/user.client.js

module.exports.userClient = createAxiosClient({
  baseURL: config.USERS_BASE_URL,
  serviceName: "USER-SERVICE",
  timeout: 6000,
});
