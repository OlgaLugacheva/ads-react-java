import React  from "react";
// import { useParams, useHistory } from "react-router-dom";
import CommentContainer from "../commentContainer/CommentContainer";
import EditAdPopup from "../editAdPopup/EditAdPopup";
import Buttons from "../buttons/Buttons";
//import Preloader from "../preloader/Preloader";
import EditPhotoAdPopup from "../editPhotoPopup/EditPhotoPopup";

function SinglePage(props) {
  // const { id } = useParams();
  // const [ad, setAd] = useState({});
  // const [comments, setComments] = useState([]);
  // let ad_pk = id;
  // const {
  //   isEditPopupOpen,
  //   isEditPhotoPopupOpen,
  //   closePopup,
  //   setAds,
  //   handleOpenEditPopup,
  //   handleOpenEditPhotoPopup,
  //   getAd,
  //   getComments,
  //   setIsLoading,
  //   isLoading,
  //   deleteAdd,
  //   addComment,
  //   editAdd,
  //   editAddPhoto,
  // } = useContext(MainContext);
  // let history = useHistory();

  // useEffect(() => {
  //   if (user) {
  //     setIsLoading(true);
  //     Promise.all([getComments(ad_pk), getAd(id)])
  //       .then(([commentsData, adData]) => {
  //         setComments(commentsData.data.results);
  //         setAd(adData.data);
  //       })
  //       .catch((error) => console.log("error", error))
  //       .finally(() => setTimeout(() => setIsLoading(false), 700));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user]);

  // function handleEditAdd(data) {
  //   debugger;
  //   editAdd(id, data)
  //     .then((data) => {
  //       setAds((ads) => ads.filter((i) => (i.id === ad.pk ? data : null)));
  //       window.location.reload();
  //     })
  //     .catch((error) => console.log("error", error));
  // }

  // function handleEditPhotoAdd(image) {
  //   editAddPhoto(id, image)
  //     .then((image) => {
  //       setAds((ads) => ads.filter((i) => (i.id === ad.pk ? image : null)));
  //       window.location.reload();
  //     })
  //     .catch((error) => console.log("error", error));
  // }

  // function handleDeleteAdd(e) {
  //   e.preventDefault();
  //   deleteAdd(id)
  //     .then(() => {
  //       setAds((ads) => ads.filter((i) => i.id !== ad.id));
  //       history.push("/");
  //     })
  //     .catch((error) => console.log("error", error));
  // }

  // function handleAddComment(data) {
  //   addComment(id, data)
  //     .then((newComment) => {
  //       setComments([newComment, ...comments]);
  //       window.location.reload();
  //     })
  //     .catch((error) => console.log("error", error));
  // }

  return (
    <main className="cardInformation">
      {/* {/* {isLoading ? (
        <Preloader />
      ) : ( */}
        {/* ad && (
          <> */}
            <h1 className="cardInformation__title">ad.title</h1>
            <div className="cardInformation__container">
              {/* {ad.image === null ? ( */}
                <div className="cardInformation__img-null">
                  {/* {user.user_id === ad.author_id ? ( */}
                    <button
                      onClick={props.handleOpenEditPhotoPopup}
                      className="cardInformation__img-change"
                      type="button"
                    />
                  {/* ) : null} */}
                </div>
              {/* ) : ( */}
                <div
                  // style={{ backgroundImage: `url(${ad.image})` }}
                  className="cardInformation__img"
                >
                  {/* {user.user_id === ad.author_id ? ( */}
                    <button
                      onClick={props.handleOpenEditPhotoPopup}
                      className="cardInformation__img-change"
                      type="button"
                    />
                  {/* ) : null} */}
                </div>
              {/* )}
              {user.user_id !== ad.author_id ? null : ( */}
                <Buttons
                  // user={user}
                  // product={ad}
                  onOpen={props.handleOpenEditPopup}
                  className="buttons"
                  classButton="buttons-item"
                  // onSubmit={handleDeleteAdd}
                />
              {/* )} */}
              <div className="cardInformation__box">
                <div className="cardInformation__box_second">
                  <p className="cardInformation__tel">ad.phone</p>
                  <p className="cardInformation__tel">ad.author_first_name</p>
                </div>
                <p className="cardInformation__price">ad.price &#8381;</p>
              </div>
              <div className="cardInformation__box">
                <p className="cardInformation__description">ad.description</p>
              </div>
              <CommentContainer
                // comments={comments}
                // addComment={handleAddComment}
                // setComments={setComments}
                // user={user}
              />
            </div>
            <EditAdPopup
              isEditPopupOpen={props.isEditPopupOpen}
              onClose={props.closePopup}
              handleEditAdd={props.handleEditAdd}
              // id={id}
              // ad={ad}
            />
            <EditPhotoAdPopup
              // id={id}
              handleEdit={props.handleEditPhotoAdd}
              isOpen={props.isEditPhotoPopupOpen}
              onClose={props.closePopup}
            />
          {/* </> */}
        {/* ) */}
      {/* )} */}
    </main>
  );
}

export default SinglePage;
