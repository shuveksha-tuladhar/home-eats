import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Loader from "../components/Loader";
import RestaurantCard from "../components/Restaurants/subcomponents/RestaurantCard";

const RESTAURANTS_BY_LOCATION_QUERY = gql`
  query GetRestaurantsByLocation($location: String!) {
    restaurantsByLocation(location: $location) {
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

export default function SearchPage() {
  const router = useRouter();
  const { location, query: searchQuery } = router.query;

  const { loading, error, data } = useQuery(RESTAURANTS_BY_LOCATION_QUERY, {
    variables: { location: location || "" },
    skip: !location,
  });

  const filteredRestaurants = data?.restaurantsByLocation
    ? searchQuery
      ? data.restaurantsByLocation.filter((restaurant) =>
          restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : data.restaurantsByLocation
    : [];

  return (
    <div className="min-h-screen bg-base/10 py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold mb-6 transition"
        >
          <FaArrowLeft />
          Back to Home
        </Link>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Search Results
          </h1>
          {location && (
            <p className="text-lg text-gray-600">
              Showing restaurants in <span className="font-semibold">{location}</span>
              {searchQuery && (
                <span>
                  {" "}
                  matching "<span className="font-semibold">{searchQuery}</span>"
                </span>
              )}
            </p>
          )}
        </div>

        {!location ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">
              Please select a location to search for restaurants.
            </p>
          </div>
        ) : loading ? (
          <Loader />
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-xl text-red-600">Error loading restaurants</p>
            <p className="text-gray-600 mt-2">{error.message}</p>
          </div>
        ) : filteredRestaurants.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">
              No restaurants found in {location}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id}>
                <RestaurantCard data={restaurant} />
              </div>
            ))}
          </div>
        )}

        {filteredRestaurants.length > 0 && (
          <div className="mt-8 text-center text-gray-600">
            Showing {filteredRestaurants.length}{" "}
            {filteredRestaurants.length === 1 ? "restaurant" : "restaurants"}
          </div>
        )}
      </div>
    </div>
  );
}
