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

  // gets movies when user pauses in typing
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
        const response = await fetch(url, options);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [debouncedTerm]);

  // sets search term to empty string which reloads the landing page
  const clearSearch = useCallback(() => {
    setTerm(" ");
  }, []);

  // settings the classes based on the length of the movies array below ensures the focus doesn't leave the search box
  // this maintains a consistent user experience as the user goes from one layout to the next since it's a single page app
  return (
    <>
      <header
        className={
          movies.length === 0
            ? "container-fluid landing-page"
            : "list-navigation"
        }
      >
        <div>
          <div
            className={
              movies.length === 0
                ? "animate-width landing-content"
                : "animate-width search-navigation"
            }
          >
            <h1 className="page-title">Find the Perfect Movie</h1>
            <form className="row my-4">
              <div
                className={
                  movies.length === 0
                    ? "col-sm-4"
                    : "col-auto align-self-center"
                }
              >
                <label htmlFor="input-movie-search">Search</label>
              </div>
              <div className={movies.length === 0 ? "col-sm-9" : "col-sm-6"}>
                <InputGroup>
                  <Form.Control
                    id="input-movie-search"
                    value={term}
                    type="search"
                    onChange={(e) => setTerm(e.target.value)}
                  />
                  <InputGroup.Text>
                    <span className="icon-search"></span>
                  </InputGroup.Text>
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
                    ? movies.map((movie) => (
                        <ListItems movie={movie} key={movie.id} />
                      ))
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
