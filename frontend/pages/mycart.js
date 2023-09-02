import React from "react";

const Mycart = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-3xl font-semibold mb-3">Your Cart</h2>
          <h4 className="text-lg">
            Total: <span className="font-xl font-semibold">$61.77</span>
          </h4>
        </div>
        <button class="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">
          Place My Order
        </button>
      </div>
      <table class="table-auto w-full border">
        <thead>
          <tr>
            <th class="px-4 py-2">Image</th>
            <th class="px-4 py-2 w-1/2">Dish</th>
            <th class="px-4 py-2">Quantity</th>
            <th class="px-4 py-2">Unit Price</th>
            <th class="px-4 py-2">Total Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border px-4 py-2">Image here</td>
            <td class="border px-4 py-2">
              <h6 className="font-xl font-semibold">Chicken Alfredo</h6>
              Creamy alfredo sauce made from scratch with ingredients like
              parmesan, cream, garlic and butter, served with fettuccine pasta
              and topped with sliced grilled chicken.
            </td>
            <td class="border px-4 py-2 text-center">
              <button className="bg-green-700 hover:bg-green-900 text-white font-bold p-0 px-2 rounded">
                -
              </button>
              <span className="mx-4">2</span>
              <button className="bg-green-700 hover:bg-green-900 text-white font-bold p-0 px-2 rounded">
                +
              </button>
            </td>
            <td class="border px-4 py-2">$19.99</td>
            <td class="border px-4 py-2">$39.98</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Mycart;
