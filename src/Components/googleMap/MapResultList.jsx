import React from "react";

const MapResultList = ({ places }) => {
  return (
    <div>
      <ul className="googleMaps-ul">
        {places.map((place) => (
          <li className="googleMaps-ul-li" key={place.index}>
            {place.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MapResultList;
