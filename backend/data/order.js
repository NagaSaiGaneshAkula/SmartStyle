import mongoose from "mongoose";

const orders = [
  {
    user: new mongoose.Types.ObjectId("689ffab224e31247036d02de"),
    orderItems: [
      {
        productId: new mongoose.Types.ObjectId(), // Replace with actual Product _id after seeding products
        name: "Camel Wool Long Coat",
        image: "https://res.cloudinary.com/dxkaeptrr/image/upload/v1755312691/hxce1bsobkz0lwd76dox.avif",
        price: 180,
        size: "M",
        color: "Camel Brown",
        quantity: 1,
      },
      {
        productId: new mongoose.Types.ObjectId(),
        name: "Denim Blue Jacket",
        image: "https://res.cloudinary.com/dxkaeptrr/image/upload/v1755312714/tnuqbghvh4y8gonamvjm.avif",
        price: 90,
        size: "L",
        color: "Blue",
        quantity: 2,
      },
    ],
    shippingAddress: {
      address: "1234 Elm Street",
      city: "New York",
      postalCode: "10001",
      country: "United States",
    },
    paymentMethod: "Credit Card",
    totalPrice: 360, // 180 + (90 * 2)
    isPaid: true,
    paidAt: new Date("2025-08-10"),
    isDelivered: false,
    paymentStatus: "Paid",
    status: "Processing",
  },
  {
    user: new mongoose.Types.ObjectId("689ffab224e31247036d02de"),
    orderItems: [
      {
        productId: new mongoose.Types.ObjectId(),
        name: "White Collared Sweatshirt",
        image: "https://res.cloudinary.com/dxkaeptrr/image/upload/v1755312775/qjvpbccyfipykxpgq6fz.avif",
        price: 65,
        size: "S",
        color: "White",
        quantity: 1,
      },
      {
        productId: new mongoose.Types.ObjectId(),
        name: "Brown Wool Long Coat",
        image: "https://res.cloudinary.com/dxkaeptrr/image/upload/v1755312814/mf8cevmcoqsabuxdlt1k.avif",
        price: 175,
        size: "L",
        color: "Brown",
        quantity: 1,
      },
    ],
    shippingAddress: {
      address: "5678 Oak Avenue",
      city: "Los Angeles",
      postalCode: "90001",
      country: "United States",
    },
    paymentMethod: "PayPal",
    totalPrice: 240, // 65 + 175
    isPaid: false,
    isDelivered: false,
    paymentStatus: "Pending",
    status: "Processing",
  },
  {
    user: new mongoose.Types.ObjectId("689ffab224e31247036d02de"),
    orderItems: [
      {
        productId: new mongoose.Types.ObjectId(),
        name: "Camel Wool Long Coat",
        image: "https://res.cloudinary.com/dxkaeptrr/image/upload/v1755312691/hxce1bsobkz0lwd76dox.avif",
        price: 180,
        size: "L",
        color: "Camel Brown",
        quantity: 1,
      },
    ],
    shippingAddress: {
      address: "910 Pine Street",
      city: "Chicago",
      postalCode: "60601",
      country: "United States",
    },
    paymentMethod: "Debit Card",
    totalPrice: 180,
    isPaid: true,
    paidAt: new Date("2025-08-05"),
    isDelivered: true,
    deliveredAt: new Date("2025-08-12"),
    paymentStatus: "Paid",
    status: "Delivered",
  },
];

export default orders;
