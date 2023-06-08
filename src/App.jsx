import React from 'react'
import "./styles.css";
import { Header } from "./components/Header";
import { Info } from "./components/Info";
import { Image } from "./components/Image";
import axios from 'axios';
import { StarRatings } from './components/StarRating';

// you can use these star characters ★ & ☆

export default function App(props) {
  console.log(props)
  // fetch
  // axios
  return (
    <div className="App">
      <div className="product-modal">
        <Header productId={props.productId} />
        <div style={{ display: "flex" }}>
          <Image />
          <Info />
        </div>   
        <StarRatings productId={props.productId} />
      </div>
    </div>
  );
}
