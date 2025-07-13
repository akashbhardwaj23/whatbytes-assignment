"use client"
import { useProductContext } from "@/context/product";
import { CartItem, ProductType } from "@/utils/lib";
import { Plus, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function ProductDetails() {
    const params = useParams()
    const id = params.id
    const { selectedProduct, setCart, setProducts, setSelectedProduct } = useProductContext()
    const [loading, setLoading] = useState(false)
    const [quantity, setQuantity] = useState(1);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const response = await fetch(`https://fakestoreapi.com/products/${id}`)
            const data = await response.json();
            setLoading(false)
            // setProduct(data)
        }
        fetchData()
    }, [])

    const updateQuantity = (newQuantity : number) => {
        if(newQuantity < 1) return;
        setQuantity(newQuantity)
      }

    // Can have it on central store
      const handleAddToCart = (product: ProductType) => {
        setCart(prev => [...prev, { ...product, quantity: quantity }])
        setProducts((prev) => prev.map((item) => item.id === product.id ? { ...item, addedToCart: true } : { ...item }))
        setSelectedProduct((product) => {
            if(product){
                product.addedToCart = true
                return product
            }
            return null
        })
        const localCart = localStorage.getItem("cart");
        if (localCart) {
          const parsedCart: CartItem[] = JSON.parse(localCart);
          parsedCart.push({ ...product, quantity });
          localStorage.setItem('cart', JSON.stringify(parsedCart))
          return
        }
        localStorage.setItem('cart', JSON.stringify([{ ...product, quantity }]))
      }


    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-50">
                <div className="max-w-4xl mx-auto p-6">
                    Loading ...
                </div>
            </div>
        )
    }

    if (!selectedProduct) {
        return (
            <div className="min-h-screen bg-neutral-50">
                <div className="max-w-4xl mx-auto p-6">
                    Nothing Found
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen mb-10 md:mb-0 p-10">
            <div className="flex flex-col md:grid md:grid-cols-3 gap-4">

                <div className="mb-4 md:mb-0">
                    <Image src={selectedProduct.image} alt={selectedProduct.title} width={600} height={600} className="w-100 h-100  object-contain" />
                </div>
                <div className="flex flex-col gap-4 col-span-2 md:mt-10">
                    <h1 className="text-4xl font-semibold max-w-2xl">{selectedProduct.title}</h1>
                    <p className="text-xl font-medium">$ {selectedProduct.price}</p>
                    <div className="flex items-center gap-2">
                        <p className="flex items-center gap-2 p-1 px-1.5 bg-green-600 text-sm text-background rounded-[10px] border border-neutral-400">{Math.floor(selectedProduct.rating.rate)}<Star className="w-4 h-4" /></p>
                        {[1, 2, 3, 4, 5].map((item) => {
                            const isActive = Math.floor(selectedProduct.rating.rate) >= item
                            return (<Star
                                size={24}
                                className={`transition-colors ${isActive ? "fill-[#385982] text-[#385982]" : "fill-none text-gray-300 hover:text-yellow-400"
                                    }`} />)
                        })}
                        <p className="ml-2 text-neutral-600">{selectedProduct.rating.count} <span>ratings</span></p>
                    </div>

                    <p className="max-w-2xl">{selectedProduct.description}</p>


                    <div className="flex flex-col gap-2 mb-8">
                        <h2 className="text-xl">Category</h2>
                        <p className="px-2 py-1 rounded-[10px] text-sm border border-neutral-400 max-w-fit">{selectedProduct.category}</p>
                    </div>


                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => updateQuantity(quantity - 1)}
                            disabled={quantity <= 1}
                            className="w-8 h-8 rounded border border-neutral-300 flex items-center justify-center hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                        </button>

                        <span className="w-12 text-center font-semibold">{quantity}</span>

                        <button
                            onClick={() => updateQuantity(quantity + 1)}
                            className="w-8 h-8 rounded border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 cursor-pointer"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>


                    <div>
                        {selectedProduct.addedToCart ? (<button className="px-8 py-2 bg-primary shadow-2xl rounded-[10px] text-background w-full md:w-1/2 lg:w-[30%] cursor-pointer hover:bg-primary/90" onClick={() => router.push('/cart')}>
                            <p className="flex justify-center items-center gap-2">
                                <ShoppingCart className="w-4 h-4" />
                                <span>Go To Cart</span>
                            </p>
                        </button>) : (<button className="px-8 py-2 bg-primary shadow-2xl rounded-[10px] w-full md:w-[30%] text-background cursor-pointer hover:bg-primary/90" onClick={() => handleAddToCart(selectedProduct)}>
                            Add to Cart
                        </button>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}