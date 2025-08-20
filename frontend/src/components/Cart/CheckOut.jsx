
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import PayPalButton from "../../components/Cart/PayPalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import axios from "axios";

const CheckOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const [shippingFee, setShippingFee] = useState(0);
  const [checkoutId, setCheckoutId] = useState(null);
  const { user, guestId } = useSelector((state) => state.auth);

  
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: " ",
  });

  
  useEffect(() => {
    
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCheckOut = async (e) => {
    e.preventDefault();

    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "paypal",
          totalPrice: cart.totalPrice + shippingFee,
          userId: user ? user.id : null,
          guestId,  // include this
        }),
      );

      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id);
      } else {
        console.log("Checkout creation failed:", res.payload);
      }

    }
  };


  
  useEffect(() => {
    if (cart.totalPrice > 100) {
      setShippingFee(0);
    } else {
      setShippingFee(10);
    }
  });
  const handlePaymentSuccess = async (details) => {
    
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );

      await handleFinalizeCheckout(checkoutId);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/checkout/${checkoutId}/finalize`,
        
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );

      navigate("/order-confirmation");
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!cart || !cart.products || cart.products.length === 0) {
    return <div>Your Cart is Empty.</div>;
  }
  return (
    <div className="grid grid-cols-1 gap-2 px-6 py-10 mx-auto max-w-7xl tracking-tighter lg:grid-cols-2">
      <div className="p-6 bg-white rounded-lg">
        <h2 className="mb-6 text-2xl uppercase">CheckOut</h2>
        <form onSubmit={handleCheckOut}>
          <h3 className="mb-4 text-lg">Contact Details</h3>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="text"
              className="p-2 w-full rounded border cursor-not-allowed"
              value={user ? user.email : ""}
              disabled
            />
          </div>

          {/* delivery name */}
          <h3 className="mb-4 text-lg">Delivery Information</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                required
                className="p-2 w-full rounded border"
              />
            </div>

            {/* last name */}
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                required
                className="p-2 w-full rounded border"
              />
            </div>
          </div>

          {/*address  */}
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              required
              className="p-2 w-full rounded border"
            />
          </div>

          {/* specific address */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                required
                className="p-2 w-full rounded border"
              />
            </div>

            {/* postal code */}
            <div>
              <label className="block text-gray-700">Post Code</label>
              <input
                type="text"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                required
                className="p-2 w-full rounded border"
              />
            </div>
          </div>

          {/* country */}
          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              required
              className="p-2 w-full rounded border"
            />
          </div>

          {/* phone */}
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              required
              className="p-2 w-full rounded border"
            />
          </div>

          <div className="mt-6">
            {!checkoutId ? (
              <button
                className="py-3 w-full text-white bg-black rounded"
                type="submit">
                Continue to CheckOut
              </button>
            ) : (
              <div>
                <h3 className="mb-4 text-lg">Pay with PayPal</h3>
                <PayPalButton
                  amount={cart.totalPrice + shippingFee}
                  onSuccess={handlePaymentSuccess}
                  onError={(err) => {
                    alert("Payment failed! Please try again.");
                  }}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* right section    Order Summary*/}
      <div className="p-6 bg-gray-50 rounded-lg">
        <h3 className="mb-4 text-lg">Order Summary</h3>
        <div className="py-4 mb-4 border-t">
          {cart.products.map((product, index) => (
            <div
              key={index}
              className="flex justify-between items-start py-2 border-b">
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover mr-4 w-20 h-24"
                />
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-500">Color: {product.color}</p>
                </div>
              </div>
              <p className="text-xl"> ${product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* Subtotal */}
        <div className="flex justify-between items-center mb-4 text-lg">
          <p>Subtotal</p>
          <p>${cart.totalPrice.toLocaleString()}</p>
        </div>

        {/* shipping */}
        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>

          <p>
            {shippingFee === 0 ? "Free" : `$${shippingFee.toLocaleString()}`}
          </p>
        </div>
        <div className="flex justify-end text-xs text-gray-500">
          Free Shipping Over $100
        </div>
        <div className="flex justify-between items-center pt-4 mb-4 text-lg border-top">
          <p>Total</p>
          <p>${(cart.totalPrice + shippingFee).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
