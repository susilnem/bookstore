import bookModel from "../models/bookModel.js";

export default class BookController {
  //insert data using post method
  async addBook(req, res, imagename) {
    const data = await bookModel.create({ ...req.body, image: imagename });
    if (data) {
      res.json(data);
    } else res.json({ success: false, message: "error during adding" });
  }

  //get book list
  async getBookList(req, res) {
    const data = await bookModel.findAll(req.body);
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
}
