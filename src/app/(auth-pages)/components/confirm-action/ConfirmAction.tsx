/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import React, { useState } from "react";

type ConfirmActionDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  actionName: string;
  itemName: string;
  onConfirm: () => Promise<any>; // your mutation or API call
  isLoading?: boolean;
};

export const ConfirmActionDialog = ({
  open,
  setOpen,
  title = "Are you sure?",
  actionName,
  itemName,
  onConfirm,
  isLoading = false,
}: ConfirmActionDialogProps) => {
  const [confirmation, setConfirmation] = useState("");
  const confirmationText = `${actionName} ${itemName}`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="sr-only">
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 px-6">
          <Label className="text-muted-foreground">
            Are you sure you want to {actionName.toLowerCase()}{" "}
            <strong className="text-foreground">{itemName}</strong>?
          </Label>
          <span className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Type <span className="text-destructive">{confirmationText}</span>{" "}
              to confirm.
            </p>
            <Input
              onChange={(e) => setConfirmation(e.target.value)}
              placeholder={confirmationText}
              value={confirmation}
            />
          </span>
        </div>

        <div className="w-full grid grid-cols-2 gap-4 p-6 bg-muted/50 border-t">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={confirmation !== confirmationText || isLoading}
            onClick={onConfirm}
          >
            {isLoading ? (
              <>
                Processing...
                <Loader className="ml-2 size-4 animate-spin" />
              </>
            ) : (
              actionName
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
