import express from "express";
import bookModel from "../models/bookModel.js";
import multer from "multer";

const router = express.Router();

//for image field
let imagename;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    imagename =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname;
    cb(null, imagename);
  },
});

const upload = multer({ storage: storage });

router.post("/add", upload.single("image"), async (req, res) => {
  const data = await bookModel.create({ ...req.body, image: imagename });
  if (data) {
    res.json(data);
  } else res.json({ success: false, message: "error during adding" });
});

export default router;
