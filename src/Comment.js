import React, { useState } from "react";
import ControlButtons from "./ControlButtons";
import Identity from "./Identity";
import Replies from "./Replies";
import ReplyForm from "./ReplyForm";
import Upvote from "./Upvote";
import { useGlobalContext } from "./context";

const Comment = ({
  id,
  content,
  createdAt,
  score,
  user,
  replies,
  edited,
  isEditing,
}) => {
  const { updateComment, endProcess } = useGlobalContext();

  const [readMore, setReadMore] = useState(false);
  const [reply, setReply] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const handleReply = () => {
    return setReply(!reply);
  };

  const handleEdit = (e) => {
    e.preventDefault();

    if (editContent !== content) {
      const updatedComment = { id, createdAt, score, user, replies, edited };
      updateComment({
        ...updatedComment,
        content: editContent,
        edited: "Edited",
      });
      endProcess();
    }

    if (editContent === content) {
      cancelEdit();
    }
  };

  const cancelEdit = () => {
    endProcess();
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
        />

        {isEditing ? (
          <section className="textArea edit-textArea">
            <form>
              <div>
                <textarea
                  className="input"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                ></textarea>
              </div>
              <div className="buttonContainer">
                <button className="cancel" onClick={() => cancelEdit()}>
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
          return (
            <Replies
              key={reply.id}
              {...reply}
              isEditing={isEditing}
              commentId={id}
            />
          );
        })}
      </div>
    </>
  );
};

export default Comment;
