
import React from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProductsByFilters } from "../../redux/slices/productSlice";
import { setFilters } from "../../redux/slices/productSlice";
const Searchbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [searchTerms, setSearchTerms] = React.useState("");
  
  const [isOpen, setIsOpen] = React.useState(false);

  
  const handleSearch = (e) => {
    e.preventDefault();
    

    dispatch(setFilters({ search: searchTerms }));
    dispatch(fetchProductsByFilters({ search: searchTerms }));
    

    navigate(`/collections/all?search=${searchTerms}`);
    
    setIsOpen(false);
    setSearchTerms("");
  };

  

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div
        className={`flex justify-center items-center w-full transition-all duration-300 ${
          isOpen
            ? "absolute top-0 -left-4 w-full bg-white  h-24 z-10"
            : "w-auto"
        }`}>
        {isOpen ? (
          <form
            onSubmit={handleSearch}
            className="flex relative justify-center items-center w-full">
            <div className="relative w-1/2">
              <input
                type="text"
                onChange={(e) => setSearchTerms(e.target.value)}
                placeholder=" Search..."
                value={searchTerms}
                
                className="px-4 py-2 pr-12 pl-2 w-full bg-gray-100 rounded-full focus:outline-none placeholder:text-gray-700"
              />
              {/* search icon */}
              <button
                type="submit"
                className="absolute right-2 top-1/2 text-gray-600 transform -translate-y-1/2 hover:text-gray-700">
                <HiMagnifyingGlass className="w-6 h-6 text-gray-700 hover:text-gray-800"></HiMagnifyingGlass>
              </button>
            </div>
            {/* close button */}
            <button
              className="absolute right-1 top-1/3 text-gray-600 transform -translate-x-1/2 hover:text-gray-800"
              onClick={handleSearchToggle}>
              <HiMiniXMark></HiMiniXMark>
            </button>
          </form>
        ) : (
          <button
            className="relative hover:text-black"
            onClick={handleSearchToggle}>
            <HiMagnifyingGlass className="w-6 h-6 text-gray-700 hover:text-gray-800"></HiMagnifyingGlass>
          </button>
        )}
      </div>
    </>
  );
};

export default Searchbar;
