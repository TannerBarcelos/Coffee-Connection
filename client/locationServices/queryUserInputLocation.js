async function fetchOffInput(location, setLocations) {
  const data = await fetch("https://coffee-connection.herokuapp.com/locations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      city: location,
    }),
  });
  const { businesses } = await data.json();
  setLocations(businesses);
}

export default fetchOffInput;
