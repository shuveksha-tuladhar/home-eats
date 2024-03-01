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
            image_url
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
          src={data.attributes?.image_url || "data:image/jpeg;base64,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"}
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