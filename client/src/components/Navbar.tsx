"use client";

import { useState } from "react";
import { FaHome, FaInfoCircle, FaUser } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { VscVmActive } from "react-icons/vsc";
import { MdLogin } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../app/store/store";
import { logoutUser } from "@/services/Userservices";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store/store";
import { useRouter } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = useSelector((state: RootState) => state.user.user);

  const navItems = [
    { href: "/", label: "Home", icon: <FaHome />, position: "L" },
    { href: "/about", label: "About", icon: <FaInfoCircle />, position: "L" },
    { href: "/porfile", label: "Porfile",icon: <FaInfoCircle />, position: user==="Invited" ? "-" : "L",},
    { href: user==="Invited" ? "/login" : "/porfile", label: user==="Invited" ? "Login" : user ,icon: user==="Invited" ? <MdLogin /> : <VscVmActive /> , position: "R",},
    { href: "/signup", label: "Register", icon: <FaUser />, position: user==="Invited" ? "R" : "-" ,},
  ];

  const leftItems = navItems.filter((item) => item.position === "L");
  const rightItems = navItems.filter((item) => item.position === "R");

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = async () => {
    const res = await logoutUser(dispatch);
    if (res) router.push("/"); // redirige después del login
  };

  return (
    <>
      {/* 🧭 NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0f1a] text-white px-6 flex items-center shadow-md">
        {/* Izquierda */}

        <Link href="/">
          <div className="relative h-15 w-44 rounded-2xl overflow-hidden m-2 mr-4">
            <Image
              src="/Mundo_Nova_Solutions.png"
              alt="Logo"
              fill
              className="object-cover rounded-2xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 10vw, 44vw"
              priority
            />
          </div>
        </Link>

        <div className="hidden md:flex gap-6">
          {leftItems.map(({ href, label, icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200
                  ${isActive ? "bg-[#15508b]" : "hover:bg-[#1c2735]"}
                `}
              >
                {icon}
                <span>{label}</span>
              </Link>
            );
          })}
        </div>

        {/* Hamburguesa */}
        <button
          className="ml-auto md:hidden px-3 py-2 rounded-md hover:bg-[#1c2735]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Derecha en desktop */}
        <div className="ml-auto gap-6 hidden md:flex">
          {rightItems.map(({ href, label, icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200
                  ${isActive ? "bg-[#15508b]" : "hover:bg-[#1c2735]"}
                `}
              >
                {icon}
                <span>{label}</span>
              </Link>
            );
          })}
        </div>

        {user!=="Invited" && (
          <div className="hidden md:flex">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 hover:bg-red-600"
            >
              <AiOutlineLogout />
              Cerrar sesión
            </button>
          </div>
        )}
      </nav>

      {/* 🧭 Dropdown en mobile (flujo normal) */}
      {menuOpen && (
        <div className="bg-[#0a0f1a] text-white px-6 py-2 mt-20 shadow-md flex flex-col gap-2 md:hidden">
          {navItems.map(({ href, label, icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200
                  ${isActive ? "bg-[#15508b]" : "hover:bg-[#1c2735]"}
                `}
              >
                {icon}
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
