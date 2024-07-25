"use client";
import React from "react";
import {
  FormatListBulleted,
  MenuBook,
  AddCircleOutline,
} from "@mui/icons-material";
import "./style.css";
import Link from "next/link";
import { useRouter } from "next/router";

function NavBar() {
  const { pathname } = useRouter();
  return (
    <div className="nav-bar h-screen border-solid shadow-lg">
      <div className="logo flex justify-center font-thin  mb-5">
        <p>Kafe</p>
      </div>
      <div className="space-y-4 block p-15 nav-navigator">
        <div className=" flex justify-center">
          <div
            className={`navigate-button rounded-full p-5 ${
              pathname == "/createorder" && "text-white bg-gray-600 opacity-100"
            }`}
          >
            <Link href={"/createorder"}>
              <AddCircleOutline className="cursor-pointer" />
            </Link>
          </div>
        </div>
        <div className=" flex justify-center">
          <div
            className={`navigate-button rounded-full p-5 ${
              pathname == "/menubook" && "text-white bg-gray-600 opacity-100"
            }`}
          >
            <Link href={"/menubook"}>
              <MenuBook className="cursor-pointer" onClick={() => {}} />
            </Link>
          </div>
        </div>
        <div className=" flex justify-center">
          <div
            className={`navigate-button rounded-full p-5 ${
              pathname == "/orders" && "text-white bg-gray-600 opacity-100"
            }`}
          >
            <Link href={"/orders"}>
              <FormatListBulleted className="cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
