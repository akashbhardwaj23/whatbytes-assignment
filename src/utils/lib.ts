export const filterCategoryItems : CategoryItem[] = [
    {
        value : "all",
        label : "All"
    }, {
        value : "electronics",
        label : "Electronics"
    }, {
        value : "clothing",
        label : "Clothing"
    }, {
        value : "home",
        label : "Home"
    }
]

export type FilterItemsType = "all" | "electronics" | "clothing" | "home"

export type CategoryItem = {
    value : FilterItemsType,
    label : string
}

export type ProductType = {
    category: string 
    description : string
    id : number
    image : string
    price : number
    rating : {
        rate : number,
        count : number
    }
    title : string
}