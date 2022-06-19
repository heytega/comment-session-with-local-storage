import React from "react";
import { useState } from "react";
import ControlButtons from "./ControlButtons";
import Identity from "./Identity";
import Upvote from "./Upvote";
import Form from "./Form";
import { useGlobalContext } from "./context";

function Replies({
  id,
  content,
  createdAt,
  score,
  replyingTo,
  user,
  isEditing,
}) {
  // custom hook
  const { currentUser, removeComment } = useGlobalContext();

  // data & modifiers
  const [innerReadMore, setInnerReadMore] = useState(false);
  const [innerReply, setInnerReply] = useState(false);

  // method & functions
  const handleInnerReply = () => {
    return setInnerReply(!innerReply);
  };

  // Rendering
  return (
    <>
      <div className="comment-template card">
        <Upvote existingScore={score} id={id} isEditing={isEditing} />

        <Identity currentUser={currentUser} user={user} createdAt={createdAt} />

        <ControlButtons
          currentUser={currentUser}
          user={user}
          removeComment={removeComment}
          handleInnerReply={handleInnerReply}
        />

        <section className={innerReadMore ? "readMore-textArea" : "textArea"}>
          <p className="replyingTo">{`@${replyingTo} `}</p>
          {innerReadMore ? content : `${content.substring(0, 220)}`}

          {content.length > content.substring(0, 220).length && (
            <button onClick={() => setInnerReadMore(!innerReadMore)}>
              {innerReadMore ? "...Show Less" : "...Read More"}
            </button>
          )}
        </section>
      </div>
      {innerReply && <Form currentUser={currentUser} />}
    </>
  );
}

export default Replies;
