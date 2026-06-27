import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="row justify-content-center mb-4">
      <div className="col-md-6 col-lg-5">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search products by title..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search products"
          />
          {searchTerm && (
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => onSearchChange('')}
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;