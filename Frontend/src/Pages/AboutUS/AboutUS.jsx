import React from "react";
import styles from "./AboutUs.module.css";

const AboutUs = () => {
  return (
    <div className={styles.aboutUs}>
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>About Firafruit</h1>
        <p className={styles.heroSubtitle}>
          Fresh, Organic, and Delicious Fruits Delivered to Your Doorstep
        </p>
      </div>

      <div className={styles.content}>
        <section className={styles.mission}>
          <h2>Our Mission</h2>
          <p>
            At Firafruit, we are committed to providing the freshest,
            highest-quality fruits sourced directly from local farms. Our
            mission is to promote healthy living by making organic fruits
            accessible to everyone.
          </p>
        </section>

        <section className={styles.story}>
          <h2>Our Story</h2>
          <p>
            Founded in 2020, Firafruit started as a small family-owned business
            with a passion for fresh produce. Over the years, we have grown into
            a trusted name in the fruit delivery industry, serving thousands of
            happy customers.
          </p>
        </section>

        <section className={styles.team}>
          <h2>Our Team</h2>
          <p>
            Our team is made up of passionate individuals who love fruits and
            care about your health. From farmers to delivery personnel, everyone
            at Firafruit is dedicated to ensuring you get the best experience.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
