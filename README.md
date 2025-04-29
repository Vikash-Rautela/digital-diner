# 🍽️ The Digital Diner

A full-stack web application for a restaurant ordering system that allows users to browse menu items, add them to a cart, and place pickup orders. This project was built using the MERN stack with PostgreSQL.

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Database Design](#database-design)
- [API Documentation](#api-documentation)
- [Setup Instructions](#setup-instructions)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)

## ✨ Features

- **Menu Display**: Browse categorized menu items (Appetizers, Mains, Desserts, Drinks)
- **Shopping Cart**: Add items to cart, update quantities, remove items, and view total price
- **Order Placement**: Submit contact info along with cart items to place an order
- **Order Confirmation**: View order details after successful submission
- **Order History**: View past orders by entering phone number

## 🛠️ Tech Stack

### Frontend
- **React.js**: UI library for building component-based interfaces
- **React Router**: For client-side routing
- **Context API**: For state management (shopping cart)
- **Axios**: For API requests
- **React Toastify**: For notifications
- **CSS3**: For styling (responsive design)

### Backend
- **Node.js**: JavaScript runtime environment
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database for flexible data storage
- **PostgreSQL**: Relational database for structured data storage
- **Mongoose**: MongoDB ORM
- **Sequelize**: PostgreSQL ORM

## 💾 Database Design

This project uses a hybrid database approach, leveraging the strengths of both MongoDB and PostgreSQL:

### MongoDB
Used for storing **menu items** because:
- Menu items have a flexible schema with varying attributes by category
- Menu data primarily requires read operations with infrequent writes
- MongoDB's document model is well-suited for product catalogs
- Easy to update menu items without schema migrations

### PostgreSQL
Used for storing **order data** because:
- Orders have a well-defined structure with relationships
- Transactions are critical for order processing (maintaining data integrity)
- Order history requires relational queries based on customer information
- SQL's ACID compliance ensures order data is never corrupted

### Data Model Relationship
- Menu items are stored in MongoDB and referenced by ID in PostgreSQL order items
- When an order is placed, essential menu item details are denormalized into the order items table for historical accuracy (in case menu items change)

## 📝 API Documentation

### Menu Endpoints

#### `GET /api/menu`
- Description: Fetch all menu items
- Response: Array of menu items with categories
- Example Response:
  ```json
  {
    "success": true,
    "count": 12,
    "data": [
      {
        "_id": "6570a1b3e4b0912345678901",
        "name": "Classic Burger",
        "description": "Juicy beef patty with lettuce, tomato, and our special sauce",
        "price": 12.99,
        "category": "Mains",
        "image": "burger.jpg",
        "isAvailable": true
      },
      // more items...
    ]
  }
  ```

#### `GET /api/menu/:id`
- Description: Fetch a specific menu item by ID
- Response: Single menu item details
- Example Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "6570a1b3e4b0912345678901",
      "name": "Classic Burger",
      "description": "Juicy beef patty with lettuce, tomato, and our special sauce",
      "price": 12.99,
      "category": "Mains",
      "image": "burger.jpg",
      "isAvailable": true
    }
  }
  ```

#### `POST /api/menu` (Admin Only - Bonus)
- Description: Add a new menu item
- Request Body: Menu item details
- Example Request:
  ```json
  {
    "name": "Chocolate Cake",
    "description": "Rich chocolate cake with a molten center",
    "price": 7.99,
    "category": "Desserts",
    "image": "chocolate-cake.jpg"
  }
  ```

#### `PUT /api/menu/:id` (Admin Only - Bonus)
- Description: Update an existing menu item
- Request Body: Updated menu item details

### Order Endpoints

#### `POST /api/orders`
- Description: Create a new order
- Request Body: Order details with customer info and items
- Example Request:
  ```json
  {
    "customerName": "Jane Doe",
    "phoneNumber": "1234567890",
    "items": [
      {
        "menuItemId": "6570a1b3e4b0912345678901",
        "name": "Classic Burger",
        "price": 12.99,
        "quantity": 2
      },
      {
        "menuItemId": "6570a1b3e4b0912345678902",
        "name": "Fries",
        "price": 3.99,
        "quantity": 1
      }
    ]
  }
  ```
- Example Response:
  ```json
  {
    "success": true,
    "data": {
      "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "customerName": "Jane Doe",
      "phoneNumber": "1234567890",
      "totalAmount": 29.97,
      "status": "pending",
      "createdAt": "2023-04-30T18:22:10.123Z",
      "items": [
        {
          "id": "b50554d6-8720-4797-9523-108a42c02bed",
          "menuItemId": "6570a1b3e4b0912345678901",
          "name": "Classic Burger",
          "price": 12.99,
          "quantity": 2
        },
        {
          "id": "c105a1da-793b-4a20-8a4e-29d11d7163c3",
          "menuItemId": "6570a1b3e4b0912345678902",
          "name": "Fries",
          "price": 3.99,
          "quantity": 1
        }
      ]
    }
  }
  ```

#### `GET /api/orders/:phoneNumber`
- Description: Get order history for a specific phone number
- Response: Array of orders with items
- Example Response:
  ```json
  {
    "success": true,
    "count": 2,
    "data": [
      {
        "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        "customerName": "Jane Doe",
        "phoneNumber": "1234567890",
        "totalAmount": 29.97,
        "status": "pending",
        "createdAt": "2023-04-30T18:22:10.123Z",
        "OrderItems": [
          {
            "id": "b50554d6-8720-4797-9523-108a42c02bed",
            "menuItemId": "6570a1b3e4b0912345678901",
            "name": "Classic Burger",
            "price": 12.99,
            "quantity": 2
          },
          {
            "id": "c105a1da-793b-4a20-8a4e-29d11d7163c3",
            "menuItemId": "6570a1b3e4b0912345678902",
            "name": "Fries",
            "price": 3.99,
            "quantity": 1
          }
        ]
      },
      // more orders...
    ]
  }
  ```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14.0.0 or higher)
- MongoDB
- PostgreSQL
- npm or yarn

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/digital-diner.git
   cd digital-diner
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/digital-diner
   PG_HOST=localhost
   PG_USER=postgres
   PG_PASSWORD=yourpassword
   PG_DATABASE=digital_diner
   PG_PORT=5432
   ```

4. Set up PostgreSQL database:
   ```bash
   # Login to PostgreSQL CLI
   psql -U postgres
   
   # Create database
   CREATE DATABASE digital_diner;
   
   # Connect to the database
   \c digital_diner
   
   # Exit PostgreSQL CLI
   \q
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

2. Create a `.env` file in the frontend directory:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

4. The application should now be running at `http://localhost:3000`

## 🌐 Deployment

### Backend Deployment (Render, Heroku, Railway, etc.)
1. Create an account on your preferred hosting platform
2. Connect your GitHub repository
3. Configure environment variables
4. Deploy the backend

### Frontend Deployment (Netlify)
1. Create an account on Netlify
2. Connect your GitHub repository or upload your build folder
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
4. Configure environment variables
5. Deploy the frontend

### Netlify Frontend Link
[The Digital Diner](https://digital-diner.netlify.app)

## 🔮 Future Improvements

- **Authentication**: User accounts with login/registration
- **Payment Integration**: Online payment processing
- **Admin Dashboard**: Menu management interface
- **Order Notifications**: Real-time updates for order status
- **Reviews & Ratings**: Allow customers to rate menu items
- **Delivery Option**: Expand from pickup-only to delivery service

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- This project was created as part of an internship assessment task
- Images used are for demonstration purposes only