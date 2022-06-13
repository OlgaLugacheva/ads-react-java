import React from "react";
import { Link } from "react-router-dom";
import Profile from "../profile/Profile";
import Ads from "../ads/Ads";
//import Preloader from "../preloader/Preloader";
//import PaginationComponent from "../paginationComponent/PaginationComponent";
import EditUserImgPopup from "../editUserImgPopup/EditUserImgPopup";
import defaultImg from "../../images/greg-rakozy-oMpAz-DN-9I-unsplash.jpg";

function UserProfile(props) {
  // const {
  //   isLoading,
  //   setIsLoading,
  //   getUsersAds,
  //   getUserInfo,
  //   updateUser,
  //   updateUserPhoto,
  //   isUserPhotoPopupOpen,
  //   handleOpenUserPhotoPopup,
  //   closePopup,
  // } = useContext(MainContext);
  // const [pageQty, setPageQty] = useState(0);
  // const [page, setPage] = useState(
  //   parseInt(props.location.search?.split("=")[1] || 1)
  // );
  // const [userInfo, setUserInfo] = useState({});
  // const [userAds, setUserAds] = useState([]);
  // const { user } = useContext(AuthContext);

  // useEffect(() => {
  //   if (user) {
  //     setIsLoading(true);
  //     Promise.all([getUsersAds(page), getUserInfo()])
  //       .then(([usersAds, userInormation]) => {
  //         setUserAds(usersAds.data.results);
  //         setPageQty(Math.round(usersAds.data.count / 4));
  //         setUserInfo(userInormation.data);
  //       })
  //       .catch((error) => console.log("error", error))
  //       .finally(() => setTimeout(() => setIsLoading(false), 700));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user, page]);

  // const handleUpdateUser = (data) => {
  //   updateUser(data)
  //     .then((res) => {
  //       setUserInfo({
  //         ...userInfo,
  //         first_name: res.data.first_name,
  //         last_name: res.data.last_name,
  //         phone: res.data.phone,
  //       });
  //       localStorage.setItem("userPers", JSON.stringify(userInfo));
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });
  // };

  // const handleUpdateUserPhoto = (image) => {
  //   updateUserPhoto(image)
  //     .then((res) => {
  //       setUserInfo({
  //         ...userInfo,
  //         image: res.data.image,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });
  // };

  return (
    <main className="main">
      <section className="userProfile-grid padding">
        <div className="userProfile-container">
          <div
            className="profile-avatar"
            // style={{
            //   backgroundImage: `url(${
            //     userInfo.image ? userInfo.image : defaultImg
            //   })`,
            // }}
            style={{
              backgroundImage: `url(${
                defaultImg
              })`,
            }}
          >
            <button
              className="profile-avatar__button"
              onClick={props.onOpen}
            />
          </div>
        </div>
        <Profile />
      </section>
      <div className="userProfile-container">
        <h2 className="userProfile-title padding">Мои товары</h2>
        <Link to="/newAd" className="link-button">
          <button className="link-btn" />
        </Link>
      </div>
      {/* <section className="pagination-container padding">
        <PaginationComponent pageQty={pageQty} setPage={setPage} page={page} />
      </section> */}
      {/* {isLoading ? <Preloader /> : <Ads ads={userAds} />} */}
      <Ads  />
      <EditUserImgPopup
        isOpen={props.isOpen}
        onClose={props.onClose}
        //editUserPhoto={handleUpdateUserPhoto}
      />
    </main>
  );
}

export default UserProfile;

