import React from "react";
import ReactLoading from "react-loading";

const Loading = () => (
    <ReactLoading 
        type='spin'
        color='#EC4545' 
        height='40px'
        width='40px'
        className='loader'
    />
);

export default Loading;