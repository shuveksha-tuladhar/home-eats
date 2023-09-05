import { useAppContext } from "@/context/AppContext";
import { centsToDollars } from "@/utils/centsToDollars";
import CartItem from "../CartItem/CartItem";

export default function CheckoutCart() {
  const { cart } = useAppContext();
  const total = cart.total;
  const displayTotal = Math.abs(total);

  return (
    <div className="rounded co bg-[#fffbdb] p-4">
      <div className="max-w-lg pt-6 pb-8 px-8 mx-auto bg-blueGray-900">
        <div className="flex mb-10 items-center justify-between">
          <h6 className="font-bold text-2xl mb-0">Your Cart</h6>
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
        <div className="p-6">
          <div className="flex mb-6 content-center justify-between">
            <span className="font-bold">Order total</span>
            <span className="text-sm font-bold">
              ${centsToDollars(displayTotal)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
