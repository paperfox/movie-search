function Footer() {
  return (
    <footer className="m-4 pb-2">
      <p className="text-center">
        Content courtesy of <a href="https://www.themoviedb.org/">The Movie Database</a> {new Date().getFullYear()},
        site built by Nathalie Garfinkle
      </p>
    </footer>
  );
}

export default Footer;
