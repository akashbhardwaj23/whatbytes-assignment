import { Dispatch, SetStateAction, useRef } from "react"

export function PriceSelectorComponent({
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice
} : {
    minPrice : number
    maxPrice : number
    setMinPrice : Dispatch<SetStateAction<number>>
    setMaxPrice : Dispatch<SetStateAction<number>> 
}){
    const minInputRef = useRef<HTMLInputElement>(null)
    const maxInputRef = useRef<HTMLInputElement>(null)
    const min = 0
    const max = 5000
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 100)
    localStorage.setItem("minPrice", JSON.stringify(value))
    setMinPrice(value)
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 100)
    localStorage.setItem("maxPrice", JSON.stringify(value))
    setMaxPrice(value)
  }

  const getPercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100
  }


    return (
        <div className="mt-4 flex flex-col gap-2">
            <h4 className="font-medium">Price</h4>

            <div className="relative mb-4">
              <div className="h-1 bg-blue-400 rounded-full relative">
                <div
                  className="absolute h-1 bg-blue-300 rounded-full"
                  style={{
                    left: `${getPercentage(minPrice)}%`,
                    width: `${getPercentage(maxPrice) - getPercentage(minPrice)}%`,
                  }}
                />
              </div>
              <input
                ref={minInputRef}
                type="range"
                min={min}
                max={max}
                step={100}
                value={minPrice}
                onChange={handleMinChange}
                className="absolute top-1 left-0 w-full h-1 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:-mt-1.5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-background [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-sm"
                style={{ zIndex: minPrice > max - 100 ? 5 : 1 }}
              />
              <input
                ref={maxInputRef}
                type="range"
                min={min}
                max={max}
                step={100}
                value={maxPrice}
                onChange={handleMaxChange}
                className="absolute top-1 left-0 w-full h-1 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:-mt-1.5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-background [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-sm"
                style={{ zIndex: 2 }}
              />
            </div>

            <div className="flex justify-between text-background text-sm font-medium">
              <span>{minPrice}</span>
              <span>{maxPrice}</span>
            </div>
          </div>
    )
}