export default function OrderCard({ item }) {
  return (
    <div className="flex gap-4 rounded-lg bg-white p-4 shadow">
      {/* IMAGE */}
      <img
        src={item.image}
        alt={item.name}
        className="h-25 w-30 rounded object-cover"
      />

      {/* CONTENT */}
      <div className="flex flex-col gap-2">
        {item.flashSale && (
          <span className="w-fit rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
            FLASH SALE!
          </span>
        )}

        <h3 className="text-lg font-semibold">{item.name}</h3>

        <p className="text-sm text-gray-500">
          {item.qty}pcs <span className="mx-2">|</span> {item.size}
          <span className="mx-2">|</span> {item.temp}
          <span className="mx-2">|</span> {item.type}
        </p>

        <div className="flex items-center gap-3">
          <span className="text-sm text-red-500 line-through">
            {item.priceBefore}
          </span>
          <span className="text-xl font-semibold text-orange-500">
            {item.priceAfter}
          </span>
        </div>
      </div>

      {/* DELETE */}
      <button className="flex p-5 items-center justify-center rounded-full border border-red-500 text-red-500">
        ×
      </button>
    </div>
  );
}
