import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";
import Loader from "./Loader";

const QUERY = gql`
  {
    homeEatsRestaurants {
        data {
          id
          attributes {
            name
            image {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
  }
`;

function RestaurantCard({ data }) {
    console.log(data);
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      <div className="h-full bg-[#fffbdb] rounded-2xl">
        <div className="h-[300px]">

        <Image
          className="w-full h-full object-cover  rounded-2xl"
          height={300}
          width={300}
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.01:1337"}${
            data.attributes.image.data[0].attributes.url
          }`}
          alt=""
        />
          </div>
        <div className="p-8">
          <h3 className="mb-3 text-2xl text-gray-900 hover:text-gray-700 group-hover:underline font-bold text-center">
            {data.attributes.name}
          </h3>
          <p className="text-sm text-gray-500 font-bold">
            {data.attributes.description}
          </p>
          <div className="flex flex-wrap md:justify-center -m-2">
            <div className="w-full md:w-auto p-2 my-6">
              <Link
                className="block w-full px-10 py-2.5 text-lg text-center text-white font-bold bg-green-900 hover:bg-green-800 focus:ring-4 focus:ring-gray-600 rounded-full"
                href={`/restaurant/${data.id}`}
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RestaurantList(props) {
  const { loading, error, data } = useQuery(QUERY);

  if (error) return "Error loading restaurants";
  if (loading) return <Loader />;

  if (data.homeEatsRestaurants.data && data.homeEatsRestaurants.data.length) {
    const searchQuery = data.homeEatsRestaurants.data.filter((query) =>
      query.attributes.name.toLowerCase().includes(props.query.toLowerCase())
    );

    if (searchQuery.length != 0) {
      return (
        <div className="py-16 px-8 bg-white rounded-3xl">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap -m-4 mb-6">
              {searchQuery.map((res) => {
                return <RestaurantCard key={res.id} data={res} />;
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return <h1>No Restaurants Found</h1>;
    }
  }
  return <h5>Add Restaurants</h5>;
}
export default RestaurantList;