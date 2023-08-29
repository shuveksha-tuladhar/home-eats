import { useAppContext } from "@/context/AppContext";
import { centsToDollars } from "@/utils/centsToDollars";
import CartItem from '@/components/CartItem/CartItem';
import React from 'react';
import { useInitialRender } from "@/utils/useInitialRender";
import { router } from "next/router";

export default function OrderCart () {
    const { user, cart } = useAppContext();
    const total = cart.total;
    const displayTotal = Math.abs(total);

    const initialRender = useInitialRender();
    if (!initialRender) return null;

    function checkoutRedirect() {
        router.push("/checkout");
      }

    return (
        <div>
            <h1> Your Cart</h1>
            {
                cart.items.map(item => 
                    <CartItem data={item} />)
            }
            <div className="p-6">
                <div className="flex mb-6 content-center justify-between">
                  <span className="font-bold text-black">Order total</span>
                  <span className="text-sm font-bold text-black">
                    ${centsToDollars(displayTotal)}
                  </span>
                </div>
                <button
                  onClick={() => (user ? checkoutRedirect() : loginRedirect())}
                  className="inline-block w-full px-6 py-3 text-center font-bold text-white bg-green-500 hover:bg-green-600 transition duration-200 rounded-full"
                >
                 Continue To Pay
                </button>
          </div>
        </div>
    );
}

