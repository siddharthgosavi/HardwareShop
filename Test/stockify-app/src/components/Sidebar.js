"use client";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unHide, setUnHide] = useState("hidden");

  const toggleSidebar = () => {
    console.log("Toggling sidebar");
    setIsOpen(!isOpen);
    setUnHide(isOpen ? "hidden" : "");
  };

  return (
    <div>
      <button className="bg-gray-900 text-white border-none p-4 cursor-pointer absolute top-5 left-5 z-10" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div className={`fixed h-screen bg-gray-900 text-white transition-all duration-300 ${unHide}`}>
        <ul className="list-none p-0 mt-20">
          <li className="p-4">
            <Link href="/dashboard">
              <span className="text-white">Dashboard</span>
            </Link>
          </li>
          <li className="p-4">
            <Link href="/inventory">
              <span className="text-white">Inventory</span>
            </Link>
          </li>
          <li className="p-4">
            <Link href="/reports">
              <span className="text-white">Reports</span>
            </Link>
          </li>
          <li className="p-4">
            <Link href="/settings">
              <span className="text-white">Settings</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
