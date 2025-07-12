
export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
      <div className="col-span-1 flex justify-center items-center">
        <h1>Filter logic</h1>
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
