import React from "react";
import "./Footer.module.scss";
const Footer = () => {
  return (
    // <div className="--flex-center --py2">
    //   <p>
    //     All Rights Reserved <Link to={"https://portfolio-16nw8allb-siddharthgosavi.vercel.app/"}>Siddharth Gosavi</Link>. &copy; 2024
    //   </p>
    // </div>
    <div className="footer-basic">
      <footer>
        <div className="social">
          <a target={"_blank"} rel="noreferrer" href="https://www.linkedin.com/in/siddharthgosavi/">
            <i className="sizer icon ion-social-linkedin"></i>
          </a>
        </div>

        <p className="copyright">
          All Rights Reserved{" "}
          <a target={"_blank"} rel="noreferrer" href={"https://portfolio-16nw8allb-siddharthgosavi.vercel.app/"}>
            Siddharth Gosavi
          </a>
          . &copy; 2024
        </p>
      </footer>
    </div>
  );
};

export default Footer;
