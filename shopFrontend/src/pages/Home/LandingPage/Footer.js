// components/Footer.js
import React from "react";
import './Footer.scss';

function Footer() {
  return (
    <footer>
        <div class="f-item-con">
            <div class="app-info">
                <span class='app-name'>
                    <span class='app-initial'>SaiSneh</span>
                    <p>Electricals and Hardwares is your trusted source for high-quality hardware, electronics, and PVC/UPVC pipes. With over 20 years of experience, we pride ourselves on providing top-notch products and exceptional customer service.</p>
                </span>
            </div>
        </div>
        <div class='cr-con'>Copyright &copy; 2024 | Made by Siddharth Gosavi</div>
    </footer>

  );
}

export default Footer;