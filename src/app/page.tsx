"use client";
import Image from "next/image";
import NavBar from "../components/NavBar";
import Head from "next/head";
import MenuBook from "../components/MenuBook";
import LoginModal from "./Modal/LoginModal";

export default function Home() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <LoginModal />
    </div>
  );
}
