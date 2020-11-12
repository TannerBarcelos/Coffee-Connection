async function fetchOffGeoLocation(coords, setLocations) {
  const { latitude, longitude } = coords.coords;
  const data = await fetch("https://coffee-connection.herokuapp.com/geo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      latitude: latitude,
      longitude: longitude,
    }),
  });
  const { businesses } = await data.json();
  setLocations(businesses);
}
export default fetchOffGeoLocation;
