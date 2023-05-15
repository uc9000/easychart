import React, { useEffect, useState } from 'react';
import Mermaid from "./Mermaid";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { event } from 'jquery';
import * as Constants from "./Constants";

const env = Constants.ENVIRONMENT;

function CodeConverter() {
  const [code, setCode] = useState('');
  const [converted, setConverted] = useState('');

  // const handleSubmit = async (event) => 
  async function onChange(input, event)
  {
    // event.preventDefault();
    setCode(input);
  }

  useEffect(()=> {
    if (code.length < 1) {
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
      if(data?.converted){
        setConverted(data.converted);
      }      
      console.log("event: " + JSON.stringify(event)
      + "\nreq: " + code 
      + "\nresp: " + JSON.stringify(data));
    });
  }, [code]);

  return (
    <div id='chartToolWrapper'>

      <div id='codeEditor'>
        <AceEditor
            mode="java"
            theme="github"
            onChange={onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
        />
      </div>

      <div id='chart'>
        {converted && <Mermaid>{converted}</Mermaid>}
      </div>

    </div>
  );
  
}

export default CodeConverter;