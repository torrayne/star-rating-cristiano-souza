import React from 'react'
import "./styles.css";
import { Header } from "./components/Header";
import { Info } from "./components/Info";
import { Image } from "./components/Image";

// you can use these star characters ★ & ☆

export default function App(props) {
  return (
    <div className="App">
      <div className="product-modal">
        <Header productId={props.productId} />
        <div style={{ display: "flex" }}>
          <Image />
          <Info />
        </div>   
        {/* Make a star rating component! */}
      </div>
    </div>
  );
}
