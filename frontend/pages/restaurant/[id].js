import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import DishCard from "@/components/DishCard/DishCard";

const GET_RESTAURANT_DISHES = gql`
query ($id: ID!) {
    homeEatsRestaurant(id: $id) {
      data {
        id
        attributes {
          name
          dishes {
            data {
              id
              attributes {
                name
                description
                priceInCents:price
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
      }
    }
  }
`;



export default function Restaurant() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: router.query.id },
  });

  if (error) return "Error Loading Dishes";
  if (loading) return <Loader />;
  if (data.homeEatsRestaurant.data.attributes.dishes.data.length) {
    const { homeEatsRestaurant } = data;

    return (
      <div className="py-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          {homeEatsRestaurant.data.attributes.name}
        </h1>
        <div className="pb-16 bg-white rounded-3xl">
    
            <div className="flex flex-wrap -m-4 mb-6">
              {homeEatsRestaurant.data.attributes.dishes.data.map((res) => {
                return <DishCard key={res.id} data={res} />;
              })}
            </div>
    
        </div>
      </div>
    );
  } else {
    return <h1>No Dishes Found</h1>;
  }
}