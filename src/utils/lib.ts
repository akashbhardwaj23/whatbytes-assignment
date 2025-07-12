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

export type Items = "all" | "electronics" | "clothing" | "home"

export type CategoryItem = {
    value : Items,
    label : string
}