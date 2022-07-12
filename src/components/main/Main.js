import React from "react";
import Promo from "../promo/Promo";
import Preloader from "../preloader/Preloader";
import Ads from "../ads/Ads";

function Main(props) {
  const allAds = props.isAuthorized ? props.ads : props.adsDefault;

  return (
    <main className="main">
      <Promo ad={props.ad} setAd={props.setAd} />
      {props.isLoading ? (
        <Preloader />
      ) : allAds.length === 0 ? (
        <p className="error-paragraph">По Вашему запросу ничего не найденно</p>
      ) : (
        <Ads
          isAuthorized={props.isAuthorized}
          ads={props.isAuthorized ? props.ads : props.adsDefault}
          visiableAds={props.visiableAds}
          showMoreAds={props.showMoreAds}
        />
      )}
    </main>
  );
}

export default Main;
