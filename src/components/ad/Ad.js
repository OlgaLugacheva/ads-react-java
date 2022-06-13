import React from "react";
import img from "../../images/malvestida-u79wy47kvVs-unsplash.jpg";

function Ad(card) {
  return (
    <li className="ad" key={card.id}>
      {card.image ? (
        <img src={card.image} className="ad-img" alt="product img" />
      ) : card.image === null ? (
        <div className="ad-img_null" />
      ) : (
        <img src={img} className="ad-img" alt="product img" />
      )}
      <div className="ad__description">
        <h2 className="ad__title">{card.title}</h2>
        <p className="ad__price">{card.price} &#8381;</p>
      </div>
    </li>
  );
}

export default Ad;
