import React from "react";
import Promo from "../promo/Promo";
// import Preloader from "../preloader/Preloader";
// import Ads from "../ads/Ads";

function Main(props) {
  // const allAds = props.user ? props.ads : props.adsDefault;

  return (
    <main className="main">
      <Promo ad={props.ad} setAd={props.setAd} user={props.isAuthorized} />
      {/* {props.isLoading ? (
        <Preloader />
      ) : allAds.length === 0 ? (
        <p className="error-paragraph">По Вашему запросу ничего не найденно</p>
      ) : (
        <Ads ads={props.user ? props.ads : props.adsDefault} />
      )} */}
    </main>
  );
}

export default Main;
