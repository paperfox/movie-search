import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';

interface movieItem {
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

function ListItems({ movie }: { movie: movieItem }) {
  const [show, setShow] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);

  const date = new Date(movie.release_date + 'T00:00:00').toLocaleDateString();
  const truncate = (input) => (input.length > 140 ? `${input.substring(0, 140)}...` : input);
  const shortOverview = truncate(movie.overview);
  console.log(shortOverview);
  const handleShowModal = () => {
    setFullscreen(true);
    setShow(!show);
  };

  return (
    <>
      <ListGroup.Item action onClick={handleShowModal} key={movie.id}>
        <div className="row">
          <div className="col-3 col-sm-2 col-md-1">
            <div className="img-container">
              <div className="img-overlay"></div>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`Movie poster for ${movie.title}`}
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-9 col-sm-3">
            <h2>{movie.title}</h2>
            <p>{date}</p>
          </div>
          <div className="col-sm-7 col-md-8 col-xl-7">
            <p>{shortOverview}</p>
          </div>
        </div>
      </ListGroup.Item>

      <Modal show={show} onHide={handleShowModal} centered fullscreen>
        <Modal.Header closeButton>
          <Modal.Title as="h2" className="visually-hidden">
            {movie.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row justify-content-center m-5">
            <div className="col-9 col-sm-6 col-md-5 col-lg-4 col-xl-3 pb-4">
              <img
                className="img-fluid pe-3"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`Movie poster for ${movie.title}`}
              />
            </div>
            <div className="col-sm-6 col-lg-6 col-xl-5 mt-4">
              <h2>{movie.title}</h2>
              <p>Original Title: {movie.original_title}</p>
              <hr />
              <p>{movie.overview}</p>
              <p>Release Date: {date}</p>
              <p>Original Language: {movie.original_language}</p>
              <p>Popularity: {movie.popularity}</p>
              <p>Vote Average: {movie.vote_average}</p>
              <p>Vote Count: {movie.vote_count}</p>
            </div>
          </div>
          {/* "genre_ids": [
      27,
      35
  ], */}
          {/* <p className="text-center">
            Popularity: {movie.popularity} | Vote Average: {movie.vote_average} | Vote Count: {movie.vote_count}
          </p> */}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ListItems;
