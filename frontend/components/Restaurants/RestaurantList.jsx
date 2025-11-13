import { gql, useQuery } from "@apollo/client";
import dynamic from "next/dynamic";

import Loader from "../Loader";
import RestaurantCard from "./subcomponents/RestaurantCard";

const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
});

const QUERY = gql`
  query GetAllRestaurants {
    restaurants {
      id: _id
      name
      description
      address
      city
      state
      zipCode
      phoneNumber
      latitude
      longitude
      imageUrls
      reviews {
        rating
        comment
      }
      openingHours {
        day
        open
        close
      }
    }
  }
`;

function RestaurantList(props) {
  const { loading, error, data } = useQuery(QUERY);

  const sliderSettings = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (error) return "Error loading restaurants";
  if (loading) return <Loader />;

  if (data.restaurants && data.restaurants.length) {
    const searchQuery = data.restaurants.filter((query) =>
      query.name.toLowerCase().includes(props.query.toLowerCase())
    );

    if (searchQuery.length != 0) {
      return (
        <div className="py-8 px-8 bg-white rounded-3xl">
          <div className="max-w-7xl mx-auto">
            <div className="slider-container">
              <Slider {...sliderSettings} slidesToShow={4}>
                {searchQuery.slice(0, 12).map((res) => (
                  <div key={res.id}>
                    <RestaurantCard data={res} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      );
    }
  }
  return <h1>No Restaurants Found</h1>;
}
export default RestaurantList;
