import React from "react";
import Comment from "./Comment";
import Form from "./Form";
// import { useState } from "react";
import { useGlobalContext } from "./context";

const Comments = () => {
  const { edit, comments } = useGlobalContext();
  console.log(comments);

  return (
    <>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          {...comment}
          isEditing={edit && edit.id === comment.id}
        />
      ))}

      <Form />
    </>
  );
};

export default Comments;
