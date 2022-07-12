import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import auth from "../../utils/auth";
import api from "../../utils/api";
import Header from "../header/Header";
import Main from "../main/Main";
import Footer from "../footer/Footer";
import Registration from "../registration/Registration";
import Login from "../login/Login";
import UserProfile from "../userProfile/UserProfile";
import SinglePage from "../singlePage/SinglePage";
import PopupNavigation from "../popopNavigation/PopupNavigation";
import NewAdd from "../newAdd/NewAdd";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //user
  const [userInfo, setUserInfo] = useState({});
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  //ads
  const [ad, setAd] = useState("");
  const [ads, setAds] = useState([]);
  //const [filteredAds, setFilteredAds] = useState([]);
  const [adsDefault, setAdsDefault] = useState([]);
  const [userAds, setUserAds] = useState([]);
  const [visiableAds, setVisiableAds] = useState(4);
  //popups
  const [isPopupNavigatorOpen, setIsPopupNavigatorOpen] = useState(false);
  const [isUserPhotoPopupOpen, setIsUserPhotoPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isEditPhotoPopupOpen, setIsEditPhotoPopupOpen] = useState(false);
  const [isComPopupOpen, setIsComPopupOpen] = useState(false);

  let navigate = useNavigate();

  //search ad by title
  function searcAd(cards, card) {
    return cards.filter((value) =>
      value.title.toLowerCase().includes(card.toLowerCase())
    );
  }

  //pagination
  function showMoreAds() {
    setVisiableAds((prevValue) => {
      return prevValue + 2;
    });
  }

  useEffect(() => {
    if (isAuthorized) {
      setIsLoading(true);
      Promise.all([api.getUsersAds(), api.getUserInfo()])
        .then(([usersAds, userInormation]) => {
          setUserAds(usersAds)
          setUserInfo(userInormation);
        })
        .catch((error) => console.log("error", error))
        .finally(() => setTimeout(() => setIsLoading(false), 700));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized]);

  //ads
  useEffect(() => {
    setIsLoading(true);
    isAuthorized
      ? api
          .getHiddenAds()
          .then((response) => {
            setAds(response.results);
          })
          .catch((error) => console.log("error", error))
          .finally(() => setTimeout(() => setIsLoading(false), 500))
      : api
          .getAds()
          .then((data) => {
            setAdsDefault(data.results);
          })
          .catch((error) => console.log("error", error))
          .finally(() => setTimeout(() => setIsLoading(false), 500));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized]);

  let filteredAds = isAuthorized ? searcAd(ads, ad) : searcAd(adsDefault, ad);

  const handleRegistration = ({ username, password, role }) => {
    setIsLoading(true);
    auth
      .registration({ username, password, role })
      .then((res) => {
        if (res) {
          navigate("/sign-in");
        } else {
          Promise.reject(`Ошибка ${res.status}`);
        }
      })
      .catch((error) => {
        setIsAuthorized(false);
        if (error === 500 || "Failed to fetch")
          return console.log("На сервере произошла ошибка");
        if (error === 409)
          return console.log("Пользователь с таким email уже существует.");
        if (error === 400) return console.log("Все поля должны быть заполнены");
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 700);
      });
  };

  const handleUpdateUser = (data) => {
    api
      .updateUser(data, username, password)
      .then((res) => {
      console.log(res.data)
        // setUserInfo({
        //   ...userInfo,
        //   firstName: res.data.firstName,
        //   lastName: res.data.lastName,
        //   phone: res.data.phone,
        //   username: res.data.username,
        //   id: res.data.id,
        // });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleUpdateUserPhoto = (image) => {
    api
      .updateUserPhoto(image)
      .then((res) => {
        setUserInfo({
          ...userInfo,
          image: res.data.image,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleAuthorization = (data) => {
    auth
      .authentication(data)
      .then((res) => {
        if (res.status === 200) {
          setUsername(data.username)
          setPassword(data.password)
          localStorage.setItem("authTokens", JSON.stringify(data));
          setIsAuthorized(true);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsAuthorized(false);
        if (error === 500 || "Failed to fetch") return console.log(error);
        if (error === 400) return console.log("Все поля должны быть заполнены");
        if (error === 401)
          return console.log("Вы ввели неправильный логин или пароль.");
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 700);
      });
  };

  function handleAddAd(data) {
    setIsLoading(true);
    api
      .addAd(data)
      .then((newAd) => {
        console.log(newAd);
        //setAds([newAd, ...ads]);
      })
      .catch((error) => console.log("error", error))
      .finally(() => setTimeout(() => setIsLoading(false), 500));
  }

  function signOut() {
    localStorage.removeItem("authTokens");
    setAd([]);
    setAds([]);
    setIsAuthorized(false);
    setUserAds([]);
    setUserInfo([]);
    window.location.reload();
    navigate("/sign-in");
  }

  //Open/close navigation when page's size max-width 840px
  const handleOpenPopup = () => {
    setIsPopupNavigatorOpen(true);
  };

  const handleOpenUserPhotoPopup = () => {
    setIsUserPhotoPopupOpen(true);
  };

  const handleOpenEditPopup = () => {
    setIsEditPopupOpen(true);
  };

  const handleOpenEditPhotoPopup = () => {
    setIsEditPhotoPopupOpen(true);
  };

  const handleEditCommPopupOpen = () => {
    setIsComPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupNavigatorOpen(false);
    setIsUserPhotoPopupOpen(false);
    setIsEditPopupOpen(false);
    setIsEditPhotoPopupOpen(false);
    setIsComPopupOpen(false);
  };

  useEffect(() => {
    //обработчик закрытия попапов по нажатия на ESC и overlay
    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };

    const handleCloseByOverlay = (evt) => {
      //обработчик для закртия popup по кнопке и overlay
      if (
        evt.target.classList.contains("popupNavigation_is-opened") ||
        evt.target.classList.contains("popupNavigation")
      ) {
        closePopup();
      }
    };

    document.addEventListener("click", handleCloseByOverlay);
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("click", handleCloseByOverlay);
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);
  return (
    <div className="app">
      <Header
        onOpen={handleOpenPopup}
        isAuthorized={isAuthorized}
        signOut={signOut}
      />
      <>
        <Routes>
          <Route
            exact
            path="/sign-in"
            element={
              <Login
                handleAuthorization={handleAuthorization}
                isLoading={isLoading}
              />
            }
          />
          <Route
            exact
            path="/sign-up"
            element={<Registration handleRegistration={handleRegistration} />}
          />
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute user={isAuthorized}>
                <UserProfile
                  isAuthorized={isAuthorized}
                  isOpen={isUserPhotoPopupOpen}
                  onOpen={handleOpenUserPhotoPopup}
                  onClose={closePopup}
                  userInfo={userInfo}
                  userAds={userAds}
                  isLoading={isLoading}
                  handleUpdateUser={handleUpdateUser}
                  handleUpdateUserPhoto={handleUpdateUserPhoto}
                  visiableAds={visiableAds}
                  showMoreAds={showMoreAds}
                />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/ads/:id"
            element={
              <ProtectedRoute user={isAuthorized}>
                <SinglePage
                  isEditPopupOpen={isEditPopupOpen}
                  isEditPhotoPopupOpen={isEditPhotoPopupOpen}
                  isComPopupOpen={isComPopupOpen}
                  handleEditCommPopupOpen={handleEditCommPopupOpen}
                  handleOpenEditPopup={handleOpenEditPopup}
                  handleOpenEditPhotoPopup={handleOpenEditPhotoPopup}
                  onClose={closePopup}
                  isAuthorized={isAuthorized}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                  user={userInfo.id}
                  setAds={setAds}
                />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/profile/ads/:id/"
            element={
              <ProtectedRoute user={isAuthorized}>
                <SinglePage
                  isEditPopupOpen={isEditPopupOpen}
                  isEditPhotoPopupOpen={isEditPhotoPopupOpen}
                  isComPopupOpen={isComPopupOpen}
                  handleEditCommPopupOpen={handleEditCommPopupOpen}
                  handleOpenEditPopup={handleOpenEditPopup}
                  handleOpenEditPhotoPopup={handleOpenEditPhotoPopup}
                  onClose={closePopup}
                  isAuthorized={isAuthorized}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                  user={userInfo.id}
                  setAds={setAds}
                />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/newAd"
            element={
              <ProtectedRoute user={isAuthorized}>
                <NewAdd handleAddAd={handleAddAd} isLoading={isLoading} />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/"
            element={
              <Main
                isAuthorized={isAuthorized}
                adsDefault={filteredAds}
                ads={filteredAds}
                isLoading={isLoading}
                ad={ad}
                setAd={setAd}
                showMoreAds={showMoreAds}
                visiableAds={visiableAds}
              />
            }
          />
        </Routes>
      </>
      <Footer />
      <PopupNavigation
        onClose={closePopup}
        isOpen={isPopupNavigatorOpen}
        logOut={signOut}
      />
    </div>
  );
}

export default App;
