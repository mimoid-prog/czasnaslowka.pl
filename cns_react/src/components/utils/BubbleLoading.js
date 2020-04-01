import React from "react";
import ReactLoading from "react-loading";

const BubbleLoading = props => (
  <ReactLoading
    type="bubbles"
    color="#FFF"
    width={props.width ? props.width : "40px"}
    height={props.height ? props.height : "40px"}
    className="loader"
  />
);

export default BubbleLoading;
