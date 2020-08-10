import { Link } from "gatsby";
import React from "react";

const Footer = () => (
  <footer data-testid="footer">
    <div className="wrapper">
      <div className="row">
        <div className="col-sm-offset-3 col-sm-4">
          <ul>
            <li>
              <a
                href="https://github.com/averygoodidea/averygoodwebapp-infrastructure/"
                target="_blank"
                rel="noreferrer"
              >
                Infrastructure Docs
              </a>
            </li>
            <li>
              <a href="/ui/1/docs/" target="_blank" rel="noreferrer">
                UI Docs
              </a>
            </li>
            <li>
              <a href="/api/1/docs/" target="_blank" rel="noreferrer">
                API Docs
              </a>
            </li>
          </ul>
        </div>
        <div className="col-sm-4">
          <ul>
            <li>
              <Link to="/b/">Blog</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/contact/">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
