import React from "react";
import Comment from "./Comment";
import Form from "./Form";
// import { useState } from "react";
import { useGlobalContext } from "./context";

const Comments = () => {
  const { edit, comments } = useGlobalContext();

  return (
    <>
      {comments.map((comment) => (
        <Comment {...comment} isEditing={edit && edit.id === comment.id} />
      ))}

      <Form />
    </>
  );
};

export default Comments;
