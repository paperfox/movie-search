import { useState, useEffect } from 'react';

interface MovieData {
  id: number;
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
      if (!term) {
        return console.log('No search term provided');
      }

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
    <main className={movies.length > 0 ? 'container' : 'container full-window'}>
      <div className={movies.length > 0 ? 'row justify-content-center' : 'row justify-content-center full-window'}>
        <div className="col-auto align-self-center">
          <div className="card">
            <div className="card-body">
              <h1>Clever title here</h1>
              <label htmlFor="input-movie-search">Search for movies:</label>
              <input id="input-movie-search" value={term} type="text" onChange={(e) => setTerm(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="list-group">
        {movies.length > 0
          ? movies.map((movie) => (
              <button type="button" key={movie.id} className="list-group-item list-group-item-action">
                <div className="row">
                  <div className="col-sm-3">
                    <h2>{movie.title}</h2>
                    <p>{movie.release_date}</p>
                  </div>
                  <div className="col-sm-9">
                    <p>{movie.overview}</p>
                  </div>
                </div>
              </button>
            ))
          : ''}
      </div>
    </main>
  );
}

export default App;
