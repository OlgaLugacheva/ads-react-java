import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Ad from "../ad/Ad";

function Ads({ ads }) {
  let { user } = useContext(AuthContext);
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
          {ads.map((card) => {
            return (
              <Link
                key={card.pk}
                to={user ? `ads/${card.pk}` : "/"}
                className="ads__link"
              >
                <Ad
                  key={card.pk}
                  pk={card.pk}
                  title={card.title}
                  image={card.image}
                  price={card.price}
                  description={card.description}
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
