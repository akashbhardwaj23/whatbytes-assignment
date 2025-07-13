import { CategoryItem, FilterItemsType } from "@/utils/lib";

export function RadioOptionComponent({
    category,
    className,
    isCategoryCard,
    selectedCategory,
    handleFilterChange
  }: {
    category: CategoryItem;
    className: string;
    isCategoryCard: boolean
    selectedCategory: FilterItemsType
    handleFilterChange: (filterType: 'category' | 'minPrice' | 'maxPrice', value: string) => void
  }) {
    return (
      <div key={category.value} className="flex items-center">
        <div className="relative">
          <input
            type="radio"
            id={category.value}
            name="category"
            value={category.value}
            checked={selectedCategory === category.value}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="sr-only"
          />
          <label htmlFor={category.value} className="flex items-center cursor-pointer">
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedCategory === category.value
                ? isCategoryCard ? "bg-white border-white" : "bg-blue-600 border-blue-600"
                : "bg-transparent border-neutral-300 hover:border-neutral-400"
                }`}
            >
              {selectedCategory === category.value && <div className={`w-2 h-2 ${className} rounded-full`}></div>}
            </div>
            <span className="ml-2 text-sm font-medium">{category.label}</span>
          </label>
        </div>
      </div>
    )
  }