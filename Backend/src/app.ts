import express, { type Request, type Response } from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./Routes/authRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import pollRoutes from "./Routes/pollRoutes.js";
import voteRoutes from "./Routes/voteRoutes.js";
import resultRoutes from "./Routes/resultRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";

const app = express();

app.use(helmet());

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
].filter((origin): origin is string => Boolean(origin));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow preview deployments from this specific Vercel project
      const isVercelPreview =
        /^https:\/\/voxa-platform-[a-z0-9-]+-elev5\.vercel\.app$/.test(
          origin
        );

      if (isVercelPreview) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.get("/api/health", (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "VOXA API is running",
    data: null,
  });
});

app.use("/api/auth", authRoutes);
// app.use("/api/auth", userRoutes);
app.use("/api/users", userRoutes);
app.use("/api/polls", pollRoutes);
app.use("/api", voteRoutes);
app.use("/api", resultRoutes);
app.use("/api/admin", adminRoutes);

export default app;
