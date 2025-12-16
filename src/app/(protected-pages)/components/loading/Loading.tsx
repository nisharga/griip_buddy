import { Card, CardContent } from "@/src/components/ui/card";
import { Loader2 } from "lucide-react";
import React from "react";

const Loading = ({ text }: { text: string }) => {
  return (
    <div className="min-h-[60vh] bg-gray-50 flex items-center justify-center">
      <Card className="p-8">
        <CardContent className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          <p className="text-gray-600">{text}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Loading;
