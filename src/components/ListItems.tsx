import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
  const handleShowModal = () => {
    setFullscreen(true);
    setShow(!show);
  };
  console.log(movie);
  return (
    <>
      <Button onClick={handleShowModal} key={movie.id} className="list-group-item list-group-item-action">
        <div className="row">
          <div className="col-sm-3">
            <h2>{movie.title}</h2>
            <p>{date}</p>
          </div>
          <div className="col-sm-9">
            <p>{movie.overview}</p>
          </div>
        </div>
      </Button>
      <Modal show={show} onHide={handleShowModal} centered fullscreen>
        <Modal.Header closeButton>
          <Modal.Title as="h2">{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-sm-5 col-md-4">
              <img
                className="img-fluid"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`Movie poster for ${movie.title}`}
              />
            </div>
            <div className="col">
              <p>{movie.overview}</p>
              <p>Release Date: {date}</p>
              <p>Original Language: {movie.original_language}</p>
              <p>Original Title: {movie.original_title}</p>
            </div>
          </div>
          {/* "genre_ids": [
      27,
      35
  ], */}
          <p className="text-center">
            Popularity: {movie.popularity} | Vote Average: {movie.vote_average} | Vote Count: {movie.vote_count}
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ListItems;
