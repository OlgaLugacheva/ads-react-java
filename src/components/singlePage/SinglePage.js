import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommentContainer from "../commentContainer/CommentContainer";
import EditAdPopup from "../editAdPopup/EditAdPopup";
import Buttons from "../buttons/Buttons";
import api from "../../utils/api";
import Preloader from "../preloader/Preloader";
import EditPhotoAdPopup from "../editPhotoAdPopup/EditPhotoAdPopup";

function SinglePage(props) {
  const { id } = useParams();
  const [ad, setAd] = useState({});
  const [comments, setComments] = useState([]);
  let ad_pk = id;

  let history = useNavigate();

  useEffect(() => {
    if (props.isAuthorized) {
      props.setIsLoading(true);
      Promise.all([api.getComments(ad_pk), api.getAd(id)])
        .then(([commentsData, adData]) => {
          setComments(commentsData.data.results);
          setAd(adData.data);
        })
        .catch((error) => console.log("error", error))
        .finally(() => setTimeout(() => props.setIsLoading(false), 700));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isAuthorized]);

  function handleEditAdd(data) {
    debugger;
    api
      .editAdd(id, data)
      .then((data) => {
        props.setAds((ads) =>
          ads.filter((i) => (i.id === ad.pk ? data : null))
        );
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
  }

  function handleEditPhotoAdd(image) {
    api
      .editAddPhoto(id, image)
      .then((image) => {
        props.setAds((ads) =>
          ads.filter((i) => (i.id === ad.pk ? image : null))
        );
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
  }

  function handleDeleteAdd(e) {
    api
      .deleteAdd(id)
      .then(() => {
        props.setAds((ads) => ads.filter((i) => i.id !== ad.id));
        history.push("/");
      })
      .catch((error) => console.log("error", error));
  }

  function handleAddComment(data) {
    api
      .addComment(id, data)
      .then((newComment) => {
        setComments([newComment, ...comments]);
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <main className="cardInformation">
      {props.isLoading ? (
        <Preloader />
      ) : (
        ad && (
          <>
            <h1 className="cardInformation__title">{ad.title}</h1>
            <div className="cardInformation__container">
              {ad.image === null ? (
                <div className="cardInformation__img-null">
                  {props.user.user_id === ad.author_id ? (
                    <button
                      onClick={props.handleOpenEditPhotoPopup}
                      className="cardInformation__img-change"
                      type="button"
                    />
                  ) : null}
                </div>
              ) : (
                <div
                  style={{ backgroundImage: `url(${ad.image})` }}
                  className="cardInformation__img"
                >
                  {props.user.user_id === ad.author_id ? (
                    <button
                      onClick={props.handleOpenEditPhotoPopup}
                      className="cardInformation__img-change"
                      type="button"
                    />
                  ) : null}
                </div>
              )}
              {props.user.user_id !== ad.author_id ? null : (
                <Buttons
                  user={props.user}
                  product={ad}
                  onOpen={props.handleOpenEditPopup}
                  className="buttons"
                  classButton="buttons-item"
                  onSubmit={handleDeleteAdd}
                />
              )}
              <div className="cardInformation__box">
                <div className="cardInformation__box_second">
                  <p className="cardInformation__tel">{ad.phone}</p>
                  <p className="cardInformation__tel">{ad.author_first_name}</p>
                </div>
                <p className="cardInformation__price">{ad.price} &#8381;</p>
              </div>
              <div className="cardInformation__box">
                <p className="cardInformation__description">{ad.description}</p>
              </div>
              <CommentContainer
                comments={comments}
                addComment={handleAddComment}
                isComPopupOpen={props.isComPopupOpen}
                handleEditCommPopupOpen={props.handleEditCommPopupOpen}
                setComments={setComments}
                user={props.user}
              />
            </div>
            <EditAdPopup
              isEditPopupOpen={props.isEditPopupOpen}
              onClose={props.closePopup}
              handleEditAdd={handleEditAdd}
              id={id}
              ad={ad}
            />
            <EditPhotoAdPopup
              id={id}
              handleEdit={handleEditPhotoAdd}
              isOpen={props.isEditPhotoPopupOpen}
              onClose={props.closePopup}
            />
          </>
        )
      )}
    </main>
  );
}

export default SinglePage;
