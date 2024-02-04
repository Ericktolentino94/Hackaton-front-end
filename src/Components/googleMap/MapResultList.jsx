import React from "react";

const MapResultList = ({ places }) => {
  return (
    <div>
      <ul className="googleMaps-ul">
        {places.map((place,i) => (
          <li className="googleMaps-ul-li" key={`${place}+${i}`}>
            {place.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MapResultList;
