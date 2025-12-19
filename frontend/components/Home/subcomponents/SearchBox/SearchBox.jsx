import { FaSearch, FaShippingFast } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/router";
import cities from "./usCities.json"; // Assume this is an array of { city, state } objects

const SearchBox = ({ query, setQuery }) => {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    if (value.length > 0) {
      setSuggestions(
        cities
          .filter(
            (c) =>
              c.city.toLowerCase().includes(value.toLowerCase()) ||
              c.state.toLowerCase().includes(value.toLowerCase())
          )
          .slice(0, 6)
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setLocation(`${suggestion.city}, ${suggestion.state}`);
    setSuggestions([]);
  };

const [showLocationError, setShowLocationError] = useState(false);

const handleSubmit = (e) => {
    e.preventDefault();
    if (!location.trim()) {
        setShowLocationError(true);
        return;
    }
    setShowLocationError(false);
    
    const params = new URLSearchParams();
    params.append('location', location);
    if (query && query.trim()) {
        params.append('query', query);
    }
    router.push(`/search?${params.toString()}`);
};return (
    <div className="bg-white rounded-2xl shadow-highlight overflow-hidden max-w-full sm:max-w-[800px]">
        <div className="p-4 sm:p-6">
            <div className="flex items-center gap-4 justify-between">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-bold text-lg sm:text-xl px-4 py-1.5 rounded-full">
                    <FaShippingFast className="text-primary" />
                    Delivery
                </div>
                <div className="flex items-center gap-2 relative">
                    <span className="text-muted text-base sm:text-lg">Location:</span>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Select city, state"
                            value={location}
                            onChange={(e) => {
                                handleLocationChange(e);
                                setShowLocationError(false);
                            }}
                            className={`font-semibold text-base sm:text-lg bg-primary/10 px-3 py-1 rounded-full text-primary focus:outline-none ${showLocationError ? "border border-red-500" : ""}`}
                            autoComplete="off"
                        />
                        {suggestions.length > 0 && (
                            <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded shadow-lg z-10 max-h-48 overflow-auto">
                                {suggestions.map((s, idx) => (
                                    <li
                                        key={idx}
                                        className="px-4 py-2 cursor-pointer hover:bg-primary/10"
                                        onClick={() => handleSuggestionClick(s)}
                                    >
                                        {s.city}, {s.state}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {showLocationError && (
                            <div className="absolute left-0 top-full mt-2 text-red-700 px-3 py-1 rounded text-sm">
                                Please select a location.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

        <div className="h-[1px] bg-line" />

        <div className="p-4 sm:p-6">
            <form
                className="flex flex-col sm:flex-row items-center gap-4"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="Search for restaurants"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-base text-muted placeholder-muted text-base sm:text-lg rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                />
                <button
                    type="submit"
                    className="min-w-[150px] sm:min-w-[180px] whitespace-nowrap flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold text-lg rounded-full px-6 py-3 transition transform"
                >
                    <FaSearch />
                    Find Food
                </button>
            </form>
        </div>
    </div>
);
};
export default SearchBox;
