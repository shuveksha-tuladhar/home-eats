import { useState } from "react";
import RestaurantList from "@/components/RestaurantList";
import HomePage from "@/components/Home/Home";

export default function Home() {
  const [query, setQuery] = useState("");
  return (
    <>
        <HomePage />
        <RestaurantList query={query} />
    </>
  );
}