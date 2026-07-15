import { useState } from "react";
import { useNavigate } from "react-router";

export default function SearchForm() {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);  // arama urlsi

    setQuery("");
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="search"
        value={query}
        placeholder="Film ara..."
        aria-label="Film ara"
        onChange={(event) => setQuery(event.target.value)}
      />

      <button type="submit">
        Ara
      </button>
    </form>
  );
}