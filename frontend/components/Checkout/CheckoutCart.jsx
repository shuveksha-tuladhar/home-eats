import { useAppContext } from "@/context/AppContext";
import CartItem from "../CartItem/CartItem";

export default function CheckoutCart() {
  const { cart } = useAppContext();
  const total = cart.total;
  const displayTotal = (total + 5.99).toFixed(2);

  return (
    <div
      className="rounded shadow-lg bg-white p-4"
      style={{ boxShadow: "0 4px 24px 0 rgba(34,197,94,0.2)" }}
    >
      <div className="max-w-lg pt-6 pb-8 px-8 mx-auto">
        {cart.items.length > 0 ? (
          <div className="flex flex-row items-start gap-4 mb-6 border-b border-gray-200 pb-4">
            {cart.restaurant?.imageUrls && cart.restaurant?.imageUrls[0] && (
              <div className="flex-shrink-0">
                <img
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
        <div className="flex mb-4 items-center justify-between">
          <h6 className="font-bold text-2xl mb-0 text-green-600">Your Cart</h6>
        </div>

        <div className="space-y-4 mb-6">
          {cart.items
            ? cart.items.map((item, index) => {
                if (item.quantity > 0) {
                  return (
                    <CartItem
                      key={index}
                      data={item}
                      restaurant={cart.restaurant}
                    />
                  );
                }
              })
            : null}
        </div>
        <div>
          <div className="flex content-center justify-between">
            <span className="font-bold text-green-600">Sub total</span>
            <span className="text-sm font-bold text-green-600">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
        <div>
          <div className="flex content-center justify-between">
            <span className="font-bold text-green-600">Delivery Fee</span>
            <span className="text-sm font-bold text-green-600">$5.99</span>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-4">
          <div className="flex mb-6 content-center justify-between">
            <span className="font-bold text-green-600">Order total</span>
            <span className="text-sm font-bold text-green-600">
              ${displayTotal}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
