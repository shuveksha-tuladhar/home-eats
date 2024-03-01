import { useAppContext } from "@/context/AppContext";
import { centsToDollars } from "@/utils/centsToDollars";
import Image from "next/image";

export default function DishCard({ data }) {
    const { addItem } = useAppContext();
    function handleAddItem() {
       addItem(data);
       }
  

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      <div className="h-full bg-[#fffbdb] rounded-2xl">
       
          <Image
          className="w-full rounded-2xl"
          height={300}
          width={300}
          src={data.attributes?.image_url || "data:image/png;base64,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"}
          alt=""
        />
        <div className="p-8">
          <div className="group inline-block mb-4" href="#">
            <h3 className="font-heading text-xl text-gray-900 hover:text-gray-700 group-hover:underline font-black">
              {data.attributes.name}
            </h3>
            <h2>${centsToDollars(data.attributes.priceInCents)}</h2>
          </div>
          <p className="text-sm text-gray-500 font-bold">
            {data.attributes.description}
          </p>
          <div className="flex flex-wrap md:justify-center -m-2">
            <div className="w-full md:w-auto p-2 my-6">
              <button
                className="block w-full px-12 py-3.5 text-lg text-center text-white font-bold bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:ring-gray-600 rounded-full"
                onClick={handleAddItem}
              >
                + Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}