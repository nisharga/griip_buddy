/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, TrendingDown, TrendingUp } from "lucide-react";

export function CoinsSection({ profile }: any) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Used Coins History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-red-500" />
            Used Coins History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {profile?.used_coins_history?.length > 0 ? (
              profile?.used_coins_history.map((coin: any) => (
                <div
                  key={coin?.id}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-gray-900">
                      {coin?.description}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDate(coin?.date)}
                    </div>
                  </div>
                  <Badge variant="destructive">-{coin?.amount}</Badge>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                <Coins className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No coins used yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Claimed Coins */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            Claimed Coins
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {profile?.claimed_coins?.length > 0 ? (
              profile?.claimed_coins.map((coin: any) => (
                <div
                  key={coin?.id}
                  className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-gray-900">
                      {coin?.source}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDate(coin?.date)}
                    </div>
                  </div>
                  <Badge className="bg-green-600">+{coin?.amount}</Badge>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                <Coins className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No coins claimed yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
