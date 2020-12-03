import React from 'react';

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

const BookmarkItem = ({ shop, removeBookmark }) => {
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
          src={shop.imageURL}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            marginTop: '1rem',
          }}
        />
      </div>
      <div className="content" style={{ marginTop: '1rem' }}>
        <i
          className="fas fa-trash-alt trashbin"
          style={{
            width: '30px',
            height: '30px',
            position: 'absolute',
            top: '.8rem',
            right: '0',
          }}
          onClick={removeBookmark.bind(this, shop.shopID)}
        ></i>
        <div className="header">{shop.name}</div>
        <div>{shop.address}</div>
      </div>
      <div className="extra content">
        <span className="right floated" style={{ marginTop: '.7rem' }}>
          {renderStars(Math.ceil(shop.rating)).map((star) => {
            return star;
          })}
        </span>
        <a href={shop.url} target="_blank" className="ui google plus button">
          See on Yelp!{' '}
          <i
            className="fab fa-yelp"
            style={{ fontSize: '1.3rem', color: '#fff' }}
          ></i>
        </a>
      </div>
    </div>
  );
};

export default BookmarkItem;
