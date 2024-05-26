import React from "react";
import { Link } from "react-router-dom";
import "./Footer.module.scss";
import { BiGitCompare } from "react-icons/bi";
const Footer = () => {
  return (
    // <div className="--flex-center --py2">
    //   <p>
    //     All Rights Reserved <Link to={"https://portfolio-16nw8allb-siddharthgosavi.vercel.app/"}>Siddharth Gosavi</Link>. &copy; 2024
    //   </p>
    // </div>
    <div class="footer-basic">
      <footer>
        <div class="social">
          <a href="#">
            <i class="sizer icon ion-social-instagram"></i>
          </a>
          <a href="#">
            <i class="sizer icon ion-social-snapchat"></i>
          </a>
          <a href="#">
            <i class="sizer icon ion-social-twitter"></i>
          </a>
          <a href="#">
            <i class="sizer icon ion-social-facebook"></i>
          </a>
        </div>

        <p class="copyright">
          All Rights Reserved <Link to={"https://portfolio-16nw8allb-siddharthgosavi.vercel.app/"}>Siddharth Gosavi</Link>. &copy; 2024
        </p>
      </footer>
    </div>
  );
};

export default Footer;
