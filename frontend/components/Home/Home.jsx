import React from "react";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      <section className={`${styles.home_bg}`}>
        <div className="mb-56 mt-24 p-16 align-center ">
          <div className="font-bold text-4xl">
            {" "}
            Hungry? Order food to your home.{" "}
          </div>
          <br />
          <div>
            <input
              className="appearance-none w-1/2 p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              type="text"
              placeholder="Search for restaurants"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button class="bg-green-700 hover:bg-green-600 ml-2 text-white font-bold py-2 px-5 border border-blue-700 rounded">
              Search
            </button>
          </div>
          <br />
          <div className="text-opacity-50 text-l"> Please login to start ordering. </div>
        </div>
      </section>
    </>
  );
}
