'use client'
import React from "react";
import {
  FormatListBulleted,
  MenuBook,
  AddCircleOutline,
} from "@mui/icons-material";
import "./style.css";
import Link from "next/link";
function NavBar() {
  return (
    <div className="nav-bar h-screen border-solid shadow-lg">
      <div className="logo flex justify-center font-thin  mb-5">
        <p>Kafe</p>
      </div>
      <div className="space-y-4 block p-15 nav-navigator">
        <div className=" flex justify-center">
          <div className="navigate-button rounded-full p-5 hover:text-white hover:bg-gray-600 hover:opacity-100">
            <Link href={"/order"}>
              <AddCircleOutline className="cursor-pointer" />
            </Link>
          </div>
        </div>
        <div className=" flex justify-center">
          <div className="navigate-button rounded-full p-5 hover:text-white hover:bg-gray-600 hover:opacity-100">
            <Link href={"/menubook"}>
              <MenuBook className="cursor-pointer" onClick={() => {}} />
            </Link>
          </div>
        </div>
        <div className=" flex justify-center">
          <div className="navigate-button rounded-full p-5 hover:text-white hover:bg-gray-600 hover:opacity-100">
            <FormatListBulleted className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
