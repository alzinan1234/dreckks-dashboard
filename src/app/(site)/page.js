import Login from "@/components/Home/Login/Login";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Login />
      <Link href="/registration">Registration</Link>
    </>
  );
}
