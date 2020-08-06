import { Link } from "gatsby";
import React from "react";

const Footer = () => (
  <footer>
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
              <Link to="/ui/1/docs/">UI Docs</Link>
            </li>
            <li>
              <Link to="/api/1/docs/">API Docs</Link>
            </li>
          </ul>
        </div>
        <div className="col-sm-4">
          <ul>
            <li>
              <Link to="/blog/">Blog</Link>
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
