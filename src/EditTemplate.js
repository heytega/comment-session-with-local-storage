import React, { useState } from "react";
import { useGlobalContext } from "./context";

const EditTemplate = ({
  id,
  content,
  createdAt,
  score,
  user,
  replies,
  edited,
  endProcess,
}) => {
  const { updateComment } = useGlobalContext();

  const [editContent, setEditContent] = useState(content);

  const handleEdit = (e) => {
    e.preventDefault();
    if (editContent !== content && editContent.length > 0) {
      const updatedComment = { id, createdAt, score, user, replies, edited };
      updateComment({
        ...updatedComment,
        content: editContent,
        edited: "Edited",
      });
      endProcess();
    }

    if (editContent === content) {
      endProcess();
    }
  };

  return (
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
  );
};

export default EditTemplate;
