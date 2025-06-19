# MovieFinder

A modern, responsive web application that allows users to search for and discover movies from the TMDB (The Movie Database) API. The application tracks trending searches using Appwrite backend services.

![MovieFinder Screenshot](./public/hero-img.png)

## Features

- **Movie Search**: Search for movies using the TMDB API
- **Trending Movies**: Display trending movies based on user search patterns
- **Debounced Search**: Efficiently handle user input with debounced search
- **Responsive Design**: Built with modern UI principles for all device sizes
- **Real-time Updates**: Instantly see search results as you type
- **Persistent Data**: Store popular searches using Appwrite backend

## Tech Stack

- **Frontend**:
  - React 19
  - Tailwind CSS
  - Vite
- **Backend & Services**:
  - Appwrite (Database)
  - TMDB API
- **Packages**:
  - react-use (for debounce functionality)
  - appwrite SDK

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Appwrite account and project setup
- TMDB API key

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd practice
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
TMDB_API_KEY=your_tmdb_api_key
```

4. Start the development server
```bash
npm run dev
```

## Usage

1. Enter a movie title in the search bar
2. Results will appear automatically as you type
3. The "Trending Movies" section shows the most popular searches
4. Click on a movie card to view additional details

## Project Structure

```
├── public/              # Static assets
├── src/
│   ├── Components/      # React components
│   │   ├── MovieCard.jsx
│   │   ├── Search.jsx
│   │   └── Spinner.jsx
│   ├── App.css          # Main application styles
│   ├── App.jsx          # Main application component
│   ├── appwrite.js      # Appwrite configuration and API
│   ├── index.css        # Global styles
│   └── main.jsx         # Application entry point
├── .env                 # Environment variables (not in repo)
├── package.json         # Project dependencies
└── vite.config.js       # Vite configuration
```

## Building for Production

To build the application for production, run:

```bash
npm run build
```

This will generate optimized files in the `dist` directory that can be deployed to any static hosting service.

## License

[MIT](LICENSE)

## Acknowledgements

- [TMDB API](https://www.themoviedb.org/documentation/api) for providing movie data
- [Appwrite](https://appwrite.io/) for backend services
- [React](https://react.dev/) and [Vite](https://vitejs.dev/) for the development framework
- [Tailwind CSS](https://tailwindcss.com/) for styling