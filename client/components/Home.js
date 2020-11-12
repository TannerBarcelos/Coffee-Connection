import React from "react";

// Components
import Header from "./Header";

// images
import compas from "../images/compas.jpg";
import fav_shop from "../images/fav_shop.jpg";
import learn from "../images/learn.jpg";
import yelp from "../images/yelp.jpg";

function Home() {
  return (
    <>
      <Header />
      <div className="container">
        <section className="section__content card">
          <p>Search for coffee shops in any location</p>
          <img src={compas} alt={"compas"} />
        </section>
        <section className="section__content card">
          <img src={fav_shop} alt={"favorite shop"} />
          <p>Favorite the shop and have it saved to your own profile</p>
        </section>
        <section className="section__content card">
          <p>
            Learn more about the coffee shop before you visit to save yourself
            the time
          </p>
          <img src={learn} alt={"learn"} />
        </section>
        <section className="section__content card">
          <img src={yelp} alt={"yelp"} />
          <p>Connects to Yelp! so you can get reviews fast</p>
        </section>
      </div>
    </>
  );
}

export default Home;
