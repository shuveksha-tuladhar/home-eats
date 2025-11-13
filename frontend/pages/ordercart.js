import { useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import CartItem from "@/components/CartItem/CartItem";
import { useRouter } from "next/router";
import { useInitialRender } from "@/utils/useInitialRender";

export default function OrderCart({ loginRedirect }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { user, cart, resetCart } = useAppContext();

  const router = useRouter();
  const total = cart.total;
  const displayTotal = total + 5.99;
  const initialRender = useInitialRender();

  if (!initialRender) return null;

  const handleCheckout = () => {
    if (user) {
      router.push("/checkout");
    } else {
      loginRedirect();
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-140px)] sm:min-h-[calc(100vh-120px)] md:min-h-[calc(100vh-100px)] lg:min-h-screen bg-gradient-to-br from-lightbg to-lightbg2 flex items-center py-4 sm:py-6 md:py-8 lg:py-0 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/v2/background-cart.jpg')] bg-cover bg-center opacity-50 -z-10" />
      <div className="container mx-auto px-4 flex justify-center items-center">
        <div className="w-full max-w-2xl bg-white bg-opacity-95 rounded-xl shadow-lg p-6 sm:p-8 flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            {cart.items.length > 0 ? (
              <div
                className="flex flex-row items-start gap-4 mb-6 border-b border-gray-200 pb-4 cursor-pointer hover:bg-gray-100 transition"
                onClick={() => router.push(`/restaurant/${cart.restaurant._id}`)}
                role="button"
                tabIndex={0}
                onKeyPress={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    router.push(`/restaurant/${cart.restaurant.id}`);
                  }
                }}
              >
                {cart.restaurant?.imageUrls &&
                  cart.restaurant?.imageUrls[0] && (
                    <div className="flex-shrink-0">
                      <Image
                        src={cart.restaurant.imageUrls[0]}
                        alt={cart.restaurant.name}
                        className="rounded-xl object-cover w-20 h-20"
                      />
                    </div>
                  )}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {cart.restaurant.name}
                  </h2>
                  <div className="text-sm text-gray-600">
                    {cart.restaurant.address && (
                      <div>{cart.restaurant.address}</div>
                    )}
                    {cart.restaurant.city &&
                      cart.restaurant.state &&
                      cart.restaurant.zipCode && (
                        <div>
                          {cart.restaurant.city}, {cart.restaurant.state}{" "}
                          {cart.restaurant.zipCode}
                        </div>
                      )}
                    {cart.restaurant.phoneNumber && (
                      <div>Phone: {cart.restaurant.phoneNumber}</div>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
                Your Cart
              </h1>
              <p className="text-gray-600 text-center">
                {cart.items.length} items in your cart
              </p>
            </div>
            {cart.items.length > 0 ? (
              <>
                <div className="space-y-4 mb-6">
                  {cart.items.map((item) => (
                    <CartItem
                      key={item.id}
                      data={item}
                      restaurant={cart.restaurant}
                    />
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="text-gray-800">$5.99</span>
                  </div>
                  <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-200">
                    <span className="text-lg font-semibold text-gray-800">
                      Total
                    </span>
                    <span className="text-xl font-bold text-gray-800">
                      ${displayTotal.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-xl transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  >
                    Proceed to Checkout
                  </button>

                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setShowConfirm(true)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Clear Cart
                    </button>
                  </div>
                  {showConfirm && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                        <h4 className="text-lg font-semibold mb-4 text-gray-800">
                          Clear Cart?
                        </h4>
                        <p className="mb-6 text-gray-600">
                          Are you sure you want to clear your cart? This action
                          cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => setShowConfirm(false)}
                            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              resetCart();
                              setShowConfirm(false);
                            }}
                            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                          >
                            Yes, Clear
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 mb-6">
                  Looks like you have not added any items yet.
                </p>
                <button
                  onClick={() => router.push("/")}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
