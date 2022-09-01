import React, {useState, useEffect} from "react";
import api from "../../utils/api";

import Buttons from "../buttons/Buttons";
import EditCommentPopup from "../editCommentPopup/EditCommentPopup";
import defaultImg from "../../images/greg-rakozy-oMpAz-DN-9I-unsplash.jpg";

function Comment(
    comment,
    username,
    password,
    setComments,
    handleEditCommPopupOpen,
    isComPopupOpen,
    onClose, user,
) {
    const [adComment, setAdComment] = useState({});
    const currentCommentid = comment.commentId;

    useEffect(() => {
        api
            .getComment(comment.adId, comment.commentId, comment.username, comment.password)
            .then((res) => {
                setAdComment(res);
            })
            .catch((error) => console.log("error", error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comment.adId, comment.commentId, comment]);

    const handleEditComment = (data) => {
        api
            .editComment(comment.adId, comment.commentId, data, comment.username, comment.password)
            .then((res) => {
                setAdComment(res);
            })
            .catch((error) => console.log("error", error));
    };

    const onDelete = (e) => {

        e.preventDefault();
        api
            .deleteComment(comment.adId, comment.commentId, comment.username, comment.password)
            .then(() => {
                setComments((comments) =>
                    comments.filter((i) => i.id !== comment.commentId)
                );
            })
            .catch((error) => console.log("error", error));
    };

    return (
        <li className="comment" key={comment.commentId}>
            <div className="comment-box">
                {comment.img ? (
                    <img src={comment.img} alt="user-img" className="comment-img"/>
                ) : (
                    <img src={defaultImg} alt="user-img" className="comment-img"/>
                )}
                <p className="comment-text comment__author-text">
                    {comment.authorName}
                </p>
            </div>
            <div className="commentBox">
                <p className="comment-text comment-message">{comment.text}</p>
                {user === comment.userId ? (
                    <Buttons
                        className="comment-buttons"
                        classButton="comment-button"
                        onOpen={
                            currentCommentid === adComment.pk ? handleEditCommPopupOpen : null
                        }
                        onSubmit={onDelete}
                        key={comment.pk}
                    />
                ) : null}
                <EditCommentPopup
                    onClose={onClose}
                    isOpen={isComPopupOpen}
                    id={comment.adId}
                    getComm={adComment}
                    handleEdit={handleEditComment}
                    userId={user}
                    commentUserId={comment.userId}
                    commentId={comment.commentId}
                    currentComId={adComment.pk}
                    key={comment.pk}/>
            </div>
        </li>
    );
}

export default Comment;
