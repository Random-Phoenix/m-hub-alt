import React, { memo, useMemo } from "react";
import { Newspaper, ExternalLink, Clock } from "lucide-react";
import type { NewsItem as NewsItemType } from "./NewsItem";

interface LatestNewsProps {
  news: NewsItemType[];
}

const NewsHeader = memo(() => (
  <div className="px-4 py-3 border-b border-gray-100">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Newspaper className="w-4 h-4 text-blue-600" />
        <h2 className="font-semibold text-gray-900 tracking-tight">
          Latest News
        </h2>
      </div>
      <a
        href="#"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold transition-colors"
      >
        View All
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  </div>
));

const NewsItem = memo(({ item }: { item: NewsItemType }) => (
  <div
    className="group py-3.5 px-4 hover:bg-gray-50/75 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0"
    style={{ contain: "content" }}
  >
    <div className="flex items-start gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5">
          <span
            className={`px-2 py-0.5 text-[10px] font-semibold rounded-lg whitespace-nowrap ${
              item.category === "Blog"
                ? "bg-purple-100 text-purple-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {item.category}
          </span>
          <div className="flex items-center gap-1 text-gray-400">
            <Clock className="w-3 h-3" />
            <span>{item.timestamp}</span>
          </div>
          <span className="text-gray-300">•</span>
          <span className="text-gray-400">{item.readTime}</span>
        </div>
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug tracking-tight group-hover:text-blue-600 transition-colors">
          {item.title}
        </h3>
      </div>
      <ExternalLink className="flex-shrink-0 w-4 h-4 mt-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-all group-hover:text-blue-600" />
    </div>
  </div>
));

export const LatestNews: React.FC<LatestNewsProps> = memo(({ news }) => {
  // Filter visible news items based on category constraints
  const visibleNews = useMemo(() => {
    const maxCounts = { Review: 3, Blog: 1 };
    const counts = { Review: 0, Blog: 0 };

    return news.filter((item) => {
      if (counts[item.category] < (maxCounts[item.category] || 0)) {
        counts[item.category]++;
        return true;
      }
      return false;
    });
  }, [news]);

  return (
    <div
      className="bg-white rounded-lg shadow-sm h-[40vh] flex flex-col font-display overflow-hidden border border-gray-100/75 hidden md:flex"
      style={{ contain: "content" }}
    >
      <NewsHeader />
      <div className="flex-1 overflow-y-auto custom-scrollbar overscroll-contain scroll-smooth">
        {visibleNews.map((item) => (
          <NewsItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
});