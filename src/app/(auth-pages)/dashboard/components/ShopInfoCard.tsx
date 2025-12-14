import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Phone, Globe } from "lucide-react"

interface ShopInfoCardProps {
  shop?: {
    name?: string
    logo?: string
    phone_number?: string
    slug?: string
    address?: {
      street?: string
      city?: string
      district?: string
      division?: string
      postal_code?: string
      coordinates?: {
        lat?: number
        lng?: number
      }
    }
  }
}

const ShopInfoCard: React.FC<ShopInfoCardProps> = ({ shop }) => {
  const formatAddress = () => {
    const parts = [
      shop?.address?.street,
      shop?.address?.district,
      shop?.address?.city,
      shop?.address?.division,
      shop?.address?.postal_code,
    ].filter(Boolean)
    return parts.join(", ") || "Address not provided"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-secondary">Shop Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={shop?.logo || "/placeholder.svg"} alt={shop?.name} />
            <AvatarFallback className="text-secondary">{shop?.name?.charAt(0)?.toUpperCase() || "S"}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg text-secondary">{shop?.name || "Shop Name Not Set"}</h3>
            <p className="text-sm text-muted-foreground">Slug: {shop?.slug || "Not generated"}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{shop?.phone_number || "Phone not provided"}</span>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="text-sm">
              <p>{formatAddress()}</p>
              {shop?.address?.coordinates?.lat && shop?.address?.coordinates?.lng && (
                <p className="text-muted-foreground text-xs mt-1">
                  Coordinates: {shop.address.coordinates.lat}, {shop.address.coordinates.lng}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{shop?.slug ? `/${shop.slug}` : "Shop URL not available"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ShopInfoCard
