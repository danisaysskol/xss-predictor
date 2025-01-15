// src/App.jsx
import React from 'react';
import ScriptForm from './components/ScriptForm';

function App() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-center mb-8">
          XSS Script Detector
        </h1>
        <ScriptForm />
      </div>
    </div>
  );
}

export default App;