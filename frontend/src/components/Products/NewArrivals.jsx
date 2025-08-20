import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from "axios";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );

        console.log("Fetched new arrivals:", response.data);

        if (Array.isArray(response.data)) {
          setNewProducts(response.data);
        } else if (Array.isArray(response.data.products)) {
          setNewProducts(response.data.products);
        } else if (Array.isArray(response.data.newArrivals)) {
          setNewProducts(response.data.newArrivals);
        } else {
          console.error("Unexpected API response format");
          setNewProducts([]);
        }
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
        setNewProducts([]);
      }
    };
    fetchNewArrivals();
  }, []);

  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -350 : 350;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const updateScrollButtons = () => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      setCanScrollLeft(scrollContainer.scrollLeft > 0);
      setCanScrollRight(
        scrollContainer.scrollWidth >
          scrollContainer.scrollLeft + scrollContainer.clientWidth + 100
      );
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => {
        scrollContainer.removeEventListener("scroll", updateScrollButtons);
      };
    }
  }, [newProducts]);

  const handleMouseDown = (e) => {
    const scrollContainer = scrollRef.current;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollContainer.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <section className="px-4 py-16 lg:px-0">
      {/* top section */}
      <div className="container relative mx-auto mt-10 text-center">
        <h2 className="mb-4 text-3xl font-bold">Explore New Arrivals</h2>
        <p className="mb-8 text-lg text-gray-600">
          Discover our latest collection of stylish and trendy products. Shop
          now and experience the perfect blend of fashion and comfort.
        </p>

        {/* scroll button */}
        <div className="flex absolute right-0 bottom-[-20px] space-x-2">
          <button
            disabled={!canScrollLeft}
            onClick={() => scroll("left")}
            className={`p-2 rounded border ${
              canScrollLeft
                ? "text-black bg-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            disabled={!canScrollRight}
            onClick={() => scroll("right")}
            className={`p-2 rounded border ${
              canScrollRight
                ? "text-black bg-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* scroll contents */}
      <div
        ref={scrollRef}
        className={`${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        } container flex overflow-x-scroll relative mx-auto space-x-6`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {Array.isArray(newProducts) &&
          newProducts.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative block"
            >
              <img
                src={product.images?.[0]?.url}
                alt={product.images?.[0]?.altText || product.name}
                className="w-full h-[500px] object-cover rounded-lg"
                draggable={false}
              />
              <div className="absolute right-0 bottom-0 left-0 p-4 text-white bg-opacity-50 rounded-b-lg backdrop-blur-md">
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">$ {product.price} </p>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default NewArrivals;
