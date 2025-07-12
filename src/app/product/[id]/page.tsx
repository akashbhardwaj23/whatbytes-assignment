"use client"
import { StarFeedbackSystem } from "@/components/starfeedback";
import { ProductType } from "@/utils/lib";
import { Star } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function ProductDetails(){
    const params = useParams()
    const id = params.id
    const [product, setProduct] = useState<ProductType>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const response = await fetch(`https://fakestoreapi.com/products/${id}`)
            const data = await response.json();
            setLoading(false)
            setProduct(data)
        }
        fetchData()
    }, [])


    if(loading){
        return (
            <div>
                Loading ...
            </div>
        )
    }

    if(!product){
        return (
            <div>
                Nothing Found
            </div>
        )
    }

    return (
        <div className="min-h-screen p-10">
            <div className="grid grid-cols-3 gap-4">
                
                <div>
                    <Image src={product.image} alt={product.title} width={600} height={600} className="w-100 h-100  object-contain" />
                </div>
                <div className="flex flex-col gap-4 col-span-2">
                    <h1 className="text-4xl font-semibold">{product.title}</h1>
                    <p className="text-xl font-medium">{product.price}</p>
                    <div className="flex items-center gap-2">
                        <p className="p-1">{Math.floor(product.rating.rate)}</p>
                    {[1,2,3,4,5].map((item) => {
                        const isActive = Math.floor(product.rating.rate) >= item
                        return (<Star
                            size={24}
                            className={`transition-colors ${
                              isActive ? "fill-[#385982] text-[#385982]" : "fill-none text-gray-300 hover:text-yellow-400"
                            }`} />)
                    })}
                        <p className="ml-4 text-primary">{product.rating.count} Ratings</p>
                    </div>
                    
                    <p>{product.description}</p>


                    <div className="flex flex-col gap-2 mb-8">
                        <h2 className="text-xl">Category</h2>
                        <p>{product.category}</p>
                    </div>

                    <div>
                        <button className="px-8 py-2 bg-secondary-background shadow-2xl rounded-[10px] text-background cursor-pointer hover:bg-secondary-background/90">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}