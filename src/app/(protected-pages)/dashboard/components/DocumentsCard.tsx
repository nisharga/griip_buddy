import type React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface DocumentsCardProps {
  documents?: {
    NID?: {
      front?: string | null;
      back?: string | null;
    };
    passport?: {
      front?: string | null;
      back?: string | null;
    };
    tin_certificate?: string | null;
    trade_license?: string | null;
  };
}

const DocumentsCard: React.FC<DocumentsCardProps> = ({ documents }) => {
  const documentItems = [
    {
      name: "National ID (NID)",
      status:
        documents?.NID?.front || documents?.NID?.back ? "partial" : "missing",
      details: `Front: ${documents?.NID?.front ? "✓" : "✗"}, Back: ${
        documents?.NID?.back ? "✓" : "✗"
      }`,
    },
    {
      name: "Passport",
      status:
        documents?.passport?.front || documents?.passport?.back
          ? "partial"
          : "missing",
      details: `Front: ${documents?.passport?.front ? "✓" : "✗"}, Back: ${
        documents?.passport?.back ? "✓" : "✗"
      }`,
    },
    {
      name: "TIN Certificate",
      status: documents?.tin_certificate ? "complete" : "missing",
      details: documents?.tin_certificate ? "Uploaded" : "Not uploaded",
    },
    {
      name: "Trade License",
      status: documents?.trade_license ? "complete" : "missing",
      details: documents?.trade_license ? "Uploaded" : "Not uploaded",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "partial":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "complete":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Complete
          </Badge>
        );
      case "partial":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Partial
          </Badge>
        );
      default:
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            Missing
          </Badge>
        );
    }
  };

  const completedCount = documentItems.filter(
    (item) => item.status === "complete"
  ).length;
  const totalCount = documentItems.length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-secondary">Documents Status</CardTitle>
          <Badge variant="outline">
            {completedCount}/{totalCount} Complete
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documentItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(item.status)}
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.details}
                  </p>
                </div>
              </div>
              {getStatusBadge(item.status)}
            </div>
          ))}
        </div>

        {completedCount < totalCount && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <p className="text-sm text-yellow-800">
                Please upload all required documents to complete your vendor
                profile.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentsCard;
