
import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";
import { IoLogoWechat } from "react-icons/io5";
const Topbar = () => {
  return (
    <>
      <div className="text-white bg-e-red">
        <div className="container flex justify-between items-center px-4 py-3 mx-auto">
          {/* clickable icons and routes */}
          
          <div className="hidden items-center space-x-4 md:flex">
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300">
              <TbBrandMeta className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300">
              {/* Instagram logo。 */}
              <IoLogoInstagram className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300">
              {/* Twitter  logo。 */}
              <FaTwitter className="w-4 h-4" />
            </a>
          </div>
          <div className="flex-grow text-sm text-center">
            <span>We Ship worldwide - Fast and Reliable Shipping!</span>
          </div>
          <div className="hidden text-sm md:block">
            {/* face time */}
            <a href="tel:+123456789" className="hover:text-blue-300">
              +(61)123-456-789
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
