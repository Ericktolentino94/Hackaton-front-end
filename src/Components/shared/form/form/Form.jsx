import React from "react";
import FormControlGroup from "./FormControlGroup";
/* 
 `inputRef` prop is for extending search functionality in the future
  GoogleMaps API interacts dirrectly with DOM elements in many cases
 As a result we don't want to have this managed by React State
*/
const searchButtons = ["Dessert", "Ice Cream", "Tacos", "Pizza", "Thai"];

const Form = ({ handleSubmit, inputRef }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
      <FormControlGroup buttonList={searchButtons} handleClick={handleSubmit} />
        <br />
        <label>Or find Some Food By Name</label>
        <input ref={inputRef} />
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default Form;
  

 
