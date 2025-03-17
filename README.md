# JSONPlaceholder Posts Viewer

A React application that fetches and displays posts from the JSONPlaceholder API with sorting, filtering, and searching functionality.

## Features

- Fetches posts from the JSONPlaceholder API
- Displays posts in a responsive card layout
- Sorting functionality:
  - Sort by title (ascending & descending)
  - Sort by userId (ascending & descending)
- Filtering functionality:
  - Filter posts by userId
- Search functionality:
  - Search posts by title

## Technologies Used

- React
- Vite
- CSS (with custom variables for theming)
- Fetch API for data retrieval

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173/

### Building for Production

To build the application for production:

```bash
npm run build
```

## Project Structure

- `src/components/PostCard.jsx` - Component for displaying individual posts
- `src/components/PostList.jsx` - Component for displaying the list of posts with sorting, filtering, and searching functionality
- `src/App.jsx` - Main application component
- `src/components/*.css` - CSS files for styling components

## API

The application uses the JSONPlaceholder API to fetch posts:

- Endpoint: https://jsonplaceholder.typicode.com/posts

## License

MIT
