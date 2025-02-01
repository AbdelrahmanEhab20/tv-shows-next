import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-black bg-opacity-75 text-white w-full z-50 fixed top-0 p-2 text-lg">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-lg font-semibold">
          TV Show Central
        </Link>
        <ul className="flex items-center space-x-4">
          <li className="hover:text-blue-500 transition-colors">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-blue-500 transition-colors">
            <Link href="/shows">Shows</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
