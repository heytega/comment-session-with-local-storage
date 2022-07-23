import React, { useState, useEffect, useContext } from "react";
import data from "./data";

// Database
const commentData = data.comments;

console.log(commentData);

const currentUser = data.currentUser;
// console.log(currentUserData);

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  // data initialization
  const [comments, setComments] = useState(() => {
    const localData = localStorage.getItem("comments");
    return localData ? JSON.parse(localData) : commentData;
  });

  // const [currentUser, setCurrentUser] = useState(currentUserData);
  const [replyEdit, setReplyEdit] = useState(false);
  // const [processEdit, setProcessEdit] = useState(false);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

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
      replies: restOfReplies,
    };
    const index = comments.findIndex((comment) => comment.id === commentId);

    const newCommentArray = restOfComments.splice(index, 0, freshComment);
    setComments(newCommentArray);
  };

  const updateComment = (updatedComment) => {
    const index = comments.findIndex(
      (comment) => comment.id === updatedComment.id
    );
    console.log(index);
    const prevComment = comments.filter((c) => c.id !== updatedComment.id);
    const redoComments = prevComment.splice(index, 0, updatedComment);
    setComments(redoComments);
  };

  const handleCommentUpvote = (id, noOfVote) => {
    const newCommentArray = comments.map((c) =>
      c.id === id ? { ...c, score: noOfVote } : c
    );
    setComments(newCommentArray);
  };

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
        toggleReplyEdit,
        removeReply,
        handleCommentUpvote,
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
