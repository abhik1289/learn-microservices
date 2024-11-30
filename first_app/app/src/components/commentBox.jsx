import React, { useState } from "react";
import axios from "axios";
import ShowComments from "./showComments";
function CommentBox({ postId }) {
  const [comments, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
//   localhost:4001/posts/123/comments
  const addComment = async () => {
    try {
      const res = await axios.post(
        `http://localhost:4001/posts/${postId}/comments`,
        {
          content: comments,
        }
      );
      console.log(res);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 mx-auto mt-6 w-full max-w-md border border-gray-300 rounded-lg bg-gray-100 shadow-md">
        <ShowComments postId={postId} />
      <div className="flex w-full mb-4">
        <input
          type="text"
          placeholder="Write a comment..."
          className="flex-grow p-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={comments}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={addComment}
        >
          Add
        </button>
      </div>
      <div className="w-full">
        <h3 className="mb-2 text-lg font-semibold">Comments</h3>
        <ul className="list-disc list-inside">
          {commentsList.map((cmt, index) => (
            <li key={index} className="py-1">
              {cmt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CommentBox;
