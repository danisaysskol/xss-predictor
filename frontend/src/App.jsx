// src/App.jsx
import React from 'react';
import ScriptForm from './components/ScriptForm';

function App() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-2">
          XSS Script Detector
        </h1>
        <p className="text-sm text-gray-600 text-center mb-8">
          Created by{' '}
          <a 
            href="https://github.com/hafizfarhad" 
            className="text-blue-600 hover:text-blue-800 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            HF
          </a>
          {' & '}
          <a 
            href="https://github.com/danisaysskol" 
            className="text-blue-600 hover:text-blue-800 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            MD
          </a>
        </p>
        <ScriptForm />
      </div>
    </div>
  );
}

export default App;