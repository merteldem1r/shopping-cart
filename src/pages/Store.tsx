import storeItems from './../data/items.json';
import { StoreItem } from "../components/StoreItem.tsx";

export function Store() {
  return (
    <main className="container flex flex-col gap-2 my-3">
      <h1 className="text-3xl font-medium">STORE</h1>
      <div className="mt-3 flex flex-wrap items-start gap-4">
        {storeItems.map(item => {
          return (
            <StoreItem key={item.id} item={item} />
          )
        })}
      </div>
    </main>
  )
}