import { useAppContext } from "@/context/AppContext";
import CartItem from "../CartItem/CartItem";

export default function CheckoutCart() {
  const { cart } = useAppContext();
  const total = cart.total;
  const displayTotal = (total + 5.99).toFixed(2);

  return (
    <div className="rounded shadow-lg bg-white p-4" style={{ boxShadow: "0 4px 24px 0 rgba(34,197,94,0.2)" }}>
      <div className="max-w-lg pt-6 pb-8 px-8 mx-auto">
        <div className="flex mb-10 items-center justify-between">
          <h6 className="font-bold text-2xl mb-0 text-green-600">Your Cart</h6>
        </div>

        <div>
          {cart.items
            ? cart.items.map((item, index) => {
                if (item.quantity > 0) {
                  return <CartItem key={index} data={item} />;
                }
              })
            : null}
        </div>
        <div className="p-2">
          <div className="flex content-center justify-between">
            <span className="font-bold text-green-600">Sub total</span>
            <span className="text-sm font-bold text-green-600">${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="p-2">
          <div className="flex content-center justify-between">
            <span className="font-bold text-green-600">Delivery Fee</span>
            <span className="text-sm font-bold text-green-600">$5.99</span>
          </div>
        </div>
        <div className="p-2">
          <div className="flex mb-6 content-center justify-between">
            <span className="font-bold text-green-600">Order total</span>
            <span className="text-sm font-bold text-green-600">${displayTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
