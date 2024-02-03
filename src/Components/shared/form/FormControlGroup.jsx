import React from 'react';

const FormControlGroup = ({handleClick, buttonList}) => {
    return (
        <div>
            {buttonList.map((option, index) => (
            <button key={index} value={option} onClick={(e) => handleClick(e)}>
              {" "}
              {option}
              {" "}
            </button>
          ))}
        </div>
    );
}

export default FormControlGroup;
