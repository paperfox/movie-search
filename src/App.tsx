import { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListItems from "./components/ListItems";
import camera from "./assets/camera.svg";
import light from "./assets/light.svg";
import largeReel from "./assets/large-reel.svg";
import smallReel from "./assets/small-reel.svg";
import stand from "./assets/stand.svg";

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
  const [errorClass, setErrorClass] = useState(false);

  const apiKey = import.meta.env.VITE_KEY;
  const url = `https://api.themoviedb.org/3/search/movie?query=${term}&include_adult=false&language=en-US&page=1`;

  // search on button or enter
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    passTerm();
  };

  const passTerm = () => {
    const fetchData = async () => {
      if (!term) {
        return setErrorClass(true);
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
        setErrorClass(false);
      } catch (error) {
        console.error("An error occured:", error);
      }
    };
    fetchData();
  };

  // reset to get back to landing page
  const backToLanding = () => {
    setTerm("");
    setMovies([]);
  };

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
            <form className="row my-4" onSubmit={handleFormSubmit}>
              <div
                className={
                  movies.length === 0
                    ? "col-lg-4"
                    : "col-auto align-self-center"
                }
              >
                <label htmlFor="input-movie-search">Search by Title</label>
              </div>
              <div
                className={movies.length === 0 ? "col-sm-9" : "col-11 col-sm-6"}
              >
                <InputGroup>
                  <Form.Control
                    id="input-movie-search"
                    value={term}
                    type="search"
                    onChange={(e) => setTerm(e.target.value)}
                    isInvalid={errorClass}
                  />
                  <Button
                    variant="primary"
                    id="btn-movie-search"
                    aria-label="Search"
                    onClick={passTerm}
                  >
                    <span className="icon-search"></span>
                  </Button>
                </InputGroup>
                <p className="invalid-feedback">
                  Please enter a word or title to search.
                </p>
              </div>

              {movies.length > 0 ? (
                <p className="col-auto align-self-center mb-0">
                  <Button variant="link" type="button" onClick={backToLanding}>
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
            <div className="splash-image">
              {/* The one alt tag covers what a screenreader user would need to know about all of these images
              listing them individually was overwhelming */}
              <img src={largeReel} className="large-reel" alt="" />
              <img src={smallReel} className="small-reel" alt="" />
              <img
                src={camera}
                className="camera"
                alt="A vintage movie projector shining light from the lense"
              />
              <img src={light} className="light" alt="" />
              <img src={stand} className="stand" alt="" />
            </div>
            <div className="light-extension" />
            <div className="shape-left-top" />
            <div className="shape-left-bottom" />
            <div className="shape-right-top" />
            <div className="shape-right-bottom" />
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
    </>
  );
}

export default App;
