# HomeEats

Welcome to HomeEats, a comprehensive food ordering full-stack application developed with Strapi and Next.js, utilizing the power of React Hooks. This innovative platform empowers users to explore a diverse array of restaurants and dishes, enabling seamless meal ordering directly from their chosen restaurant. With an array of features including user authentication, registration, image uploading, restaurant and dish creation, cart management, and streamlined Stripe integration for orders, HomeEats redefines the culinary experience.

## Technologies Used

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

**List of Restaurants**

**Sign Up Page**

**Login Page**

**Dishes**

**Cart**

**Checkout**


