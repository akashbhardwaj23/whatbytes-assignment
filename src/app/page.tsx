"use client"
import { useProducts } from "@/hooks/useProducts";
import { CategoryItem, filterCategoryItems, FilterItemsType } from "@/utils/lib";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";


const ALL_PRODUCTS = [
  { id: 1, name: 'Running Shoes', price: 120, category: 'shoes' },
  { id: 2, name: 'Casual Sneakers', price: 80, category: 'shoes' },
  { id: 3, name: 'T-Shirt', price: 30, category: 'apparel' },
  { id: 4, name: 'Jeans', price: 70, category: 'apparel' },
  { id: 5, name: 'Hat', price: 25, category: 'accessories' },
  { id: 6, name: 'Socks (3-pack)', price: 15, category: 'accessories' },
  { id: 7, name: 'Dress Shoes', price: 150, category: 'shoes' },
  { id: 8, name: 'Winter Coat', price: 200, category: 'apparel' },
  { id: 9, name: 'Sunglasses', price: 45, category: 'accessories' },
  { id: 10, name: 'Hiking Boots', price: 180, category: 'shoes' },
]

export default function Home() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<FilterItemsType>("all")
  const [minPrice, setMinPrice] = useState(200);
  const [maxPrice, setMaxPrice] = useState(5000);
  const {products, loading} = useProducts();


  const router = useRouter()

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') as FilterItemsType  || 'all');
    setMinPrice(Number(searchParams.get('minPrice')) || 200);
    setMaxPrice(Number(searchParams.get('maxPrice')) || 5000);
  }, [searchParams]);


  const filteredProduct = useMemo(() => {
    let currentProducts = [...products];
    console.log("current producs", currentProducts)

    console.log("selectedCategory ", selectedCategory)

    if(selectedCategory !== "all"){
      // console.log("products ", currentProducts[0].category)
      currentProducts = currentProducts.filter((product) => product.category.toLowerCase() === selectedCategory.toLowerCase())
     
      console.log("selectedCategory Products ", currentProducts)
    }

    if(minPrice > 200){
      currentProducts = currentProducts.filter((product) => product.price >= minPrice)
    }
    if(maxPrice > 200){
      currentProducts = currentProducts.filter((product) => product.price <= minPrice)
    }

    return currentProducts;
  }, [selectedCategory, minPrice, maxPrice, products])


  const handleProductClick = (id : number) => {
      router.push(`/product/${id}`)
  }

  const handleFilterChange = (filterType : 'category' | 'minPrice' | 'maxPrice', value : string) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    if(value){
      currentParams.set(filterType, value)
    } else {
      currentParams.delete(filterType)
    }

    router.push(`/?${currentParams.toString()}`)

    if(filterType === "category"){
      const newValue = value as FilterItemsType;
      setSelectedCategory(newValue)
    } else if(filterType === "minPrice"){
      setMinPrice(Number(value));
    } else if (filterType === "maxPrice"){
      setMaxPrice(Number(value))
    }
  }

  if(loading){
    return (
      <div>
        Loading ....
      </div>
    )
  }

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-8 min-h-screen">
      <div className="col-span-1 flex flex-col gap-8 ml-20">
        <div className="bg-primary p-4 max-w-4xl w-60 rounded-[10px] text-background shadow-lg">
          <h2 className="text-xl font-semibold">Filters</h2>

          <div className="mt-4 flex flex-col gap-2">
            <h4 className="font-medium">Categories</h4>
            <div className="space-y-3"></div>
            {filterCategoryItems.map((category, index) => (
              <RadioOptionComponent key={index} category={category} className="bg-primary" isCategoryCard ={true} selectedCategory={selectedCategory} handleFilterChange={handleFilterChange} />
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
              <RadioOptionComponent category={category} key={index} selectedCategory={selectedCategory} isCategoryCard={false} className="bg-background" handleFilterChange={handleFilterChange} />
  
            ))}
          </div>
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-base font-semibold">Price</h2>
            <input type="number" min={200} defaultValue={1000} className="border border-neutral-400/80 px-2 py-1 w-40 rounded-[10px]" />
          </div>
        </div>
      </div>
      <div className="col-span-3 px-4">
        <h1 className="text-4xl font-bold mb-4">Product Listing</h1>
        {filteredProduct.length === 0 && (
                <p className="text-neutral-800 text-center py-8">No Product Found</p>
              )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProduct.map((product, index) => (
                 <div key={product.id} className="p-4 cursor-pointer" onClick={() => handleProductClick(product.id)}>
                  <Image src={product.image} height={600} width={600} alt={product.title} className="w-30 h-40 object-contain mb-2" />
                  <h3 className="text-base font-semibold mb-1 h-12 max-w-60 overflow-hidden">{product.title}</h3>
                  <p className="text-base font-bold mt-2 mb-2">
                    ${product.price.toFixed(2)}
                  </p>
                  <button className="px-8 py-2 bg-secondary-background rounded-[10px] text-background">Add to Cart</button>
               </div>
              ))}
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
  handleFilterChange
}: {
  category: CategoryItem;
  className : string;
  isCategoryCard : boolean
  selectedCategory : FilterItemsType
  handleFilterChange : (filterType : 'category' | 'minPrice' | 'maxPrice', value : string) => void
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
                onChange={(e) => handleFilterChange("category", e.target.value)}
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