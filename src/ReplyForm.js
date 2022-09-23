// import React from "react";
import { useState } from "react";
import { useGlobalContext } from "./context";

const ReplyForm = ({
  commentId,
  commentAuthor,
  handleReply,
  replyingTo,
  innerReply,
  handleInnerReply,
}) => {
  const { currentUser, addReply } = useGlobalContext();

  // const [content, setContent] = useState(innerReply ? `@${replyingTo} ` : "");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.length > 0) {
      await addReply(commentId, {
        id: new Date().getTime(),
        content,
        createdAt: new Date().toISOString(),
        score: 0,
        user: currentUser,
        replyingTo: commentAuthor,
      });
      setContent("");
      handleReply();
    }
    if (content.length === 0) {
      handleReply();
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (content.length > 0) {
      await addReply(commentId, {
        id: new Date().getTime(),
        content,
        createdAt: new Date().toISOString(),
        score: 0,
        user: currentUser,
        replyingTo,
      });

      setContent("");
      handleInnerReply();
    }

    if (content.length === 0) {
      handleInnerReply();
    }
  };

  return (
    <div>
      <form
        className="form card"
        onSubmit={innerReply ? handleReplySubmit : handleSubmit}
      >
        <img src={currentUser.image} alt="avi" className="profile-img" />
        <textarea
          type="text"
          className="input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button className="btn" type="submit">
          SEND
        </button>
      </form>
    </div>
  );
};

export default ReplyForm;
