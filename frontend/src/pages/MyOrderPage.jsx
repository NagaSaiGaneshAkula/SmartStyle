import React, { useState, useEffect } from "react";
// import { myOrders } from "@/utils/mockdb.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../redux/slices/orderSlice";
//profile page info
const MyOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const handleRowClick = (id) => {
    navigate(`/order/${id}`);
  };
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 mx-auto max-w-7xl sm:p-6">
      <h2 className="mb-6 text-xl font-bold sm:text-2xl">My Orders</h2>
      <div className="overflow-hidden relative shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-4 py-2 sm:py-3">Image</th>
              <th className="px-4 py-2 sm:py-3">OrderID</th>
              <th className="px-4 py-2 sm:py-3">Created</th>
              <th className="px-4 py-2 sm:py-3">Shipping Address</th>
              <th className="px-4 py-2 sm:py-3">Items</th>
              <th className="px-4 py-2 sm:py-3">Price</th>
              <th className="px-4 py-2 sm:py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length >= 1 ? (
              orders.map((order, index) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="border-b cursor-pointer hover:border-gray-50">
                  {/* 1 td */}
                  <td className="px-2 py-2 sm:py-4 sm:px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="object-cover w-10 h-10 rounded-lg sm:w-12 sm:h-12"
                    />
                  </td>
                  {/* 2 */}
                  <td className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap sm:py-4 sm:px-4">
                    # {order._id}
                  </td>
                  {/* 3 */}
                  <td className="px-2 py-2 sm:py-4 sm:px-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                    {"  "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  {/* 4 */}
                  <td className="px-2 py-2 sm:py-4 sm:px-4">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city},${order.shippingAddress.country}`
                      : "N/A"}
                  </td>
                  {/* 5 */}
                  <td className="px-2 py-2 sm:py-4 sm:px-4">
                    {order.orderItems.length}
                  </td>
                  {/* 6 */}
                  <td className="px-2 py-2 sm:py-4 sm:px-4">
                    ${order.totalPrice.toFixed(2)}
                  </td>
                  {/* 7 */}
                  <td className="px-2 py-2 sm:py-4 sm:px-4">
                    <span
                      className={`${
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      } px-2 py-1 rounded-full text-xs sm:text-sm  font-medium`}>
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-4 text-center text-gray-500">
                  You have no orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrderPage;
