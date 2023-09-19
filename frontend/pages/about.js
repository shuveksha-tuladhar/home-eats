import React from "react";
import Link from "next/link";

export default function About() {
  const specList = [
    {
      name: "Framework",
      content: "NextJS",
    },
    {
      name: "Hosting Service",
      content: "Vercel",
    },
    {
      name: "API Approach",
      content: "REST",
    },

    {
      name: "Database",
      content: "PostgreSQL",
    },
    {
      name: "Payment Getaway",
      content: "Stripe",
    },
    {
      name: "Authorization and Authentication",
      content: "JSON Web Tokens",
    },
    {
      name: "Important libraries",
      content: "stripe, js-cookies, next, general-formatter, Material UI",
    },
  ];
  return (
    <div>
      <section class="mb-12 mx-12">
        <h1 class="font-bold text-4xl text-gray-900 dark:text-white mb-4 mt-4">
          HomeEats
        </h1>

        <p class="text-justify">
          Welcome to HomeEats, a comprehensive food ordering full-stack
          application developed with Strapi and Next.js, utilizing the power of
          React Hooks. This innovative platform empowers users to explore a
          diverse array of restaurants and dishes, enabling seamless meal
          ordering directly from their chosen restaurant. With an array of
          features including user authentication, registration, image uploading,
          restaurant and dish creation, cart management, and streamlined Stripe
          integration for orders, HomeEats redefines the culinary experience.
          The restaurant application involves developing the foundational
          elements of a web-based eCommerce platform. This platform enables
          users to place orders for meals offered by various restaurants, each
          of which offers a unique selection of dishes with varying prices and
          additional features.
        </p>
     
          <h2 class="font-bold text-2xl text-gray-900 dark:text-white mb-4 mt-4" > Functionalities</h2>
                <li> Sign Up as a user with email and password </li>
                <li> Sign In</li>
                <li> Search for restaurants</li>
                <li> Search for dishes in a restaurant</li>
                <li> Add dishes to your cart by selecting a quantity</li>
                <li> Modify quantity of dishes on cart</li>
                <li> Price and quantity shown in cart updates automatically</li>
                <li> Check out and payment with stripe</li>

           <h2 class="font-bold text-2xl text-gray-900 dark:text-white mb-4 mt-4" > Technical Specifications</h2> 
            <p>JavaScript | React | NextJS | GraphQL | PostgreSQL | Strapi | Stripe | HTML5 | CSS | Tailwind CSS | Git</p>
        <div className="mb-4 font-normal">
        <h2 class="font-bold text-2xl text-gray-900 dark:text-white mb-4 mt-4 " > GitHub Repo</h2>
            <Link class="mb-12 hover:text-blue" href="https://github.com/shuveksha-tuladhar/home-eats">
            https://github.com/shuveksha-tuladhar/home-eats
            </Link>
        
        </div>
      </section>
    </div>
  );
}
