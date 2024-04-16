import React, { useState, useEffect } from "react";
import axios from "axios";
import Autosuggest from "react-autosuggest";

export const TableWithSearch = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100&timezone=Asia%2FKolkata"
        );
        setData(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter((dt) =>
        dt.ascii_name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data]);

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : data.filter(
          (dt) =>
            dt.ascii_name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion.ascii_name;

  const renderSuggestion = (suggestion) => (
    <div className="text-left rounded-md hover:bg-teal-400">
      {suggestion.ascii_name}
    </div>
  );

  const onChange = (event, { newValue }) => {
    setSearch(newValue);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setSearch(suggestion.ascii_name);
  };

  const inputProps = {
    placeholder: "Search for a city...",
    value: search,
    onChange: onChange,
    className:
      "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500", // Apply Tailwind CSS classes to the input field
  };

  return (
    <div className="container mx-auto p-4 mb-10">
      <div className="h-10">
        <button className="h-10 w-full ">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={onSuggestionSelected} // Add onSuggestionSelected event
            className="border-2 border-blue-600" // Apply Tailwind CSS classes to the Autosuggest component
          />
        </button>
      </div>

      <table className="min-w-full divide-y mt-40 divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              City
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Country
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Timezone
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{row.ascii_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.cou_name_en}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.timezone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
