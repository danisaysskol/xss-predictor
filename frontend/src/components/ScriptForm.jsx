// src/components/ScriptForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ScriptForm = () => {
  const [script, setScript] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://127.0.0.1:8000/predict/', {
        sentence: script
      });
      setResult(response.data);
    } catch (err) {
      setError('Error analyzing script. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="script" 
            className="block text-sm font-medium mb-2"
          >
            Enter Script to Test
          </label>
          <textarea
            id="script"
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="script-textarea"
            placeholder="Enter your script here..."
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="submit-button w-full"
        >
          {loading ? 'Analyzing...' : 'Analyze Script'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-900 bg-opacity-20 border border-red-500 text-red-500 rounded-md">
          {error}
        </div>
      )}

      {result && (
        <div 
          className={`mt-4 p-4 rounded-md border ${
            result.is_xss 
              ? 'bg-red-900 bg-opacity-20 border-red-500 text-red-500' 
              : 'bg-green-900 bg-opacity-20 border-green-500 text-green-500'
          }`}
        >
          <h3 className="font-semibold mb-2">Analysis Result:</h3>
          <p>{result.message}</p>
        </div>
      )}
    </div>
  );
};

export default ScriptForm;