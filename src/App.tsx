import { useState, useEffect } from 'react';
import ListItems from './components/ListItems';
import Footer from './components/Footer';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import projector from './assets/projector.svg';

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
      {movies.length > 0 ? (
        <>
          <header className="as-nav">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <h1 className="page-title">Find the Perfect Movie</h1>

                <div className="row m-4">
                  <div className="col-auto align-self-center">
                    <label htmlFor="input-movie-search">Search for movies:</label>
                  </div>
                  <div className="col-8">
                    <InputGroup>
                      <Form.Control
                        id="input-movie-search"
                        aria-describedby="btn-movie-search"
                        value={term}
                        type="text"
                        onChange={(e) => setTerm(e.target.value)}
                      />
                      <Button variant="primary" id="btn-movie-search">
                        Search
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
                <ListGroup className="my-5">
                  {movies.length > 0 ? movies.map((movie) => <ListItems movie={movie} />) : ''}
                </ListGroup>
              </div>
            </div>
          </main>
        </>
      ) : (
        <header className="container-fluid full-window">
          <div className="row">
            <div className="col-auto offset-md-1 align-self-center landing-content">
              <h1 className="page-title">Find the Perfect Movie</h1>
              <div>
                <label htmlFor="input-movie-search" className="d-block mb-2">
                  Search for movies:
                </label>
                {/* <input id="input-movie-search" value={term} type="text" onChange={(e) => setTerm(e.target.value)} /> */}
                <InputGroup className="mb-3">
                  <Form.Control
                    id="input-movie-search"
                    aria-describedby="btn-movie-search"
                    value={term}
                    type="text"
                    onChange={(e) => setTerm(e.target.value)}
                  />
                  <Button variant="primary" id="btn-movie-search">
                    Search
                  </Button>
                </InputGroup>
              </div>
            </div>
          </div>
          <img src={projector} className="splash-image" alt="Image of a vintage movie projector" />
          <div className="shape-left-top"></div>
          <div className="shape-left-bottom"></div>
          <div className="shape-right-top"></div>
          <div className="shape-right-bottom"></div>
        </header>
      )}
      <Footer />
    </>
  );
}

export default App;
