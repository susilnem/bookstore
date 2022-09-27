import bookModel from "../models/bookModel.js";
import { Op } from "sequelize";
export default class BookController {
  //insert data using post method
  async addBook(req, res, imagename) {
    const data = await bookModel.create({ ...req.body, image: imagename });
    if (data) {
      res.json(data);
    } else res.json({ success: false, message: "Error during adding" });
  }

  //get book list
  async getBookList(req, res) {
    let { limit } = req.query;
    if (!limit) limit = 10;
    const data = await bookModel.findAll({ limit: parseInt(limit) });
    data ? res.json(data) : res.json([]);
  }

  //get book by id
  async getBookByID(req, res) {
    const { id } = req.params;
    if (id) {
      const data = await bookModel.findByPk(id);
      //if there is data then return data otherwise empty
      data ? res.json(data) : res.json([]);
    } else res.json({ success: false, message: "Book id is not provided" });
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
    } else res.json({ success: false, message: "Book id is not provided" });
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
    } else res.json({ success: false, message: "Book id is not provided" });
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
      });

      console.log(data);
      res.json(data);
    } else {
      res.json({ success: false, message: "Empty search string" });
    }
  }
}
