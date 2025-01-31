import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Grid2X2 } from "lucide-react";

export const DiscoverMore = () => {
  const navigate = useNavigate();

  return (
    <div className="relative mb-8">
      <div className="max-w-7xl mx-auto">
        {/* Content */}
        <div className="max-w-2xl mx-auto px-4 my-4">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <button
              onClick={() => navigate("/favorites")}
              className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 rounded-xl font-display font-semibold text-[13px] sm:text-[15px] text-gray-700 bg-white border border-gray-200"
            >
              <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-red-500" />
              <span>View Favorites</span>
            </button>

            <button
              onClick={() => navigate("/mobile-phones")}
              className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 rounded-xl bg-blue-600 text-white font-display font-semibold text-[13px] sm:text-[15px]"
            >
              <Grid2X2 className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              <span>View All Devices</span>
            </button>
          </div>
        </div>

        {/* Ads Section */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-3 md:gap-6">
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100">
              <img 
                src="https://www.canny-creative.com/wp-content/uploads/2020/07/greatestprintads_cocacola.jpg"
                alt="Coca Cola Advertisement"
                className="w-full h-full object-cover h-40 sm:h-56 md:h-[280px]"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100">
              <img 
                src="https://cdn.i.haymarketmedia.asia/?n=campaign-asia%2fcontent%2fKFC+OOH+1+HotSpicyCOB+land.jpg&c=0"
                alt="KFC Advertisement"
                className="w-full h-full object-cover h-40 sm:h-56 md:h-[280px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};