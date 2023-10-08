import { useRef } from "react";
import PropTypes from "prop-types";

function SearchBar({ value, onSearchChange, onImmediateChange }) {
  const searchDebounceRef = useRef(null);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;

    // Update the searchTerm immediately
    onImmediateChange(searchValue);

    // Clear the existing timeout if it exists
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    // Set a new timeout
    searchDebounceRef.current = setTimeout(() => {
      onSearchChange(searchValue);
    }, 500);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={handleSearchChange}
      />
    </div>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onImmediateChange: PropTypes.func.isRequired,
};

export default SearchBar;
