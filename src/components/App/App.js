import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../header/Header";
import Main from "../main/Main";
import Footer from "../footer/Footer";
import Registration from "../registration/Registration";
import Login from "../login/Login";
// import UserProfile from "../userProfile/UserProfile";
// import SinglePage from "../singlePage/SinglePage";
import PopupNavigation from "../popopNavigation/PopupNavigation";
import NewAdd from "../newAdd/NewAdd";
import EmailLink from "../emailLink/EmailLink";
import ChangePassword from "../changePassword/ChangePassword";

function App() {
  const [isPopupNavigatorOpen, setIsPopupNavigatorOpen] = useState(false);
  // const [isUserPhotoPopupOpen, setIsUserPhotoPopupOpen] = useState(false);
  // const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  // const [isEditPhotoPopupOpen, setIsEditPhotoPopupOpen] = useState(false);
  // const [isComPopupOpen, setIsComPopupOpen] = useState(false);

  //Open/close navigation when page's size max-width 840px
  const handleOpenPopup = () => {
    setIsPopupNavigatorOpen(true);
  };

  // const handleOpenUserPhotoPopup = () => {
  //   setIsUserPhotoPopupOpen(true);
  // };

  // const handleOpenEditPopup = () => {
  //   setIsEditPopupOpen(true);
  // };

  // const handleOpenEditPhotoPopup = () => {
  //   setIsEditPhotoPopupOpen(true);
  // };

  // const handleEditCommPopupOpen = () => {
  //   setIsComPopupOpen(true);
  // };

  const closePopup = () => {
    setIsPopupNavigatorOpen(false);
    // setIsUserPhotoPopupOpen(false);
    // setIsEditPopupOpen(false);
    // setIsEditPhotoPopupOpen(false);
    // setIsComPopupOpen(false);
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
        evt.target.classList.contains("PopupNavigation_is-opened") ||
        evt.target.classList.contains("PopupNavigation")
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
    <div className="App">
      <Header onOpen={handleOpenPopup} />
      <>
        <Routes>
          <Route exact path="/sign-in" element={<Login />} />
          <Route exact path="/sign-up" element={<Registration />} />
          <Route exact path="/sign-in/email/" element={<EmailLink />} />
          <Route
            exact
            path="/password/reset/confirm/:Ng/:id/"
            element={<ChangePassword />}
          />
          {/* <Route
            exact
            path="/profile"
            element={
              <UserProfile
                isOpen={isUserPhotoPopupOpen}
                onOpen={handleOpenUserPhotoPopup}
                onClose={closePopup}
              />
            }
          /> */}
          {/* <Route
            exact
            path="/ads/:id"
            element={
              <SinglePage
                isEditPopupOpen={isEditPopupOpen}
                isEditPhotoPopupOpen={isEditPhotoPopupOpen}
                isComPopupOpen={isComPopupOpen}
                handleEditCommPopupOpen={handleEditCommPopupOpen}
                handleOpenEditPopup={handleOpenEditPopup}
                handleOpenEditPhotoPopup={handleOpenEditPhotoPopup}
                onClose={closePopup}
              />
            }
          />
          <Route
            exact
            path="/profile/ads/:id/"
            element={
              <SinglePage
                isEditPopupOpen={isEditPopupOpen}
                isEditPhotoPopupOpen={isEditPhotoPopupOpen}
                isComPopupOpen={isComPopupOpen}
                handleEditCommPopupOpen={handleEditCommPopupOpen}
                handleOpenEditPopup={handleOpenEditPopup}
                handleOpenEditPhotoPopup={handleOpenEditPhotoPopup}
                onClose={closePopup}
              />
            }
          /> */}
          <Route exact path="/NewAdd" element={<NewAdd />} />
          <Route exact path="/" element={<Main />} />
        </Routes>
      </>
      <Footer />
      <PopupNavigation onClose={closePopup} isOpen={isPopupNavigatorOpen} />
    </div>
  );
}

export default App;
