import React, { useEffect, useState } from 'react'
import Search from './Components/Search'
import Spinner from './Components/Spinner';
import LoadingSpinner from './Components/LoadingSpinner';
import MovieCard from './Components/MovieCard';
import {useDebounce} from 'react-use'
import { getTrendingMovies, updateSearchCount } from './appwrite';
import './App.css'

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers:{
    accept: 'application/json',
    // Authorization:`Bearer ${API_KEY}`
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjUzMDA4ZDAwYTFmODI2NTIxNTM5YTkzM2IzOGVhZSIsIm5iZiI6MTc0OTYyOTU5MC4wNTUsInN1YiI6IjY4NDkzYTk2ZTk4YTI5YjlkMDlmNThlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8fQeglw-UVTqSVLxMI2JXmrxrHYblhjp7Zz4pvuLzrw'
  }
};

const App = () => {
  const [searchTerm, setsearchTerm] = useState('');
  const [errorMessage, seterrorMessage] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovie, setTrendingMovie] = useState([]);

  const [page, setPage] = useState(1);
const [hasMorePages, setHasMorePages] = useState(true);


  useDebounce(()=>setDebouncedSearchTerm(searchTerm) , 1000 , [searchTerm]);

  const fetchMovies = async(query = '', pageNumber = 1, isNewSearch = false)=>{

    setIsLoading(true);
    seterrorMessage('');

    try{
      const endpoint = query ?
      `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query )}&page=${pageNumber}`
       : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${pageNumber}`;

      const response = await fetch(endpoint , API_OPTIONS);

      if(!response.ok){
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json()
      console.log(data);

      if(data.response === 'False'){
        seterrorMessage(data.error || "Failed to fetch the movies");
        setMovieList([]);
        return;
      }

      // Check if we've reached the last page
      setHasMorePages(pageNumber < data.total_pages);
      
      if (isNewSearch) {
        setMovieList(data.results || []);
      } else {
        setMovieList(prev => [...prev, ...(data.results || [])]);
      }

      
      if(query && data.results.length > 0){
        await updateSearchCount(query, data.results[0]);
      }
    }catch(error){
      console.error(`error fetching movies: ${error}`);
      seterrorMessage('Error fetching movies. Please try again later. ');
    }finally{
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try{
      const movies = await getTrendingMovies();

      setTrendingMovie(movies);
    }catch(error){
      console.error(error);
      
    }
  }

  useEffect(()=>{
    setPage(1);
    setHasMorePages(true); // Reset hasMorePages when search term changes
    fetchMovies(debouncedSearchTerm, 1, true);
  }, [debouncedSearchTerm]);

  useEffect(()=>{
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern"/>

      <div className="wrapper">

        <header>
          <img src="./hero-img.png" alt="hero banner"  />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy without the Hassle.</h1>
        
        <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />

        </header>

        {trendingMovie.length > 0 &&  (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovie.map((movie,index) => (
                <li key ={movie.$id}>
                  <p>{index+1}</p>
                  <img src={movie.poster_url} alt="movie.title" />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className='all-movies'>

          <h2>All Movies</h2>;

           {  isLoading && page === 1 ? (
            <Spinner/>
           ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
           ) : (
            <>
              <ul>
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
              
              {isLoading && page > 1 && (
                <div className="loading-more">
                  <LoadingSpinner size="medium" />
                  <p>Loading more movies...</p>
                </div>
              )}
              
              {hasMorePages && !isLoading && movieList.length > 0 && (
                <button
                  onClick={() => {
                    const nextPage = page + 1;
                    setPage(nextPage);
                    fetchMovies(debouncedSearchTerm, nextPage);
                  }}
                  className="load-more-button"
                  onMouseEnter={(e) => e.target.textContent = "Show More Movies"}
                  onMouseLeave={(e) => e.target.textContent = "Load More"}
                >
                  Load More
                </button>
              )}
              
              {!hasMorePages && movieList.length > 0 && (
                <p className="no-more-results">No more results to load</p>
              )}
              
              {!isLoading && movieList.length === 0 && (
                <p className="no-results">No movies found. Try another search term.</p>
              )}
            </>
           )}

        </section>

        

      </div>
    </main>
  )
}

export default App
