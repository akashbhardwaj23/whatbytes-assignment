import { Facebook, Instagram, Twitter } from "lucide-react";



export function Footer(){
    return (
        <footer className="bg-secondary-background p-6 md:p-8 min-h-60">
            <div className="container mx-auto grid grid-cols-3 text-background">
                <div className="flex flex-col gap-4 mx-auto">
                    <h2 className="text-xl">Filters</h2>
                   <div className="h-30 flex flex-col justify-between font-light">
                   <p>All</p>
                   <p>{new Date().getFullYear()} Indian</p>
                   </div>
                </div>
                <div className="flex flex-col gap-4 mx-auto">
                    <h2 className="text-xl">About Us</h2>
                   <p className="font-light">About Us</p>
                    <p className="font-light">Contact</p>
                </div>
                <div className="flex flex-col gap-4 mx-auto">
                    <h2 className="text-xl">Follows Us</h2>
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="p-2 bg-primary rounded-full cursor-pointer">
                        <Facebook className="w-4 h-4 md:w-6 md:h-6" />
                        </div>
                        <div className="p-2 bg-primary rounded-full cursor-pointer">
                        <Twitter className="w-4 h-4 md:w-6 md:h-6" />
                        </div>
                        <div className="p-2 bg-primary rounded-full cursor-pointer">
                        <Instagram className="w-4 h-4 md:w-6 md:h-6" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}