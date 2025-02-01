"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

function Shows() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMorePages, setHasMorePages] = useState(true);

  // Fetch TV shows based on current page
  useEffect(() => {
    const fetchShows = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.tvmaze.com/shows?page=${currentPage}`
        );
        if (!response.ok) throw new Error("Failed to fetch TV shows");
        const data = await response.json();

        setShows(data);
        setHasMorePages(data.length > 0); // If API returns empty data, no more pages
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [currentPage]);

  // Handlers for pagination
  const handleNextPage = () => {
    if (hasMorePages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="container mx-auto px-4 py-12 my-5">
      <h1 className="text-3xl font-bold text-center mb-8">TV Shows</h1>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 mb-8 space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          } transition-colors duration-300`}
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">
          Page {currentPage + 1}
        </span>
        <button
          onClick={handleNextPage}
          disabled={!hasMorePages}
          className={`px-4 py-2 rounded-lg ${
            !hasMorePages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          } transition-colors duration-300`}
        >
          Next
        </button>
      </div>
      {loading && <p className="text-center text-lg">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && shows.length > 0 && (
        <>
          {/* Shows Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {shows.map((show) => (
              <div
                key={show.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2"
              >
                {show.image && (
                  <div className="relative w-full h-60">
                    <Image
                      src={show.image.medium}
                      alt={show.name}
                      width={250}
                      height={250}
                      className="w-full h-full object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-4">
                  <Link href={`/shows/${show.id}`}>
                    <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                      {show.name}
                    </h2>
                  </Link>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Type:</span> {show.type}
                    </p>
                    <p>
                      <span className="font-medium">Language:</span>{" "}
                      {show.language}
                    </p>
                    <p>
                      <span className="font-medium">Genres:</span>{" "}
                      {show.genres.join(", ")}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span> {show.status}
                    </p>
                    <p>
                      <span className="font-medium">Rating:</span>{" "}
                      {show.rating.average ? show.rating.average : "N/A"}
                    </p>
                  </div>
                  <div className="mt-4">
                    <Link
                      href={`/shows/${show.id}`}
                      className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              } transition-colors duration-300`}
            >
              Previous
            </button>
            <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">
              Page {currentPage + 1}
            </span>
            <button
              onClick={handleNextPage}
              disabled={!hasMorePages}
              className={`px-4 py-2 rounded-lg ${
                !hasMorePages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              } transition-colors duration-300`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Shows;
