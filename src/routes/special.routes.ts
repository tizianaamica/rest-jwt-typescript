import { Router } from "express";
const router = Router();

import passport from "passport";

router.get(
  "/special",
  passport.authenticate("jwts", { session: false }),
  (req, res) => {
    res.send("success");
  }
);

export default router;
