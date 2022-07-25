import React, { useState, useEffect, useContext } from "react";
import data from "./data";

// Database
const commentData = data.comments;

// console.log(commentData);

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
    try {
      const mainComment = comments.find((c) => c.id === commentId);
      console.log(mainComment);

      const newReplies = mainComment.replies.filter((c) => c.id !== replyId);
      console.log(newReplies);

      const restOfComments = comments.map((c) =>
        c.id === commentId ? { ...mainComment, replies: newReplies } : c
      );
      // console.log(restOfComments);
      setComments(restOfComments);
      console.log("the function works");
    } catch (error) {
      // console.log(error);
    }
  };

  const updateComment = (updatedComment) => {
    const updatedComments = comments.map((c) =>
      c.id === updatedComment.id ? updatedComment : c
    );
    setComments(updatedComments);
  };

  const updateReplyComment = (updatedReplyComment, commentId) => {
    const mainComment = comments.find((c) => c.id === commentId);
    const newReplies = mainComment.replies.map((c) =>
      c.id === updatedReplyComment.id ? updatedReplyComment : c
    );
    const newMainComment = { ...mainComment, replies: newReplies };
    const updatedCommentsArray = comments.map((c) =>
      c.id === commentId ? newMainComment : c
    );
    setComments(updatedCommentsArray);
  };

  const handleCommentUpvote = (id, noOfVote) => {
    const newCommentArray = comments.map((c) =>
      c.id === id ? { ...c, score: noOfVote } : c
    );
    setComments(newCommentArray);
  };

  const handleReplyUpvote = (commentId, id, noOfVote) => {
    // find the comment which the reply to be updated is under
    const mainComment = comments.find((c) => c.id === commentId);

    // find the target reply under the comment;
    const targetReply = mainComment.replies.find((c) => c.id === id);

    // update the score of the reply;
    const updateReplyVote = { ...targetReply, score: noOfVote };

    // replace the pre-existing reply with the updated reply in the replies array
    const newReplyArray = mainComment.replies.map((c) =>
      c.id === id ? updateReplyVote : c
    );

    // attach the modified replies array to rest properties of the head comment
    const newMainComment = { ...mainComment, replies: newReplyArray };

    // replace the pre-existing comment with the modified comments in the main comments Array
    const updatedCommentsArray = comments.map((c) =>
      c.id === commentId ? newMainComment : c
    );

    // update the state.
    setComments(updatedCommentsArray);
  };

  // const toggleReplyEdit = (commentId, replyId) => {
  //   const mainComment = comments.find((comment) => comment.id === commentId);
  //   setReplyEdit(mainComment.replies.find((reply) => reply.id === replyId));
  //   // setProcessEdit(true);
  // };

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
        updateReplyComment,
        removeReply,
        handleCommentUpvote,
        handleReplyUpvote,
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
