import React, { useEffect, useState, useRef } from "react";
import Form from "../shared/form/Form";
import MapResultList from "./MapResultList";
import { GoogleMap, LoadScript, Marker, useLoadScript } from "@react-google-maps/api";
import { useUserLocation } from "../../hooks/useUserLocation";
import { getUserLocation } from "../../utils/locationUtils";
import { getGoogleMapsData } from "../../utils/apiUtils";
import "./googleMap.css";
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const searchDistance = 20500;

const containerStyle = {
  width: "650px",
  height: "650px",
  border: "2px solid brown",
  "marginTop": "20px",
  "borderRadius": "10px"
};

const center = {
  lat: 40.7,
  lng: 74.644,
};


const MapComponent = ({ currentUser, setCurrentUser }) => {
  // state for the map center location
  const [mapCenter, setMapCenter] = useState(center);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [places, setPlaces] = useState([]);
  const [libraries, setLibraries] = useState(["places", 'geometry', 'drawing'])


  // Hook used to track dom state directly - removing the state from React 
  //  selected here so we can extend the input to google API
  const inputRef = useRef();
  // custom hook to check for broswer location data
  const { error, location } = useUserLocation();
  // effect on mount to see if we have userLocation available in the browser
  useEffect(() => {
    if (error) {
      console.error(error);
    }
    if (location) {
      const userLocation = {
        lat: location.lat,
        lng: location.lng,
      };
      setMapCenter(userLocation);
      setSelectedPlace("Your location!");
    }
  }, [location, error]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { latitude, longitude } = await getUserLocation();
      const requestBody = {
        // grab either the event value from the button click
        // or key into the .current.value of our inputRef 
        query: event.target.value || inputRef.current.value || event.innerText,
        location: `${latitude},${longitude}`,
        distance: searchDistance,
      };
      let res = await getGoogleMapsData(requestBody);

      updateMapPositions(res.data.results);
    } catch (err) {
      alert("your query does not match any within the search radius")
      console.error(err);
    }
  };
  // makes a post request to our proxy server to avoid CORS issues
  const updateMapPositions = (places) => {
    setSelectedPlace(places[0]);
    setPlaces(places);
    setMapCenter(places[0].latitude, places[0].longitude);
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <h1>Loading maps</h1>;
  }

  return (
    <div className="googleMaps-container">
      <div className="title">
        <h1>Search by category or type in your query</h1>
        <h3 className="test">{selectedPlace ? selectedPlace.name : null}</h3>
        <section className="googleMaps-form-container">
          <Form handleSubmit={handleSubmit} inputRef={inputRef} />
          {places.length ? <h2>Nearby Places:</h2> : null}
          <MapResultList places={places} />
        </section>
      </div>

      <div className="top">
        {!isLoaded ?
          <LoadScript
            googleMapsApiKey={API_KEY}
            libraries={libraries}
            loading="async"
            onLoad={() => console.log("loaded!")}
            loadingElement={<div>Sit tight - setting maps up and stuff</div>}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={mapCenter}
              zoom={10}
            >
              {places.map((place, index) => (
                <Marker
                  key={index}
                  position={place.geometry.location}
                  title={place.name}
                />
              ))}
            </GoogleMap>
          </LoadScript> :
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={10}
          >
            {places.map((place, index) => (
              <Marker
                key={index}
                position={place.geometry.location}
                title={place.name}
              />
            ))}
          </GoogleMap>
        }
      </div>

    </div>
  );
};







// prevents unneeded rerenders if the rest of the app changes - don't want to have this map refresh a ton

export const MemoGoogleMap = React.memo(MapComponent);
