import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { ENV } from "./config/env.js";


const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));



app.get("/", (_, res) => res.json({ status: "OK", env: ENV.NODE_ENV }));



export default app;
