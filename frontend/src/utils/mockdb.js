
// new arrivals mock data
export const newProducts = [
  {
    _id: 1,
    name: "Stylish Jacket",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    _id: 2,
    name: "Stylish Jacket",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500?random=2",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    _id: 3,
    name: "Stylish Jacket",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500?random=3",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    _id: 4,
    name: "Stylish Jacket",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500?random=4",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    _id: 5,
    name: "Stylish Jacket",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500?random=5",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    _id: 6,
    name: "Stylish Jacket",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500?random=6",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    _id: 7,
    name: "Stylish Jacket",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500?random=8",
        altText: "Stylish Jacket",
      },
    ],
  },
];

// product details mock data
export const selectedProducts = {
  name: "Stylish Jacket",
  price: 120,
  originalPrice: 150,
  description: "This is a stylish jacket",
  brand: "Nike",
  material: "Cotton",
  sizes: ["S", "M", "L"],
  colors: ["Red", "Blue", "Green"],
  images: [
    {
      url: "https://picsum.photos/500/500?random=1",
      altText: "Stylish Jacket",
    },
    {
      url: "https://picsum.photos/500/500?random=2",
      altText: "Stylish Jacket",
    },
    {
      url: "https://picsum.photos/500/500?random=3",
      altText: "Stylish Jacket",
    },
  ],
};
// product details you may also likemock data
export const similarProducts = [
  {
    _id: 1,
    name: "Stylish Jacket1",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    _id: 2,
    name: "Stylish Jacket2",
    price: 140,
    images: [
      {
        url: "https://picsum.photos/500/500?random=2",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    _id: 3,
    name: "Stylish Jacket3",
    price: 130,
    images: [
      {
        url: "https://picsum.photos/500/500?random=3",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    _id: 4,
    name: "Stylish Jacket4",
    price: 160,
    images: [
      {
        url: "https://picsum.photos/500/500?random=4",
        altText: "Stylish Jacket",
      },
    ],
  },
];

// Top wear for women mock data
export const topWearsWomen = [
  {
    _id: 1,
    name: "Stylish Jacket1",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    _id: 2,
    name: "Stylish Jacket2",
    price: 140,
    images: [
      {
        url: "https://picsum.photos/500/500?random=2",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    _id: 3,
    name: "Stylish Jacket3",
    price: 130,
    images: [
      {
        url: "https://picsum.photos/500/500?random=3",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    _id: 4,
    name: "Stylish Jacket4",
    price: 160,
    images: [
      {
        url: "https://picsum.photos/500/500?random=4",
        altText: "Stylish Jacket",
      },
    ],
  },
];

// mock data for the myorderpage
export const myOrders = [
  {
    _id: 1,
    name: "Stylish Jacket1",
    createdAt: "2021-01-01",
    shippingAddress: {
      city: "New York",
      country: "USA",
    },
    orderItems: [
      {
        name: "Stylish Jacket",
        image: "https://picsum.photos/500/500?random=1",
      },
    ],
    totalPrice: 120,
    isPaid: true,
  },
  {
    _id: 2,
    name: "Stylish Jacket2",
    createdAt: "2021-02-01",
    shippingAddress: {
      city: "New York",
      country: "USA",
    },
    orderItems: [
      {
        name: "Stylish Jacket2",
        image: "https://picsum.photos/500/500?random=2",
      },
    ],
    totalPrice: 123,
    isPaid: false,
  },
];
// cartDrawer mock data
export const cartProducts = [
  {
    productId: 1,
    name: "T-shirt",
    size: "M",
    color: "Black",
    quantity: 1,
    price: 20,
    // random image from picsum.photos
    image: "https://picsum.photos/200?random=1",
  },
  {
    productId: 2,
    name: "Jeans",
    size: "S",
    color: "Blue",
    quantity: 13,
    price: 220,
    // random image from picsum.photos
    image: "https://picsum.photos/200?random=2",
  },
];

// checkout test
export const checkoutCart = {
  products: [
    {
      name: "stylish shirt",
      size: "M",
      color: "Black",
      price: 120,
      image: "https://picsum.photos/150?ranodm=1",
    },
    {
      name: "stylish shirt2",
      size: "XS",
      color: "Blue",
      price: 140,
      image: "https://picsum.photos/150?ranodm=2",
    },
  ],
  totalPrice: 260,
};

// order-confirmation
export const checkout = {
  _id: "12312",
  createdAt: "2021-01-01",
  checkoutItems: [
    {
      productId: 1,
      name: "T-shirt",
      size: "M",
      color: "Black",
      quantity: 1,
      price: 20,
      image: "https://picsum.photos/150?random=1",
    },
    {
      productId: 2,
      name: "T-shirt2",
      size: "S",
      color: "Blue",
      quantity: 2,
      price: 44,
      image: "https://picsum.photos/150?random=2",
    },
  ],
  shippingAddress: {
    address: "123 Main St",
    city: "New York",
    country: "USA",
  },
};

// orderDetails
export const mockOrderDetails = {
  _id: "12312",
  createdAt: "2021-01-01",
  isPaid: true,
  isDelevered: true,
  paymentMethod: "Paypal",
  shippingMethod: "Standard",
  shippingAddress: {
    address: "123 Main St",
    city: "New York",
    country: "USA",
  },
  orderItems: [
    {
      productId: 1,
      name: "T-shirt",
      size: "M",
      color: "Black",
      quantity: 1,
      price: 20,
      image: "https://picsum.photos/150?ranodm=1",
    },
    {
      productId: 2,
      name: "T-shirt",
      size: "S",
      color: "Blue",
      quantity: 1,
      price: 23,
      image: "https://picsum.photos/150?ranodm=2",
    },
  ],
};

// admin home page orders
export const AdminOrders = [
  {
    _id: 1,
    user: {
      name: "John Doe",
    },
    totalPrice: 200,
    status: "Pending",
  },
  {
    _id: 2,
    user: {
      name: "John Doe2",
    },
    totalPrice: 220,
    status: "Delivered",
  },
  {
    _id: 3,
    user: {
      name: "John Doe3",
    },
    totalPrice: 333,
    status: "Pending",
  },
];

// users in Admin
export const Users = [
  {
    name: "John Doe",
    email: "87319019@gmail.com",
    role: "admin",
    _id: 1,
  },
  {
    name: "John Doe2",
    email: "87319029@gmail.com",
    role: "customer",
    _id: 2,
  },
];

// products in Admin
export const Products = [
  {
    _id: 1,
    name: "Stylish Jacket",
    price: 120,
    sku: "123123",
  },
  {
    _id: 2,
    name: "Stylish Jacket2",
    price: 220,
    sku: "123122",
  },
];

// orders on admin page
export const AdminOrders2 = [
  {
    _id: 1,
    user: {
      name: "John Doe",
    },
    totalPrice: 200,
    status: "Shipped",
  },
];
