// http/retry.js
module.exports.shouldRetry = (error) => {
  if (!error.response) return true; // network error
  return error.response.status >= 500;
};
