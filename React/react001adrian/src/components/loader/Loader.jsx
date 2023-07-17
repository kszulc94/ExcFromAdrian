import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./loader.scss";
import React from "react";

function Loader(props) {
  let [color] = useState("#00BFFF");

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#00BFFF",
  };

  return (
    <div className="sweet-loading">
      <ClipLoader
        color={color}
        loading={props.loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
export default Loader;
