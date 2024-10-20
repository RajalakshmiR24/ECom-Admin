import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";

import { rateLimiter } from "./middlewares/rateLimiter.js";

import adminRoutes from "./routes/admin.js"; 
import authRoutes from "./routes/authRoutes.js"; 


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(rateLimiter);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "http://192.168.56.1:3000",
  credentials: true,
};
app.use(cors(corsOptions));



// Use the admin route for /admin path
app.use("/api/admin", adminRoutes);
app.use('/api/auth', authRoutes);


connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
});
