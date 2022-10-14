import React, { useState, useEffect } from "react";
import api from "../api/config";
import { FaTrashAlt } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListBook = () => {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    async function getBooks() {
      const response = await api.get("/book");
      if (response.data) {
        setBookList(response.data);
      }
    }
    getBooks();
  }, []);

  async function deleteBook(id, indx) {
    const data = window.confirm("Do you want to delete ?");
    if (data) {
      try {
        const response = await api.delete(`/book/delete/${id}`);
        if (response.data.success) {
          //gonna remove the item from list and return other
          const newBookList = bookList.filter((book, index) => index !== indx);
          toast.success("Book deleted");
          setBookList(newBookList);
        } else {
          toast.error("Unable to delete book");
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  }

  return (
    <center>
      <ToastContainer />
      {bookList.length > 0
        ? bookList.map((book, index) => {
            return (
              <div
                key={index}
                style={{
                  boxShadow: "0px 0px 5px #ccc",
                  padding: "10px",
                  margin: "10px",
                  color: "green",
                  width: "40%",
                  textAlign: "start",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {book.name}
                <FaTrashAlt
                  color="red"
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteBook(book.id, index)}
                />
              </div>
            );
          })
        : "No books are available"}
    </center>
  );
};

export default ListBook;
