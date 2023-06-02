import "../../css/footer.css";

export default function PageFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>About</h6>
            <p className="text-justify">
              Welcome to "You Ticket" – your one-stop destination for purchasing
              football tickets to exhilarating European team matches! Whether
              you're a die-hard fan or a casual observer, "You Ticket" offers a
              seamless platform to secure your spot in the electrifying
              atmosphere of top-tier football stadiums across Europe.
            </p>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>References</h6>
            <ul className="footer-links">
              <li>
                <a href="https://www.framer.com/motion/">Framer Motion</a>
              </li>
              <li>
                <a href="https://react-hot-toast.com/">React Hot Toast</a>
              </li>
              <li>
                <a href="https://mdbootstrap.com/docs/react/">
                  MDB React Bootstrap
                </a>
              </li>
              <li>
                <a href="https://fonts.google.com/">Google Fonts</a>
              </li>
              <li>
                <a href="https://fontawesome.com/">Font Awesome</a>
              </li>
              <li>
                <a href="https://react-select.com/home">React Select</a>
              </li>
              <li>
                <a href="https://www.npmjs.com/package/react-text-transition">
                  React Text Transition
                </a>
              </li>
              <li>
                <a href="https://react-bootstrap.github.io/">React Bootstrap</a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">
              Copyright &copy; 2023 All Rights Reserved by
              <a href="#"> You Ticket</a>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
