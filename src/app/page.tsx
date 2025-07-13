"use client"
import { PriceSelectorComponent } from "@/components/priceselector";
import { RadioOptionComponent } from "@/components/radiooptioncomponent";
import { useProductContext } from "@/context/product";
import { CartItem, filterCategoryItems, FilterItemsType, ProductType } from "@/utils/lib";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";


export default function Home() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<FilterItemsType>("all")
  const { products, loading, searchTerm, cart, setCart, setProducts, setSelectedProduct } = useProductContext()
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [maxPriceValue, setMaxPriceValue] = useState(5000)
  const router = useRouter()

  useEffect(() => {
    const localMinPrice = localStorage.getItem("minPrice");
    const localMaxPrice = localStorage.getItem("maxPrice");
    setSelectedCategory(searchParams.get('category') as FilterItemsType || 'all');
    setMinPrice(Number(searchParams.get('minPrice')) || Number(localMinPrice) || 0);
    setMaxPrice(Number(searchParams.get('maxPrice')) || Number(localMaxPrice) || 5000);
  }, [searchParams]);


  const filteredProduct = useMemo(() => {
    let currentProducts = [...products];
    console.log("current producs", currentProducts)

    console.log("selectedCategory ", selectedCategory)

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      currentProducts = currentProducts.filter((product) =>
        product.title.toLowerCase().includes(lowerCaseSearchTerm),
      );
    }

    if (selectedCategory !== "all") {
      // console.log("products ", currentProducts[0].category)
      currentProducts = currentProducts.filter((product) => product.category.toLowerCase() === selectedCategory.toLowerCase())

      console.log("selectedCategory Products ", currentProducts)
    }

    if (minPrice > 0) {
      currentProducts = currentProducts.filter((product) => product.price >= minPrice)
    }
    if (maxPrice < 5000) {
      currentProducts = currentProducts.filter((product) => product.price <= maxPrice)
    }

    return currentProducts;
  }, [selectedCategory, minPrice, maxPrice, products, searchTerm])


  const handleProductClick = (product: ProductType) => {
    setSelectedProduct(product)
    localStorage.setItem("selectedProduct", JSON.stringify(product))
    router.push(`/product/${product.id}`)
  }

  const handleAddToCart = (product: ProductType) => {
    setCart(prev => [...prev, { ...product, quantity: 1 }])
    setProducts((prev) => prev.map((item) => item.id === product.id ? { ...item, addedToCart: true } : { ...item }))
    const localCart = localStorage.getItem("cart");
    if (localCart) {
      const parsedCart: CartItem[] = JSON.parse(localCart);
      parsedCart.push({ ...product, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(parsedCart))
      return
    }
    localStorage.setItem('cart', JSON.stringify([{ ...product, quantity: 1 }]))
  }

  const handleFilterChange = (filterType: 'category' | 'minPrice' | 'maxPrice', value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    if (value) {
      currentParams.set(filterType, value)
    } else {
      currentParams.delete(filterType)
    }

    router.push(`/?${currentParams.toString()}`)

    if (filterType === "category") {
      const newValue = value as FilterItemsType;
      setSelectedCategory(newValue)
    } else if (filterType === "minPrice") {
      setMinPrice(Number(value));
    } else if (filterType === "maxPrice") {
      setMaxPrice(Number(value))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="max-w-4xl mx-auto p-6">
          Loading ....
        </div>
      </div>
    )
  }

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 md:p-8 min-h-screen">
      <div className="col-span-1 flex flex-col gap-4 md:gap-8 md:ml-20">
        <div className="bg-primary p-4 rounded-[10px] text-background shadow-lg">
          <h2 className="text-xl font-semibold">Filters</h2>

          <div className="mt-4 flex flex-col gap-2">
            <h4 className="font-medium">Categories</h4>
            <div className="space-y-3"></div>
            {filterCategoryItems.map((category, index) => (
              <RadioOptionComponent key={index} category={category} className="bg-primary" isCategoryCard={true} selectedCategory={selectedCategory} handleFilterChange={handleFilterChange} />
            ))}
          </div>
            <PriceSelectorComponent minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
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
            <input type="number" min={200} defaultValue={maxPriceValue} step={100} className="border border-neutral-400/80 px-2 py-1 w-40 rounded-[10px]" onChange={(e) => setMaxPriceValue(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="col-span-full md:col-span-2 lg:col-span-3 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Product Listing</h1>
        {filteredProduct.length === 0 && (
          <p className="text-neutral-800 text-center py-8">No Product Found</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProduct.map((product, index) => (
            <div key={product.id} className="p-4 cursor-pointer">
              <div onClick={() => handleProductClick(product)}>
                <Image src={product.image} height={600} width={600} alt={product.title} className="w-full h-40 object-contain mb-2" />
                <h3 className="text-base font-semibold mb-1 h-12 max-w-full overflow-hidden">{product.title}</h3>
                <p className="text-base font-bold mt-2 mb-2">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              {product.addedToCart ? (<button className="px-8 py-2 bg-primary rounded-[10px] text-background w-full cursor-pointer hover:bg-primary/90" onClick={() => router.push('/cart')}>
                <p className="flex justify-center items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Go To Cart</span>
                </p>
              </button>) : (<button className="px-8 py-2 bg-primary w-full rounded-[10px] text-background cursor-pointer hover:bg-primary/90" onClick={() => handleAddToCart(product)}>
                <span>
                  Add to Cart
                </span>
              </button>)}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
