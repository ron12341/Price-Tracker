import { useState } from "react";import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/products/search?q=${query}");
      setResults(response.data.product);
    } catch (err) {
      alert("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="App">
      <h1>🔍 Product Price Tracker</h1>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={search}>Search</button>
      {loading && <p>Loading...</p>}
      {results && (
        <div>
          <h2>Results for: {results.name}</h2>
          <p>Scraped at: {results.scrapedAt}</p>
          <ul>
            {results.stores.map((store) => (
              <li key={store.storeName}>
                <p>Store: {store.storeName}</p>
                <p>Price: {store.price}</p>
                <p>URL: {store.url}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;