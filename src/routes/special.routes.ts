import { Router } from "express";
const router = Router();

router.get("/special", (req, res) => {
  res.send("success");
});

export default router;
