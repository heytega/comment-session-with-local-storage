import React from "react";
import { useState } from "react";
import { useGlobalContext } from "./context";

const ControlButtons = ({
  id,
  user,
  startEdit,
  isEditing,
  handleReply,
  handleInnerReply,
}) => {
  const { currentUser, removeComment } = useGlobalContext();

  const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);

  const showFunction = () => {
    if (handleReply) {
      handleReply();
    }

    if (handleInnerReply) {
      handleInnerReply();
    }
  };

  const handleStartEdit = () => {
    startEdit();
  };

  const handleConfirmDelete = (id) => {
    removeComment(id);
    setShowDeleteDialogue(false);
  };

  return (
    <>
      {user.username === currentUser.username ? (
        <div
          className={
            isEditing
              ? "currentUser-btn comment-btn hideActionBtn"
              : "currentUser-btn comment-btn"
          }
        >
          <button
            className="comment-btn delete-btn"
            onClick={() => isEditing === false && setShowDeleteDialogue(true)}
          >
            <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                fill="#ED6368"
              />
            </svg>
            <p>Delete</p>
          </button>
          <button
            className="comment-btn edit-btn"
            onClick={() => handleStartEdit()}
          >
            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                fill="#5357B6"
              />
            </svg>
            <p>Edit</p>
          </button>
        </div>
      ) : (
        <button
          className="reply-btn comment-btn"
          onClick={() => showFunction()}
        >
          <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
              fill="#5357B6"
            />
          </svg>
          <p>Reply</p>
        </button>
      )}

      {showDeleteDialogue && (
        <div className="confirmDelete">
          <section className="deleteTemplate card">
            <h4>Delete comment</h4>
            <p>
              Are you sure you want to delete this comment? This will remove the
              comment and can't be undone.
            </p>
            <div>
              <button
                className="cancel"
                onClick={() => setShowDeleteDialogue(false)}
              >
                NO, CANCEL
              </button>
              <button
                className="deleteComment"
                onClick={() => handleConfirmDelete(id)}
              >
                YES, DELETE
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ControlButtons;
