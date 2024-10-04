import { useState, useEffect } from 'react';
import ListItems from './components/ListItems';
import Footer from './components/Footer';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

interface MovieData {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  original_language: string;
  original_title: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

function App() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [term, setTerm] = useState('');
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
        // console.log('Fetching data from API...');
        const response = await fetch(url, options);
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        const data = await response.json();
        // console.log('Data received:', data);
        setMovies(data.results);
      } catch (error) {
        // console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [term]);

  return (
    <>
      <header className={movies.length > 0 ? 'as-nav' : 'container-fluid full-window'}>
        <div className="row justify-content-center">
          <div className={movies.length > 0 ? 'col align-self-center text-center' : 'col-auto align-self-center'}>
            <div className="card">
              <div className="card-body">
                <h1 className="page-title">Find the Perfect Movie</h1>
                <label htmlFor="input-movie-search">Search for movies:</label>
                {/* <input id="input-movie-search" value={term} type="text" onChange={(e) => setTerm(e.target.value)} /> */}
                <InputGroup className="mb-3">
                  <Form.Control
                    id="input-movie-search"
                    aria-describedby="basic-addon2"
                    value={term}
                    type="text"
                    onChange={(e) => setTerm(e.target.value)}
                  />
                  <Button variant="outline-secondary" id="button-addon2">
                    Button
                  </Button>
                </InputGroup>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="container">
        <div className="row justify-content-center">
          <div className="col-auto col-lg-10 col-xl-9 align-self-center">
            <ListGroup defaultActiveKey="#link1">
              {movies.length > 0 ? movies.map((movie) => <ListItems movie={movie} />) : ''}
            </ListGroup>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
