import express from "express";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/upload-image", upload.single("image"), (req, res) => {
  res.json({
    url: req.file.path,        // URL public
    public_id: req.file.filename,
  });
});

export default router;