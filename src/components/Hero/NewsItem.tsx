import React, { memo } from "react";
import { Clock } from "lucide-react";

export interface NewsItem {
  id: number;
  title: string;
  category: "Blog" | "Review";
  timestamp: string;
  readTime: string;
}

interface NewsItemProps {
  news: NewsItem;
}

export const NewsItem: React.FC<NewsItemProps> = memo(({ news }) => {
  const categoryStyles =
    news.category === "Blog"
      ? "bg-purple-100 text-purple-700"
      : "bg-orange-100 text-orange-700";

  return (
    <div className="py-3 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50">
      <div className="flex items-start justify-between gap-3">
        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5">
            <Clock className="w-3 h-3" />
            <span className="font-medium">{news.timestamp}</span>
            <span className="text-gray-300">•</span>
            <span>{news.readTime}</span>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug tracking-tight">
            {news.title}
          </h3>
        </div>

        {/* Category Badge */}
        <span
          className={`px-2 py-0.5 text-[10px] font-semibold rounded-lg whitespace-nowrap mt-1 ${categoryStyles}`}
        >
          {news.category}
        </span>
      </div>
    </div>
  );
});
