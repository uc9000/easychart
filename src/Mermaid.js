import React from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: true,
  theme: "default",
  flowchart:{
    useMaxWidth:true,
    curve:'basis',
    nodeSpacing:55,
    rankSpacing:20,
    height:20
},

  securityLevel: "loose",
  fontFamily: "Fira Code"
});

export default class Mermaid extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.children !== this.props.children) {
      var elts = document.getElementsByClassName('mermaid');

      for(var e = 0; e < elts.length; e++) { // For each element
        var elt = elts[e];
        elt.removeAttribute('data-processed');
      }
      mermaid.contentLoaded();
    }
  }

  componentDidMount() {
    mermaid.contentLoaded();
  }
  render() {
    return <div className="mermaid">{this.props.children}</div>;
  }
}
