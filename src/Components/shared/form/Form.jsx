import React from "react";
import FormControlGroup from "./FormControlGroup";
import Pagination from "../../Pagination"
import { useState, useMemo } from "react";
import "./Form.css"
/* 
 `inputRef` prop is for extending search functionality in the future
  GoogleMaps API interacts dirrectly with DOM elements in many cases
 As a result we don't want to have this managed by React State
*/


const Form = ({ handleSubmit, inputRef }) => {
  const [searchButtons, setSearchButtons] = useState(["Arby's",
  "Auntie Anne's",
  "A&W Restaurant",
  "Big Boy Restaurants",
  "Burger King",
  "85°C Bakery Cafe",
  "Carl's Jr.",
  "Chick-fil-A",
  "Chipotle Mexican Grill",
  "Church's Texas Chicken",
  "Cinnabon",
  "Domino's Pizza",
  "Dunkin'",
  "Five Guys",
  "Hardee's",
  "Jollibee",
  "KFC",
  "Little Caesars",
  "Long John Silver's",
  "Marco's Pizza",
  "McDonald's",
  "Panda Express",
  "Papa John's",
  "Pita Pit",
  "Peter Piper Pizza",
  "The Pizza Company",
  "Pizza Hut",
  "Pizza Inn",
  "Pollo Campero",
  "Pollo Tropical",
  "Popeyes",
  "Quiznos",
  "Qdoba",
  "Sbarro",
  "Shake Shack",
  "Smoothie King",
  "Starbucks",
  "Subway",
  "Sweet Frog",
  "Taco Bell",
  "TCBY",
  "Tim Hortons",
  "Wendy's",
  "White Castle",
  "Wingstop",
  "WingStreet",
  "Bodega",
  "Deli",
  "Whole Foods"
])

  let PageSize = 5
    const [currentPageV2, setCurrentPageV2] = useState(1)
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPageV2 - 1) * PageSize
        const lastPageIndex = firstPageIndex + PageSize
        return searchButtons.slice(firstPageIndex, lastPageIndex)
    }, [currentPageV2, searchButtons])

  return (
    <div className="top">
      <form onSubmit={handleSubmit}>
        <FormControlGroup buttonList={currentTableData} handleClick={handleSubmit} />
        <Pagination
                    className="pagination-bar"
                    currentPage={currentPageV2}
                    totalCount={searchButtons.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPageV2(page)}
                />
        <br />
        <label>Or find Some Food By Name</label>
        <input ref={inputRef} />
        <button className="btn btn-dark btn-md fixed" type="submit">Search</button>
      </form>
    </div>
  );
};

export default Form;



