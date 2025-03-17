import React from "react";
import "./App.css";
import PostList from "./components/PostList";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="header-top">
            <h1>
              <span className="highlight">Post</span>Explorer
            </h1>
            <ThemeToggle />
          </div>
          <p>
            A professional React application for browsing, filtering, and
            searching posts from the JSONPlaceholder API
          </p>
        </div>
      </header>
      <main className="app-main">
        <PostList />
      </main>
      <footer className="app-footer">
        <p>Created with React and Vite &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
