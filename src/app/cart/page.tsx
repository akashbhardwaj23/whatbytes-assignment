'use client'
import { useProductContext } from "@/context/product"
import { CartItem } from "@/utils/lib"
import { Plus, ShoppingCart, Trash2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"


export  default function Cart() {
    const {cart, setCart, setProducts} = useProductContext()
    const router = useRouter()

      const updateQuantity = (id : number, newQuantity : number) => {
        if(newQuantity < 1) return;
        setCart(prev => prev.map((item) => (item.id === id ? {...item, quantity : newQuantity} : item)))
      }

      const removeItem = (id : number) => {
        setCart((prev) => prev.filter((item) => item.id !== id))
        setProducts((prev) => prev.map((item) => item.id === id ? {...item, addedToCart : false} : {...item}))
        const localCart = localStorage.getItem("cart");
        const parsedCart:CartItem[] = JSON.parse(localCart!)
        if(parsedCart){
            const newCart = parsedCart.filter((item) => item.id !== id);
            if(newCart.length > 0){
                localStorage.setItem('cart', JSON.stringify(newCart))
            }
        }
      }

      const subTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

      const shipping = subTotal > 100 ? 0 : 100;
      const tax = subTotal * 0.08;
      const total = subTotal + tax + shipping



      if(cart.length === 0){
        return (
            <div className="min-h-screen bg-neutral-50">
              <div className="max-w-4xl mx-auto p-6">
                <div className="flex flex-col items-center py-16">
                  <ShoppingCart className="w-24 h-24 text-neutral-600 mb-4" />
                  <h2 className="text-2xl font-bold text-neutral-600 mb-2">Your cart is empty</h2>
                  <p className="text-neutral-600 mb-6">Add some products to get started!</p>
                  <button className="bg-blue-600 hover:bg-blue-600/90 text-white px-8 py-2 rounded-[10px] cursor-pointer font-semibold transition-colors" onClick={() => router.push('/')}>
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )
      }

    return (
        <div className="min-h-screen bg-neutral-50">
            <div className="max-w-6xl mx-auto p-6">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-[10px] shadow-sm border border-neutral-200">
                            <div className="p-6 border-b border-neutral-200">
                                <h2 className="text-2xl font-bold">Shopping Cart ({cart.length} items)</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                {cart.map((item, index) => (
                                    <div key={item.id}>
                                        <div className="flex items-center space-x-4 p-4 border border-neutral-200 rounded-[10px]">
                                            <Image
                                                src={item.image || "/placeholder.svg"}
                                                alt={item.title}
                                                width={100}
                                                height={100}
                                                className="rounded-lg object-cover"
                                            />

                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg">{item.title}</h3>
                                                <p className="text-gray-600">{item.category}</p>
                                                <p className="text-xl font-bold text-blue-600">${item.price}</p>
                                            </div>

                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                    className="w-8 h-8 rounded border border-neutral-300 flex items-center justify-center hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                    </svg>
                                                </button>

                                                <span className="w-12 text-center font-semibold">{item.quantity}</span>

                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 rounded border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 cursor-pointer"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="text-right">
                                                <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="flex items-center text-red-600 hover:text-red-800 cursor-pointer hover:bg-red-50 px-2 py-1 rounded-[8px] text-sm mt-1">
                                                        <Trash2 className="h-4 w-4 mr-1" />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                        {index < cart.length - 1 && <div className="border-t border-neutral-100 my-4"></div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-[10px] shadow-sm border border-neutral-200 sticky top-6">
                            <div className="p-6 border-b border-neutral-200">
                                <h3 className="text-xl font-bold">Order Summary</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>${subTotal.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Shipping:</span>
                                    <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>
                                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Tax:</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>

                                <div className="border-t border-neutral-200 pt-4">
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total:</span>
                                        <span className="text-blue-600">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                {shipping > 0 && (
                                    <div className="bg-blue-50 p-3 rounded-lg">
                                        <p className="text-sm text-blue-700">Add ${(100 - subTotal).toFixed(2)} more for free shipping!</p>
                                    </div>
                                )}

                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer text-lg py-3 rounded-lg font-semibold transition-colors">
                                    Proceed to Checkout
                                </button>

                                <button className="w-full border border-neutral-300 hover:bg-neutral-50 cursor-pointer text-neutral-800 py-3 rounded-[10px] font-semibold transition-colors" onClick={() => router.push("/")}>
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}