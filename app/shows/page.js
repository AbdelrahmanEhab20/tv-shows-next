"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Loading from "./loading";
import Error from "./error";

function Shows() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredShows, setFilteredShows] = useState([]);

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
        setFilteredShows(data);
        setHasMorePages(data.length > 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [currentPage]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const filtered = shows.filter((show) =>
        show.name.toLowerCase().includes(query)
      );
      setFilteredShows(filtered);
    } else {
      setFilteredShows(shows);
    }
  };

  const handleNextPage = () => {
    if (hasMorePages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage((prevPage) => prevPage - 1);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="container mx-auto px-4 py-12 my-5">
      <h1 className="text-3xl font-bold text-center mb-8">TV Shows</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search TV Shows..."
          className="px-4 py-2 border border-gray-300 rounded-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 mb-8 space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
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
          }`}
        >
          Next
        </button>
      </div>

      {/* Shows Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredShows.map((show) => (
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
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
            )}
            <div className="p-4">
              <Link href={`/shows/${show.id}`}>
                <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600">
                  {show.name}
                </h2>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 mb-8 space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
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
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Shows;
