import { FaRegHeart } from "react-icons/fa";

function Footer() {
  return (
    <footer id="footer">
      <div id="bottom-footer" className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <span className="copyright">
                Copyright &copy;
                <script>document.write(new Date().getFullYear());</script> All
                rights reserved | This template is made with <FaRegHeart /> by{" "}
                <a href="https://colorlib.com" target="_blank">
                  Colorlib
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
