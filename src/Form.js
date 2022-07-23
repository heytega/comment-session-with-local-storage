import React, { useState } from "react";
import { useGlobalContext } from "./context";

const Form = () => {
  const { currentUser, addComment } = useGlobalContext();

  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (content.length > 0) {
      addComment({
        id: new Date().getTime().toString(),
        content,
        createdAt: new Date().toISOString(),
        score: 0,
        user: currentUser,
        replies: [],
      });
    }
    setContent("");
  };

  return (
    <div>
      <form className="form card" onSubmit={handleSubmit}>
        <img src={currentUser.image} alt="avi" className="profile-img" />
        <textarea
          type="text"
          className="input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button className="btn" type="submit">
          SEND
        </button>
      </form>
    </div>
  );
};

export default Form;
