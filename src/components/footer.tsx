import { Facebook, Instagram, Twitter } from "lucide-react";



export function Footer(){
    return (
        <footer className="bg-secondary-background p-8 h-60">
            <div className="grid grid-cols-3 mx-auto text-background">
                <div className="flex flex-col gap-4 mx-auto">
                    <h2 className="text-xl">Filters</h2>
                   <div className="h-30 flex flex-col justify-between font-light">
                   <p>All</p>
                   <p>2024 American</p>
                   </div>
                </div>
                <div className="flex flex-col gap-4 mx-auto">
                    <h2 className="text-xl">About Us</h2>
                   <p className="font-light">About Us</p>
                    <p className="font-light">Contact</p>
                </div>
                <div className="flex flex-col gap-4 mx-auto">
                    <h2 className="text-xl">Follows Us</h2>
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary rounded-full">
                        <Facebook />
                        </div>
                        <div className="p-2 bg-primary rounded-full">
                        <Twitter />
                        </div>
                        <div className="p-2 bg-primary rounded-full">
                        <Instagram />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}