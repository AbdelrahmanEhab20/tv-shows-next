"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Loading from "../loading"; // Import the Loading component
import Error from "../error"; // Import the Error component

function ShowDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        if (!response.ok) throw new Error("Failed to fetch show details");
        const data = await response.json();
        setShow(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, [id]);

  if (loading) return <Loading />; // Use Loading component
  if (error) return <Error message={error} />; // Use Error component
  if (!show) return null;

  return (
    <div className="container mx-auto px-6 py-12 mt-10">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {show.image && (
          <div className="w-full md:w-1/3">
            <Image
              src={show.image.original}
              alt={show.name}
              width={500}
              height={750}
              className="rounded-lg shadow-lg"
            />
          </div>
        )}
        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{show.name}</h1>
          <p
            className="text-gray-600 text-lg"
            dangerouslySetInnerHTML={{ __html: show.summary }}
          ></p>
          <ul className="mt-4 text-gray-700">
            <li>
              <strong>Genres:</strong> {show.genres.join(", ")}
            </li>
            <li>
              <strong>Language:</strong> {show.language}
            </li>
            <li>
              <strong>Status:</strong> {show.status}
            </li>
            <li>
              <strong>Premiered:</strong> {show.premiered}
            </li>
            {show.ended && (
              <li>
                <strong>Ended:</strong> {show.ended}
              </li>
            )}
            <li>
              <strong>Rating:</strong> {show.rating.average || "N/A"}
            </li>
            {show.network && (
              <li>
                <strong>Network:</strong> {show.network.name}
              </li>
            )}
          </ul>
          <Link href="/shows">
            <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Back to Shows
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ShowDetails;
