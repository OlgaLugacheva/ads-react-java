import React from "react";
import Promo from "../promo/Promo";
import Preloader from "../preloader/Preloader";
import Ads from "../ads/Ads";
import AdsCardListButton from "../adsCardListButton/AdsCardListButton";

function Main(props) {
  const [visiableAds, setVisiableAds] = React.useState(4)
  const allAds = props.isAuthorized ? props.ads : props.adsDefault;

  function showMoreAds() {
    setVisiableAds((prevValue) => {
      return prevValue + 2;
    });
  }

  return (
    <main className="main">
      <Promo ad={props.ad} setAd={props.setAd} user={props.isAuthorized} />
      {props.isLoading ? (
        <Preloader />
      ) : allAds.length === 0 ? (
        <p className="error-paragraph">По Вашему запросу ничего не найденно</p>
      ) : (
        <Ads ads={props.isAuthorized ? props.ads : props.adsDefault} visiableAds={visiableAds}/>
      )}
      {visiableAds < props.ads.length && (
          <AdsCardListButton showMoreAds={showMoreAds}/>
        )}
    </main>
  );
}

export default Main;
