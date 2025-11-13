import React from "react";
import { centsToDollars } from "@/utils/centsToDollars";

function OrderSummary({ order }) {
  const calculateDishPrice = (dish) => {
    const menuItem = order.restaurant.menu.find(
      (item) => item.name === dish.name
    );
    return menuItem ? menuItem.price * dish.quantity : 0;
  };

  const subtotal = order.dishes.reduce(
    (sum, dish) => sum + calculateDishPrice(dish),
    0
  );
  const deliveryFee = 5.99;
  const total = subtotal + deliveryFee;

  // Format date
  const orderDate = new Date(order.createdAt || Date.now());
  const formattedDate = orderDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Order Summary
        </h2>
        <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-semibold text-sm uppercase">
            {order.status || "Confirmed"}
          </span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 mb-6 border border-primary/20">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-primary"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <span className="text-gray-500 font-medium">Order Date:</span>
              <p className="font-semibold text-gray-800">{formattedDate}</p>
            </div>
          </div>
          {order.id && (
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-primary"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <span className="text-gray-500 font-medium">Order ID:</span>
                <p className="font-semibold text-gray-800">#{order.id}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {order.address && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-3 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-800 mb-1">
                Delivery Address
              </h3>
              <p className="text-gray-600">{order.address}</p>
              {order.city && order.state && (
                <p className="text-gray-600">
                  {order.city}, {order.state} {order.zipCode}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
        <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-primary"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          Items Ordered
        </h3>
        <div className="space-y-3">
          {order.dishes.map((dish, idx) => {
            const menuItem = order.restaurant.menu.find(
              (item) => item.name === dish.name
            );
            const dishPrice = calculateDishPrice(dish);

            return (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-shrink-0">
                  <img
                    src={menuItem?.imageUrls?.[0] || "/placeholder-dish.png"}
                    alt={dish.name}
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-lg text-gray-800 mb-1">
                    {dish.name}
                  </h4>
                  {menuItem?.price && (
                    <p className="text-sm text-gray-500">
                      ${menuItem.price} each
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <span className="text-sm text-gray-500 block">Qty</span>
                    <span className="text-lg font-bold text-primary">
                      ×{dish.quantity}
                    </span>
                  </div>
                  <div className="text-right min-w-[80px]">
                    <span className="text-lg font-bold text-gray-800">
                      ${dishPrice}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-primary"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
              clipRule="evenodd"
            />
          </svg>
          Payment Summary
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold text-gray-800">${subtotal}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="font-semibold text-gray-800">${deliveryFee}</span>
          </div>
          <div className="flex justify-between items-center py-3 bg-primary/10 -mx-6 px-6 rounded-lg">
            <span className="text-lg font-bold text-gray-800">Total</span>
            <span className="text-2xl font-bold text-primary">${total}</span>
          </div>
        </div>
      </div>

      {/* <div className="flex flex-wrap gap-4 mt-6">
        <button className="flex-1 min-w-[200px] bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          Reorder
        </button>
      </div> */}
    </div>
  );
}

export default OrderSummary;
