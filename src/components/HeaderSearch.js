import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HeaderSearch({ onSearch }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
    navigate(`/collection?q=${encodeURIComponent(query || "")}`);
  };

  return (
    <div
      className="offcanvas offcanvas-top"
      tabIndex="-1"
      id="searchOffcanvas"
      aria-labelledby="searchOffcanvasLabel"
    >
      <div className="offcanvas-header">
        <h5 id="searchOffcanvasLabel">Search Products</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body">
        <form className="d-flex" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control"
            placeholder="Type to search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="btn btn-dark ms-2"
            type="submit"
            data-bs-dismiss="offcanvas"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default HeaderSearch
