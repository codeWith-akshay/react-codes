import React, { useState } from "react";

const Comment = ({ comment, addReply, editComment, deleteComment }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  const handleReply = () => {
    if (replyText.trim() !== "") {
      addReply(comment.id, replyText);
      setReplyText("");
      setShowReplyBox(false);
    }
  };

  const handleEdit = () => {
    if (editText.trim() !== "") {
      editComment(comment.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <div
      style={{
        marginLeft: "20px",
        marginTop: "10px",
        padding: "5px",
        borderLeft: "1px solid #ccc",
      }}
    >
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <p>{comment.text}</p>
      )}

      {!isEditing && (
        <div style={{ marginTop: "5px" }}>
          <button onClick={() => setShowReplyBox(!showReplyBox)}>Reply</button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteComment(comment.id)}>Delete</button>
        </div>
      )}

      {showReplyBox && (
        <div style={{ marginTop: "5px" }}>
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
          />
          <button onClick={handleReply}>Submit</button>
        </div>
      )}

      {/* Recursively render replies */}
      {comment.replies.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              addReply={addReply}
              editComment={editComment}
              deleteComment={deleteComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
