// http/createAxiosClient.js
const axios = require("axios");
const { v4: uuid } = require("uuid");
const { shouldRetry } = require("./retry");
const { GATEWAY_JWT_TOKEN } = require("../utils/config");

module.exports.createAxiosClient = ({
  baseURL,
  serviceName,
  timeout = 5000,
}) => {
  const client = axios.create({
    baseURL,
    timeout,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // 🔹 REQUEST INTERCEPTOR
  client.interceptors.request.use((config) => {
    const traceId = uuid();

    config.headers["x-gateway-token"] = GATEWAY_JWT_TOKEN;
    config.headers["x-service-name"] = serviceName;
    config.headers["x-trace-id"] = traceId;

    // Forward user JWT (if passed from route)
    if (config.userToken) {
      config.headers["authorization"] = `Bearer ${config.userToken}`;
    }

    console.log(
      `[Gateway → ${serviceName}] ${config.method?.toUpperCase()} ${
        config.url
      } | trace=${traceId}`
    );

    return config;
  });

  // 🔹 RESPONSE INTERCEPTOR
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error.config || {};

      // Retry once for transient failures
      if (!config.__retry && shouldRetry(error)) {
        config.__retry = true;
        console.warn(`[Gateway → ${serviceName}] retrying ${config.url}`);
        return client(config);
      }

      return Promise.reject({
        service: serviceName,
        message: error.response?.data?.message || "Service unavailable",
        status: error.response?.status || 502,
      });
    }
  );

  return client;
};
