const express = require("express");
const logger = require("./src/utils/logger");
const config = require("./src/utils/config");
const cookieSession = require("cookie-session");
const hpp = require("hpp");
const { default: helmet } = require("helmet");
const cors = require("cors");
const compression = require("compression");
const { StatusCodes } = require("http-status-codes");

const app = express();
const PORT = config.PORT || 4100;

app.set("trust proxy", 1);
app.use(
  cookieSession({
    name: "session",
    keys: [],
    maxAge: 24 * 7 * 3600000,
    secure: false,
  })
);

app.use(hpp());
app.use(helmet());
app.use(
  cors({
    origin: config.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    response: "Notification Service is up and running",
    status: "OK",
  });
});

app.use("*", (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: "Route not found" });
  next();
});

app.use((err, req, res, next) => {});

app.listen(PORT, () => {
  logger.info(`🚀 ApiGateway service is running on port ${PORT}`);
});
