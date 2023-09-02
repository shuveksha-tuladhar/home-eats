import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/router";
import { useInitialRender } from "@/utils/useInitialRender";


export default function Cart() {
  const router = useRouter();
  const { user, cart } = useAppContext();

  const initialRender = useInitialRender();
  if (!initialRender) return null;

  function loginRedirect() {
    router.push("/login");
  }

  function cartItemRedirect() {
    router.push("/ordercart");
  }

  return (
    <>
    
    <button
          onClick={() => (user ? cartItemRedirect() : loginRedirect())}
          className="z-10 bg-green-500 text-white p-3 rounded-full hover:bg-yellow-500 flex items-center"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.3334 8.16667V4.83333C11.3334 2.99238 9.84099 1.5 8.00004 1.5C6.15909 1.5 4.66671 2.99238 4.66671 4.83333V8.16667M2.16671 6.5H13.8334L14.6667 16.5H1.33337L2.16671 6.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="ml-2">{cart.totalCartQuantity}</span>
  
        </button>
      </>
  );
}
