import { FaFacebook, FaTwitter, FaLinkedin, FaPinterest, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer id="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-sections  mt-3">
            <div className="footer-logo">
              <h2>BEAUTIFO</h2>
              <p>
                An oasis of online beauty built specifically so your new
                cosmetics site can take everyone’s breaths away.
              </p>
              <p>(1800)-88-66-990</p>
              <p>contact@example.com</p>
            </div>
            <div className="footer-links ">
              <h3>About Us</h3>
              <ul>
                <li>Story</li>
                <li>Products</li>
                <li>Blog</li>
                <li>Giving Back</li>
                <li>Partnerships</li>
                <li>Careers</li>
              </ul>
            </div>
            <div className="footer-links">
              <h3>Support</h3>
              <ul>
                <li>Shipping Info</li>
                <li>Returns & Exchanges</li>
                <li>Help & FAQ</li>
                <li>Reviews</li>
                <li>Quiz</li>
                <li>Store Locator</li>
              </ul>
            </div>
            <div className="footer-links">
              <h3>Service</h3>
              <ul>
                <li>Contact Us</li>
                <li>Delivery</li>
                <li>Returns</li>
                <li>My Account</li>
                <li>Rewards</li>
              </ul>
            </div>
            <div className="footer-links">
              <h3>Socials</h3>
              <ul className="social-icons">
                <li><FaFacebook /> Facebook</li>
                <li><FaTwitter /> Twitter</li>
                <li><FaLinkedin /> LinkedIn</li>
                <li><FaPinterest /> Pinterest</li>
                <li><FaYoutube /> YouTube</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          Copyright &copy; {new Date().getFullYear()} Beautifo. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
