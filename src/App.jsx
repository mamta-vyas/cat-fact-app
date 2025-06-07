import { useState } from 'react';

function App() {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchFact = async () => {
    setLoading(true);
    setError('');
    setFact('');
    try {
      const res = await fetch('https://catfact.ninja/fact');
      if (!res.ok) throw new Error('Failed to fetch cat fact.');
      const data = await res.json();
      setFact(data.fact);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-purple-700 mb-6">🐱 Cat Fact Generator</h1>
      <button
        onClick={fetchFact}
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
      >
        {loading ? 'Loading...' : 'Get Random Fact'}
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}
      {fact && (
        <p className="mt-6 text-lg text-center max-w-xl text-gray-800 bg-white p-4 rounded shadow">
          {fact}
        </p>
      )}
    </div>
  );
}

export default App;
