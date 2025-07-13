'use client'
import Image from "next/image";
import { Search, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProductContext } from "@/context/product";
import { ChangeEvent } from "react";

export default function Navbar() {
  const {searchTerm, setSearchTerm} = useProductContext()
  const router = useRouter()

  const handleInputChange = (e : ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="flex justify-between items-center px-8 bg-primary font-inter">
      <div className="flex items-center">
        <Image src="/logo.png" alt="logo" width={100} height={100} className="w-20 h-20 object-cover" onClick={() => router.push("/")} />
      </div>
      <div className="flex items-center w-96 relative text-primary-text">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2" />
        <input type="text" placeholder="Search for products..." className="w-full h-10 rounded-md border border-primary-text p-2 pl-12 focus:outline-none placeholder:text-primary-text" onChange={(e) => handleInputChange(e)} />
      </div>
      <div className="flex items-center">
        <button className="flex items-center gap-2 bg-secondary-background text-secondary-text cursor-pointer px-6 py-3 rounded-[8px] text-sm font-semibold" onClick={() => router.push("/cart")}>
            <ShoppingCart className="w-4 h-4" />
            <span>Cart</span>
        </button>
      </div>
    </div>
  );
}