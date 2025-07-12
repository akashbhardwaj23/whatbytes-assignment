
export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
      <div className="col-span-1 flex justify-center items-center">
        <div className="bg-primary p-4 max-w-4xl w-60 rounded-[8px] text-background">
            <h2 className="text-xl font-semibold">Filters</h2>

            <div className="mt-4 flex flex-col gap-2">
              <h4 className="font-medium">Categories</h4>
              <RadioOptionComponent text="All" />
              <RadioOptionComponent text="Electronics" />
              <RadioOptionComponent text="Clothing" />
              <RadioOptionComponent text="Home" />
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <h4 className="font-medium">Price</h4>
              <input type="range" min={0} max={100} />
            </div>
        </div>
      </div>
      <div className="col-span-2">
        
          <h1 className="text-4xl font-bold">Product Listing</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="col-span-1">
              <h2>Product 1</h2>
            </div>
          </div>
      </div>
    </main>
  );
}


function RadioOptionComponent({
  text
}: {
  text : string
}){
  return (
    <div className="flex items-center gap-2 font-light">
      <input type="radio" className="" />
      <span className="text-sm">{text}</span>
    </div>
  )
}