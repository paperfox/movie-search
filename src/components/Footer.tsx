function Footer() {
  // Honestly the site just felt naked without a footer, so here's a simple one.
  return (
    <footer className="m-2">
      <p className="text-center">
        Content courtesy of{" "}
        <a href="https://www.themoviedb.org/">The Movie Database</a>{" "}
        {new Date().getFullYear()}, site built by Nathalie Garfinkle
      </p>
    </footer>
  );
}

export default Footer;
