import React from "react";
import { useLocation } from "react-router-dom";
const Explore = () => {
  const book = useLocation().state.book;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 0px 5px #ccc ",
        marginLeft: "20px",
        marginTop: "20px",
        cursor: "pointer",
      }}
    >
      <img
        src={book.image}
        alt="book"
        style={{
          height: "250px",
          width: "250px",
          objectfit: "contain",
        }}
      />
      <br />
      Book <small>{book.name}</small>
      <br />
      <br />
      Author
      <small>{book.author}</small>
      <br />
      <br />
      Genre
      <small>{book.genre}</small>
      <br />
      <br />
      Description
      <br />
      <small>{book.description}</small>
    </div>
  );
};

export default Explore;
