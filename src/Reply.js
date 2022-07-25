import React from "react";
import { useState } from "react";
import ReplyControlButtons from "./ReplyControlButtons";
import Identity from "./Identity";
import ReplyUpvote from "./ReplyUpvote";
import EditTemplate from "./EditTemplate";
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
  edited,
}) => {
  // custom hook
  const { currentUser } = useGlobalContext();

  // data & modifiers
  const [innerReadMore, setInnerReadMore] = useState(false);
  const [innerReply, setInnerReply] = useState(false);

  // method & functions
  const handleInnerReply = () => {
    return setInnerReply(!innerReply);
  };

  // FUNCTIONS AND METHODS FOR EDITING REPLIES
  const [isReplyEditing, setIsReplyEditing] = useState(false);

  const startReplyEdit = () => {
    setIsReplyEditing(true);
  };

  const endReplyProcess = () => {
    setIsReplyEditing(false);
  };

  // Rendering
  return (
    <div key={id}>
      <div
        className={
          isReplyEditing ? "editComment-template card" : "comment-template card"
        }
      >
        <ReplyUpvote
          existingScore={score}
          id={id}
          commentId={commentId}
          isEditing={isReplyEditing}
        />

        <Identity
          currentUser={currentUser}
          user={user}
          createdAt={createdAt}
          edited={isReplyEditing ? "Editing" : edited}
        />

        <ReplyControlButtons
          currentUser={currentUser}
          user={user}
          handleInnerReply={handleInnerReply}
          isReplyEditing={isReplyEditing}
          id={id}
          commentId={commentId}
          startReplyEdit={startReplyEdit}
        />

        {isReplyEditing ? (
          <EditTemplate
            content={content}
            id={id}
            createdAt={createdAt}
            isReplyEditing={isReplyEditing}
            score={score}
            user={user}
            replyingTo={replyingTo}
            edited={edited}
            endProcess={endReplyProcess}
            commentId={commentId}
          />
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
