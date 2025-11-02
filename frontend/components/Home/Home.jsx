import React, { useState } from "react";
import { FaSearch, FaShippingFast } from "react-icons/fa";
import { FaUtensils, FaMapMarkerAlt, FaSmile } from "react-icons/fa";
import RestaurantList from "../Restaurants/RestaurantList";

export default function Home(props) {
  const [query, setQuery] = useState("");

  return (
    <>
      <section className="relative min-h-[calc(100vh-140px)] sm:min-h-[calc(100vh-120px)] md:min-h-[calc(100vh-100px)] lg:min-h-screen bg-gradient-to-br from-lightbg to-lightbg2 flex items-center py-4 sm:py-6 md:py-8 lg:py-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/v2/background-food.jpg')] bg-cover bg-center -z-10" />

        <div className="container px-8 max-w-screen-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:min-h-[80vh] mx-auto">
            <div className="flex-1 max-w-full lg:max-w-[60%] w-full text-left lg:ml-8 xl:ml-16">
              <div className="mb-6 sm:mb-8 md:mb-10">
                <h1 className="text-4xl xl:text-[3rem] font-bold leading-tight text-black mb-4 drop-shadow-hightlight">
                  Ready to eat? We’ve got you!
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-secondary leading-relaxed max-w-full sm:max-w-[80%] lg:max-w-[90%]">
                  Find great meals near you — quick, easy, and delicious.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-highlight overflow-hidden max-w-full sm:max-w-[800px]">
                <div className="p-4 sm:p-6">
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-bold text-lg sm:text-xl px-4 py-1.5 rounded-full">
                    <FaShippingFast className="text-primary" />
                    Delivery
                  </div>
                </div>

                <div className="h-[1px] bg-line" />

                <div className="p-4 sm:p-6">
                  <form
                    className="flex flex-col sm:flex-row items-center gap-4"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <input
                      type="text"
                      placeholder="Search for restaurants"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full bg-base text-muted placeholder-muted text-base sm:text-lg rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    />
                    <button
                      type="submit"
                      className="min-w-[150px] sm:min-w-[180px] whitespace-nowrap flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold text-lg rounded-full px-6 py-3 transition transform hover:-translate-y-0.5"
                    >
                      <FaSearch />
                      Find Food
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-base/10 py-20">
        <div className="max-w-screen-xl mx-auto px-4 text-center flex flex-col items-center gap-16">
          <h2 className="text-4xl sm:text-[43px] font-bold text-primary leading-[112%]">
            How Does It Work
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-6 w-full max-w-[250px] text-center">
              <div className="w-[112px] h-[112px] bg-primary/20 rounded-full shadow-md flex items-center justify-center">
                <FaMapMarkerAlt className="text-primary text-4xl" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[22px] font-bold text-[#434343]">
                  Select Location
                </h3>
                <p className="text-[18px] text-[#9E9E9E] leading-[140%]">
                  Choose the location where your food will be delivered.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-6 w-full max-w-[250px] text-center">
              <div className="w-[112px] h-[112px] bg-primary/20 rounded-full shadow-md flex items-center justify-center">
                <FaUtensils className="text-primary text-4xl" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[22px] font-bold text-[#434343]">
                  Pick Restaurant & Meal
                </h3>
                <p className="text-[18px] text-[#9E9E9E] leading-[140%]">
                  Browse restaurants and pick your favorite dish.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-6 w-full max-w-[250px] text-center">
              <div className="w-[112px] h-[112px] bg-primary/20 rounded-full shadow-md flex items-center justify-center">
                <FaMapMarkerAlt className="text-primary text-4xl" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[22px] font-bold text-[#434343]">
                  Order & Track
                </h3>
                <p className="text-[18px] text-[#9E9E9E] leading-[140%]">
                  Place your order and track it live.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center gap-6 w-full max-w-[250px] text-center">
              <div className="w-[112px] h-[112px] bg-primary/20 rounded-full shadow-md flex items-center justify-center">
                <FaSmile className="text-primary text-4xl" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[22px] font-bold text-[#434343]">
                  Enjoy Your Meal
                </h3>
                <p className="text-[18px] text-[#9E9E9E] leading-[140%]">
                  Sit back, relax, and enjoy every bite.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-base/10 py-8 mb-8">
        <div className="max-w-screen-xl mx-auto px-4 text-center flex flex-col items-center">
          <h2 className="text-4xl sm:text-[43px] font-bold text-primary leading-[112%]">
            Featured Restaurants
          </h2>
          <RestaurantList query={props.query} />
        </div>
      </section>
    </>
  );
}
