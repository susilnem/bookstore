import bookModel from "../models/bookModel.js";
import { Op } from "sequelize";
import textConstants from "../constants/textConstants.js";
import urlConstant from "../constants/urlConstant.js";
export default class BookController {
  //insert data using post method
  async addBook(req, res, imagename) {
    try {
      const data = await bookModel.create({ ...req.body, image: imagename });
      if (data) {
        res.json(data);
      } else res.json({ success: false, message: "Error during adding" });
    } catch (err) {
      return res.json({
        success: false,
        message: "Error while Quering in Database",
      });
    }
  }

  //get book list
  async getBookList(req, res) {
    let { limit } = req.query;
    if (!limit) limit = 10;
    //use try catch for error handling almost in every queryset
    try {
      const data = await bookModel.findAll({
        limit: parseInt(limit),
        raw: true,
      });
      for (let d of data) {
        d.image = urlConstant.IMG_PATH_URL + d.image;
      }
      data ? res.json(data) : res.json([]);
    } catch (err) {
      res.json({ success: false, message: err });
    }
  }

  //get book by id
  async getBookByID(req, res) {
    const { id } = req.params;
    if (id) {
      const data = await bookModel.findByPk(id);
      //if there is data then return data otherwise empty
      data ? res.json(data) : res.json([]);
    } else
      res.json({ success: false, message: textConstants.BOOK_ID_NOT_PROVIDED });
  }

  //updating the book
  async updateBook(req, res) {
    const { id } = req.params;
    if (id) {
      const data = await bookModel.update(req.body, {
        where: {
          id: id,
        },
      });
      if (data[0]) {
        res.json({ success: true, message: "successfully updated" });
      } else {
        res.json({ success: false, message: "couldnot update book" });
      }
    } else
      res.json({ success: false, message: textConstants.BOOK_ID_NOT_PROVIDED });
  }

  //for delete the book
  async deleteBook(req, res) {
    const { id } = req.params;
    if (id) {
      const data = await bookModel.destroy({
        where: { id },
      });

      if (data == 1) {
        res.json({ success: true, message: "successfully deleted" });
      } else {
        res.json({ success: false, message: "couldnot delete book" });
      }
    } else
      res.json({ success: false, message: textConstants.BOOK_ID_NOT_PROVIDED });
  }

  //for searching book
  async searchBook(req, res) {
    const { q } = req.query;

    if (q) {
      const data = await bookModel.findAll({
        where: {
          [Op.or]: {
            name: {
              [Op.like]: `%${q}%`,
            },
            author: {
              [Op.like]: `%${q}%`,
            },
            genre: {
              [Op.like]: `%${q}%`,
            },
          },
        },
        raw: true,
      });
      for (let d of data) {
        d.image = urlConstant.IMG_PATH_URL + d.image;
      }
      res.json(data);
    } else {
      res.json({ success: false, message: "Empty search string" });
    }
  }
}
