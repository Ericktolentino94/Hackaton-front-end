
import React from "react"

export default function Place({ place }) {
    return (
        <tr>
            <td>{place.name}</td>
            <td>{place.vicinity}</td>
            <td>{place.rating}</td>
            <td>{place.opening_hours ? `\u2705` : `\u274c`}</td>
            <td><img
                src={place.icon}
                alt={`icon of ${place.name}`}
                style={{ height: "20px" }}
            /></td>
        </tr>
    )
}
