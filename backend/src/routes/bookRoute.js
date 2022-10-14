import express from "express";
import multer from "multer";
import BookController from "../controllers/bookController.js";
import AuthController from "../controllers/authController.js";
import validateToken from "../middlewares/validateToken.js";
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

//multer is used for image field
const upload = multer({ storage });
const bookController = new BookController();
const authController = new AuthController();
//for adding book
router.post("/add", upload.single("image"), (req, res) => {
  bookController.addBook(req, res, imagename);
});

//for getting book lsit
router.get("/", validateToken, bookController.getBookList);

//for authenticate
router.post("/auth", authController.authenticate);

//for login user
router.post("/login", authController.login);

//for userlist
router.get("/userlist", validateToken, authController.userList);

//for getting book by id
router.get("/:id", validateToken, bookController.getBookByID);

//for update book
router.put("/update/:id", bookController.updateBook);

//for delete book
router.delete("/delete/:id", bookController.deleteBook);

//searching book
router.get("/search/all", bookController.searchBook);

export default router;
