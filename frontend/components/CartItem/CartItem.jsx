import { useAppContext } from "@/context/AppContext";
import { centsToDollars } from "@/utils/centsToDollars";
import { useInitialRender } from "@/utils/useInitialRender";

export default function CartItem(props) {
  const {data} = props;
  const { addItem, removeItem } = useAppContext();
  const { quantity, attributes } = data;
  console.log("quantity", quantity);
  const initialRender = useInitialRender();
  if (!initialRender) return null;

 
  return (
    <div className="p-6 flex flex-wrap justify-between border-b border-blueGray-800">
      <div className="w-2/4">
        <div className="flex flex-col h-full">
          <h6 className="font-semibold text-lg  mb-1">{attributes.name}</h6>
          <span className="block pb-4 mb-auto font-medium text-gray-600">
            {quantity} x ${centsToDollars(attributes.priceInCents)}
          </span>
        </div>
      </div>
      <div className="w-1/4">
        <div className="flex flex-col items-end h-full">
          <div className="flex justify-between">
            <button
              className="mr-3.5 font-medium text-sm text-red-500 hover:text-gray-200"
              onClick={() => removeItem(data)}
            >
              Remove
            </button>
            <button
              className="font-medium text-sm text-blue-400 hover:text-gray-200"
              onClick={() => addItem(data)}
            >
              Add
            </button>
          </div>
          <span className="block mt-2 text-sm font-bold text-gray-600">
            ${centsToDollars(attributes.priceInCents * quantity)}
          </span>
          
        </div>
      </div>
    </div>
  );
}
