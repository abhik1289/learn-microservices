import React, { useState } from "react";
import ShowPosts from "./showPosts.jsx";

function CreatePost() {
  const [post, setPost] = useState("");

  const handleInputChange = (e) => {
    setPost(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request with the correct headers
      const response = await fetch("http://localhost:4000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type as JSON
        },
        body: JSON.stringify({ title: post }), // Convert post data to JSON
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const data = await response.json(); // Assuming the API returns JSON data
      console.log("Post created:", data);
      setPost(""); // Clear input after submission
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="main_container w-10/12 mx-auto my-8 p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Create Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={post}
          onChange={handleInputChange}
          placeholder="What's on your mind?"
          className="w-full p-3 border rounded-md border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add Post
        </button>
      </form>

      <ShowPosts />
    </div>
  );
}

export default CreatePost;
