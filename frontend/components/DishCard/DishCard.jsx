import { useAppContext } from "@/context/AppContext";
import { useState } from "react";
import Image from "next/image";

export default function DishCard({ data, restaurant }) {
  const { cart, addItem } = useAppContext();
  const [showPopup, setShowPopup] = useState(false);

  function handleAddItem() {
    // Ordering for the setRestuarant should be set in the context before adding item
    // setRestaurant({_id: restaurant._id, name: restaurant.name});
    if (cart.restaurant && cart.restaurant._id !== restaurant._id) {
      setShowPopup(true);
      return;
    }
    addItem(data, restaurant);
  }

  function handleClosePopup() {
    setShowPopup(false);
  }

  return (
    <div className="group w-full md:w-1/2 lg:w-1/3 p-4">
      <div className="h-full bg-white rounded-2xl shadow-highlight border border-base/20 flex flex-col overflow-hidden transition-transform duration-200">
        <div className="relative h-[220px] w-full overflow-hidden">
          <Image
            className="w-full h-full object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
            height={220}
            width={400}
            src={
              data?.imageUrls?.[0] ||
              "https://cdn.pixabay.com/photo/2017/09/04/18/39/coffee-2714970_1280.jpg"
            }
            alt={data.name}
            priority
          />
        </div>
        <div className="flex-1 flex flex-col justify-between p-6">
          <div>
            <h3 className="mb-2 text-xl font-bold text-[#222] text-center group-hover:text-primary transition">
              {data.name}
            </h3>
            <p className="text-base text-muted text-center mb-4 line-clamp-2">
              {data.description}
            </p>
            <p className="text-lg font-semibold text-center text-primary mt-2">
              {data.price ? `$${data.price}` : ""}
            </p>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="inline-block px-8 py-2.5 text-base font-bold rounded-full bg-primary text-white hover:bg-primary-dark transition"
              onClick={handleAddItem}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-full lg:w-1/2">
            <p className="mb-4">
              <p className="mb-4">
                You’re about to start a new order from <b>{restaurant.name}</b>.{" "}
              </p>
              <p>
                This will clear your current cart, since you can only order from
                one restaurant at a time.
              </p>
            </p>
            <div className="flex gap-4 mt-4">
              <button
                className="px-4 py-2 bg-primary text-white rounded"
                onClick={() => {
                  setShowPopup(false);
                  addItem(data, restaurant);
                }}
              >
                Proceed
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                onClick={handleClosePopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
