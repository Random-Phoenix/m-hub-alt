import React from "react";
import { useNavigate } from "react-router-dom";
import { Smartphone, ArrowUpRight, Heart } from "lucide-react";

export const DiscoverMore = () => {
  const navigate = useNavigate();

  return (
    <div className="relative mb-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative py-6 sm:py-8">
          {/* Content */}
          <div className="relative">
            <div className="max-w-2xl mx-auto px-4">
              <div className="flex items-center justify-center gap-2 sm:gap-4">
                <button
                  onClick={() => navigate("/mobile-phones")}
                  className="flex items-center gap-2 sm:gap-3 bg-blue-600 text-white px-4 sm:px-8 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl font-display font-semibold text-[13px] sm:text-[15px] active:scale-[0.98]"
                >
                  <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Browse All Devices</span>
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={() => navigate("/mobile-phones")}
                  className="flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl font-display font-semibold text-[13px] sm:text-[15px] text-gray-700 bg-white border border-gray-200 active:scale-[0.98]"
                >
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                  <span>View Favorites</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ads Section - Responsive height matching PhoneGrid ads */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 gap-3 md:gap-6">
          {[
            { icon: "blue", label: "Advertisement", provider: "Ads by Google" },
            { icon: "green", label: "Sponsored", provider: "Powered by AdSense" },
          ].map(({ icon, label, provider }) => (
            <div
              key={label}
              className="relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100"
            >
              <div className="absolute inset-0 bg-white/40" />
              <div className="relative p-4 flex flex-col h-40 sm:h-56 md:h-[280px]">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded ${
                      icon === "blue" ? "bg-blue-500" : "bg-green-500"
                    }`}
                  />
                  <span className="text-[10px] sm:text-xs text-gray-400">{label}</span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="space-y-2 w-full max-w-[280px]">
                    <div className="h-2 sm:h-3 bg-gray-200 rounded-full w-3/4" />
                    <div className="h-2 sm:h-3 bg-gray-200 rounded-full w-1/2" />
                    <div className="h-1.5 sm:h-2 bg-gray-100 rounded-full w-2/3" />
                  </div>
                </div>
                <div className="mt-auto">
                  <div className="flex items-center justify-between">
                    <div className="text-[9px] sm:text-[10px] text-gray-400">{provider}</div>
                    <div className="flex items-center gap-1">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gray-200" />
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gray-200" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};