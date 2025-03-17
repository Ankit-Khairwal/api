import React, { useState } from "react";
import "./PostCard.css";
import { motion as Motion } from "framer-motion";

const PostCard = ({ post }) => {
  const [expanded, setExpanded] = useState(false);

  const randomDate = new Date(
    2023 + Math.floor(Math.random() * 3),
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28) + 1
  );

  const formattedDate = randomDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const MAX_LENGTH = 100;
  const isLongText = post.body.length > MAX_LENGTH;
  const displayText =
    expanded || !isLongText
      ? post.body
      : `${post.body.substring(0, MAX_LENGTH)}...`;

  return (
    <Motion.div
      className="post-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <div className="post-card-inner">
        <h2 className="post-title">
          {post.title.length > 60
            ? `${post.title.substring(0, 60)}...`
            : post.title}
        </h2>
        <div className="post-date">Posted on {formattedDate}</div>
        <p className="post-body">{displayText}</p>

        {isLongText && (
          <button
            className="read-more-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show Less" : "Read More"}
          </button>
        )}

        <div className="post-footer">
          <div className="post-user-id">
            <svg
              className="icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            User {post.userId}
          </div>
          <div className="post-id">
            <svg
              className="icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
              ></path>
            </svg>
            Post {post.id}
          </div>
        </div>
      </div>
    </Motion.div>
  );
};

export default PostCard;
