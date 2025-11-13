import React from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import StatusStepper from "../../components/Order/StatusStepper";
import OrderSummary from "../../components/Order/OrderSummary";
import RestaurantMap from "../../components/Order/RestaurantMap";
import Loader from "../../components/Loader";

const ORDER_DETAILS = gql`
  query GetOrderDetails($id: String!) {
    orderDetails(id: $id) {
      _id
      address
      city
      state
      amount
      paymentToken
      status
      orderDate
      restaurant {
        _id
        name
        address
        city
        state
        zipcode
        phoneNumber
        latitude
        longitude
        openingHours
        imageUrl
      }
      dishes {
        _id
        name
        price
        quantity
        imageUrl
      }
    }
  }
`;

export async function getServerSideProps() {
  return { props: {} };
}

export default function StatusPage() {
  const router = useRouter();

  const { loading, error, data } = useQuery(ORDER_DETAILS, {
    variables: { id: router.query.id },
  });

  if (loading) return <Loader />;
  if (error) return <p>Error loading order details.</p>;

  return (
    <div className="min-h-screen bg-base/10">
      <StatusStepper currentStatus={data.orderDetails.status} />

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-200px)]">
        <div className="flex-1 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white">
          <OrderSummary order={data.orderDetails} />
        </div>
        <div className="flex-1 bg-white">
          <RestaurantMap restaurant={data.orderDetails.restaurant} />
        </div>
      </div>
    </div>
  );
}
