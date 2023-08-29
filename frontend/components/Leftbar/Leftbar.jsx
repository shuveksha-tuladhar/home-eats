import React, { useContext, useEffect, useState } from "react";
import styles from "./Leftbar.module.css";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItemButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppContext } from "@/context/AppContext";

export default function Leftbar(props) {
  const { scrollTop } = props;

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const { user, setUser } = useAppContext();
  const [accountType, setAccountType] = useState("");
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  
  useEffect(() => {
    setAccountType(localStorage.getItem("accountType"));
  }, [user]);
 
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolledUp(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  
  const handleSignOut = () => {
    setUser(""); // Clear the current user
  };

    const list = (anchor) => (
      
      <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
            <List>
        {user && (
          <ListItemButton>
            <span className={styles.leftbar_user}>{`Hello, ${user.username}`}</span>
          </ListItemButton>
        )}
        <ListItemButton>
          <Link href="/">
            <div className={styles.leftbar_link}>
              <HomeIcon />
              <span>Home</span>
            </div>
          </Link>
        </ListItemButton>
        <ListItemButton>
          <Link href="/about">
            <div className={styles.leftbar_link}>
              <InfoIcon />
              <span>About</span>
            </div>
          </Link>
        </ListItemButton>
        {user && accountType === "User" && (
          <ListItemButton>
            <Link href="/user/myOrders">
              <div className={styles.leftbar_link}>
                <ReceiptLongIcon />
                <span>My Orders</span>
              </div>
            </Link>
          </ListItemButton>
        )}

        {user ? (
          <ListItemButton onClick={handleSignOut}>
            <Link href="/">
                <div className={styles.burger_link}>
                  <LogoutIcon />
                  <span>Log Out</span>
                </div>
            </Link>
          </ListItemButton>
        ) : null}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <Button
        className={styles.leftbar_button_style}
        onClick={toggleDrawer("left", true)}
      >
        <Image
          width="25"
          height="25"
          src={scrollTop ? "/menu-icon-white.svg" : "/menu-icon.svg"}
          alt="Restaurant Image"
        />
      </Button>

      <Drawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </>
  );
}
