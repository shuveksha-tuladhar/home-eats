import Link from "next/link";
import Image from "next/image";

function RestaurantCard({ data }) {
  return (
    <div className="group w-full max-w-xs mx-auto p-2">
      <div className="h-[400px] bg-white rounded-2xl shadow-highlight border border-base/20 flex flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-1">
        <div className="relative h-[220px] w-full overflow-hidden">
          <Image
            className="w-full h-full object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
            height={220}
            width={400}
            src={data?.imageUrls?.[0] || "https://cdn.pixabay.com/photo/2015/02/23/21/10/restaurant-646687_1280.jpg"}
            alt={data?.name || "Restaurant"}
            priority
          />
        </div>
        <div className="flex-1 flex flex-col justify-between p-6">
          <div>
            <h3 className="mb-2 text-xl font-bold text-[#222] text-center group-hover:text-primary transition">
              {data?.name}
            </h3>
            <p className="text-base text-muted text-center mb-4 line-clamp-2">
              {data?.description}
            </p>
          </div>
          <div className="flex justify-center mt-4">
            <Link
              className="inline-block px-8 py-2.5 text-base font-bold rounded-full bg-primary text-white hover:bg-primary-dark transition"
              href={`/restaurant/${data?.id}`}
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;