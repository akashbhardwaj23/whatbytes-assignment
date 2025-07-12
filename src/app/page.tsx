"use client"
import { CategoryItem, filterCategoryItems, Items } from "@/utils/lib";
import { Dispatch, SetStateAction, useState } from "react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Items>("all")
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-8 min-h-screen">
      <div className="col-span-1 flex flex-col gap-8 ml-20">
        <div className="bg-primary p-4 max-w-4xl w-60 rounded-[10px] text-background shadow-lg">
          <h2 className="text-xl font-semibold">Filters</h2>

          <div className="mt-4 flex flex-col gap-2">
            <h4 className="font-medium">Categories</h4>
            <div className="space-y-3"></div>
            {filterCategoryItems.map((category, index) => (
              <RadioOptionComponent key={index} category={category} className="bg-primary" isCategoryCard ={true} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <h4 className="font-medium">Price</h4>
            <input type="range" min={0} max={100} />
          </div>
        </div>

        <div className="px-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-base font-semibold">Category</h2>
            {filterCategoryItems.map((category, index) => (
              <RadioOptionComponent category={category} key={index} selectedCategory={selectedCategory} isCategoryCard={false} className="bg-background" setSelectedCategory={setSelectedCategory} />
  
            ))}
          </div>
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-base font-semibold">Price</h2>
            <input type="number" min={200} defaultValue={1000} className="border border-neutral-400/80 px-2 py-1 w-40 rounded-[10px]" />
          </div>
        </div>
      </div>
      <div className="col-span-3 px-4">
        <h1 className="text-4xl font-bold">Product Listing</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="col-span-1">
            <h2>Product 1</h2>
          </div>
        </div>
      </div>
    </main>
  );
}


function RadioOptionComponent({
  category,
  className,
  isCategoryCard,
  selectedCategory,
  setSelectedCategory
}: {
  category: CategoryItem;
  className : string;
  isCategoryCard : boolean
  selectedCategory : Items;
  setSelectedCategory : Dispatch<SetStateAction<Items>>
}) {
  return (
    <div key={category.value} className="flex items-center">
            <div className="relative">
              <input
                type="radio"
                id={category.value}
                name="category"
                value={category.value}
                checked={selectedCategory === category.value}
                onChange={(e) => setSelectedCategory(e.target.value as Items)}
                className="sr-only"
              />
              <label htmlFor={category.value} className="flex items-center cursor-pointer">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedCategory === category.value
                      ? isCategoryCard ? "bg-white border-white" : "bg-blue-600 border-blue-600" 
                      : "bg-transparent border-neutral-300 hover:border-neutral-400"
                  }`}
                >
                  {selectedCategory === category.value && <div className={`w-2 h-2 ${className} rounded-full`}></div>}
                </div>
                <span className="ml-2 text-sm font-medium">{category.label}</span>
              </label>
            </div>
          </div>
  )
}