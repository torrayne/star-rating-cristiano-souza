import React from "react";
import "../styles.css";

export const Header = (props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "solid 1px",
        padding: "5px",
        fontSize: "18px"
      }}
    >
      <div>Product Details (#{props.productId})</div>
    </div>
  );
};
