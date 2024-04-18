import { useState } from "react";
import Autosuggest from "react-autosuggest";

interface CityData {
  ascii_name: string;
}

interface SearchProps {
  data: CityData[];
  onSearch: (searchTerm: string) => void;
}

const SearchComponent: React.FC<SearchProps> = ({ data, onSearch }) => {
  const [search, setSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<CityData[]>([]);

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : data.filter(
          (dt) => dt.ascii_name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const onSuggestionsFetchRequested = ({ value }: any) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion: CityData) => suggestion.ascii_name;

  const renderSuggestion = (suggestion: CityData) => (
    <div className="text-left bg-slate-300 p-1 rounded-sm opacity-100 hover:bg-teal-400">
      {suggestion.ascii_name}
    </div>
  );

  const onChange = ({ newValue }: any) => {
    setSearch(newValue);
    onSearch(newValue);
  };

  const onSuggestionSelected = ({ suggestion }: any) => {
    setSearch(suggestion.ascii_name);
    onSearch(suggestion.ascii_name);
  };

  const inputProps = {
    placeholder: "Search for a city...",
    value: search,
    onChange: onChange,
    className:
      "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500",
  };

  return (
    <div className="relative h-10">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={onSuggestionSelected}
        
      />
    </div>
  );
};

export default SearchComponent;
