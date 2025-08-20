
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addUser,
  updateUser,
  deleteUser,
  fetchUsers,
} from "../../redux/slices/adminSlice";

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", 
  });
  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [navigate, user, dispatch]);
  useEffect(() => {
    if (user && user.role === "admin") {
      dispatch(fetchUsers());
    }
  }, [dispatch, user, users]);
  const handleDeleteUser = (userId) => {
    
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };
  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUser({ id: userId, role: newRole }));
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(addUser(formData));
    
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer", 
    });
  };
  {
    loading && <p>Loading...</p>;
  }
  {
    error && <p>Error: {error}</p>;
  }
  return (
    <div className="p-6 mx-auto max-w-7xl">
      <h2 className="mb-4 text-2xl font-bold">User Management</h2>

      {/* add new user Form */}
      <div className="p-6 mb-6 rounded-lg">
        <h3 className="mb-4 text-lg font-bold">Add New User</h3>
        <form onSubmit={handleSubmit}>
          {/* name */}
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text "
              className="p-2 w-full rounded border"
              required
              name="name"
              value={formData.name}
              onChange={handleChange}></input>
          </div>
          {/* email */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email "
              className="p-2 w-full rounded border"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}></input>
          </div>

          {/* password */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password "
              className="p-2 w-full rounded border"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}></input>
          </div>

          {/* role */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="p-2 w-full rounded border">
              <option className="" value="customer">
                Customer
              </option>
              <option className="" value="admin">
                Admin
              </option>
            </select>
          </div>

          {/* button */}
          <button
            type="submit"
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
            Add User
          </button>
        </form>
      </div>

      {/* User List */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-lefttext-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user?._id}
                className="text-center border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                  {user?.name}
                </td>
                <td className="p-4">{user?.email}</td>

                <td className="p-4">
                  <select
                    value={user?.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="p-2 rounded border">
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
