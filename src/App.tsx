import { useState, useCallback, useEffect } from "react";
import ListItems from "./components/ListItems";
import Footer from "./components/Footer";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import projector from "./assets/projector.svg";
import { useDebounce } from "use-debounce";

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
  const [term, setTerm] = useState("");
  const apiKey = import.meta.env.VITE_KEY;
  const url = `https://api.themoviedb.org/3/search/movie?query=${term}&include_adult=false&language=en-US&page=1`;

  const [debouncedTerm] = useDebounce(term, 1000);
  console.log("search term:", debouncedTerm);

  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedTerm) {
        return console.log("No search term provided");
      }

      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
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
  }, [debouncedTerm]);

  const clearSearch = useCallback(() => {
    setTerm(" ");
  }, []);

  return (
    <>
      <header
        className={
          movies.length === 0 ? "container-fluid full-window" : "as-nav"
        }
      >
        <div>
          <div
            className={
              movies.length === 0
                ? "animate-width landing-content"
                : "animate-width nav-width"
            }
          >
            <h1 className="page-title">Find the Perfect Movie</h1>
            <form className="row my-4">
              <div className="col-auto align-self-center">
                <label htmlFor="input-movie-search">Search for movies:</label>
              </div>
              <div className={movies.length > 0 ? "col-sm-6" : "col-sm-9"}>
                <InputGroup>
                  <Form.Control
                    id="input-movie-search"
                    aria-describedby="btn-movie-search"
                    value={term}
                    type="search"
                    onChange={(e) => setTerm(e.target.value)}
                  />
                  <Button
                    variant="primary"
                    id="btn-movie-search"
                    aria-label="Search"
                  >
                    <span className="icon-search"></span>
                  </Button>
                </InputGroup>
              </div>

              {movies.length > 0 ? (
                <p className="col-auto align-self-center mb-0">
                  <Button variant="link" type="button" onClick={clearSearch}>
                    Back to Landing
                  </Button>
                </p>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>

        {movies.length === 0 ? (
          <>
            <img
              src={projector}
              className="splash-image"
              alt="Image of a vintage movie projector"
            />
            <div className="shape-left-top"></div>
            <div className="shape-left-bottom"></div>
            <div className="shape-right-top"></div>
            <div className="shape-right-bottom"></div>
          </>
        ) : (
          ""
        )}
      </header>

      <main className="container">
        {movies.length > 0 ? (
          <>
            <div className="row justify-content-center">
              <div className="col-auto col-lg-10 col-xl-9 align-self-center">
                <ListGroup>
                  {movies.length > 0
                    ? movies.map((movie) => <ListItems movie={movie} />)
                    : ""}
                </ListGroup>
              </div>
            </div>
          </>
        ) : (
          <p className="visually-hidden">
            No movies yet! Use the search field to get a list.
          </p>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
