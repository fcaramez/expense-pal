import Link from "next/link";
import { FaRegUser, FaHome, FaSearch, FaDollarSign } from "react-icons/fa";

export const AppBar = () => {
  return (
    <footer className="bg-highlight absolute bottom-0 flex w-full items-center justify-between gap-6 rounded-t-2xl p-6">
      <Link href="/">
        <FaHome className="h-6 w-6 text-white" />
      </Link>
      <Link href="/search">
        <FaSearch className="h-6 w-6 text-white" />
      </Link>
      <Link href="/expenses">
        <FaDollarSign className="h-6 w-6 text-white" />
      </Link>
      <Link href="/dashboard">
        <FaRegUser className="h-6 w-6 text-white" />
      </Link>
    </footer>
  );
};
