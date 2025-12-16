/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Heart } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";

export function FavoriteItems({ profile }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500" />
          Favorite Items 0{/* ({profile?.favorite_items?.length}) */}
        </CardTitle>
      </CardHeader>
      <CardContent>
        No Favorite Item
        {/* {profile?.favorite_items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profile?.favorite_items.map((item: any) => (
              <div
                key={item?.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="aspect-square mb-3 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={item?.image || "/placeholder.svg?height=200&width=200"}
                    alt={item?.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                  {item?.name}
                </h4>
                {item?.price && (
                  <div className="text-lg font-bold text-purple-600 mb-3">
                    ${item?.price}
                  </div>
                )}
                <Button size="sm" className="w-full">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No favorite items yet</h3>
            <p>Items you mark as favorites will appear here</p>
          </div>
        )} */}
      </CardContent>
    </Card>
  );
}
