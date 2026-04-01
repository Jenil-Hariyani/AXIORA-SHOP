import React from "react";

function Pagination({ page, setPage, totalPages }) {
  const getPages = (current, total) => {
    const pages = [];

    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 3) {
        pages.push(1, 2, 3, "...", total);
      } else if (current >= total - 2) {
        pages.push(1, "...", total - 2, total - 1, total);
      } else {
        pages.push(1, "...", current - 1, current, current + 1, "...", total);
      }
    }

    return pages;
  };

  const pages = getPages(page, totalPages);

  return (
    <div className="mt-4 flex justify-center items-center gap-2 flex-wrap">
      {/* Prev Button */}
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className={`px-3 py-1 rounded-md border transition-all duration-200 ${
          page === 1
            ? "bg-red-300 cursor-not-allowed"
            : "bg-red-500 text-white hover:bg-red-600 hover:scale-105"
        }`}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pages.map((item, index) => (
        <button
          key={index}
          disabled={item === "..."}
          onClick={() => typeof item === "number" && setPage(item)}
          className={`px-3 py-1 rounded-md border transition-all duration-200 ${
            item === page
              ? "bg-red-600 text-white font-bold scale-105"
              : item === "..."
                ? "cursor-default bg-white"
                : "bg-white hover:bg-red-200 hover:scale-105"
          }`}
        >
          {item}
        </button>
      ))}

      {/* Next Button */}
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className={`px-3 py-1 rounded-md border transition-all duration-200 ${
          page === totalPages
            ? "bg-red-300 cursor-not-allowed"
            : "bg-red-500 text-white hover:bg-red-600 hover:scale-105"
        }`}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
