import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import DishCard from "@/components/DishCard/DishCard";

const GET_RESTAURANT_DISHES = gql`
  query ($id: String!) {
    restaurant(id: $id) {
      _id
      address
      city
      state
      zipCode
      phoneNumber
      reviews {
        rating
      }
      imageUrls
      name
      dishes: menu {
        _id
        name
        description
        price
        imageUrls
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
  if (data.restaurant.dishes.length) {
    const { restaurant } = data;

    return (
      <div className="py-6 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        {restaurant.name}
      </h1>
      <div className="pb-16 bg-white rounded-3xl">
        <div className="flex flex-wrap -m-4 mb-6">
        {restaurant.dishes.map((dish) => {
          return (
          <DishCard key={dish._id} restaurant={restaurant} data={dish} />
          );
        })}
        </div>
      </div>
      </div>
    );
  } else {
    return <h1>No Dishes Found</h1>;
  }
}
