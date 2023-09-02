import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import Leftbar from "../Leftbar/Leftbar";

export default function Navbar() {
  const [scrollTop, setScrollTop] = useState(true);
  const { user, setUser, resetCart } = useAppContext();
  useEffect(() => {
    const handleScroll = () => {
      const scrollYPosition = window.scrollY;
      if (scrollYPosition === 0) {
        setScrollTop(false);
      } else {
        setScrollTop(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignOut = () => {
    setUser(''); // Clear the current user
    resetCart();
  };

  return (
    <>
      <nav className={`${styles.navbar} ${scrollTop ? styles.scrolled : ""}`}>
        <div className={styles.navbar_branding}>
          <Leftbar scrollTop={scrollTop} />
          <Link href="/">
            <Image
              src={
                scrollTop
                  ? "/homeeats-logo-white-on-transparent.png"
                  : "/homeeats-logo-color-on-transparent.png"
              }
              alt="brand_logo"
              width="150"
              height="50"
              className="ml-3"
            />
          </Link>
        </div>
        <div className={styles.navbar_menus}>
          <ul className={styles.menus_list}>
            <li className={styles.navbar_menu}></li>
            <li className={styles.navbar_menu}></li>
            {user === "" ? (
              <>
                <li className={styles.navbar_menu}>
                  <Link
                    href="/register"
                    className="bg-white hover:bg-gray-100 text-gray-800 py-2 px-3 text-base font-semibold rounded-full inline-flex items-center"
                  >
                    <button
                      className={`${styles.navbar_button_login} ${
                        scrollTop ? styles.button_black : ""
                      }`}
                    >
                      <Image
                        width="16"
                        height="16"
                        src="/edit-pen.svg"
                        className="mr-3"
                      />
                      <div className={styles.navbar_button_icon}>Sign Up</div>
                    </button>
                  </Link>
                </li>
                <li className={styles.navbar_menu}>
                  <Link
                    href="/login"
                    className="bg-white hover:bg-gray-100 text-gray-800 py-2 px-3 text-base font-semibold rounded-full inline-flex items-center"
                  >
                    <button
                      className={`${styles.navbar_button_login} ${
                        scrollTop ? styles.button_black : ""
                      }`}
                    >
                      <Image
                        width="16"
                        height="16"
                        src="/user.svg"
                        className="mr-3"
                      />
                      <div className={styles.navbar_button_icon}>Login</div>
                    </button>
                  </Link>
                </li>
                
                <li>
                  <Cart />
                </li>
              </>
            ) : (
              <><li>
              <Cart />
            </li>
                <li className={styles.navbar_menu}>
                  <Link
                    href=""
                    className="bg-white hover:bg-gray-100 text-gray-800 py-2 px-3 text-base font-semibold rounded-full inline-flex items-center"
                  >
                    <button
                    onClick={handleSignOut}
                      className={`${styles.navbar_button_login} ${
                        scrollTop ? styles.button_black : ""
                      }`}
                    >
                       <Image
                        width="24"
                        height="24"
                        src="/sign-out-fill.svg"
                        className="mr-3"
                      />
                      <div className={styles.navbar_button_icon}>Logout</div>
                    </button>
                                 
                  </Link>      
                </li>
                
              </>
            )}
          </ul>
        </div>
      </nav>
      <style jsx global>{`
        .${styles.scrolled} {
          transition: background-color 0.3s ease-in-out;
        }

        .${styles.button_black} .navbar_button_icon a {
          color: black;
        }
      `}</style>
    </>
  );
}
