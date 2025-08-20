# SmartStyle E-Commerce

**SmartStyle E-Commerce** is a complete full-stack e-commerce platform built to deliver a smooth, secure, and modern online shopping experience.  
The **React + TypeScript** frontend provides a responsive, user-friendly interface for browsing products, managing carts, and making payments via **PayPal**.  
On the backend, **Express.js** powers a robust API integrated with **MongoDB** for data storage and **Cloudinary** for seamless image handling.  

This project is designed with **scalability**, **performance**, and **developer-friendliness** in mind — making it perfect for businesses and developers alike.

---

## 🚀 Features

- **Dynamic Product Catalog** – Browse products with search, category filters, and sorting options.
- **Shopping Cart Management** – Real-time cart updates using **Redux Toolkit**.
- **User Authentication** – Secure signup/login with **JWT** and **hashed passwords**.
- **Payment Integration** – Fast and safe transactions through **PayPal SDK**.
- **Image Upload & Management** – Store and manage product images with **Cloudinary**.
- **Admin Dashboard** – Manage products, users, and orders with an intuitive UI.
- **Responsive Design** – Optimized for desktops, tablets, and mobile devices.
- **Interactive Notifications** – Lightweight toast notifications for better UX.

---

## 🛠️ Technologies Used

### **Frontend**
- **Framework**: React + TypeScript  
- **State Management**: Redux Toolkit, React Redux  
- **Routing**: React Router  
- **Styling**: Tailwind CSS  
- **Payment Gateway**: PayPal SDK  
- **API Communication**: Axios  
- **Icons**: React Icons  
- **Notifications**: Sonner  
- **Build Tool**: Vite  
- **Code Quality**: ESLint, Prettier  

### **Backend**
- **Framework**: Express.js  
- **Database**: MongoDB + Mongoose  
- **Authentication**: JWT & Bcrypt  
- **File Uploads**: Multer + Cloudinary  
- **Environment Management**: Dotenv  
- **CORS Handling**: Enabled for frontend-backend communication  
- **Development Tools**: Nodemon, TypeScript  

### **Deployment**
- **Frontend**: Vercel / Netlify  
- **Backend**: AWS EC2 / Heroku / Render  

---

## ⚡ Installation Guide

### **Prerequisites**
Before setting up, ensure you have:
- **Node.js** (v16 or higher)
- **MongoDB** (local setup or MongoDB Atlas)
- **PayPal Developer Account** (to generate API credentials)
- **Cloudinary Account** (for managing product images)
- **Git** (to clone the repository)

---

### **Setup Steps**

#### 1. Clone the repository
```bash
git clone https://github.com/NagaSaiGaneshAkula/SmartStyle.git

#### 2. Install frontend dependencies
cd frontend
npm install

#### 3. Install backend dependencies
cd ../backend
npm install

#### 4. Configure environment variables

Inside the backend folder, create a .env file and add the following:

MONGODB_URI=mongodb://localhost:27017/ecommerce-SmartStyle
PORT=5000
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

#### 5. Seed sample data (Optional)
cd backend
npm run seed

#### 6. Start the backend server
npm run dev

#### 7. Start the frontend development server
cd ../frontend
npm run dev

#### 8. Access the application

Frontend → http://localhost:3000

Backend API → http://localhost:5000

Admin Dashboard → http://localhost:3000/admin

Usage
For Customers

Browse products, filter categories, and add items to the cart.

Create an account or log in to manage your orders.

Checkout securely using PayPal.

For Admins

Access the /admin panel to:

Manage product inventory.

Upload product images via Cloudinary.

View and process customer orders.

#### Configuration

Database → Update MONGODB_URI inside backend/.env to connect with your database.

PayPal → Set your PAYPAL_CLIENT_ID for sandbox/live payment transactions.

Cloudinary → Add your Cloudinary credentials in .env to enable image uploads.

Frontend API URL → Update the API base URL inside frontend/src if the backend runs on a different port.