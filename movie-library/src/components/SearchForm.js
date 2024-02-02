import React, { useState } from "react";
import Card from "./Card";
import "bootstrap/dist/css/bootstrap.min.css";

function SearchForm({ search }) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response_data = await fetch(
        `http://www.omdbapi.com/?i=tt3896198&apikey=55fadb52&t=${searchText}`
      );
      const data = await response_data.json();
      setSearchResults(data || []);
      console.log(data.imdbID);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //   const saveToLocalStorage = (items) => {
  //     localStorage.setItem("searchResults", JSON.stringify(items));
  //   };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="">
        <Card
          Poster={searchResults.Poster}
          Title={searchResults.Title}
          Genre={searchResults.Genre}
          year={searchResults.Year}
        />
      </div>
    </div>
  );
}

export default SearchForm;
