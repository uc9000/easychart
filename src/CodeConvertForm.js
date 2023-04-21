import React, { useEffect, useState } from 'react';
import Mermaid from "./Mermaid";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

// const env = 'https://flowchart-generator-production.up.railway.app';
const env = 'http://localhost:8080';

function CodeConverter() {
  const [code, setCode] = useState('');
  const [converted, setConverted] = useState('');

  // const handleSubmit = async (event) => 
  async function onChange(input)
  {
    // event.preventDefault();
    setCode(input);
  }

  useEffect(()=> {
    if (code.length < 2) {
      return;
    }
    
    fetch(env + '/api/v1/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ originalCode: code })
    })
    .then((res) => res.json())
    .then((data) => {
      setConverted(data?.converted);
      console.log("req: " + code 
      + "\nresp: " + JSON.stringify(data));
    });
  }, [code]);

  return (
    <div>
      
      <AceEditor
        mode="java"
        theme="github"
        onChange={onChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
      />
      {converted && <Mermaid>{converted}</Mermaid>}
    </div>
  );
  
}

export default CodeConverter;