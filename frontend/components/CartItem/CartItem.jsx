import { useAppContext } from "@/context/AppContext";
import { useInitialRender } from "@/utils/useInitialRender";

export default function CartItem(props) {
  const { data } = props;
  const { addItem, removeItem } = useAppContext();
  const { quantity, name, price, imageUrls } = data;
  const initialRender = useInitialRender();
  if (!initialRender) return null;

  const imgSrc = imageUrls && imageUrls.length > 0 ? imageUrls[0] : "";

  return (
    <div className="py-4 flex flex-wrap justify-between border-b border-blueGray-800 items-center">
      <div className="w-1/6 flex justify-center items-center">
        <img
          src={imgSrc}
          alt={name}
          className="w-16 h-16 object-cover rounded"
        />
      </div>
      <div className="w-2/4">
        <div className="flex flex-col h-full">
          <h6 className="font-semibold text-lg mb-1">{name}</h6>
          <div className="flex items-center gap-3 font-medium text-gray-600">
            <span>${price.toFixed(2)} x </span>
            <button
              className="w-6 h-6 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600"
              onClick={() => removeItem(data)}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="w-6 h-6 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600"
              onClick={() => addItem(data)}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/4">
        <div className="flex justify-end">
          <span className="text-sm font-bold text-gray-600">
            ${(price * quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
