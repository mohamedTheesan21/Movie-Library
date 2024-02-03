import React, { useState } from "react";
import Card from "./Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Typewriter from "typewriter-effect";

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

  const saveToLocalStorage = (item) => {
    try {
      // Retrieve existing data from localStorage
      const savedResults = localStorage.getItem("searchResults");

      // Parse the existing data or initialize an empty array if there's no data
      const existingResults = savedResults ? JSON.parse(savedResults) : [];

      // Ensure existingResults is an array or convert it to an array
      const resultsArray = Array.isArray(existingResults)
        ? existingResults
        : [existingResults];

      // Check if the item already exists in the existing data
      const isDuplicate = resultsArray.some(
        (result) => result.imdbID === item.imdbID
      );

      // If it's not a duplicate, add the item to the existing data and save it to localStorage
      if (!isDuplicate) {
        const updatedResults = [...resultsArray, item];
        localStorage.setItem("searchResults", JSON.stringify(updatedResults));
        console.log("Data saved to localStorage:", updatedResults);

        // Reload the page to reflect the updated data
        window.location.reload();
      } else {
        console.log("Data already exists in localStorage. Skipping...");
      }
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  const removeFromLocalStorage = (item) => {
    try {
      // Retrieve existing data from localStorage
      const savedResults = localStorage.getItem("searchResults");

      // Parse the existing data or initialize an empty array if there's no data
      const existingResults = savedResults ? JSON.parse(savedResults) : [];

      // Ensure existingResults is an array or convert it to an array
      const resultsArray = Array.isArray(existingResults)
        ? existingResults
        : [existingResults];

      // Filter out the item to be removed
      const updatedResults = resultsArray.filter(
        (result) => result.imdbID !== item.imdbID
      );

      // Reload the page to reflect the updated data
      window.location.reload();

      // Save the updated data to localStorage
      localStorage.setItem("searchResults", JSON.stringify(updatedResults));
      console.log("Data removed from localStorage:", updatedResults);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  };

  return (
    <div>
      <div className="m-5">
        <h1>Movie Library</h1>
        <div className="text">
          <Typewriter
            options={{
              autoStart: true,
              loop: true,
              delay: 40,
              strings: ["Enjoy New Movies!", "Find the movies that you like!"],
            }}
          />
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Search for a movie..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="btn btn-primary m-2" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="">
        {searchResults && Object.keys(searchResults).length > 0 && (
          <div className="mb-3">
            <Card
              Poster={searchResults.Poster}
              Title={searchResults.Title}
              Genre={`Genre: ${searchResults.Genre}`}
              year={searchResults.Year}
              buttonText="Add to Favourites"
              onClick={() => saveToLocalStorage(searchResults)}
            />
          </div>
        )}
      </div>
      <div className="p-5 favourites">
        <h2>Favourites</h2>
        <div className="row ">
          {localStorage.getItem("searchResults") &&
            JSON.parse(localStorage.getItem("searchResults")).map((result) => (
              <div className="col col-sm-12 col-md-6 col-lg-4">
                <div key={result.imdbID}>
                  <Card
                    Poster={result.Poster}
                    Title={result.Title}
                    Genre={`Genre: ${result.Genre}`}
                    year={result.Year}
                    buttonText="Remove from Favourites"
                    onClick={() => removeFromLocalStorage(result)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
