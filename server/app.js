import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/course.router.js";
//import paymentRoute from "./routes/payment.route.js";
import errorMiddleWare from "./middlewares/error.middleware.js";

import { config } from "dotenv";
config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [process.env.FRONTED_URL],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(morgan("dev"));

app.use("/ping", function (req, res) {
  res.send("/pong");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoutes);
//app.use("/api/v1/payments", paymentRoute);

app.all("*", (req, res) => {
  res.status(404).send("OOPS !! 404 page not found");
});

app.use(errorMiddleWare);

export default app;
