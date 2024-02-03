import React, { useEffect, useState, useRef } from "react";
import Form from "../shared/form/Form";
import MapResultList from "./MapResultList";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useUserLocation } from "../../hooks/useUserLocation";
import { getUserLocation } from "../../utils/locationUtils";
import { getGoogleMapsData } from "../../utils/apiUtils";
import "./googleMap.css";
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const searchDistance = 1500;

const containerStyle = {
  width: "600px",
  height: "600px",
  border: "2px solid green",
};

const center = {
  lat: 40.7,
  lng: 74.644,
};


const MapComponent = () => {
  // state for the map center location
  const [mapCenter, setMapCenter] = useState(center);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [places, setPlaces] = useState([]);
 
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
      debugger
      const requestBody = {
        // grab either the event value from the button click
          // or key into the .current.value of our inputRef 
        query: event.target.value || inputRef.current.value,
        location: `${latitude},${longitude}`,
        distance: searchDistance,
      };
      let res = await getGoogleMapsData(requestBody);
      
      updateMapPositions(res.data.results);
    } catch (err) {
      console.error(err);
    }
  };
  // makes a post request to our proxy server to avoid CORS issues
  const updateMapPositions = (places) => {
    setSelectedPlace(places[0]);
    setPlaces(places);
    setMapCenter(places[0].latitude, places[0].longitude);
  };
 
  return (
    <div className="googleMaps-container">
       {/* <h1>Welcome to GRUB FINDER</h1>
      {mapCenter.lat}{mapCenter.lng}
       <h2>Find Some Grub</h2>
       <h3>{selectedPlace ? selectedPlace.name : null}</h3>
       <section className="googleMaps-form-container">
        <Form  handleSubmit={handleSubmit} inputRef={inputRef}/>
        {places.length ? <h2>Nearby Grub:</h2> : null}
         <MapResultList places={places}/>
       </section> */}
       

      <LoadScript
        googleMapsApiKey={API_KEY}
        libraries={["places"]}
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
      </LoadScript>
    </div>
  );
};
  

      




// prevents unneeded rerenders if the rest of the app changes - don't want to have this map refresh a ton

export const MemoGoogleMap = React.memo(MapComponent);
