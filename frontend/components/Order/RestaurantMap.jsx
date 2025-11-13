import React from "react";
import Image from "next/image";

export default function RestaurantMap({ restaurant }) {
  // Build full address string
  const address = encodeURIComponent(
    `${restaurant.address || ''} ${restaurant.city || ''} ${restaurant.state || ''} ${restaurant.zipCode || ''}`.trim()
  );
  
  // Use address if available, otherwise fall back to coordinates
  const location = restaurant.address ? address : `${restaurant.latitude},${restaurant.longitude}`;
  const mapSrc = `https://maps.google.com/maps?q=${location}&z=18&t=h&output=embed`;
  
  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-row items-start gap-4 mb-6 border-b border-gray-200 pb-4">
        {restaurant?.imageUrls && restaurant?.imageUrls[0] && (
          <div className="flex-shrink-0">
            <Image
              src={restaurant.imageUrls[0]}
              alt={restaurant.name}
              width={20}
              height={20}
              className="rounded-xl object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {restaurant.name}
          </h2>
          <div className="text-sm text-gray-600">
            {restaurant.address && <div>{restaurant.address}</div>}
            {restaurant.city &&
              restaurant.state &&
              restaurant.zipcode && (
                <div>
                  {restaurant.city}, {restaurant.state}{" "}
                  {restaurant.zipcode}
                </div>
              )}
            {restaurant.phoneNumber && (
              <div>Phone: {restaurant.phoneNumber}</div>
            )}
          </div>
        </div>
      </div>
      <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md w-full h-[300px] md:h-[400px]">
        <iframe
          title={restaurant.name}
          width="100%"
          height="100%"
          src={mapSrc}
          allowFullScreen
        />
      </div>
    </div>
  );
}
