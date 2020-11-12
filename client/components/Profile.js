import React, {useEffect, useState} from 'react';

import BookmarkItem from './BookmarkItem';
import FilterBookmarks from './FilterBookmarks';
import MessagePopup from './MessagePopup'; // to show user who signed in initially for a few seconds then remove

function defaultConversionOfName(name) {
  const fullName = name.split(' ');
  return fullName.map((word) => {
    return word[0].toUpperCase() + word.slice(1); // convert to caps of first letter only
  }).join(' ');
}

function Profile({userInfo}) {
  const [shopList, setShops] = useState(null);
  useEffect(() => {
      /**
       * Prod: https://coffee-connection.herokuapp.com/bookmarks/${userid}
       * Dev: http://localhost:5000/bookmarks/${userid}
       */
      (async () => {
        const res = await fetch(`https://coffee-connection.herokuapp.com/bookmarks/shops/${userInfo.id}`);
        const bookmarkedShops = await res.json();
        setShops([...bookmarkedShops]);
        console.log(shopList);
      })() // IIFE
  }, []);

  // to handle sort changes
  useEffect(() => {
    displayBookmarks(); // if the state changes, re-render the shops
}, [shopList]);

  // helper function to remove shop by shop ID and find the user with their ID first
  async function removeShop(shopID) {
    /**
    * Prod: https://coffee-connection.herokuapp.com/bookmarks/remove
    * Dev: http://localhost:5000/bookmarks/remove
    */
    const res = await fetch('https://coffee-connection.herokuapp.com/bookmarks/remove', {
      method: 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        shopID,
        userID: userInfo.id
      })
    });
    const updatedShops = await res.json();
    setShops(updatedShops);
  }
  // will determine how to sort the bookmarks
  function sortBySelection(selection) {
    switch(selection) {
      case 'High to Low':
        setShops([...shopList.sort((shopA, shopB) => Math.ceil(shopB.rating) - Math.ceil(shopA.rating))]);
        return;
      case 'Low to High':
        setShops([...shopList.sort((shopA, shopB) => Math.ceil(shopA.rating) - Math.ceil(shopB.rating))]);
        return;
      case 'Alphabetically':
        // sorts alphabetically by first character
        setShops([...shopList.sort((shopA, shopB) => shopA.name.split(' ')[0].charCodeAt(0) - shopB.name.split(' ')[0].charCodeAt(0))]);
        return;
      default:
        return;
    }
  }
  // displays the bookmarks
  function displayBookmarks() {
    if(!shopList || shopList.length === 0) 
      return null;
    else
      return (
        <>
          <FilterBookmarks filter={sortBySelection}/>
          {shopList.map(shop => <BookmarkItem key={shop.shopID} shop={shop} removeBookmark={removeShop}/>)}
        </>
      )
  } 
  return (
      <div className="container">
        <h1 style={{ marginTop: "3rem"}} className="profile-greeting-h1">Hello, {defaultConversionOfName(userInfo.name)}</h1>
        {displayBookmarks()}
      </div>
  )
}

export default Profile;
