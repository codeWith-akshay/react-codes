import React, { useState } from "react";
import Comment from "./components/Comment";

const App = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      text: "This is the first comment",
      replies: [],
    },
  ]);

  const [newComment, setNewComment] = useState("");

  // ✅ Add Reply Function
  const addReply = (parentId, text) => {
    const newComment = { id: Date.now(), text, replies: [] };

    const addReplyRecursive = (comments) =>
      comments.map((c) => {
        if (c.id === parentId) {
          return { ...c, replies: [...c.replies, newComment] };
        }
        return { ...c, replies: addReplyRecursive(c.replies) };
      });

    setComments((prev) => addReplyRecursive(prev));
  };

  // ✅ Add Top-level Comment
  const addTopLevelComment = () => {
    if (newComment.trim() !== "") {
      const commentObj = {
        id: Date.now(),
        text: newComment,
        replies: [],
      };
      setComments((prev) => [...prev, commentObj]);
      setNewComment("");
    }
  };

  // ✅ Edit Comment Function
  const editComment = (id, newText) => {
    const editRecursive = (comments) =>
      comments.map((c) => {
        if (c.id === id) {
          return { ...c, text: newText };
        }
        return { ...c, replies: editRecursive(c.replies) };
      });

    setComments((prev) => editRecursive(prev));
  };

  // ✅ Delete Comment Function
  const deleteComment = (id) => {
    const deleteRecursive = (comments) =>
      comments
        .filter((c) => c.id !== id) // remove the comment
        .map((c) => ({ ...c, replies: deleteRecursive(c.replies) }));

    setComments((prev) => deleteRecursive(prev));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Nested Comments System</h2>

      {/* Top-level comment form */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          style={{ marginRight: "10px" }}
        />
        <button onClick={addTopLevelComment}>Add Comment</button>
      </div>

      {/* Render comments */}
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          addReply={addReply}
          editComment={editComment}
          deleteComment={deleteComment}
        />
      ))}
    </div>
  );
};

export default App;
