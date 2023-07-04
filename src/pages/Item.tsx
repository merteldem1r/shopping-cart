import { useParams } from "react-router-dom";

export function Item() {
  const { id } = useParams();

  return (
    <main className="container flex flex-col gap-2 mt-3">
      <div>Store Item {id}</div>
    </main>
  )
}