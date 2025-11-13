import React, { useState } from "react";
import StatusStepper from "../../components/Order/StatusStepper";
import OrderSummary from "../../components/Order/OrderSummary";
import RestaurantMap from "../../components/Order/RestaurantMap";

const order = {
  dishes: [
    {
      name: "Butter Chicken",
      quantity: 2,
      price: 16.99,
      _id: "6864be236d0c3f9bb013a002",
    },
    {
      name: "Vegetable Biryani",
      quantity: 1,
      price: 14.99,
      _id: "6864be236d0c3f9bb013a003",
    },
  ],
  restaurant: {
    name: "Nawab Fine Indian Cuisine",
    description:
      "Authentic Indian restaurant serving traditional dishes with a modern twist. Known for our rich curries and tandoori specialties.",
    imageUrls: [
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
      "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    ],
    owner: "686487f6ecc1ba79c692d001",
    phoneNumber: "304-555-0001",
    address: "200 35th St SE",
    city: "Charleston",
    state: "WV",
    zipCode: "25304",
    latitude: 38.32987,
    longitude: -81.59813,
    menu: [
      {
        name: "Butter Chicken",
        description:
          "Tender chicken pieces in rich tomato-based curry with butter and cream",
        price: 16.99,
        imageUrls: [
          "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
        ],
        isActive: true,
        categories: ["Main Course", "Chicken", "Popular"],
        sides: ["Naan", "Rice", "Raita"],
        _id: {
          $oid: "6864be236d0c3f9bb013a002",
        },
      },
      {
        name: "Vegetable Biryani",
        description:
          "Aromatic basmati rice cooked with mixed vegetables and authentic spices",
        price: 14.99,
        imageUrls: [
          "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8",
        ],
        isActive: true,
        categories: ["Main Course", "Vegetarian", "Rice"],
        sides: ["Raita", "Papadum"],
        _id: {
          $oid: "6864be236d0c3f9bb013a003",
        },
      },
      {
        name: "Paneer Tikka Masala",
        description:
          "Grilled cottage cheese cubes in a creamy tomato-based curry",
        price: 15.99,
        imageUrls: [
          "https://images.unsplash.com/photo-1601050690597-df0568f70950",
        ],
        isActive: true,
        categories: ["Main Course", "Vegetarian", "Popular"],
        sides: ["Naan", "Rice"],
        _id: {
          $oid: "6864be236d0c3f9bb013a004",
        },
      },
      {
        name: "Tandoori Platter",
        description:
          "Assorted tandoor-grilled items including chicken, lamb, and vegetables",
        price: 24.99,
        imageUrls: [
          "https://images.unsplash.com/photo-1606471191009-63994c53433b",
        ],
        isActive: true,
        categories: ["Appetizers", "Grilled", "Sharing"],
        sides: ["Mint Chutney", "Onion Salad"],
        _id: {
          $oid: "6864be236d0c3f9bb013a005",
        },
      },
      {
        name: "Dal Makhani",
        description:
          "Creamy black lentils cooked overnight with butter and spices",
        price: 13.99,
        imageUrls: [
          "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
        ],
        isActive: true,
        categories: ["Main Course", "Vegetarian", "Lentils"],
        sides: ["Naan", "Rice", "Raita"],
        _id: {
          $oid: "6864be236d0c3f9bb013a006",
        },
      },
    ],
    reviews: [],
    createdAt: {
      $date: "2025-07-02T05:05:39.071Z",
    },
    updatedAt: {
      $date: "2025-07-02T05:27:49.539Z",
    },
    __v: 0,
  },
  status: "on its way",
};

export default function StatusPage() {
  const [orderData] = useState(order);

  return (
    <div className="min-h-screen bg-base/10">
      <StatusStepper currentStatus={orderData.status} />

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-200px)]">
        <div className="flex-1 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white">
          <OrderSummary order={orderData} />
        </div>
        <div className="flex-1 bg-white">
          <RestaurantMap restaurant={orderData.restaurant} />
        </div>
      </div>
    </div>
  );
}
