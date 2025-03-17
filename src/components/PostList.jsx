import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import "./PostList.css";
import { AnimatePresence } from "framer-motion";
import { motion as Motion } from "framer-motion";
import ContentLoader from "react-content-loader";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterUserId, setFilterUserId] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter and sort posts
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUserId =
      filterUserId === "" || post.userId.toString() === filterUserId;
    return matchesSearch && matchesUserId;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    let comparison = 0;
    if (sortBy === "id") {
      comparison = a.id - b.id;
    } else if (sortBy === "title") {
      comparison = a.title.localeCompare(b.title);
    } else if (sortBy === "userId") {
      comparison = a.userId - b.userId;
    }
    return sortOrder === "asc" ? comparison : -comparison;
  });

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setFilterUserId("");
    setSortBy("id");
    setSortOrder("asc");
    setCurrentPage(1);
  };

  // Generate unique user IDs for filter dropdown
  const userIds = [...new Set(posts.map((post) => post.userId))].sort(
    (a, b) => a - b
  );

  // Skeleton loader for posts
  const PostSkeleton = () => (
    <div className="skeleton-wrapper">
      <ContentLoader
        speed={2}
        width="100%"
        height={300}
        backgroundColor="#f3f4f6"
        foregroundColor="#e5e7eb"
      >
        <rect x="0" y="0" rx="8" ry="8" width="100%" height="30" />
        <rect x="0" y="45" rx="4" ry="4" width="60%" height="15" />
        <rect x="0" y="75" rx="4" ry="4" width="100%" height="10" />
        <rect x="0" y="95" rx="4" ry="4" width="100%" height="10" />
        <rect x="0" y="115" rx="4" ry="4" width="90%" height="10" />
        <rect x="0" y="135" rx="4" ry="4" width="80%" height="10" />
        <rect x="0" y="175" rx="20" ry="20" width="30%" height="25" />
        <rect x="0" y="220" rx="4" ry="4" width="40%" height="25" />
        <rect x="70%" y="220" rx="4" ry="4" width="30%" height="25" />
      </ContentLoader>
    </div>
  );

  return (
    <div className="post-list-container">
      <div className="controls">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search posts..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <select
            className="filter-select"
            value={filterUserId}
            onChange={(e) => {
              setFilterUserId(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Users</option>
            {userIds.map((userId) => (
              <option key={userId} value={userId}>
                User {userId}
              </option>
            ))}
          </select>
        </div>
        <div className="sort-controls">
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="id">Sort by ID</option>
            <option value="title">Sort by Title</option>
            <option value="userId">Sort by User ID</option>
          </select>
          <select
            className="order-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {filteredPosts.length > 0 && (
        <div className="posts-count">
          Showing {indexOfFirstPost + 1}-
          {Math.min(indexOfLastPost, filteredPosts.length)} of{" "}
          {filteredPosts.length} posts
        </div>
      )}

      {loading ? (
        <div className="skeleton-grid">
          {[...Array(postsPerPage)].map((_, index) => (
            <PostSkeleton key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="error">Error: {error}</div>
      ) : filteredPosts.length === 0 ? (
        <div className="no-posts">
          <svg
            className="no-posts-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <p>No posts found matching your criteria</p>
          <button className="reset-button" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <AnimatePresence mode="wait">
            <Motion.div
              className="post-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </Motion.div>
          </AnimatePresence>

          <div className="pagination">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              &laquo; Previous
            </button>

            <div className="pagination-numbers">
              {[...Array(totalPages)].map((_, index) => {
                // Show limited page numbers with ellipsis
                const pageNum = index + 1;
                const showPageNumber =
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);

                if (showPageNumber) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => paginate(pageNum)}
                      className={`pagination-number ${
                        currentPage === pageNum ? "active" : ""
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  (pageNum === 2 && currentPage > 3) ||
                  (pageNum === totalPages - 1 && currentPage < totalPages - 2)
                ) {
                  return (
                    <span key={pageNum} className="pagination-ellipsis">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Next &raquo;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostList;
