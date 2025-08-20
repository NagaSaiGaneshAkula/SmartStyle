
import React, { useEffect, useState } from "react";
import Hero from "@/components/Layout/Hero";
import GenderCollectionSection from "@/components/Products/GenderCollectionSection";
import NewArrivals from "@/components/Products/NewArrivals";
import ProductDetails from "@/components/Products/ProductDetails";
import ProductGrid from "@/components/Products/ProductGrid";

import FeatureCollection from "@/components/Products/FeatureCollection";
import FeatureSection from "@/components/Products/FeatureSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productSlice";
import axios from "axios";
const Home = () => {
  const dispatch = useDispatch();
  const [bestSellerProducts, setBestSellerProducts] = useState(null);
  
  
  const { products, loading, error } = useSelector((state) => state.products);
  useEffect(() => {
    
    dispatch(
      
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      }),
    );
    
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`,
        );
        
        setBestSellerProducts(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBestSeller();
    
  }, [dispatch]);

  return (
    <>
      <div>
        <Hero />
        <GenderCollectionSection />
        <NewArrivals />

        {/* best seller */}

        <h2 className="mb-4 text-3xl font-bold text-center">Best Seller</h2>
        {bestSellerProducts ? (
          <ProductDetails productId={bestSellerProducts._id} />
        ) : (
          <p className="text-center">Loading best seller products...</p>
        )}

        {/*   Top Wears for Women */}
        <div className="container mx-auto">
          <h2 className="mb-4 text-3xl font-bold text-center">
            Top Wears for Women
          </h2>
          <ProductGrid products={products} loading={loading} error={error} />
        </div>

        {/*  FeatureCollection*/}
        <FeatureCollection />

        {/* features section */}
        <FeatureSection />
      </div>
    </>
  );
};

export default Home;
