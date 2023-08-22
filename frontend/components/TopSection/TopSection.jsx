import React from "react";
import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import styles from "./TopSection.module.css";

export default function TopSection() {
  return (
    <>
      <section className={`${styles.hero_bg}`}>
        <Navbar />
        <Hero />
      </section>
    </>
  );
}
