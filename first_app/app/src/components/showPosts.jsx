import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentBox from "./commentBox";
function ShowPosts() {
  const [posts, setPosts] = useState({});

  const fetchNote = async () => {
    try {
      const res = await axios.get("http://localhost:4000/posts");
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
      <div key={text.id} className="w-5/12 rounded-md py-4 bg-slate-200">
        {text.title}
        <CommentBox postId={text.id} />
      </div>
    );
  });
  return (
    <div className="flex justify-center gap-1 flex-wrap my-3">{POSTS}</div>
  );
}

export default ShowPosts;
