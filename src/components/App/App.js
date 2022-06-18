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
import EmailLink from "../emailLink/EmailLink";
import ChangePassword from "../changePassword/ChangePassword";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";

function App(props) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //user
  const [userInfo, setUserInfo] = useState({});
  //ads
  const [ad, setAd] = useState({});
  const [ads, setAds] = useState([]);
  const [adsDefault, setAdsDefault] = useState([]);
  const [userAds, setUserAds] = useState([]);
  const [pageQty, setPageQty] = useState(0);
  const [page, setPage] = useState(props.location.search?.split("=")[1] || 1);
  const [userPageQty, setUserPageQty] = useState(0);
  const [userPage, setUserPage] = useState(
    parseInt(props.location.search?.split("=")[1] || 1)
  );
  //popups
  const [isPopupNavigatorOpen, setIsPopupNavigatorOpen] = useState(false);
  const [isUserPhotoPopupOpen, setIsUserPhotoPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isEditPhotoPopupOpen, setIsEditPhotoPopupOpen] = useState(false);
  const [isComPopupOpen, setIsComPopupOpen] = useState(false);

  let navigate = useNavigate();

  console.log(isAuthorized);

  useEffect(() => {
    if (isAuthorized) {
      setIsLoading(true);
      Promise.all([api.getUsersAds(userPage), api.getUserInfo()])
        .then(([usersAds, userInormation]) => {
          setUserAds(usersAds.data.results);
          setUserPageQty(Math.round(usersAds.data.count / 4));
          setUserInfo(userInormation.data);
        })
        .catch((error) => console.log("error", error))
        .finally(() => setTimeout(() => setIsLoading(false), 700));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized, userPage]);

  //ads
  useEffect(() => {
    setIsLoading(true);
    isAuthorized && ad
      ? api
          .getHiddenAdsTile(page, ad)
          .then((response) => {
            setAds(response.data.results);
            setPageQty(Math.round(response.data.count / 4));
          })
          .catch((error) => console.log("error", error))
          .finally(() => setTimeout(() => setIsLoading(false), 500))
      : isAuthorized
      ? api
          .getHiddenAds(page)
          .then((response) => {
            setAds(response.data.results);
            setPageQty(Math.round(response.data.count / 4));
          })
          .catch((error) => console.log("error", error))
          .finally(() => setTimeout(() => setIsLoading(false), 500))
      : ad.length
      ? api
          .getAdsTitle(ad, page)
          .then((data) => {
            setAdsDefault(data.results);
            setPageQty(Math.round(data.count / 4));
          })
          .catch((error) => console.log("error", error))
          .finally(() => setTimeout(() => setIsLoading(false), 500))
      : api
          .getAds(page)
          .then((data) => {
            setAdsDefault(data.results);
            setPageQty(Math.round(data.count / 4));
          })
          .catch((error) => console.log("error", error))
          .finally(() => setTimeout(() => setIsLoading(false), 500));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isAuthorized, ad, props.history]);

  useEffect(() => {
    setPage(props.location.search?.split("=")[1] || 1);
  }, [ad.length, props.location.search]);

  function handleAddAd(data) {
    setIsLoading(true);
    api
      .addAd(data)
      .then((newAd) => {
        setAds([newAd, ...ads]);
      })
      .catch((error) => console.log("error", error))
      .finally(() => setTimeout(() => setIsLoading(false), 500));
  }

  const handleRegistration = ({
    email,
    password,
    first_name,
    last_name,
    phone,
  }) => {
    setIsLoading(true);
    auth
      .registration({ email, password, first_name, last_name, phone })
      .then((res) => {
        console.log(res);
        if (res) {
          handleAuthorization({ email, password });
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
      .updateUser(data)
      .then((res) => {
        setUserInfo({
          ...userInfo,
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          phone: res.data.phone,
        });
        localStorage.setItem("userPers", JSON.stringify(userInfo));
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
        console.log(res);
        setIsAuthorized(true);
        navigate.push("/");
      })
      .catch((error) => {
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

  function heandlerChangePassword({ uid, token, new_password }) {
    auth
      .changePassword({
        uid,
        token,
        new_password,
      })
      .then(() => navigate.push("/sign-in"))
      .catch((error) => console.log("error", error));
  }

  function handlerSendLink({ email }) {
    auth
      .sendLink({ email })
      .then(() => navigate.push("/sign-in"))
      .catch((error) => console.log("error", error));
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
      <Header onOpen={handleOpenPopup} isAuthorized={isAuthorized} />
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
            path="/sign-in/email/"
            element={<EmailLink handlerSendLink={handlerSendLink} />}
          />
          <Route
            exact
            path="/password/reset/confirm/:Ng/:id/"
            element={
              <ChangePassword heandlerChangePassword={heandlerChangePassword} />
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute user={isAuthorized}>
                <UserProfile
                  isOpen={isUserPhotoPopupOpen}
                  onOpen={handleOpenUserPhotoPopup}
                  onClose={closePopup}
                  userInfo={userInfo}
                  userAds={userAds}
                  pageQty={userPageQty}
                  page={userPage}
                  setPage={setUserPage}
                  isLoading={isLoading}
                  handleUpdateUser={handleUpdateUser}
                  handleUpdateUserPhoto={handleUpdateUserPhoto}
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
            path="/NewAdd"
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
                pageQty={pageQty}
                setPage={setPage}
                page={page}
                isAuthorized={isAuthorized}
                adsDefault={adsDefault}
                ads={ads}
                isLoading={isLoading}
                ad={ad}
                setAd={setAd}
              />
            }
          />
        </Routes>
      </>
      <Footer />
      <PopupNavigation onClose={closePopup} isOpen={isPopupNavigatorOpen} />
    </div>
  );
}

export default App;
