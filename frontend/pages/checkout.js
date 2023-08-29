import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAppContext } from "@/context/AppContext";
import { useInitialRender } from "@/utils/useInitialRender";
import CheckoutForm from "@/components/Checkout/CheckoutForm";
import CheckoutCart from "@/components/Checkout/CheckoutCart";
const stripePromise = loadStripe(process.env.STRIPE_PKEY);

export default function Checkout() {

  const initialRender = useInitialRender();
  if (!initialRender) return null;

  return (
    <section className="container mx-auto py-24">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-2">
          <CheckoutCart />
        </div>
        <div className="col-span-3">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </section>
  );
}