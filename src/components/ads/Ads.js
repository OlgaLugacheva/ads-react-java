import React from "react";
import { Link, useLocation } from "react-router-dom";
import Ad from "../ad/Ad";

function Ads({ ads, isAuthorized, visiableAds }) {
  let location = useLocation().pathname;

  return (
    <section className={`ads ${location === "/profile" ? "padding" : ""}`}>
      {!ads.length ? (
        <p>У Вас еще нет обьявлений.</p>
      ) : (
        <ul
          className={`ads__container ${
            location === "/profile"
              ? "ads__container-profile"
              : "ads__container"
          }`}
        >
          {ads.slice(0, visiableAds).map((ad) => {
            return (
              <Link
                key={ad.pk}
                to={isAuthorized ? `ads/${ad.pk}` : "/"}
                className="ads__link"
              >
                <Ad
                  key={ad.pk}
                  pk={ad.pk}
                  title={ad.title}
                  image={ad.image}
                  price={ad.price}
                  description={ad.description}
                />
              </Link>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default Ads;
