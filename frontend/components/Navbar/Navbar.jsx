import Link from "next/link"
import Image from "next/image";

import styles from './Navbar.module.css'
import { useEffect, useState } from "react"

export default function Navbar() {
  const [scrollTop, setScrollTop] = useState(true);
  const [user, setUser] = useState("");
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

    return (
        <>
      <nav
        className={`${styles.navbar} ${
          scrollTop ? styles.scrolled : ""
        }`}
      >
        <div className={styles.navbar_branding}>
          <div >
            {/* <Burger /> */}
          </div>
          <Image
            src={scrollTop ? "/homeeats-logo-white-on-transparent.png" : "/homeeats-logo-color-on-transparent.png"}
            alt="brand_logo"
            width="150"
            height="50"
          />
        </div>
        <div className={styles.navbar_menus}>
          <ul className={styles.menus_list}>
            <li className={styles.navbar_menu}></li>
            <li className={styles.navbar_menu}></li>
            {user === "" ? (
              <>
                <li className={styles.navbar_menu}>
                  <Link href="/user/signUp">
                    <button
                      className={`${styles.navbar_button_login} ${
                        scrollTop ? styles.button_black : ""
                      }`}
                    >
                      <div className={styles.navbar_button_icon}>
                        {/* <CreateIcon /> */}
                        <a>Sign Up</a>
                      </div>
                    </button>
                  </Link>
                </li>
                <li className={styles.navbar_menu}>
                  <Link href="/user/signIn">
                    <button
                      className={`${styles.navbar_button_login} ${
                        scrollTop ? styles.button_black : ""
                      }`}
                    >
                      <div className={styles.navbar_button_icon}>
                        {/* <PersonIcon /> */}
                        <a>Log In</a>
                      </div>
                    </button>
                  </Link>
                </li>
              </>
            ) : (
              <>
                

               
                {accountType !== "Restaurant" ? (
                  <li className={styles.navbar_menu}>
                    <Link href="/user/myCart">
                      <div className={styles.cart_container}>
                        <span title="Cart">
                          <AiOutlineShoppingCart
                            className={styles.navbar_icon}
                          />
                        </span>
                        <span className={styles.cart_quantity}>
                          {totalCartQuantity}
                        </span>
                      </div>
                    </Link>
                  </li>
                ) : (
                  <></>
                )}

                
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
    )
}