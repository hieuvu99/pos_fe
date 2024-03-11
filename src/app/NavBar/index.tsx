import React from "react";
import {
  FormatListBulleted,
  MenuBook,
  AddCircleOutline,
} from "@mui/icons-material";
import "./style.css";
function NavBar() {
  return (
    <div className="nav-bar h-screen border-solid shadow-lg">
      <div className="logo flex justify-center font-thin  mb-5">
        <p>Kafe</p>
      </div>
      <div className="space-y-4 block p-15 nav-navigator">
        <div className=" flex justify-center">
          <div className="navigate-button rounded-full p-5 hover:text-white hover:bg-gray-600 hover:opacity-100">
            <AddCircleOutline />
          </div>
        </div>
        <div className=" flex justify-center">
          <div className="navigate-button rounded-full p-5 hover:text-white hover:bg-gray-600 hover:opacity-100">
            <MenuBook />
          </div>
        </div>
        <div className=" flex justify-center">
          <div className="navigate-button rounded-full p-5 hover:text-white hover:bg-gray-600 hover:opacity-100">
          <FormatListBulleted />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
