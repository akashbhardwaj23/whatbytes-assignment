'use client'
import Image from "next/image";
import { Search, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProductContext } from "@/context/product";
import { ChangeEvent } from "react";

export default function Navbar() {
  const {setSearchTerm} = useProductContext()
  const router = useRouter()

  const handleInputChange = (e : ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="flex justify-between items-center gap-4 md:gap-0 px-4 md:px-8 bg-primary font-inter shadow-md">
      <div className="flex items-center w-full md:w-auto justify-start">
        <Image src="/logo.png" alt="logo" width={100} height={100} className="w-16 h-16 md:w-20 md:h-20 cursor-pointer object-cover" onClick={() => router.push("/")} />
      </div>
      <div className="flex items-center w-full md:w-2/5 lg:w-96 relative text-primary-text">
        <Search className="w-4 h-4 md:w-5 md:h-5 absolute left-4 top-1/2 -translate-y-1/2" />
        <input type="text" placeholder="Search for products..." className="w-full h-9 md:h-10 rounded-md border border-primary-text p-2 pl-10 md:pl-12 focus:outline-none placeholder:text-primary-text placeholder:text-sm placeholder:md:text-base text-sm md:text-base" onChange={(e) => handleInputChange(e)} />
      </div>
      <div className="flex items-center">
        <button className="flex items-center gap-2 bg-secondary-background text-secondary-text cursor-pointer px-4 md:px-6 py-3 rounded-[8px] text-sm font-semibold whitespace-nowrap" onClick={() => router.push("/cart")}>
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden md:inline">Cart</span>
            <span className="inline md:hidden"></span>
        </button>
      </div>
    </div>
  );
}