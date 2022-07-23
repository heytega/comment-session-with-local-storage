import React from "react";
import { useState } from "react";
import ReplyControlButtons from "./ReplyControlButtons";
import Identity from "./Identity";
import Upvote from "./Upvote";
import ReplyForm from "./ReplyForm";
import { useGlobalContext } from "./context";

const Reply = ({
  id,
  content,
  createdAt,
  score,
  replyingTo,
  user,
  commentId,
}) => {
  // custom hook
  const { currentUser, updateComment, endProcess, replyEdit } =
    useGlobalContext();

  // data & modifiers
  const [innerReadMore, setInnerReadMore] = useState(false);
  const [innerReply, setInnerReply] = useState(false);

  // method & functions
  const handleInnerReply = () => {
    return setInnerReply(!innerReply);
  };

  // FUNCTIONS AND METHODS FOR EDITING REPLIES
  const [editReplyContent, setEditReplyContent] = useState(content);
  const [isReplyEditing, setIsReplyEditing] = useState(
    replyEdit && replyEdit.id === id
  );

  const handleEdit = (e) => {
    e.preventDefault();
    if (editReplyContent !== content && editReplyContent.length > 0) {
      const updatedComment = { id, createdAt, score, user };
      updateComment({
        ...updatedComment,
        content: editReplyContent,
        edited: "Edited",
      });
      endProcess();
    }

    if (editReplyContent === content) {
      endProcess();
    }
  };

  // Rendering
  return (
    <div key={id}>
      <div
        className={
          replyEdit && replyEdit.id === id
            ? "editComment-template card"
            : "comment-template card"
        }
      >
        <Upvote existingScore={score} id={id} isEditing={isReplyEditing} />

        <Identity currentUser={currentUser} user={user} createdAt={createdAt} />

        <ReplyControlButtons
          currentUser={currentUser}
          user={user}
          handleInnerReply={handleInnerReply}
          isReplyEditing={isReplyEditing}
          id={id}
          commentId={commentId}
        />

        {isReplyEditing ? (
          <section className="textArea edit-textArea">
            <form>
              <div>
                <textarea
                  className="input"
                  value={editReplyContent}
                  onChange={(e) => setEditReplyContent(e.target.value)}
                ></textarea>
              </div>
              <div className="buttonContainer">
                <button className="cancel" onClick={() => endProcess()}>
                  CANCEL
                </button>
                <button
                  className="update"
                  type="submit"
                  onClick={(e) => handleEdit(e)}
                >
                  UPDATE
                </button>
              </div>
            </form>
          </section>
        ) : (
          <section className={innerReadMore ? "readMore-textArea" : "textArea"}>
            <p className="replyingTo">{`@${replyingTo} `}</p>
            {innerReadMore ? content : `${content.substring(0, 220)}`}

            {content.length > content.substring(0, 220).length && (
              <button onClick={() => setInnerReadMore(!innerReadMore)}>
                {innerReadMore ? "...Show Less" : "...Read More"}
              </button>
            )}
          </section>
        )}
      </div>
      {innerReply && (
        <ReplyForm
          replyingTo={user.username}
          innerReply={innerReply}
          handleInnerReply={handleInnerReply}
          commentId={commentId}
        />
      )}
    </div>
  );
};

export default Reply;
