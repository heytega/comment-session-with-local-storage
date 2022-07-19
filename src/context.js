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
  // console.log(comments.replies);

  // const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(currentUserData);
  // const [isEditing, setIsEditing] = useState(false);
  const [replyEdit, setReplyEdit] = useState(false);
  // const [processEdit, setProcessEdit] = useState(false);

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

  const removeReply = (commentId, replyId) => {
    const restOfComments = comments.map((comment) => comment.id !== commentId);
    const mainComment = comments.find((comment) => comment.id === commentId);
    const restOfReplies = mainComment.replies.filter(
      (reply) => reply.id !== replyId
    );
    const freshComment = {
      ...mainComment,
      replies: [...restOfReplies],
    };
    setComments([...restOfComments, freshComment]);
  };

  const updateComment = (updatedComment) => {
    const prevComment = comments.filter((c) => c.id !== updatedComment.id);
    setComments([...prevComment, updatedComment]);
  };

  // const editComment = () => {
  //   setIsEditing(true);
  //   setProcessEdit(true);
  // };

  // const editReply = (commentId, replyId) => {
  //   const mainComment = comments.find((comment) => comment.id === commentId);
  //   setReplyEdit(mainComment.replies.find((reply) => reply.id === replyId));
  //   setProcessEdit(true);
  // };

  // const toggleReplyEdit = () => {
  //   setReplyEdit(!replyEdit);
  //   setProcessEdit(true);
  // };

  const toggleReplyEdit = (commentId, replyId) => {
    const mainComment = comments.find((comment) => comment.id === commentId);
    setReplyEdit(mainComment.replies.find((reply) => reply.id === replyId));
    // setProcessEdit(true);
  };

  const endProcess = () => {
    // setProcessEdit(false);
    setReplyEdit(false);
    // setEdit(false);
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
        replyEdit,
        addComment,
        removeComment,
        updateComment,
        endProcess,
        addReply,
        // editReply,
        toggleReplyEdit,
        removeReply,
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
