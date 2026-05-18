import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { setupSwagger } from "./app/config/swagger";
import router from "./app/routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
);

// Swagger docs
setupSwagger(app);

app.get("/", async (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: "API is working",
  });
});

app.use("/api/v1", router);
export default app;
