import React, { useState, useContext } from "react";
import data from "./data";

// Database
const commentData = data.comments;
// console.log(commentData);

const currentUserData = data.currentUser;
// console.log(currentUserData);

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  // data initialization
  const [comments, setComments] = useState(commentData);
  // const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(currentUserData);
  const [edit, setEdit] = useState(false);
  const [processEdit, setProcessEdit] = useState(false);
  // const [reply, setReply] = useState(false);

  // methods and functions
  const addComment = (comment) => {
    const newComment = comment;
    setComments([...comments, newComment]);
  };

  const removeComment = (id) => {
    const newComment = comments.filter((comment) => comment.id !== id);
    setComments(newComment);
  };

  const updateComment = (updatedComment) => {
    const prevComment = comments.filter((c) => c.id !== updatedComment.id);
    setComments([...prevComment, updatedComment]);
  };

  const editComment = (id) => {
    setEdit(comments.find((comment) => comment.id === id));
    setProcessEdit(true);
  };

  // const editComment = () => {
  //   setEdit(true);
  //   setProcessEdit(true);
  // };

  const endProcess = () => {
    setProcessEdit(false);
    setEdit(false);
  };

  // const handleReply = () => {
  //   return setReply(!reply);
  // };

  const addReply = (commentId, reply) => {
    const comment = comments.find((comment) => comment.id === commentId);
    const newComment = {
      ...comment,
      replies: [...comment.replies, reply],
    };

    const updatedComments = comments.map((c) =>
      c.id === commentId ? newComment : c
    );

    setComments(updatedComments);
  };

  return (
    <AppContext.Provider
      value={{
        comments,
        currentUser,
        edit,
        processEdit,
        // reply,
        // loading,
        addComment,
        removeComment,
        updateComment,
        editComment,
        endProcess,
        // handleReply,
        addReply,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};
