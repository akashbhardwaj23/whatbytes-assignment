'use client'

import { CartItem, ProductType } from "@/utils/lib";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from "react";


interface ProductContextType {
    products : ProductType[] | [],
    setProducts : Dispatch<SetStateAction<ProductType[] | []>>
    cart : CartItem[] | [],
    setCart : Dispatch<SetStateAction<CartItem[] | []>> 
    searchTerm : string
    setSearchTerm : Dispatch<SetStateAction<string>>
    loading : boolean
    setLoading : Dispatch<SetStateAction<boolean>>
    selectedProduct : ProductType | null;
    setSelectedProduct : Dispatch<SetStateAction<ProductType | null>>
}


const ProductContext = createContext<ProductContextType | null>(null)





export function ProductContextProvider({
    children
} : {
    children : React.ReactNode
}){
    const [products, setProducts] = useState<ProductType[]>([])
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null)
    const [loading, setLoading] = useState(false)

    console.log("does product have addedToCart ", products);

    const handleAddToCart = (data: ProductType[]) => {
        const localCart = localStorage.getItem("cart");
        if (localCart) {
            const newCart: CartItem[] = JSON.parse(localCart);
            console.log("new cart is ", newCart);
            setCart(newCart)
            console.log("cart is ", cart)
            if(newCart.length > 0){

                const cartLookup = new Map();
                newCart.forEach((cartItem) => {
                    cartLookup.set(cartItem.id, cartItem);
                });
                data.forEach((item) => {
                    const newItem = cartLookup.get(item.id)
                    item.addedToCart = !!newItem
                    if(item.category === "men's clothing" || item.category === "women's clothing"){
                        item.category = "clothing"
                    } else if(item.category === "jewelery"){
                        item.category = "home"
                    }
                })

                console.log("the data is ", data)
            }
        }
    }
    const fetchData = async() => {
        const localSelectedProduct = localStorage.getItem("selectedProduct");
        if(localSelectedProduct){
            const parsedSelectedProduct = JSON.parse(localSelectedProduct);
            setSelectedProduct(parsedSelectedProduct)
        }
        setLoading(true)
        // console.log("localstorage cart is ",localCart)
        const response = await fetch('https://fakestoreapi.com/products');
        const data:ProductType[] = await response.json();
        // console.log("cart on context is ", cart)
        handleAddToCart(data)
        setLoading(false)
        console.log("data is ", data)
        setProducts(data);
        
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <ProductContext.Provider value={{products, setProducts, cart, setCart, searchTerm, setSearchTerm, loading, setLoading, selectedProduct, setSelectedProduct}}>
            {children}
        </ProductContext.Provider>
    )
}




export function useProductContext(){
    const context = useContext(ProductContext);
    if(!context){
        throw Error("No Context Provided");
    }
    return context;
}