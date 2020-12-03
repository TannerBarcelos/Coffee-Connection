import React from 'react';

// generates the amount of stars to show for the rating for each shop
const renderStars = (len) => {
  if (len < 1) {
    return null;
  }
  const stars = [];
  for (let i = 0; i < Math.floor(len); i++) {
    stars.push(
      <i key={i} className="fas fa-star" style={{ color: '#a37eba' }}></i>,
    );
  }
  return stars;
};

// For the logged in user, send the clicked item and its data to the server
// to essentially post that shop to the DB
async function onClick(
  e,
  shopName,
  image_url,
  url,
  phone,
  address,
  rating,
  id,
  userInformation,
) {
  /**
   * Prod: https://coffee-connection.herokuapp.com/bookmarks/bookmark
   * Dev: `http://localhost:5000/bookmarks/bookmark`
   */
  await fetch(`https://coffee-connection.herokuapp.com/bookmarks/bookmark`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // body of the request being sent (contains all coffee shop info +USER ID IMPORTANT!!)
    body: JSON.stringify({
      shopName: shopName,
      image_url: image_url,
      url: url,
      phone: phone,
      address: address,
      rating: rating,
      shopID: id,
      userID: userInformation.id,
    }),
  });
}
// takes in props from parent component
function LocationItem({
  shopName,
  image_url,
  url,
  phone,
  address,
  rating,
  id,
  isAuthenticated,
  distance,
  userInformation,
}) {
  return (
    <div
      className="ui card"
      style={{ width: '400px', height: '470px', marginTop: 'none' }}
    >
      <div
        style={{
          width: '100%',
          height: '280px',
          textAlign: 'center',
          marginBottom: '1rem',
        }}
      >
        <img
          src={image_url}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            marginTop: '1rem',
          }}
        />
      </div>
      <div className="content" style={{ marginTop: '1rem' }}>
        {isAuthenticated ? (
          <div
            className="tooltip__icon__container"
            data-tooltip="Bookmark this coffee shop to your profile"
            data-position="left center"
            style={{
              width: '30px',
              height: '30px',
              position: 'absolute',
              top: '.8rem',
              right: '0',
            }}
          >
            <i
              data-shop__id={id}
              onClick={(e) =>
                onClick(
                  e,
                  shopName,
                  image_url,
                  url,
                  phone,
                  address,
                  rating,
                  id,
                  userInformation,
                )
              }
              className="fas fa-bookmark"
              id="bookmarker"
              style={{ fontSize: '1.6rem', color: '#a37dba' }}
            ></i>
          </div>
        ) : null}
        <div className="header">{shopName}</div>
        <div>{address}</div>
        <div>{distance.toFixed(3)} miles away</div>
      </div>
      <div className="extra content">
        <span className="right floated" style={{ marginTop: '.7rem' }}>
          {renderStars(Math.ceil(rating)).map((star) => {
            return star;
          })}
        </span>
        <a href={url} target="_blank" className="ui google plus button">
          See on Yelp!{' '}
          <i
            className="fab fa-yelp"
            style={{ fontSize: '1.3rem', color: '#fff' }}
          ></i>
        </a>
      </div>
    </div>
  );
}

export default LocationItem;
