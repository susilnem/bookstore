import React, { useState } from "react";
import "../assets/sass/form.scss";
import api from "../api/config";

const AddBook = () => {
  const [formData, setFormData] = useState({});
  const [imageData, setImageData] = useState();

  //changehandler function
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const addBook = async (e) => {
    e.preventDefault();

    //now calling backend api for post method
    const response = await api.post(
      "/book/add",
      {
        //formdata in ...formData, and image in imageData
        ...formData,
        image: imageData,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={addBook}
      >
        Name <input type="text" name="name" onChange={handleChange}></input>
        Author{" "}
        <input type="text" name="author " onChange={handleChange}></input>
        Genre <input type="text" name="genre" onChange={handleChange}></input>
        Description{" "}
        <textarea
          name="description"
          rows="10"
          onChange={handleChange}
        ></textarea>
        File upload{" "}
        <input
          type="file"
          name="image"
          onChange={(e) => setImageData(e.target.files[0])}
        ></input>
        <input type="submit" value="submit" name="save"></input>
      </form>
    </div>
  );
};

export default AddBook;
