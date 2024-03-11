import Image from "next/image";
import NavBar from "./NavBar";
import Head from "next/head";
import MenuBook from "./MenuBook";

export default function Home() {
  return (
    <div className="flex">
      <NavBar />
      <MenuBook/>
    </div>
  );
}
