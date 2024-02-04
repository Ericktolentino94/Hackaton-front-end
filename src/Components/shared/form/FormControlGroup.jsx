import React from 'react';

const FormControlGroup = ({handleClick, buttonList}) => {
    return (
        <div>
            {buttonList.map((option, index) => (
            <button className="btn btn-secondary btn-sm" key={index} value={option} onClick={(e) => handleClick(e)}>
              {" "}
              {option}
              {" "}
            </button>
          ))}
        </div>
    );
}

export default FormControlGroup;
