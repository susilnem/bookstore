import React, { useEffect, useState } from "react";
import api from "../api/config";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [bookList, setBookList] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [tempBookList, setTempBookList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBook() {
      const response = await api.get("/book");
      setBookList(response.data);
      setTempBookList(response.data);
    }
    fetchBook();
  }, []);

  useEffect(() => {
    async function searchBook() {
      const response = await api.get(`/book/search/all?q=${searchText}`);

      if (response.data) {
        console.log(response.data);
        setBookList(response.data);
      }
    }
    if (searchText) searchBook();
    else setBookList(tempBookList);
  }, [searchText]);
  return (
    <>
      <center>
        <input
          type="text"
          placeholder="Search Books..."
          style={{ width: "55%", padding: "10px", margin: "20px" }}
          value={searchText}
          onChange={(e) => setsearchText(e.target.value)}
        ></input>
      </center>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {bookList.length > 0
          ? bookList.map((book, index) => {
              return (
                <div
                  onClick={() =>
                    navigate("/explore", {
                      //making and passing a state while navigating to this link
                      state: {
                        book,
                      },
                    })
                  }
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "20px",
                    textAlign: "center",
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
                  {book.name}
                </div>
              );
            })
          : "No Books Found"}
      </div>
    </>
  );
};

export default HomePage;
