import React, { useState } from "react";
import ControlButtons from "./ControlButtons";
import Identity from "./Identity";
import Reply from "./Reply";
import ReplyForm from "./ReplyForm";
import Upvote from "./Upvote";
import EditTemplate from "./EditTemplate";
import { useGlobalContext } from "./context";

const Comment = ({ id, content, createdAt, score, user, replies, edited }) => {
  // const { isEditing } = useGlobalContext();
  const [readMore, setReadMore] = useState(false);
  const [reply, setReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleReply = () => {
    return setReply(!reply);
  };

  const startEdit = () => {
    setIsEditing(true);
  };

  const endProcess = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div
        className={
          isEditing ? "editComment-template card" : "comment-template card"
        }
      >
        <Upvote isEditing={isEditing} existingScore={score} id={id} />
        <Identity
          edited={isEditing ? "Editing" : edited}
          user={user}
          createdAt={createdAt}
        />
        <ControlButtons
          isEditing={isEditing}
          id={id}
          user={user}
          handleReply={handleReply}
          startEdit={startEdit}
        />

        {isEditing ? (
          <EditTemplate
            content={content}
            id={id}
            createdAt={createdAt}
            score={score}
            user={user}
            replies={replies}
            edited={edited}
            endProcess={endProcess}
          />
        ) : (
          <section className={readMore ? "readMore-textArea" : "textArea"}>
            {readMore ? content : `${content.substring(0, 210)}`}
            {content.length > content.substring(0, 210).length && (
              <button onClick={() => setReadMore(!readMore)}>
                {readMore ? "...Show Less" : "...Read More"}
              </button>
            )}
          </section>
        )}
      </div>
      {reply && (
        <ReplyForm
          commentId={id}
          commentAuthor={user.username}
          handleReply={handleReply}
        />
      )}
      <div className="reply-template">
        {replies.map((reply) => {
          return <Reply key={reply.id} {...reply} commentId={id} />;
        })}
      </div>
    </>
  );
};

export default Comment;
