import React from "react";

import LocationItem from "./LocationItem";

function Shops({ locations, isAuthenticated, userInformation }) {
  return (
    locations.map((loc, i) => (
          <LocationItem
            key={i} //replace with a uuid later
            shopName={loc.name}
            image_url={loc.image_url}
            url={loc.url}
            phone={loc.phone}
            address={loc.location.address1}
            rating={loc.rating}
            id={loc.id}
            distance={loc.distance / 1609}
            isAuthenticated={isAuthenticated}
            userInformation={userInformation}
          />
    ))
  );
}

export default Shops;
