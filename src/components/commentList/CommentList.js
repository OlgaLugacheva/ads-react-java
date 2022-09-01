import React from "react";
import Comment from "../comment/Comment";

function CommentList({ comments, setComments, user, adId, username, password, handleEditCommPopupOpen }, ) {

  return (
    <>
      {!comments.length ? (
        <p className="comment-text">Оставьте комментарий первым.</p>
      ) : (
        <ul className="comment-list">
          {comments.map((comment) => {
            return (
              <Comment
                key={comment.pk}
                text={comment.text}
                adId={adId}
                img={comment.author_image}
                commentId={comment.pk}
                userId={comment.author_id}
                setComments={setComments}
                handleEditCommPopupOpen={handleEditCommPopupOpen}
                authorName={comment.author_first_name}
                user={user}
                username={username}
                password={password}
              />
            );
          })}
        </ul>
      )}
    </>
  );
}

export default CommentList;
