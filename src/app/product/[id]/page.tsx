"use client"
import { StarFeedbackSystem } from "@/components/starfeedback";
import { Star } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";


export default function ProductDetails(){
    const params = useParams()
    const id = params.id

    return (
        <div className="min-h-screen p-10">
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <Image src={"/logo.png"} alt="logo" width={600} height={600} className="w-100 h-100 obje-cover" />
                </div>
                <div className="flex flex-col gap-4 col-span-2">
                    <h1 className="text-4xl font-semibold">SmartPhone</h1>
                    <p className="text-xl font-medium">$699</p>
                    <div className="flex items-center gap-2">
                    {[1,2,3,4,5].map((item) => {
                        const isActive = true;
                        return (<Star
                            size={32}
                            className={`transition-colors ${
                              isActive ? "fill-[#385982] text-[#385982]" : "fill-none text-gray-300 hover:text-yellow-400"
                            }`} />)
                    })}
                    </div>

                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore exercitationem animi perspiciatis eligendi blanditiis voluptatum adipisci velit sequi. Laborum eum ipsa nobis eius, odit excepturi beatae assumenda praesentium ex magnam modi saepe itaque similique cumque facilis. Deleniti exercitationem reprehenderit, nesciunt quibusdam quis totam voluptate. Iusto eligendi vitae nemo animi nihil. Illum aspernatur ea quas saepe nihil reprehenderit fugiat ab, officiis eius similique delectus ipsam est nulla voluptate nobis ad et exercitationem rem neque? Dolore sit ratione eum suscipit, sequi harum, molestiae obcaecati ipsa soluta voluptas nihil exercitationem modi consectetur corrupti deserunt ut repellendus laudantium asperiores. Veritatis consequatur nesciunt vel cum!</p>


                    <div className="flex flex-col gap-2 mb-8">
                        <h2 className="text-xl">Category</h2>
                        <p>Electronics</p>
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