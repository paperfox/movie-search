import { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListItems from "./components/ListItems";
import Footer from "./components/Footer";
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
  };

  // sets search term to empty string which reloads the landing page
  const clearSearch = () => {
    setTerm(" ");
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
                  <Button
                    variant="primary"
                    id="btn-movie-search"
                    aria-label="Search"
                    onClick={passTerm}
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
            <div className="splash-image">
              <img
                src={largeReel}
                className="large-reel"
                alt="A large reel of film at the front of the movie projector"
              />
              <img
                src={smallReel}
                className="small-reel"
                alt="A small reel of film at the back of the movie projector"
              />
              <img
                src={camera}
                className="camera"
                alt="A vintage movie projector"
              />
              <img
                src={light}
                className="light"
                alt="Light shining out of the projector"
              />
              <img
                src={stand}
                className="stand"
                alt="A stand for a projector"
              />
            </div>
            <div className="light-extension"></div>
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
