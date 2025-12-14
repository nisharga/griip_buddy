"use client";
import React, { useState } from "react";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="flex flex-wrap items-center justify-center my-8 gap-2">
      <button
        disabled
        className="px-3 py-1 text-sm border border-gray-300 rounded bg-gray-100 text-gray-400 cursor-not-allowed"
      >
        Previous
      </button>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 text-sm rounded ${
              currentPage === page
                ? "bg-primary text-white"
                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}
        <span className="text-gray-500">...</span>
        {[8, 9, 10].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 text-sm rounded ${
              currentPage === page
                ? "bg-primary text-white"
                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      <button className="px-3 py-1 text-sm border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50">
        Next
      </button>
    </div>
  );
};

export default Pagination;
