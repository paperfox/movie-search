import { useState, useEffect } from 'react';
import './App.css';

interface MovieData {
  title: string;
  release_date: string;
  overview: string;
}

function App() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [term, setTerm] = useState<string>('');
  const apiKey = import.meta.env.VITE_KEY;
  const url = `https://api.themoviedb.org/3/search/movie?query=${term}&include_adult=false&language=en-US&page=1`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        };
        console.log('Fetching data from API...');
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data received:', data);
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [term]);

  return (
    <>
      <div>
        <input value={term} type="text" onChange={(e) => setTerm(e.target.value)} />
        <ul>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <li>
                <p>
                  {movie.title} - {movie.release_date}
                </p>
                <p>{movie.overview}</p>
                <hr />
              </li>
            ))
          ) : (
            <li>No movies found</li>
          )}
        </ul>
      </div>
    </>
  );
}

export default App;
