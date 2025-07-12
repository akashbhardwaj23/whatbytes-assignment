import { ProductType } from "@/utils/lib";
import { useEffect, useState } from "react";





export function useProducts(){
    const [products, setProducts] = useState<ProductType[]>([])
    const [loading, setLoading] = useState(false)

    console.log("products ", products)
    const fetchData = async() => {
        setLoading(true)
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setLoading(false)
        setProducts(data);
    }

    useEffect(() => {
        fetchData()
    }, [])

    return {
        products,
        loading
    }
}