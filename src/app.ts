import express from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import passportMiddlewares from "./middlewares/passport";

import authRoutes from "./routes/auth.routes";
import specialRoutes from "./routes/special.routes";

// Initializations
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddlewares);

// Routes
app.get("/", (req, res) => {
  res.send(`THE API IS AT http://localhost:${app.get("port")}`);
});

app.use(authRoutes);
app.use(specialRoutes);

export default app;

// Middleware para proteger rutas
export const requireAdmin = passport.authenticate("jwt", { session: false });
