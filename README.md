# HomeEats

Welcome to HomeEats, a comprehensive food ordering full-stack application developed with Strapi and Next.js, utilizing the power of React Hooks. This innovative platform empowers users to explore a diverse array of restaurants and dishes, enabling seamless meal ordering directly from their chosen restaurant. With an array of features including user authentication, registration, image uploading, restaurant and dish creation, cart management, and streamlined Stripe integration for orders, HomeEats redefines the culinary experience.

## Technologies Used
![Static Badge](https://img.shields.io/badge/npm-%3E%3D_9.6.7-blue) ![Static Badge](https://img.shields.io/badge/node-%3E%3D_18.17.1-green) ![Static Badge](https://img.shields.io/badge/react-%3E%3D_18.2.0-pink)
![Static Badge](https://img.shields.io/badge/next-%3E%3D_13.4.12-purple) ![Static Badge](https://img.shields.io/badge/postgreSQL-v14-blue)

JavaScript | React | NextJS | GraphQL | PostgreSQL | Strapi | Stripe | HTML5 | CSS | Tailwind CSS | Git 

## Getting Started
- Clone this repository
- Set Up environment variable
  - Create a *.env* file in backend folder
    
  ```
    HOST=0.0.0.0
    PORT=1337
    APP_KEYS=<APPS_KEYS>
    API_TOKEN_SALT=<API_TOKEN_SALT>
    ADMIN_JWT_SECRET=<JWT_TOKEN>
    TRANSFER_TOKEN_SALT=<TRANSFER_TOKEN_SALT>
  
    # Database
    DATABASE_CLIENT=postgres
    DATABASE_HOST=127.0.0.1
    DATABASE_PORT=5432
    DATABASE_NAME=home-eats
    DATABASE_USERNAME=<DB_USERNAME>
    DATABASE_PASSWORD=<DB_PASSWORD>
    DATABASE_SSL=false
    JWT_SECRET=<JWT_TOKEN>
    STRIPE_SECRET=<STRIPE_SECRET_KEY>
  ```

  - Create a *.env* file in frontend folder
  ```
  NEXT_PUBLIC_STRIPE_PKEY=<STRIPE_PUBLIC_KEY>
  ```
**Frontend**
- Change directory to frontend
```
cd frontend
```
- Install node libraries
```
npm install
```
- Run the frontend server on the port 3000.
```
npm run dev
```

**Backend**
- Change the directory to backend.
```
cd backend
```
- Install node libraries
```
npm install
```
- Run the backend server on the port 1337
```
npm run develop
```

## Functionalities
- Sign Up as a user with email and password
- Sign In
- Search for restaurants
- Search for dishes in a restaurant
- Add dishes to your cart by selecting a quantity
- Modify quantity of dishes on cart
- Price and quantity shown in cart updates automatically
- Check out and payment with stripe

## Features

**Home Page**
![image](https://github.com/shuveksha-tuladhar/home-eats/assets/97779778/e44ace86-14b0-42ca-bfb1-27382104f218)

**List of Restaurants**

**Sign Up Page**
![image](https://github.com/shuveksha-tuladhar/home-eats/assets/97779778/1d0837b7-eb4d-4233-9a58-0dc03112bef6)

**Login Page**
![image](https://github.com/shuveksha-tuladhar/home-eats/assets/97779778/937f69e0-108e-488e-bc89-4c63c21a68b6)

**Dishes**
![image](https://github.com/shuveksha-tuladhar/home-eats/assets/97779778/d949e5d7-1023-497b-a9aa-b60be5162a5f)

**Cart**
![image](https://github.com/shuveksha-tuladhar/home-eats/assets/97779778/9a0ebc7a-43b9-49f2-8d3c-4a2a6d4bc5d0)

**Checkout**
![image](https://github.com/shuveksha-tuladhar/home-eats/assets/97779778/4b19ac0e-a8d2-45e8-ab51-252e9f81aa39)


