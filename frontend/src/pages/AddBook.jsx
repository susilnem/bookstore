import React from "react";
import "../assets/sass/form.scss";
const AddBook = () => {
  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      Name <input type="text" name="name" id=""></input>
      Author <input type="text" name="author " id=""></input>
      Genre <input type="text" name="genre" id=""></input>
      Description <textarea name="description" rows="10"></textarea>
      File upload <input type="file" name="image"></input>
    </form>
  );
};

export default AddBook;
