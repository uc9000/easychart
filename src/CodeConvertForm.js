import React, { useState } from 'react';
import Mermaid from "./Mermaid";

// const env = 'https://flowchart-generator-production.up.railway.app';
const env = 'http://localhost:8080';

function CodeConverter() {
  const [code, setCode] = useState('');
  const [converted, setConverted] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(env + '/api/v1/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ originalCode: code }),
    });

    const data = await response.json();

    setConverted(data?.converted);
    console.log("req: " + code 
    + "\nresp: " + JSON.stringify(data));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your code:
          <textarea value={code} onChange={(event) => setCode(event.target.value)} />
        </label>
        <button type="submit">Convert</button>
      </form>
      {converted && <Mermaid>{converted}</Mermaid>}
    </div>
  );
}

export default CodeConverter;