import express from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";

import authRoutes from "./routes/auth.routes";
import specialRoutes from "./routes/special.routes";
import zoneRoutes from "./routes/zone.routes";
import specieRoutes from "./routes/specie.routes";
import animalRoutes from "./routes/animal.routes";
import commentsRoutes from "./routes/comment.routes";

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

// Routes
app.get("/", (req, res) => {
  res.send(`THE API IS AT http://localhost:${app.get("port")}`);
});

app.use(authRoutes);
app.use(specialRoutes);
app.use(zoneRoutes);
app.use(specieRoutes);
app.use(animalRoutes);
app.use(commentsRoutes);

export default app;

// Middleware para proteger rutas
export const requireAdmin = passport.authenticate("jwt", { session: false });
