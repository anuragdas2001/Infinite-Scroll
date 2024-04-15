import { useState, useEffect } from "react";
import axios from "axios";

export const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?q=${query}&limit=5&timezone=Asia%2FKolkata`
        );
        setSuggestions(response.data.results);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    if (query.trim() !== "") {
      fetchData();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.city);
    setSuggestions([]);
    onSearch(suggestion.city);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a city..."
        value={query}
        onChange={handleInputChange}
        className="h-10 w-full m-10 p-5"
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.city}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};