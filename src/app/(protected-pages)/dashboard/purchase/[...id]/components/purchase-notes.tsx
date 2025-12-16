/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Paperclip } from "lucide-react";

interface PurchaseNotesProps {
  notes?: string;
  attachments?: any[];
}

const PurchaseNotes = ({ notes, attachments }: PurchaseNotesProps) => {
  const hasContent = notes || (attachments && attachments.length > 0);

  console.log("attachments", attachments);

  if (!hasContent) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base md:text-lg flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Notes & Attachments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No additional notes or attachments
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3 md:pb-4">
        <CardTitle className="text-base md:text-lg flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Notes & Attachments
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {notes && (
          <div>
            <h4 className="text-sm font-medium mb-2">Additional Notes</h4>
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm  whitespace-pre-wrap text-white">{notes}</p>
            </div>
          </div>
        )}

        {attachments && attachments.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Paperclip className="h-3 w-3" />
              Attachments ({attachments.length})
            </h4>
            <div className="space-y-2">
              {attachments.map((attachment, index) => (
                <div
                  key={attachment?._id || index}
                  className="flex items-center gap-2 p-2 border rounded"
                >
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm flex-1  ">
                    {attachment?.name || `Attachment ${index + 1}`}
                  </span>
                  <Badge variant="secondary" className="text-xs text-white">
                    {attachment?.type || "File"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PurchaseNotes;
