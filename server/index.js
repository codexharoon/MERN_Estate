import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./DB.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import listingRoutes from "./routes/listing.js";
const PORT = 8888;

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://auth.codexharoon.com",
  "https://codexharoon.com",
  "https://codexauth.vercel.app",
  "https://codexauth.netlify.app",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) === false) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());
dotenv.config();
app.use(cookieParser());

db();

app.get("/", (req, res) => {
  res.send("Code x Auth API is Working!");
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/listing", listingRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
