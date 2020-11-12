import React, { useState, useEffect } from "react";

// Components to pass into this component
import Spinner from "./Spinner";
import Shops from "./Shops";
import FilterShops from './FilterShops';

// Custom API functions to interface with my backend - o extracted it out to its own
//directory to separate UI from logic
import fetchOffGeoLocation from "../locationServices/queryGeoLocation";
import fetchOffInput from "../locationServices/queryUserInputLocation";

function Locations({isAuthenticated, userInformation}) {
  console.log(userInformation)
  // hooks
  const [cityEntry, setCityEntry] = useState("");
  const [locations, setLocations] = useState(undefined);
  const [coords, setCoords] = useState("");

  // gets user geo-location for initial render (will only run once)
  // this is asyncronous so it will take some time
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords(pos);
      },
      (err) => console.log(err)
    );
  }, []);

  // this will handle the actual API call and server requests - determines if the coordinates
  // are in lat/lon (geo api request) or search input (string input) - think this is really cool
  // and clever
  useEffect(() => {
    if (coords) {
      switch (typeof coords) {
        case "object":
          fetchOffGeoLocation(coords, setLocations);
        case "string":
          fetchOffInput(coords, setLocations);
          break;
        default:
          console.log("error in request");
      }
    }
  }, [coords]); // only re-run when coords change

  useEffect(() => {
    displayShops();
  }, [locations])

  // if user presses button
  function onSubmit() {
    setCoords(cityEntry);
  }

  // if user presses enter - submit request
  function onFormSubmit(e) {
    e.preventDefault();
    setCoords(cityEntry);
  }

  function convertToMiles(meterValue) {
    return meterValue / 1609;
  }

  function sortBySelection(selection) {
    switch(selection) {
      case 'High to Low':
        setLocations([...locations.sort((shopA, shopB) => Math.ceil(shopB.rating) - Math.ceil(shopA.rating))]);
        return;
      case 'Low to High':
        setLocations([...locations.sort((shopA, shopB) => Math.ceil(shopA.rating) - Math.ceil(shopB.rating))]);
        return;
      case 'Alphabetically':
        // sorts alphabetically by first character
        setLocations([...locations.sort((shopA, shopB) => shopA.name.split(' ')[0].charCodeAt(0) - shopB.name.split(' ')[0].charCodeAt(0))]);
        return;
      case 'By Distance':
        // sorts alphabetically by first character
        setLocations([...locations.sort((shopA, shopB) => convertToMiles(shopA.distance) - convertToMiles(shopB.distance))]);
        return;
      default:
        // default sort of by-distance
        locations.sort((a,b) => (a.distance/1609).toFixed(3) - (b.distance/1609).toFixed(3));
        break;
        return;
    }
  }

  function displayShops() {
    if(!locations || locations.length === 0){
      return null;
    }else {
      return (
        <>
          <FilterShops filter={sortBySelection}/>
          <Shops locations={locations} isAuthenticated={isAuthenticated} userInformation={userInformation}/>
        </>
      )
    }
  }
  return (
    <>
      <header className="hero__image">
        <div className="hero-text">
          <h1 className="hero__title-h1">Find coffee shops near you!</h1>
          <form className="form__container" onSubmit={(e) => onFormSubmit(e)}>
            <input
              id="search__cafe-field"
              type="text"
              placeholder="Seach by City Name"
              name="location_search"
              value={cityEntry}
              onChange={(e) => setCityEntry(e.target.value)}
            />
            <input
              id="search__cafe-btn"
              type="button"
              value="Submit"
              onClick={() => onSubmit()}
            />
          </form>
        </div>
      </header>
        <div className="container">
          {!locations ? (
            <>
              <Spinner />
            </>
          ) : (
              displayShops()
          )}
        </div>
    </>
  );
}
export default Locations;
