import React, { useEffect, useState } from "react";
import api from "../api/config";

const HomePage = () => {
  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    async function fetchBook() {
      const response = await api.get("/book");
      setBookList(response.data);
    }
    fetchBook();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {bookList.map((book, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              boxShadow: "0px 0px 5px #ccc ",
              marginLeft: "20px",
            }}
          >
            <img
              src={book.image}
              alt="book"
              style={{ height: "250px", width: "250px", objectfit: "contain" }}
            />
            <br />
            {book.name}
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
