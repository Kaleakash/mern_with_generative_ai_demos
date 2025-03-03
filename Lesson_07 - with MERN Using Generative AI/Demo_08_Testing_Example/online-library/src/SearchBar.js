// src/components/SearchBar.js
import React, { useState } from "react";
import books from "./books";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const [sortBy, setSortBy] = useState("title");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    if (query.trim() === "") {
      alert("Please enter a search term.");
      return;
    }

    let filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );

    if (genre !== "All") {
      filteredBooks = filteredBooks.filter((book) => book.genre === genre);
    }

    filteredBooks.sort((a, b) =>
      sortBy === "title"
        ? a.title.localeCompare(b.title)
        : a.publicationYear - b.publicationYear
    );

    setResults(filteredBooks);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        data-testid="search-input"
      />
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        data-testid="genre-filter"
      >
        <option value="All">All Genres</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Fiction">Fiction</option>
      </select>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        data-testid="sort-dropdown"
      >
        <option value="title">Sort by Title</option>
        <option value="year">Sort by Year</option>
      </select>
      <button onClick={handleSearch} data-testid="search-button">
        Search
      </button>

      <ul data-testid="search-results">
        {results.length > 0 ? (
          results.map((book) => (
            <li key={book.id}>{`${book.title} (${book.publicationYear})`}</li>
          ))
        ) : (
          query && <li>No results found</li>
        )}
      </ul>
    </div>
  );
};

export default SearchBar;
