import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentBox from "./commentBox";
function ShowComments({ postId }) {
  const [posts, setPosts] = useState({});

  const fetchNote = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4001/posts/${postId}/comments`
      );
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNote();
  }, []);
  const POSTS = Object.values(posts).map((text) => {
    return (
      <li key={text.id} className="">
        {text.content}
      
      </li>
    );
  });
  return (
    <div className=" justify-center gap-1 flex-wrap my-3">{POSTS}</div>
  );
}

export default ShowComments;
