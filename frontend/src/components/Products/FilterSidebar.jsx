
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  categories,
  genders,
  colors,
  sizes,
  materials,
  brands,
} from "@/utils/staticData.js";
const FilterSidebar = () => {
  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
    setFilter({ ...filter, maxPrice: newPrice });
    updateURLParams(filter);
  };

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });
  const [priceRange, setPriceRange] = useState([0, 100]);

  
  const handleFilterChange = (e) => {
    
    const { name, value, checked, type } = e.target;
    

    let newFilter = { ...filter };
    
    if (type === "checkbox") {
      if (checked) {
        newFilter[name] = [...newFilter[name], value];
      } else {
        
        newFilter[name] = newFilter[name].filter((item) => item !== value);
      }
    } 
    else {
      newFilter[name] = value;
    }
    
    setFilter(newFilter);
    updateURLParams(newFilter);
  };

  
  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    
    Object.keys(newFilters).forEach((key) => {
      
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        
        params.append(key, newFilters[key].join(","));
      } else {
        params.append(key, newFilters[key]);
      }
    });
    
    setSearchParams(params);

    console.log(params);
    
    
    
    http: navigate(`?${params.toString()}`);
  };
  
  useEffect(() => {
    
    
    const params = Object.fromEntries([...searchParams]);
    setFilter({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });
    setPriceRange([0, params.maxPrice || 100]);
  }, [searchParams]);
  return (
    <div className="p-4">
      <h3 className="mb-4 text-xl font-medium text-gray-800">Filter</h3>

      {/* Category filter */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-600">Category</label>
        {categories.map((category, index) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              checked={filter.category === category}
              value={category}
              onChange={handleFilterChange}
              className="mr-2 w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-400"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* gender filter */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-600">Gender</label>
        {genders.map((gender, index) => (
          <div key={gender} className="flex items-center mb-1">
            <input
              type="radio"
              checked={filter.gender === gender}
              name="gender"
              value={gender}
              onChange={handleFilterChange}
              className="mr-2 w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-400"
            />
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>

      {/* colors filter */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-600">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color, index) => (
            <button
              key={color}
              type="button"
              name="color"
              value={color}
              onClick={handleFilterChange}
              
              className={`w-8 h-8 rounded-full transition cursor-pointer hover:scale-105 border border-gray-300 ${
                filter.color === color ? "ring-2 ring-blue-500" : ""
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            />
          ))}
        </div>
      </div>

      {/* Size filter */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-600">Size</label>
        {sizes.map((size, index) => (
          <div className="flex items-center mb-1" key={size}>
            <input
              type="checkbox"
              checked={filter.size.includes(size)}
              name="size"
              value={size}
              onChange={handleFilterChange}
              className="mr-2 w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-400"
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>

      {/* Material filter */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-600">Material</label>
        {materials.map((material, index) => (
          <div className="flex items-center mb-1" key={material}>
            <input
              type="checkbox"
              checked={filter.material.includes(material)}
              name="material"
              value={material}
              onChange={handleFilterChange}
              className="mr-2 w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-400"
            />
            <span className="text-gray-700">{material}</span>
          </div>
        ))}
      </div>

      {/* Brand filter */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-600">Brand</label>
        {brands.map((brand, index) => (
          <div className="flex items-center mb-1" key={brand}>
            <input
              type="checkbox"
              checked={filter.brand.includes(brand)}
              name="brand"
              value={brand}
              onChange={handleFilterChange}
              className="mr-2 w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-400"
            />
            <span className="text-gray-700">{brand}</span>
          </div>
        ))}
      </div>

      {/* Price Range filter */}
      <div className="mb-8">
        <label className="block mb-2 font-medium text-gray-600">
          Price Range
        </label>
        <input
          type="range"
          name="priceRange"
          
          value={priceRange[1]}
          onChange={handlePriceChange}
          min={0}
          max={100}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between mt-2 text-gray-600">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
