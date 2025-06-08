import LoginPage from "@/components/Home/Login/LoginPage";
import Login from "@/components/Home/Login/LoginPage";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <LoginPage />
      <Link href="/registration">Registration</Link>
    </>
  );
}
