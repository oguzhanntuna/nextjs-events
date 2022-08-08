import { useEffect, useState, useContext } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import NotificationContext from "../../store/notification-context";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;

  const notificationCtx = useContext(NotificationContext);
  const [commentList, setCommentList] = useState([]);
  const [isCommentListLoading, setIsCommentListLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      function fetchCommentsHandler() {
        setIsCommentListLoading(true);
        fetch(`/api/comments/${eventId}`).then(async (response) => {
          const { comments } = await response.json();

          setCommentList(comments);
          setIsCommentListLoading(false);
        });
      }

      fetchCommentsHandler();
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    const requestBody = { commentData };

    notificationCtx.showNotification({
      title: "Sending comment...",
      message: "Your comment is currently being stored into a database.",
      status: "pending",
    });

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then(() => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Your comment was saved!",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments &&
        (isCommentListLoading ? (
          <p>Loading...</p>
        ) : (
          <CommentList items={commentList} />
        ))}
    </section>
  );
}

export default Comments;
