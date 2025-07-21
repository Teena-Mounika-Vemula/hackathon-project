import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const summarizeText = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:8000/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    setSummary(data.summary);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 font-sans">
      <h1 className="text-3xl font-bold text-cyan-700 mb-6">🤖 AI Copilot</h1>
      <textarea
        rows={10}
        className="w-full p-4 border rounded mb-4"
        placeholder="Paste your document text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={summarizeText}
        className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-2 rounded"
      >
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>
      {summary && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2 text-cyan-800">Summary</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
        </div>
      )}
    </div>
  );
}

export default App;
