import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Cart from "../Cart/Cart";

export default function Navbar() {
  const [scrollTop, setScrollTop] = useState(true);
  const { user, setUser, resetCart } = useAppContext();

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY !== 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    setUser("");
    resetCart();
  };

  return (
    <nav
      className={`sticky top-0 z-[999] flex items-center justify-between h-20 px-5 transition-all ${
        scrollTop ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-4 cursor-pointer">
        <Link href="/" className="flex items-center">
          <Image
            src="/v2/home_eats_logo.png"
            alt="HomeEats Logo"
            width={36}
            height={36}
            priority
          />
          <div className="ml-2 flex items-center text-2xl font-bold leading-none">
            <span className="text-[#7AC943]">Home</span>
            <span className="text-black">Eats</span>
          </div>
        </Link>
      </div>
      <ul className="flex items-center gap-1 list-none m-0 p-0">
        {user === "" ? (
          <>
            <li>
              <Link
                href="/login"
                className="text-black font-semibold px-4 py-2 mx-2 rounded-full border border-[#7AC943] hover:bg-[#7AC943] hover:text-white transition"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="text-black font-semibold px-4 py-2 rounded-full border border-[#7AC943] hover:bg-[#7AC943] hover:text-white transition"
              >
                Join Now
              </Link>
            </li>
          </>
        ) : (
          <li className="flex items-center gap-2">
            <Cart />
            <FaUserCircle className="text-[#555] text-2xl" />
            <button
              onClick={handleSignOut}
              className="text-black font-semibold px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
