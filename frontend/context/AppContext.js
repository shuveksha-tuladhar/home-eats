import { useState, createContext, useContext, useEffect } from "react";
import Cookie from "js-cookie";
import { gql } from "@apollo/client";
import { client } from "@/pages/_app.js";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const cartCookie =
    Cookie.get("cart") !== "undefined" ? Cookie.get("cart") : null;

  const [user, setUser] = useState(null);

  const [cart, setCart] = useState(
    cartCookie
      ? JSON.parse(cartCookie)
      : { items: [], total: 0, totalCartQuantity: 0, restaurant: null }
  );

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser();
      setUser(userData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    Cookie.set("cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = (item, restaurantInfo) => {
    if (cart.restaurant && cart.restaurant._id !== restaurantInfo._id) {
      resetCart();
    }

    let newItem = cart.items.find((i) => i._id === item._id);
    if (!newItem) {
      const newItem = {
        quantity: 1,
        ...item,
      };

      setCart((prevCart) => ({
        items: [...prevCart.items, newItem],
        totalCartQuantity: prevCart.totalCartQuantity + 1,
        total: prevCart.total + item.price,
        restaurant: restaurantInfo,
      }));
    } else {
      setCart((prevCart) => ({
        items: prevCart.items.map((i) =>
          i._id === newItem._id ? { ...i, quantity: i.quantity + 1 } : i
        ),
        totalCartQuantity: prevCart.totalCartQuantity + 1,
        total: prevCart.total + item.price,
        restaurant: restaurantInfo,
      }));
    }
  };

  const removeItem = (item) => {
    let newItem = cart.items.find((i) => i._id === item._id);
    if (newItem.quantity > 1) {
      setCart((prevCart) => ({
        items: prevCart.items.map((i) =>
          i._id === newItem._id ? { ...i, quantity: i.quantity - 1 } : i
        ),
        totalCartQuantity: prevCart.totalCartQuantity - 1,
        total: prevCart.total - item.price,
        restaurant: prevCart.restaurant,
      }));
    } else {
      setCart((prevCart) => ({
        items: prevCart.items.filter((i) => i._id !== item._id),
        totalCartQuantity: prevCart.totalCartQuantity - 1,
        total: prevCart.total - item.price,
        restaurant: prevCart.restaurant,
      }));
    }
  };

  const resetCart = () => {
    setCart({ items: [], total: 0, totalCartQuantity: 0, restaurant: null });
  };

  const logOut = () => {
    setUser(null);
    resetCart();
    Cookie.remove("token");
    Cookie.remove("cart");
  }

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        cart,
        addItem,
        removeItem,
        resetCart,
        logOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const getUser = async () => {
  const token = Cookie.get("token");
  if (!token) return null;
  const { data } = await client.query({
    query: gql`
      query {
        me {
          _id
          email
          username
        }
      }
    `,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  return data?.me;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined)
    throw new Error("useAppContext must be used within an AppProvider");
  return context;
};
