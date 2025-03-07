import React from "react";
import styles from "../../Components/Footer/Footer.module.css";
import facebook_icon from "../../asset/facebook_icon.png";
import twitter_icon from "../../asset/twitter_icon.png";

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footer}>
        {/* Left Section */}
        <div className={styles.footerLeft}>
          <div className={styles.logo}>
            <span>Fira</span>
            <span>fruit</span>
          </div>
          <p>
            Fresh fruits delivered to your doorstep. Quality and freshness
            guaranteed.
          </p>
          <div className={styles.socialMedia}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebook_icon} alt="Facebook" />
            </a>
            <a
              href="https://x.com/FiragosJemal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitter_icon} alt="Twitter" />
            </a>
          </div>
        </div>

        <div className={styles.footerMiddle}>
          <div className={styles.middleLogo}>
            <span>Fira</span>
            <span>fruit</span>
          </div>
          <div className={styles.links}>
            <ul>
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/shop">Shop</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.footerRight}>
          <h2>Contact Us</h2>
          <ul className={styles.footerContact}>
            <li>📧 jemalfiragos@gmail.com</li>
            <li>📞 +251932302873</li>
            <li>📍 123 Fruit Lane, Fresh City</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} Firafruit. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
